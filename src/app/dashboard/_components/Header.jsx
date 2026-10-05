"use client";

import Link from "next/link";

import { useAuthGlobalProvider } from "@/components/AuthProvider";
import Logout from "./Logout";
import { ModeToggle } from "@/components/ThemeToggle";
import ProfileAvatar from "./ProfileAvatar";
import { Button } from "@/components/ui/button";


const Header = () => {

  const { userData } = useAuthGlobalProvider();

  console.log(userData);
  
  
  return (
    <header className="border-b">

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        <Link
          href="/"
          className="text-xl font-bold"
        >
          Vigyapix
        </Link>

        <div className="flex items-center gap-4">

          <Link href="/dashboard">
            <Button className="hover:cursor-pointer">Dashboard</Button>
          </Link>

          {userData && <ProfileAvatar userData={userData} />}

          <ModeToggle />
          
          <Logout />

        </div>

      </div>

    </header>
  );
};

export default Header;