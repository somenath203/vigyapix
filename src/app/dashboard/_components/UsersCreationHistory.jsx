"use client";

import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductImagesList from "./ProductImagesList";
import ProductVideosList from "./ProductVideosList";
import ProductImagesWithAvatar from "./ProductImagesWithAvatar";
import { db } from "@/firebaseConfig";


const UsersCreationHistory = ({ userEmailAddress }) => {


  const  [loadingAllProductPictures, setLoadingAllProductPictures ] = useState(false);

  const [ loadingAllProductVideos, setLoadingAllProductVideos ] = useState(false);

  const [ loadingAllProductPicturesWithAvatar, setLoadingAllProductPicturesWithAvatar ] = useState(false);


  // Fetch all generated product images for a particular email address
  const fetchProductImages = async () => {

    try {

      setLoadingAllProductPictures(true);

      const q = query(
        collection(db, "productAdsPicturesData"),
        where("userEmailWhoCreatedTheImageProduct", "==", userEmailAddress),
      );

      const querySnapshot = await getDocs(q);

      const productImages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Product Images:", productImages);

    } catch (error) {

      console.error("Error fetching product images:", error);

    } finally {

      setLoadingAllProductPictures(false);

    }

  };


  // Fetch all generated product videos for a particular email address
  const fetchProductVideos = async () => {

    try {

      setLoadingAllProductVideos(true);

      const q = query(
        collection(db, "productAdsVideoData"),
        where("userEmailWhoCreatedTheVideoProduct", "==", userEmailAddress),
      );

      const querySnapshot = await getDocs(q);

      const productVideos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Product Videos:", productVideos);

    } catch (error) {

      console.error("Error fetching product videos:", error);
      
    } finally {

      setLoadingAllProductVideos(false);

    }

  };


  // Fetch all generated product images with avatars for a particular email address
  const fetchProductImagesWithAvatar = async () => {

    try {

      setLoadingAllProductPicturesWithAvatar(true);

      const q = query(
        collection(db, "productAdsPictureWithAvatarData"),
        where("userEmailWhoCreatedTheImageProduct", "==", userEmailAddress),
      );

      const querySnapshot = await getDocs(q);

      const productImagesWithAvatar = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Product Images with Avatar:", productImagesWithAvatar);

    } catch (error) {

      console.error("Error fetching product images with avatar:", error);

    } finally {

      setLoadingAllProductPicturesWithAvatar(false);

    }

  };


  return loadingAllProductPictures || loadingAllProductVideos || loadingAllProductPicturesWithAvatar ? (

    <div>Loading</div>

  ) : (

    <Tabs defaultValue="productimages" className="w-100 mt-4">

      <TabsList>

        <TabsTrigger value="productimages" className="hover:cursor-pointer">
          Product Images
        </TabsTrigger>

        <TabsTrigger value="productvideos" className="hover:cursor-pointer">
          Product Videos
        </TabsTrigger>

        <TabsTrigger
          value="productimageswithavatar"
          className="hover:cursor-pointer"
        >
          Product Images with Avatar
        </TabsTrigger>

      </TabsList>

      <TabsContent value="productimages">
        <ProductImagesList allImageProducts={fetchProductImages} />
      </TabsContent>

      <TabsContent value="productvideos">
        <ProductVideosList allVideoProducts={fetchProductVideos} />
      </TabsContent>

      <TabsContent value="productimageswithavatar">
        <ProductImagesWithAvatar allImageWithAvatarProducts={fetchProductImagesWithAvatar} />
      </TabsContent>

    </Tabs>

  );

};


export default UsersCreationHistory;
