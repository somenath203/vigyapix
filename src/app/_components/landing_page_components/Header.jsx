"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "@/firebaseConfig";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CONTAINER,
  ENTRY_ROUTE,
  FOCUS_RING,
  GITHUB_REPO_URL,
  NAV_LINKS,
  externalProps,
} from "@/lib/landing-config";
import { GithubMark, ScrollLink, Wordmark } from "./Shared";
import { ModeToggle } from "@/components/ThemeToggle";
import { useAuthGlobalProvider } from "@/components/AuthProvider";
import LoadUserDataLoading from "../LoadUserDataLoading";

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

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

  // Close the mobile menu with the Escape key.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (loadingUserData) {
    return <LoadUserDataLoading />;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur supports-backdrop-filter:bg-background/70">
      <div
        className={cn(
          CONTAINER,
          "flex h-16 items-center justify-between gap-4",
        )}
      >
        <ScrollLink
          targetId="top"
          aria-label="Vigyapix, back to top"
          className={cn("rounded-lg", FOCUS_RING)}
        >
          <Wordmark />
        </ScrollLink>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <ScrollLink
              key={link.id}
              targetId={link.id}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                FOCUS_RING,
              )}
            >
              {link.label}
            </ScrollLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={GITHUB_REPO_URL}
            {...externalProps(GITHUB_REPO_URL)}
            aria-label="View Vigyapix on GitHub"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <GithubMark className="size-5" />
          </a>
          <ModeToggle />
          {userData ? (
            <Link href={ENTRY_ROUTE} className={buttonVariants({})}>
              Get Started
            </Link>
          ) : (
            <div
              className={buttonVariants({})}
              onClick={handleGoogleAuthentication}
            >
              Get Started
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "md:hidden",
          )}
        >
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-border bg-background md:hidden"
        >
          <nav
            aria-label="Mobile"
            className={cn(CONTAINER, "flex flex-col gap-1 py-4")}
          >
            {NAV_LINKS.map((link) => (
              <ScrollLink
                key={link.id}
                targetId={link.id}
                onClick={close}
                className={cn(
                  "rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted",
                  FOCUS_RING,
                )}
              >
                {link.label}
              </ScrollLink>
            ))}
            <ModeToggle />
            <div className="mt-3 grid gap-2 border-t border-border pt-4">
              <Link
                href={ENTRY_ROUTE}
                onClick={close}
                className={cn(buttonVariants({ size: "lg" }), "w-full")}
              >
                Get Started
              </Link>
              <Link
                href={ENTRY_ROUTE}
                onClick={close}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full",
                )}
              >
                Sign in
              </Link>
              <a
                href={GITHUB_REPO_URL}
                {...externalProps(GITHUB_REPO_URL)}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "lg" }),
                  "w-full gap-2",
                )}
              >
                <GithubMark className="size-5" />
                View on GitHub
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
