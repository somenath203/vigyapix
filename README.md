```jsx
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
    <main className="flex min-h-screen items-center justify-center px-6">

      <div className="text-center">

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          AI Product Ads Generator
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-lg">
          Create professional product images and video ads using AI.{" "}
        </p>

        {userData ? (

          <Link href="/dashboard">

            <Button className="mt-8 inline-flex rounded-lg hover:cursor-pointer">
              Go to Dashboard
            </Button>

          </Link>
        ) : (

          <Button
            onClick={handleGoogleAuthentication}
            className="mt-8 inline-flex rounded-lg hover:cursor-pointer"
          >
            Get Started
          </Button>

        )}

      </div>

    </main>
  );
};


export default Page;
```