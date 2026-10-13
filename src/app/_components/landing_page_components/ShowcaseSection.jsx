import { CONTAINER } from "@/lib/landing-config";
import { cn } from "@/lib/utils";
import { AdScene, AvatarScene, PlainPhotoScene, VideoScene } from "./Mockup";
import { SectionHeading } from "./Shared";

function ShowcaseCard({ label, description, className, visualClassName, children }) {
  return (
    <figure
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm",
        className
      )}
    >
      <div className={cn("relative min-h-56 flex-1", visualClassName)}>
        {children}
      </div>
      <figcaption className="border-t border-border p-5">
        <p className="text-base font-semibold">{label}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </figcaption>
    </figure>
  );
}

export default function ShowcaseSection() {
  return (
    <section
      id="showcase"
      className="scroll-mt-20 border-y border-border bg-muted/40 py-20 sm:py-24"
    >
      <div className={CONTAINER}>
        <SectionHeading
          eyebrow="Showcase"
          title="One Product. More Creative Possibilities."
          description="Three kinds of creatives, all starting from the same product image."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:grid-rows-2">
          <ShowcaseCard
            label="Product advertisement image"
            description="A styled advertising visual built around your product reference and description."
            className="lg:col-span-2 lg:row-span-2"
            visualClassName="min-h-80 lg:min-h-[28rem]"
          >
            <div className="absolute inset-0 grid grid-cols-5">
              <div className="col-span-2 hidden border-r border-border sm:block">
                <PlainPhotoScene bottleClass="scale-[1.6]" />
              </div>
              <div className="col-span-5 sm:col-span-3">
                <AdScene bottleClass="scale-[2.2]" />
              </div>
            </div>
          </ShowcaseCard>

          <ShowcaseCard
            label="Advertisement with an avatar"
            description="Your product and a selected avatar combined into one composition."
          >
            <div className="absolute inset-0">
              <AvatarScene scale="scale-110" />
            </div>
          </ShowcaseCard>

          <ShowcaseCard
            label="Promotional product video"
            description="A short promo created from your product image and an AI-assisted prompt."
          >
            <div className="absolute inset-0">
              <VideoScene />
            </div>
          </ShowcaseCard>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Illustrative mockups. AI-generated results can vary, so always review
          your output before using it.
        </p>
      </div>
    </section>
  );
}