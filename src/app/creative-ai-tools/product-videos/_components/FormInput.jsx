"use client";

import { ImagePlus, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";


const FormInput = ({ onHandleInputByUserChange, onGenerateProductVideoByAI, loadingGeneratingVideo }) => {

  const [inputImagePreview, setInputImagePreview] = useState();


  const handleImgInputByUser = async (imgInputByUser) => {

    if (!imgInputByUser || imgInputByUser.length === 0) {

      return;

    }


    const actualImageInput = imgInputByUser[0];


    if (actualImageInput?.size >= 5 * 1024 * 1024) {

      toast.error("Image must be less than 5MB");

      return;

    }

    setInputImagePreview(URL.createObjectURL(actualImageInput));

    onHandleInputByUserChange("imageInput", actualImageInput);

  };

  return (
    <div>

      <div>

        <h2 className="font-semibold">1. Upload Product Image</h2>

        <div>

          <Label
            htmlFor="imgFileUpload"
            className="min-h-50 mt-2 border-dashed border-2 rounded-xl flex flex-col items-center justify-center p-4 hover:cursor-pointer"
          >

            {inputImagePreview ? (

              <Image
                src={inputImagePreview}
                alt="input image preview"
                width={300}
                height={300}
                className="w-full h-full max-h-50 object-contain rounded-lg"
              />
            ) : (

              <div className="flex flex-col items-center gap-3">

                <ImagePlus size={40} className="opacity-40" />

                <h2 className="text-xl">Click here to upload image</h2>

                <p className="opacity-45">Upload image upto 5mb</p>

              </div>

            )}

          </Label>

          <Input
            type="file"
            id="imgFileUpload"
            className="hidden"
            accept="image/*"
            onChange={(e) => handleImgInputByUser(e.target.files)}
          />

        </div>

      </div>


      <div className="mt-8">

        <h2 className="font-semibold">2. Enter product description</h2>

        <Textarea
          placeholder="Tell us more about your product and how you'd like it to be presented"
          className="resize-none min-h-37.5 mt-2"
          onChange={(e) =>
            onHandleInputByUserChange("descriptionInput", e.target.value)
          }
        />

      </div>

      {loadingGeneratingVideo ? (
        <Button disabled={true} className="mt-5 w-full hover:cursor-pointer" onClick={onGenerateProductVideoByAI}>

          <Loader2 size={20} className="transition-all animate-spin duration-150" /> Generating...

        </Button>
      ) : (

        <Button className="mt-5 w-full hover:cursor-pointer" onClick={onGenerateProductVideoByAI}>

          <Sparkles /> Generate

        </Button>

      )}

    </div>

  );

};

export default FormInput;
