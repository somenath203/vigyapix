import { NextResponse } from "next/server";

import { openAIClient } from "@/lib/openAIConfig";


const PROMPT_TO_GENERATE_IMAGE = `
Create a vibrant, professional product showcase image using the uploaded product image as the primary reference.

Product description provided by the user:
{{PRODUCT_DESCRIPTION}}

Requested image size:
{{IMAGE_SIZE}}

Use the product description to understand the product, its purpose, target audience, visual identity, and the type of environment or creative elements that would naturally complement it.

Keep the product clearly recognizable and visually faithful to the uploaded image, preserving its shape, proportions, colors, branding, packaging, and important details. Place the product prominently in the center of the composition, sharp and in focus.

Create the image according to the requested image size: {{IMAGE_SIZE}}. Ensure the composition, product placement, spacing, and visual balance are appropriate for this aspect ratio.

Surround the product with dynamic splashes, particles, or materials that are visually relevant to the product and its description. Choose elements that naturally complement the product rather than using generic effects. Add a clean, colorful, visually appealing background that enhances the product without distracting from it.

Include subtle floating elements related to the product, its purpose, or its theme to add context, depth, and visual interest. Use professional commercial product photography, cinematic lighting, realistic shadows, depth of field, balanced composition, and high visual detail.

The final image should look like a premium advertisement suitable for a modern product marketing campaign.

Also generate a corresponding image-to-video prompt describing how the generated product image should be animated into a short, dynamic product advertisement. Include realistic camera movement, product-focused motion, environmental movement, and subtle effects while keeping the product stable, recognizable, and visually consistent.

Return ONLY valid JSON in exactly this format:

{
  "textToImage": "",
  "imageToVideo": ""
}

The "textToImage" value should contain the complete prompt for generating the product advertisement image, incorporating the product description and requested image size.

The "imageToVideo" value should contain the complete prompt for animating the generated product advertisement into a short product video.

Do not include Markdown, code fences, explanations, or any additional text outside the JSON.
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
        generatedImg: generatedImg
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
