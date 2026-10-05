"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthGlobalProvider } from "@/components/AuthProvider";
import LoadUserDataLoading from "../_components/LoadUserDataLoading";
import Header from "./_components/Header";


const Page = () => {

  const router = useRouter();
  
  const { userData, loadingUserData } = useAuthGlobalProvider();

  useEffect(() => {

    if (!loadingUserData && !userData) {

      router.replace("/");

    }

  }, [loadingUserData, userData, router]);

  if (loadingUserData) {

    return <LoadUserDataLoading />

  }


  if (!userData) {

    return null;

  }


  return (
    <>

      <Header />

      <main className="min-h-screen px-6 py-10">

        <div className="mx-auto max-w-6xl">

          <h1 className="text-3xl font-bold">Dashboard</h1>

          <p className="mt-2">
            Welcome to your AI Product Ads Generator.
          </p>

        </div>

      </main>

    </>
  );
};

export default Page;
