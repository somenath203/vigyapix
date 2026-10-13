"use client";

import { collection, getDocs, query, where } from "firebase/firestore";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductImagesList from "./ProductImagesList";
import ProductVideosList from "./ProductVideosList";
import ProductImagesWithAvatar from "./ProductImagesWithAvatar";
import { db } from "@/firebaseConfig";


const UsersCreationHistory = ({ userEmailAddress }) => {

  // Fetch all generated product images for a particular email address
  const fetchProductImages = async () => {

    try {

      const q = query(
        collection(db, "productAdsPicturesData"),
        where("userEmailWhoCreatedTheImageProduct", "==", userEmailAddress),
      );

      const querySnapshot = await getDocs(q);

      const productImages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return productImages;

    } catch (error) {

      console.error("Error fetching product images:", error);

    }

  };


  // Fetch all generated product videos for a particular email address
  const fetchProductVideos = async () => {

    try {

      const q = query(
        collection(db, "productAdsVideoData"),
        where("userEmailWhoCreatedTheVideoProduct", "==", userEmailAddress),
      );

      const querySnapshot = await getDocs(q);

      const productVideos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return productVideos;

    } catch (error) {

      console.error("Error fetching product videos:", error);

    }

  };


  // Fetch all generated product images with avatars for a particular email address
  const fetchProductImagesWithAvatar = async () => {

    try {

      const q = query(
        collection(db, "productAdsPictureWithAvatarData"),
        where("userEmailWhoCreatedTheImageProduct", "==", userEmailAddress),
      );

      const querySnapshot = await getDocs(q);

      const productImagesWithAvatar = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return productImagesWithAvatar;

    } catch (error) {

      console.error("Error fetching product images with avatar:", error);

    }

  };


  return (
    <Tabs defaultValue="productimages" className="w-full mt-4">

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
