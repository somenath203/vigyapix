"use client";

import Link from "next/link";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

import { auth } from "@/firebaseConfig";
import { Button } from "@/components/ui/button";
import { useAuthGlobalProvider } from "@/components/AuthProvider";
import LoadUserDataLoading from "./_components/LoadUserDataLoading";


const Page = () => {


  const router = useRouter();

  const { userData, loadingUserData } = useAuthGlobalProvider();


  const handleGoogleAuthentication = async () => {

    try {

      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const user = result?.user;

      console.log("Signed-in user:", user);

      router.push("/dashboard");

    } catch (error) {

      console.log(error);

    }

  };


  if (loadingUserData) {

    return <LoadUserDataLoading />

  }


  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">

      <div className="text-center">

        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          AI Product Ads Generator
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
          Create professional product images and video ads using AI.{" "}
        </p>

        {userData ? (

          <Link href="/dashboard">

            <Button className="mt-8 inline-flex rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800">
              Get Started
            </Button>

          </Link>
        ) : (

          <Button
            onClick={handleGoogleAuthentication}
            className="mt-8 inline-flex rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
          >
            Get Started
          </Button>

        )}

      </div>

    </main>
  );
};


export default Page;
