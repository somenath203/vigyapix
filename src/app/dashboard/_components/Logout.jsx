"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { auth } from "@/firebaseConfig";
import { Button } from "@/components/ui/button";

const Logout = () => {

  const router = useRouter();

  const handleLogoutUser = async () => {

    try {

      await signOut(auth);

      toast.success("You have been logged out successfully.");

      router.replace("/");

    } catch (error) {

      console.log(error);

    }
    
  };

  return (
    <Button
      onClick={handleLogoutUser}
      variant="outline"
      className="hover:cursor-pointer"
    >
      Logout
    </Button>
  );
};

export default Logout;
