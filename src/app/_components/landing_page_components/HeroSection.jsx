import Link from "next/link";
import {
  ArrowRight,
  Clapperboard,
  ImageIcon,
  Play,
  Sparkles,
  UserRound,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CONTAINER, ENTRY_ROUTE } from "@/lib/landing-config";
import { AdScene, PlainPhotoScene } from "./Mockup";
import { ScrollLink } from "./Shared";

const chipClass =
  "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-card-foreground shadow-md";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-x-clip border-b border-border"
    >
      {/* Soft theme-based glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-112 bg-linear-to-b from-primary/10 to-transparent"
      />

      <div
        className={cn(
          CONTAINER,
          "grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-2 lg:gap-12 lg:py-28"
        )}
      >
        {/* Copy */}
        <div className="text-center lg:text-left">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3.5 py-1.5 text-sm font-medium text-foreground lg:mx-0">
            <Sparkles className="size-4 text-primary" aria-hidden="true" />
            AI-Powered Product Advertising
          </p>

          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Turn Product Photos Into{" "}
            <span className="text-primary">Scroll-Stopping Ads.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
            Create eye-catching product images, avatar-powered advertisements,
            and promotional videos with AI. Transform your product visuals into
            compelling marketing creatives without complicated editing
            workflows.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href={ENTRY_ROUTE}
              className={cn(buttonVariants({ size: "lg" }), "gap-2")}
            >
              Create Your First Ad
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <ScrollLink
              targetId="features"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Explore Features
            </ScrollLink>
          </div>

          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground lg:justify-start">
            <li className="inline-flex items-center gap-2">
              <ImageIcon className="size-4 text-primary" aria-hidden="true" />
              Product images
            </li>
            <li className="inline-flex items-center gap-2">
              <UserRound className="size-4 text-primary" aria-hidden="true" />
              Avatar ads
            </li>
            <li className="inline-flex items-center gap-2">
              <Clapperboard className="size-4 text-primary" aria-hidden="true" />
              Promo videos
            </li>
          </ul>
        </div>

        {/* Visual: illustrative mockup, not real generated output */}
        <div className="relative mx-auto w-full max-w-md pb-8 lg:max-w-none">
          <div className="relative mx-auto aspect-4/5 w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-card shadow-xl lg:max-w-md">
            <AdScene bottleClass="scale-[2.1]" />
            <span className={cn(chipClass, "absolute left-4 top-4")}>
              <ImageIcon className="size-3.5 text-primary" aria-hidden="true" />
              Image ad
            </span>
            <div
              aria-hidden="true"
              className="absolute inset-x-5 bottom-5 space-y-2"
            >
              <div className="h-2.5 w-3/5 rounded-full bg-foreground/20" />
              <div className="h-2.5 w-2/5 rounded-full bg-foreground/10" />
            </div>
          </div>

          {/* Before: plain photo */}
          <div className="absolute bottom-0 left-0 w-32 -rotate-3 rounded-2xl border border-border bg-card p-2 shadow-lg sm:w-40 lg:-left-2">
            <div className="aspect-square overflow-hidden rounded-xl">
              <PlainPhotoScene bottleClass="scale-75" />
            </div>
            <p className="mt-1.5 text-center text-xs font-medium text-muted-foreground">
              Original photo
            </p>
          </div>

          {/* Avatar chip */}
          <span
            className={cn(
              chipClass,
              "absolute right-0 top-1/3 sm:right-4 lg:-right-2"
            )}
          >
            <UserRound className="size-3.5 text-primary" aria-hidden="true" />
            Avatar ad
          </span>

          {/* Video card */}
          <div className="absolute bottom-2 right-0 w-36 rotate-3 rounded-2xl border border-border bg-card p-2 shadow-lg sm:right-4 sm:w-44 lg:-right-2">
            <div
              aria-hidden="true"
              className="relative grid aspect-video place-items-center overflow-hidden rounded-xl bg-linear-to-br from-primary/30 via-muted to-card"
            >
              <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
                <Play className="size-4 translate-x-px" fill="currentColor" />
              </span>
            </div>
            <p className="mt-1.5 text-center text-xs font-medium text-muted-foreground">
              Promo video
            </p>
          </div>

          <p className="mt-10 text-center text-xs text-muted-foreground">
            Illustrative mockup
          </p>
        </div>
      </div>
    </section>
  );
}