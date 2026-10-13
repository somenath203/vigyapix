"use client";

import { ImagePlus, Square, Monitor, Smartphone, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Image as ImageKitImage } from "@imagekit/next";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";


const avatarList = [
  {
    name: 'Avatar 1',
    imageUrl: '/Vigyapix%20Project%20Avatar%20Photo/female_avatar_one.png'
  },
  {
    name: 'Avatar 2',
    imageUrl: '/Vigyapix%20Project%20Avatar%20Photo/men_avatar_two.png'
  },
  {
    name: 'Avatar 3',
    imageUrl: '/Vigyapix%20Project%20Avatar%20Photo/female_avatar_two.png?updatedAt=1791888695039'
  },
  {
    name: 'Avatar 4',
    imageUrl: '/Vigyapix%20Project%20Avatar%20Photo/men_avatar_one.png'
  },
];


const FormInput = ({ onHandleInputByUserChange, onGenerateProductImageByAI, loadingGeneratingImage }) => {

  const [inputImagePreview, setInputImagePreview] = useState();

  const [ selectedAvatar, setSelectedAvatar ] = useState();


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

      <div className="mt-8">

        <h2 className="font-semibold">3. Select Avatar</h2>

        <div className="flex items-center gap-4">

          {avatarList?.map((avatar) => (

            <ImageKitImage
              urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
              key={avatar.name}
              src={avatar.imageUrl}
              alt={avatar.name}
              width={200}
              height={200}
              className={`rounded-lg h-25 w-20 mt-2 hover:cursor-pointer object-cover ${avatar.imageUrl === selectedAvatar && 'border-2 border-primary'}`}
              onClick={() => {setSelectedAvatar(avatar.imageUrl); onHandleInputByUserChange('avatarUrlInput', avatar.imageUrl)}}
            />

          ))}

        </div>

      </div>

      <div className="mt-8">

        <h2 className="font-semibold">4. Select image size</h2>

        <Select
          onValueChange={(selectedValue) =>
            onHandleInputByUserChange("imageSizeInput", selectedValue)
          }
        >

          <SelectTrigger className="w-full mt-2">

            <SelectValue placeholder="Select Resolution" />

          </SelectTrigger>

          <SelectContent>

            <SelectItem value="1024x1024">

              <div className="flex gap-2 items-center">

                <Square size={15} />

                <span>1:1</span>

              </div>

            </SelectItem>

            <SelectItem value="1536x1024">

              <div className="flex gap-2 items-center">

                <Monitor size={15} />

                <span>16:9</span>

              </div>

            </SelectItem>

            <SelectItem value="1024x1536">

              <div className="flex gap-2 items-center">

                <Smartphone size={15} />

                <span>9:16</span>

              </div>

            </SelectItem>

          </SelectContent>

        </Select>

      </div>

      {loadingGeneratingImage ? (
        <Button disabled={true} className="mt-5 w-full hover:cursor-pointer" onClick={onGenerateProductImageByAI}>

          <Loader2 size={20} className="transition-all animate-spin duration-150" /> Generating...

        </Button>
      ) : (

        <Button className="mt-5 w-full hover:cursor-pointer" onClick={onGenerateProductImageByAI}>

          <Sparkles /> Generate

        </Button>

      )}

    </div>

  );

};

export default FormInput;