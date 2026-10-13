import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CONTAINER, ENTRY_ROUTE } from "@/lib/landing-config";

export default function CTASection() {
  return (
    <section id="get-started" className="scroll-mt-20 pb-20 sm:pb-24">
      <div className={CONTAINER}>
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground shadow-lg sm:px-12 sm:py-20">
          {/* Decorative shapes */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-primary-foreground/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-10 size-64 rounded-full bg-primary-foreground/10"
          />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Your Next Great Product Ad Starts Here.
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
              Bring your product image, choose your creative direction, and
              start creating AI-powered advertising visuals with Vigyapix.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href={ENTRY_ROUTE}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "gap-2"
                )}
              >
                Start Creating
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}