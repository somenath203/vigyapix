import { CONTAINER } from "@/lib/landing-config";
import { cn } from "@/lib/utils";
import {
  GenerateStepVisual,
  OptionsStepVisual,
  ResultStepVisual,
  UploadStepVisual,
} from "./Mockup";
import { SectionHeading } from "./Shared";

const STEPS = [
  {
    title: "Upload Your Product",
    description:
      "Choose a product image and provide a short description explaining the product and its key characteristics.",
    visual: <UploadStepVisual />,
  },
  {
    title: "Customize Your Ad",
    description:
      "Select your preferred image size, choose an avatar when creating a person-focused advertisement, or provide the details needed for your promotional video.",
    visual: <OptionsStepVisual />,
  },
  {
    title: "Generate With AI",
    description:
      "Vigyapix uses AI to create a product advertisement image or promotional video based on your inputs.",
    visual: <GenerateStepVisual />,
  },
  {
    title: "Preview and Download",
    description:
      "Review your generated content, explore your creation history, preview individual items, and download the results.",
    visual: <ResultStepVisual />,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-20 sm:py-24">
      <div className={CONTAINER}>
        <SectionHeading
          eyebrow="How It Works"
          title="From Product Photo to Ad in a Few Simple Steps"
          description="Start with the product you want to promote, customize your creative direction, and let AI help create your advertising visuals."
        />

        <ol className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connector line behind the number badges (desktop only) */}
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-5 hidden h-px bg-border lg:block"
          />

          {STEPS.map((step, index) => (
            <li key={step.title} className="relative flex flex-col">
              <span
                className={cn(
                  "relative z-10 grid size-10 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-sm ring-4 ring-background lg:mx-auto"
                )}
              >
                {index + 1}
              </span>
              <div className="mt-4 flex flex-1 flex-col rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm">
                <h3 className="text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
                <div className="mt-5 flex-1 content-end">{step.visual}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}