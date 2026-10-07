"use client";

import Header from "@/app/dashboard/_components/Header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuthGlobalProvider } from "@/components/AuthProvider";
import LoadUserDataLoading from "@/app/_components/LoadUserDataLoading";
import FormInput from "./_components/FormInput";
import PreviewResult from "./_components/PreviewResult";


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

          <h2 className="font-bold text-2xl my-3">
            AI Product Image Generator
          </h2>

          <div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              {/* form */}
              <div>
                <FormInput />
              </div>

              {/* preview */}
              <div className="md:grid-cols-2">
                <PreviewResult />
              </div>

            </div>

          </div>

        </div>

      </main>

    </>

  );

};


export default Page;
