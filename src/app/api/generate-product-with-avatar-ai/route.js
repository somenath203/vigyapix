import { NextResponse } from "next/server";

import { openAIClient } from "@/lib/openAIConfig";


const PROMPT_TO_GENERATE_IMAGE = `
Create a vibrant, professional product advertisement image using the uploaded product image as the primary product reference and the uploaded avatar image as the human subject reference.

**Product description provided by the user:**
{{PRODUCT_DESCRIPTION}}

**Requested image size:**
{{IMAGE_SIZE}}

Analyze the product description to understand the product's identity, purpose, target audience, visual style, and the environment or creative elements that would naturally complement it. Also, analyze the uploaded avatar image to understand the person's appearance, clothing, pose, and overall visual characteristics.

**Product fidelity:**
Keep the product clearly recognizable and visually faithful to the uploaded product reference image. Preserve its original shape, proportions, colors, materials, branding, labels, packaging, and distinctive details. Do not invent product features, change its design, distort its appearance, or introduce misleading details. Make the product prominent, sharp, and clearly visible.

**Avatar fidelity:**
Use the person in the uploaded avatar image as the human subject in the advertisement. Preserve their recognizable facial features, hairstyle, skin tone, and overall appearance as closely as possible to the reference image. Do not replace the person with a different individual or unnecessarily alter their identity or defining characteristics. Maintain realistic facial details, natural body proportions, and anatomically correct hands and fingers.

**Product and avatar interaction:**
Integrate the avatar and product naturally into a cohesive commercial advertisement. Choose an appropriate pose and interaction based on the product's purpose and the user's product description. For example, the person may hold the product, demonstrate how it is used, present it toward the camera, or pose beside it, depending on what is most suitable. Ensure that the interaction looks physically plausible and that the person's hands, when interacting with the product, are positioned naturally. Keep the product clearly visible and avoid allowing the person to obscure important product details, branding, or labels. The person should complement the product rather than overpower it.

**Composition and image size:**
Create the advertisement according to the requested image size and aspect ratio specified above. Adapt the placement, scale, pose, camera angle, spacing, and visual balance of both the avatar and product to suit the requested format. Ensure that both the person and product are appropriately framed, with no awkward cropping or cutting off important details. Maintain a clear visual hierarchy in which the product remains the primary advertising focus while the avatar adds a relatable human element.

**Creative direction:**
Design an attractive, colorful background that complements the product, the avatar, and the intended advertising style without distracting from the main subjects. Incorporate relevant materials, textures, splashes, particles, or floating elements only when they naturally suit the product and its description. For example, fresh fruit may be accompanied by water droplets and fruit slices, skincare products by subtle liquid textures and botanical elements, and furniture by an elegant interior setting. Choose creative elements that enhance the product's identity rather than applying generic effects to every image.

**Visual quality:**
Use professional commercial photography, high-quality lighting, realistic shadows, convincing textures, appropriate depth of field, refined color grading, and a balanced composition. Ensure that the lighting on the avatar and product feels consistent with the same environment. Maintain realistic skin texture, natural facial expressions, convincing contact between the person and product, and coherent perspective. The final result should look polished, visually consistent, and suitable for a premium product marketing campaign.

**Final requirements:**
The final image must prominently feature the original product and the person from the uploaded avatar image. Preserve the product's distinctive characteristics and the avatar's recognizable appearance while combining them naturally in a visually appealing, professional advertisement. Avoid unnecessary additional people, duplicated products, distorted facial features, unnatural poses, malformed hands, misleading product details, and distracting visual elements.

Return ONLY valid JSON in exactly this format:

{
"textToImage": "Complete image-generation prompt goes here"
}

The value of "textToImage" must contain a complete, standalone prompt for generating the product advertisement image. Incorporate the supplied product description, requested image size, product-specific creative direction, avatar appearance, product-avatar interaction, composition, and visual-quality requirements.

Return one valid JSON object with a single string property named "textToImage". Escape any quotation marks or special characters required for valid JSON. Do not include Markdown, code fences, explanations, or additional text outside the JSON.
`;


export async function POST(req) {

  try {

    const {
      productInputImageUrlFromImageKit,
      productInputDescription,
      productInputImageSize,
      avatarImageUrl,
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
            {
              type: "input_image",
              image_url: avatarImageUrl,
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
            {
              type: "input_image",
              image_url: avatarImageUrl,
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
