"use client";

import { useState } from "react";
import { Download, Eye, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Link from "next/link";

import { Button } from "@/components/ui/button";


const PreviewVideo = ({ data }) => {

  const [isDownloadingVideo, setIsDownloadingVideo] = useState(false);

  const handleDownloadVideo = async (videoUrl) => {

    try {

      setIsDownloadingVideo(true);

      const res = await axios.get(videoUrl, {
        responseType: "blob",
      });

      /**
       * Convert the downloaded video data into a temporary object URL.
       * The browser can use this URL to download the video file.
       */
      const blobVideoUrl = window.URL.createObjectURL(res.data);

      const aTag = document.createElement("a");

      aTag.href = blobVideoUrl;

      aTag.download = `generated-product-video-${uuidv4()}.mp4`;

      document.body.appendChild(aTag);

      aTag.click();

      document.body.removeChild(aTag);

      window.URL.revokeObjectURL(blobVideoUrl);

      toast.success("Video downloaded successfully!");

    } catch (error) {

      console.error("Video download failed:", error);

      toast.error("Failed to download video. Please try again.");

    } finally {

      setIsDownloadingVideo(false);

    }

  };


  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

      {data.map((item) => (
        <div
          key={item.id}
          className="flex flex-col overflow-hidden rounded-xl border p-3 shadow-sm"
        >

          {/* Generated product video */}
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">

            <video
              src={item?.generatedProductVideoUrl}
              controls
              playsInline
              preload="metadata"
              className="h-full w-full object-contain"
            />

          </div>

          {/* Preview and Download buttons */}
          <div className="mt-3 flex flex-wrap gap-3">

            <Link
              href={item?.generatedProductVideoUrl}
              target="_blank"
              className="min-w-0 flex-1 hover:cursor-pointer"
            >
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
              onClick={() =>
                handleDownloadVideo(item?.generatedProductVideoUrl)
              }
            >
              {isDownloadingVideo ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Download />
              )}
            </Button>

          </div>

        </div>

      ))}

    </div>

  );

};


export default PreviewVideo;