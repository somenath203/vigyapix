import { Button } from "@/components/ui/button";
import Link from "next/link";

const allAITools = [
  {
    id: 1,
    name: "AI Product Images",
    description:
      "Generate high-quality, professional product images with AI in seconds.",
    pathToNavigate: "/creative-ai-tools/product-images",
  },
  {
    id: 2,
    name: "AI Product Videos",
    description:
      "Create engaging product showcase videos with AI to bring your products to life.",
    pathToNavigate: "/creative-ai-tools/product-videos",
  },
  {
    id: 3,
    name: "AI Product Avatars",
    description:
      "Create engaging product presentations featuring realistic AI avatars.",
    pathToNavigate: "/creative-ai-tools/product-images-with-avatar",
  },
];

const AiToolsList = () => {
  return (
    <div>

      <h2 className="mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">Create with AI</h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

        {allAITools.map((aiTool) => (

            <div
              key={aiTool.id}
              className="flex flex-col rounded-2xl border border-border border-t-4 border-t-primary/70 bg-card p-6 text-card-foreground shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-t-primary hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7"
            >

                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{aiTool.name}</h2>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{aiTool.description}</p>

                <Link href={aiTool.pathToNavigate} className="mt-auto pt-6">

                    <Button className="w-full hover:cursor-pointer sm:w-auto">Create Now</Button>

                </Link>

            </div>

        ))}

      </div>

    </div>
  )
}

export default AiToolsList;