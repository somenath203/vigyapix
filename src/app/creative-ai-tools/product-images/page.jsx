"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import axios from "axios";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import { useAuthGlobalProvider } from "@/components/AuthProvider";
import Header from "@/app/dashboard/_components/Header";
import LoadUserDataLoading from "@/app/_components/LoadUserDataLoading";
import FormInput from "./_components/FormInput";
import PreviewResult from "./_components/PreviewResult";
import { db } from "@/firebaseConfig";


const Page = () => {

  const [ allFormData, setAllFormData ] = useState();

  const [ generatedProductImage, setGeneratedProductImage ] = useState();

  const [ loadingGeneratedProductImage, setLoadingGeneratedProductImage ] = useState(false);


  const router = useRouter();

  const { userData, loadingUserData } = useAuthGlobalProvider();

  const abortController = new AbortController();

  const onHandleUserInputChange = (fieldName, fieldValue) => {

    setAllFormData((prevValues) => ({
      ...prevValues,
      [fieldName]: fieldValue,
    }));

  };

  const authenticator = async () => {

    try {

      const response = await fetch("/api/upload-auth");

      if (!response.ok) {

        const errorText = await response.text();

        throw new Error(`Request failed with status ${response.status}: ${errorText}`);

      }

      const data = await response.json();

      const { signature, expire, token, publicKey } = data;

      return { signature, expire, token, publicKey };

    } catch (error) {

      console.error("Authentication error:", error);

      throw new Error("Authentication request failed");

    }

  };


  const onGenerateProductImageByAI = async () => {

    if (!allFormData?.imageInput) {

      toast.error("please upload product image");

      return;

    } else if (!allFormData?.descriptionInput) {

      toast.error("description is required");

      return;

    } else if (!allFormData?.imageSizeInput) {

      toast.error("please select image size");

      return;

    }


    let authParams;

    try {

      authParams = await authenticator();

    } catch (authError) {

      console.error("Failed to authenticate for upload:", authError);

      return;

    }

    const { signature, expire, token, publicKey } = authParams;

    /**
     * Upload the input product image to ImageKit to get a publicly accessible image URL,
     * then send that URL along with the product details to the AI image generation API.
     */
    try {

      setLoadingGeneratedProductImage(true);

      const uploadResponse = await upload({
        // Authentication parameters
        expire,
        token,
        signature,
        publicKey,
        file: allFormData?.imageInput,
        fileName: allFormData?.imageInput?.name, // Optionally set a custom file name
        // Abort signal to allow cancellation of the upload if needed.
        abortSignal: abortController.signal,
      });

      const { data } = await axios.post('/api/generate-product-image-ai', {
        productInputImageUrlFromImageKit: uploadResponse?.url,
        productInputDescription: allFormData?.descriptionInput,
        productInputImageSize: allFormData?.imageSizeInput
      });

      if (data?.success) {

        const generatedProductImg = data?.generatedImg;
        
        console.log(generatedProductImg?.name);

        let authParams;

        try {

          authParams = await authenticator();

        } catch (authError) {

          console.error("Failed to authenticate for upload:", authError);

          return;

        }

        const { signature, expire, token, publicKey } = authParams;

        /**
         * Upload the generated product image to ImageKit so that we can get
         * a publicly accessible URL and later store it in the user's Firestore data.
         */
        const uploadResponseGeneratedProductImg = await upload({
          // Authentication parameters
          expire,
          token,
          signature,
          publicKey,
          file: generatedProductImg,
          fileName: `generated-product-image-${uuidv4()}.png`,
          // Abort signal to allow cancellation of the upload if needed.
          abortSignal: abortController.signal,
        });

        const generatedProductImageUrl = uploadResponseGeneratedProductImg?.url;

        const originalProductImageUrl = uploadResponse?.url;

        // Save the generated product image and related product details to Firebase-Firestore.
        await addDoc(collection(db, 'productAdsPicturesData'), {
          generatedProductImageUrl,
          originalProductImageUrl,
          productDescription: allFormData?.descriptionInput,
          imageSize: allFormData?.imageSizeInput,
          userEmailWhoCreatedTheImageProduct: userData?.email,
          createdAt: serverTimestamp(),
        });

        setGeneratedProductImage(generatedProductImageUrl);

        toast.success("Product image generated and saved successfully!");

      }

    } catch (error) {

      // Handle specific error types provided by the ImageKit SDK.
      if (error instanceof ImageKitAbortError) {

        console.error("Upload aborted:", error.reason);

        toast.error(error.reason);

      } else if (error instanceof ImageKitInvalidRequestError) {

        console.error("Invalid request:", error.message);

        toast.error(error.message);

      } else if (error instanceof ImageKitUploadNetworkError) {

        console.error("Network error:", error.message);

        toast.error(error.message);

      } else if (error instanceof ImageKitServerError) {

        console.error("Server error:", error.message);

        toast.error(error.message);

      } else {

        // Handle any other errors that may occur.
        console.error("Upload error:", error);

        toast.error(error.message || 'Something went wrong while uploading image. Please try again after sometime.');

      }

    } finally {

      setLoadingGeneratedProductImage(false);

    }

  };


  useEffect(() => {

    if (!loadingUserData && !userData) {

      router.replace("/");

    }

  }, [loadingUserData, userData, router]);


  if (loadingUserData) {

    return <LoadUserDataLoading />;

  }


  if (!userData) {

    return null;

  }

  return (

    <>

      <Header />

      <main className="min-h-screen px-6 py-10">

        <div className="mx-auto max-w-6xl">
          
          <h2 className="font-bold text-2xl my-3">
            AI Product Image Generator
          </h2>

          <div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* form */}
              <div>

                <FormInput
                  onHandleInputByUserChange={(fieldName, fieldValue) => onHandleUserInputChange(fieldName, fieldValue)}
                  onGenerateProductImageByAI={onGenerateProductImageByAI}
                  loadingGeneratingImage={loadingGeneratedProductImage}
                />

              </div>

              {/* preview */}
              <div>

                <PreviewResult generatedProductImage={generatedProductImage} />

              </div>

            </div>

          </div>

        </div>

      </main>

    </>

  );
  
};


export default Page;
