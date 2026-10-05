"use client";

import Link from "next/link";

import { useAuthGlobalProvider } from "@/components/AuthProvider";
import Logout from "./Logout";
import { ModeToggle } from "@/components/ThemeToggle";


const Header = () => {

  const { userData } = useAuthGlobalProvider();
  
  return (
    <header className="border-b">

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        <Link
          href="/dashboard"
          className="text-xl font-bold"
        >
          Vigyapix
        </Link>

        <div className="flex items-center gap-4">

          {userData && (

            <p className="text-sm">
              Hello, {userData?.displayName?.split(" ")[0]}
            </p>

          )}

          <ModeToggle />
          
          <Logout />

        </div>

      </div>

    </header>
  );
};

export default Header;