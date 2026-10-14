"use client";

import Image from "next/image";
import { Download, Eye, Loader2 } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";


const PreviewResult = ({ generatedProductImage }) => {


  const [isDownloadingImg, setIsDownloadingImg] = useState(false);


  const handleDownloadImage = async () => {

    try {

      setIsDownloadingImg(true);

      const res = await axios.get(generatedProductImage, {
        responseType: "blob",
      });

      /**
       * What is a Blob?
       *
       * Blob stands for Binary Large Object. It is a JavaScript object
       * used to represent raw data, such as an image, audio file, video,
       * or PDF file.
       *
       * Think of a Blob as a container that holds the actual data of a file.
       *
       * Example:
       * const myBlob = new Blob(["Hello, World!"], {
       *   type: "text/plain",
       * });
       *
       * Here, we create a Blob containing the text "Hello, World!".
       * The type "text/plain" tells the browser that the data is plain text.
       *
       * Similarly, when we download an image using Axios with
       * responseType: "blob", the browser receives the image data as a Blob.
       * We can then create a temporary URL for that Blob and use it
       * to download the image.
       */

      const blobImgUrl = window.URL.createObjectURL(res.data);

      const aTag = document.createElement("a");

      aTag.href = blobImgUrl;

      aTag.download = `generated-product-image-${uuidv4()}.png`;

      document.body.appendChild(aTag);
      /**
       * Why is document.body.appendChild(aTag) required?
       *
       * We create an <a> element using document.createElement("a").
       * However, this element initially exists only in memory and is not
       * attached to the webpage's DOM.
       *
       * By calling document.body.appendChild(aTag), we temporarily add
       * the <a> element to the webpage's body.
       *
       * This allows the browser to process the download link when we call
       * aTag.click(), which triggers the download of the image.
       *
       * After triggering the download, we remove the temporary element
       * using document.body.removeChild(aTag) to keep the DOM clean.
       */

      aTag.click();

      document.body.removeChild(aTag);

      window.URL.revokeObjectURL(blobImgUrl);

      toast.success("Image downloaded successfully!");

    } catch (error) {

      console.error("Image download failed:", error);

      toast.error("Failed to download image. Please try again.");

    } finally {

      setIsDownloadingImg(false);

    }

  };


  return (
    <div>

      {/* Action buttons outside the dashed box */}
      {generatedProductImage && (

        <div className="flex justify-end gap-3 mb-4">

          <Tooltip>

            <TooltipTrigger
              render={
                <Button
                  disabled={isDownloadingImg}
                  variant="outline"
                  className="hover:cursor-pointer"
                  onClick={handleDownloadImage}
                >

                  {isDownloadingImg ? <Loader2 className="animate-spin" /> : <Download />}

                </Button>
              }
            />

            <TooltipContent>

              <p>
                {isDownloadingImg ? "Downloading Image..." : "Download Image"}
              </p>

            </TooltipContent>

          </Tooltip>

          <Tooltip>

            <TooltipTrigger
              render={
                <Link href={generatedProductImage} target="_blank">
                  <Button variant="outline" className="hover:cursor-pointer">
                    <Eye />
                  </Button>
                </Link>
              }
            />

            <TooltipContent>
              <p>View Image</p>
            </TooltipContent>

          </Tooltip>

        </div>

      )}

      {/* Dashed preview box */}
      <div className="min-h-100 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 p-6">

        {generatedProductImage ? (
          /**
           * Use `urlEndpoint` when `src` contains a relative image path.
           * Omit it when `src` already contains a complete, absolute ImageKit URL,
           * such as an image URL retrieved from Firestore.
           */
          <Image
            src={generatedProductImage}
            alt="Generated product"
            width={1024}
            height={1024}
            className="max-h-125 w-full rounded-lg object-contain"
            loading="eager"
          />

        ) : (

          <p className="text-center text-muted-foreground">
            Your generated product image will be displayed here.
          </p>

        )}

      </div>

    </div>

  );

};


export default PreviewResult;
