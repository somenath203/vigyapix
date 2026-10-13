import { Clapperboard, History, ImageIcon, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";
import { CONTAINER } from "@/lib/landing-config";
import {
  AvatarPreview,
  BeforeAfterPreview,
  HistoryPreview,
  VideoPreview,
} from "./Mockup";
import { SectionHeading } from "./Shared";

const FEATURES = [
  {
    icon: ImageIcon,
    title: "Product Images, Reimagined",
    description:
      "Transform ordinary product photos into polished advertising visuals with AI-generated backgrounds, professional lighting, and product-focused compositions.",
    span: "lg:col-span-4",
    preview: <BeforeAfterPreview />,
  },
  {
    icon: UserRound,
    title: "Put People Into Your Ads",
    description:
      "Create engaging product advertisements featuring a selected avatar, with AI combining the person and product into a cohesive commercial composition.",
    span: "lg:col-span-2",
    preview: <AvatarPreview />,
  },
  {
    icon: Clapperboard,
    title: "Bring Products to Life",
    description:
      "Turn product imagery into promotional videos with AI-assisted prompt generation and image-to-video creation.",
    span: "lg:col-span-2",
    preview: <VideoPreview />,
  },
  {
    icon: History,
    title: "Your Creations, All in One Place",
    description:
      "Browse your generated product images, avatar advertisements, and promotional videos in organized history tabs. Preview and download individual creations whenever needed.",
    span: "lg:col-span-4",
    preview: <HistoryPreview />,
  },
];

export default function FeatureSection() {
  return (
    <section id="features" className="scroll-mt-20 py-20 sm:py-24">
      <div className={CONTAINER}>
        <SectionHeading
          eyebrow="Features"
          title="Everything You Need to Create Better Product Ads"
          description="From polished product imagery to avatar-powered creatives and promotional videos, bring your advertising ideas to life with AI."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {FEATURES.map(({ icon: Icon, title, description, span, preview }) => (
            <article
              key={title}
              className={cn(
                "group flex flex-col rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                span
              )}
            >
              <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {description}
              </p>
              <div className="mt-6 flex-1 content-end">{preview}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}