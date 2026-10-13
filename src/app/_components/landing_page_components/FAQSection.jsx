import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CONTAINER } from "@/lib/landing-config";
import { SectionHeading } from "./Shared";

const FAQS = [
  {
    question: "What is Vigyapix?",
    answer:
      "Vigyapix is an AI-powered product advertising tool that helps you create product advertisement images, avatar-powered product visuals, and promotional videos from product imagery.",
  },
  {
    question: "What types of content can I generate?",
    answer:
      "You can generate AI-enhanced product advertisement images, product advertisements featuring a selected avatar, and promotional videos created from product imagery.",
  },
  {
    question: "Do I need design experience to use Vigyapix?",
    answer:
      "No advanced design skills are required. You provide the product image and relevant details, select the available options for your chosen workflow, and let AI help create the advertisement.",
  },
  {
    question: "Can I create advertisements featuring a person?",
    answer:
      "Yes. Vigyapix includes an avatar-based image-generation workflow that combines a selected avatar with your product in a commercial advertisement composition.",
  },
  {
    question: "Can I generate videos from product images?",
    answer:
      "Yes. Vigyapix supports AI-assisted promotional video generation using product imagery and prompts tailored to the product.",
  },
  {
    question: "Can I preview and download my creations?",
    answer:
      "Yes. Your creation history organizes generated product images, avatar-based advertisements, and product videos into separate sections. You can preview and download individual items.",
  },
  {
    question: "Where can I find my previously generated content?",
    answer:
      "Open the application's creation history to browse your generated product images, product videos, and avatar-based advertisements in their respective tabs.",
  },
  {
    question:
      "Does Vigyapix guarantee that every generated image will perfectly preserve the product?",
    answer:
      "Vigyapix is designed to generate visuals that closely follow the provided product reference and description. However, AI-generated content can contain inaccuracies, so review the output carefully before using it in an advertisement.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-border bg-muted/40 py-20 sm:py-24">
      <div className={CONTAINER}>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="FAQs"
              title="Frequently Asked Questions"
              description="Everything you need to know before creating your first product advertisement."
            />
          </div>

          {/* Radix-style API (shadcn default). See the note in the README
              if your project's Accordion is Base UI based. */}
          <Accordion type="single" className="w-full">
            {FAQS.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}