"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthGlobalProvider } from "@/components/AuthProvider";
import LoadUserDataLoading from "../_components/LoadUserDataLoading";
import Header from "./_components/Header";
import AiToolsList from "./_components/AiToolsList";
import UsersCreationHistory from "./_components/UsersCreationHistory";

const Page = () => {

  const router = useRouter();

  const { userData, loadingUserData } = useAuthGlobalProvider();

  useEffect(() => {

    if (!loadingUserData && !userData) {

      router.replace("/");

    }

  }, [loadingUserData, userData, router]);

  if (loadingUserData) {

    return <LoadUserDataLoading />;

  }

  if (!userData) {

    return null;

  }

  return (
    <>
    
      <Header />

      <main className="min-h-screen px-6 py-10">

        <div className="mx-auto max-w-6xl">

          <AiToolsList />

          <UsersCreationHistory userEmailAddress={userData?.email} />

        </div>

      </main>

    </>
  );
};

export default Page;
