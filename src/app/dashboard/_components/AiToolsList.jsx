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
      
      <h2 className="font-bold text-2xl mb-2">Create with AI</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

        {allAITools.map((aiTool) => (

            <div key={aiTool.id} className="p-7 bg-secondary rounded-2xl">

                <h2 className="font-bold text-2xl">{aiTool.name}</h2>

                <p className="opacity-60 mt-2">{aiTool.description}</p>

                <Link href={aiTool.pathToNavigate}>

                    <Button className="mt-4 hover:cursor-pointer">Create Now</Button>

                </Link>

            </div>

        ))}

      </div>

    </div>
  )
}

export default AiToolsList;
