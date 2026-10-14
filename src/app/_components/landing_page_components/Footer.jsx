'use client';

import Link from "next/link";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

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
import LoadUserDataLoading from "../LoadUserDataLoading";
import { useAuthGlobalProvider } from "@/components/AuthProvider";

export default function Footer() {
  const year = new Date().getFullYear();

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
    return <LoadUserDataLoading />;
  }

  return (
    <footer className="border-t border-border bg-background">
      <div className={cn(CONTAINER, "py-12")}>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Wordmark />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Vigyapix is an AI-powered tool for creating product advertisement
              images, avatar-powered ads, and promotional videos from your
              product images.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3 text-sm">
            <p className="font-semibold text-foreground">Explore</p>
            {NAV_LINKS.map((link) => (
              <ScrollLink
                key={link.id}
                targetId={link.id}
                className={cn(
                  "w-fit rounded text-muted-foreground transition-colors hover:text-foreground",
                  FOCUS_RING,
                )}
              >
                {link.label}
              </ScrollLink>
            ))}
          </nav>

          <div className="flex flex-col items-start gap-3">
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
            <a
              href={GITHUB_REPO_URL}
              {...externalProps(GITHUB_REPO_URL)}
              className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
            >
              <GithubMark className="size-4" />
              View on GitHub
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
          © {year} Vigyapix | Somenath Choudhury
        </div>
      </div>
    </footer>
  );
}
