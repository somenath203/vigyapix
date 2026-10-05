"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthGlobalProvider } from "@/components/AuthProvider";
import LoadUserDataLoading from "../_components/LoadUserDataLoading";


const Page = () => {

  const router = useRouter();
  
  const { userData, loadingUserData } = useAuthGlobalProvider();

  useEffect(() => {

    if (!loadingUserData && !userData) {

      router.replace("/");

    }

  }, [loadingUserData, userData, router]);

  if (loading) {

    return <LoadUserDataLoading />

  }


  if (!userData) {

    return null;

  }


  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">

      <div className="mx-auto max-w-6xl">

        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

        <p className="mt-2 text-gray-600">
          Welcome to your AI Product Ads Generator.
        </p>

      </div>

    </main>
  );
};

export default Page;
