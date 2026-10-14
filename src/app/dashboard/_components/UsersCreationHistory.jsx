"use client";

import { collection, getDocs, query, where } from "firebase/firestore";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductImagesList from "./ProductImagesList";
import ProductVideosList from "./ProductVideosList";
import ProductImagesWithAvatar from "./ProductImagesWithAvatar";
import { db } from "@/firebaseConfig";


// Shared look for every tab trigger. Covers both Radix (data-[state=active])
// and Base UI (data-active) attribute conventions, plus the dark-mode defaults
// that the stock shadcn trigger applies.
const tabTriggerStyles =
  "flex-none rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:cursor-pointer hover:text-foreground " +
  "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm " +
  "data-active:bg-primary data-active:text-primary-foreground data-active:shadow-sm " +
  "dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground " +
  "dark:data-active:border-transparent dark:data-active:bg-primary dark:data-active:text-primary-foreground";


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
    <Tabs defaultValue="productimages" className="mt-4 w-full">

      <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-xl border border-border bg-muted/60 p-1 sm:w-fit">

        <TabsTrigger value="productimages" className={tabTriggerStyles}>
          Product Images
        </TabsTrigger>

        <TabsTrigger value="productvideos" className={tabTriggerStyles}>
          Product Videos
        </TabsTrigger>

        <TabsTrigger
          value="productimageswithavatar"
          className={tabTriggerStyles}
        >
          Product Images with Avatar
        </TabsTrigger>

      </TabsList>

      <TabsContent value="productimages" className="mt-6">
        <ProductImagesList allImageProducts={fetchProductImages} />
      </TabsContent>

      <TabsContent value="productvideos" className="mt-6">
        <ProductVideosList allVideoProducts={fetchProductVideos} />
      </TabsContent>

      <TabsContent value="productimageswithavatar" className="mt-6">
        <ProductImagesWithAvatar allImageWithAvatarProducts={fetchProductImagesWithAvatar} />
      </TabsContent>

    </Tabs>
  );

};


export default UsersCreationHistory;