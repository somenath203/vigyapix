import Link from "next/link";

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

export default function Footer() {
  const year = new Date().getFullYear();

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
                  FOCUS_RING
                )}
              >
                {link.label}
              </ScrollLink>
            ))}
          </nav>

          <div className="flex flex-col items-start gap-3">
            <Link href={ENTRY_ROUTE} className={buttonVariants({})}>
              Get Started
            </Link>
            <a
              href={GITHUB_REPO_URL}
              {...externalProps(GITHUB_REPO_URL)}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "gap-2"
              )}
            >
              <GithubMark className="size-4" />
              View on GitHub
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
          © {year} Vigyapix. All rights reserved.
        </div>
      </div>
    </footer>
  );
}