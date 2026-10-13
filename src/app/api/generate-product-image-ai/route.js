import { NextResponse } from "next/server";

import { openAIClient } from "@/lib/openAIConfig";


const PROMPT_TO_GENERATE_IMAGE = `
Create a vibrant, professional product advertisement image using the uploaded product image as the primary visual reference.

**Product description provided by the user:**
{{PRODUCT_DESCRIPTION}}

**Requested image size:**
{{IMAGE_SIZE}}

Analyze the product description to understand the product's identity, purpose, target audience, visual style, and the environment or creative elements that would naturally complement it.

**Product fidelity:**
Keep the product clearly recognizable and visually faithful to the uploaded reference image. Preserve its original shape, proportions, colors, materials, branding, labels, packaging, and distinctive details. Do not invent product features, change its design, distort its appearance, or introduce misleading details. Make the product the main focal point, prominently positioned, sharp, and clearly visible.

**Composition and image size:**
Create the advertisement according to the requested image size and aspect ratio specified above. Adapt the composition, product placement, spacing, camera angle, and visual balance to suit the requested format. Avoid awkward cropping or cutting off important product details.

**Creative direction:**
Design an attractive, colorful background that complements the product and enhances its visual appeal without distracting from it. Incorporate relevant materials, textures, splashes, particles, or floating elements only when they naturally suit the product and its description. For example, fresh fruit may be accompanied by water droplets and fruit slices, skincare products by subtle liquid textures and botanical elements, and furniture by an elegant interior setting. Choose creative elements that enhance the product's identity rather than applying generic effects to every image.

**Visual quality:**
Use professional commercial product photography, high-quality lighting, realistic shadows, convincing textures, appropriate depth of field, refined color grading, and a balanced composition. Ensure the result looks polished, visually coherent, and suitable for a premium product marketing campaign.

The final image must prominently feature the original product while combining realistic product representation with creative, professional advertising aesthetics.

Return ONLY valid JSON in exactly this format:

{
"textToImage": "Complete image-generation prompt goes here"
}

The value of "textToImage" must contain a complete, standalone prompt for generating the product advertisement image. Incorporate the supplied product description, requested image size, product-specific creative direction, composition, and visual-quality requirements.

Return one valid JSON object with a single string property named "textToImage". Escape any quotation marks or special characters required for valid JSON. Do not include Markdown, code fences, explanations, or additional text outside the JSON.
`;



export async function POST(req) {

  try {

    const {
      productInputImageUrlFromImageKit,
      productInputDescription,
      productInputImageSize,
    } = await req.json();

    // generating product-image-creation prompt and image-to-video-creation prompt using openai
    const promptResFromOpenAI = await openAIClient.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: PROMPT_TO_GENERATE_IMAGE.replace("{{PRODUCT_DESCRIPTION}}", productInputDescription).replace("{{IMAGE_SIZE}}", productInputImageSize),
            },
            {
              type: "input_image",
              image_url: productInputImageUrlFromImageKit,
            },
          ],
        },
      ],
    });


    const promptOutputFromOpenAI = promptResFromOpenAI?.output_text?.trim();

    const promptOutputFromOpenAIParsed = JSON.parse(promptOutputFromOpenAI);


    // generate actual product image using AI
    const generateProductImage = await openAIClient.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: promptOutputFromOpenAIParsed?.textToImage,
            },
            {
              type: "input_image",
              image_url: productInputImageUrlFromImageKit,
            },
          ],
        },
      ],
      tools: [
        {
          type: "image_generation",
        },
      ],
    });

    const generatedImageData = generateProductImage?.output
      ?.filter((item) => item?.type === "image_generation_call")
      ?.map((item) => item?.result);

    const generatedImg = generatedImageData[0];

    return NextResponse.json(
      {
        success: true,
        message: "product image generated successfully",
        generatedImg: generatedImg,
      },
      { status: 200 },
    );
    
  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while generating product image.",
      },
      { status: 500 },
    );

  }
  
}
