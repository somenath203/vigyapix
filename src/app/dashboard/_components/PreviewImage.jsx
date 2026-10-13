"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Eye, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

import { Button } from "@/components/ui/button";


const PreviewImage = ({ data }) => {

  const [isDownloadingImg, setIsDownloadingImg] = useState(false);

  const handleDownloadImage = async (imgUrl) => {

    try {

      setIsDownloadingImg(true);

      const res = await axios.get(imgUrl, {
        responseType: "blob",
      });

      const blobImgUrl = window.URL.createObjectURL(res.data);

      const aTag = document.createElement("a");

      aTag.href = blobImgUrl;

      aTag.download = `generated-product-image-${uuidv4()}.png`;

      document.body.appendChild(aTag);

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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((item) => (
        <div
          key={item?.id}
          className="flex flex-col overflow-hidden rounded-xl border p-3 shadow-sm"
        >
          {/* Generated product image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
            <Image
              src={item?.generatedProductImageUrl}
              alt={item?.productDescription || "Generated product image"}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain"
            />
          </div>

          {/* Preview and Download buttons */}
          <div className="mt-3 flex flex-wrap gap-3">

            <Link href={item?.generatedProductImageUrl} target="_blank" className="min-w-0 flex-1 hover:cursor-pointer">

              <Button
                variant="outline"
                className="w-full hover:cursor-pointer"
              >
                <Eye />

              </Button>

            </Link>

            <Button
              variant="outline"
              className="min-w-0 flex-1 hover:cursor-pointer"
              onClick={() => handleDownloadImage(item?.generatedProductImageUrl)}
            >
              {isDownloadingImg ? <Loader2 className="animate-spin" /> : <Download />}

            </Button>

          </div>

        </div>

      ))}

    </div>

  );

};


export default PreviewImage;