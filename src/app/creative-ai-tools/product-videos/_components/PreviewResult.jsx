
"use client";

import { Download, Eye, Loader2 } from "lucide-react";
import { Video } from "@imagekit/next";
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


const PreviewResult = ({ generatedProductVideo }) => {


  const [isDownloadingVideo, setIsDownloadingVideo] = useState(false);


  const handleDownloadVideo = async () => {

    try {

      setIsDownloadingVideo(true);

      const res = await axios.get(generatedProductVideo, {
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

    <div>

      {/* Action buttons outside the dashed box */}
      {generatedProductVideo && (

        <div className="mb-4 flex justify-end gap-3">

          <Tooltip>

            <TooltipTrigger
              render={
                <Button
                  disabled={isDownloadingVideo}
                  variant="outline"
                  className="hover:cursor-pointer"
                  onClick={handleDownloadVideo}
                >
                  {isDownloadingVideo ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Download />
                  )}
                </Button>
              }
            />

            <TooltipContent>

              <p>
                {isDownloadingVideo
                  ? "Downloading Video..."
                  : "Download Video"}
              </p>

            </TooltipContent>

          </Tooltip>

          <Tooltip>

            <TooltipTrigger
              render={
                <Link
                  href={generatedProductVideo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="hover:cursor-pointer"
                  >
                    <Eye />
                  </Button>

                </Link>
              }
            />

            <TooltipContent>
              <p>View Video</p>
            </TooltipContent>

          </Tooltip>

        </div>

      )}

      {/* Dashed preview box */}
      <div className="min-h-100 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 p-6">

        {generatedProductVideo ? (
          <Video
            src={generatedProductVideo}
            controls
            playsInline
            preload="metadata"
            className="max-h-125 w-full rounded-lg object-contain"
          />
        ) : (
          <p className="text-center text-muted-foreground">
            Your generated product video will be displayed here.
          </p>
        )}

      </div>

    </div>

  );

};


export default PreviewResult;