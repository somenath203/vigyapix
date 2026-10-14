"use client";

import Link from "next/link";

import { useAuthGlobalProvider } from "@/components/AuthProvider";
import Logout from "./Logout";
import { ModeToggle } from "@/components/ThemeToggle";
import ProfileAvatar from "./ProfileAvatar";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/app/_components/landing_page_components/Shared";


const Header = () => {

  const { userData } = useAuthGlobalProvider();

  return (
    <header className="border-b">

      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-3 sm:px-6 sm:py-4">

        <Link
          href="/"
          aria-label="Vigyapix home"
          className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Wordmark />
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-4">

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