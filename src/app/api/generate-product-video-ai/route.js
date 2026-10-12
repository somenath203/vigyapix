import { NextResponse } from "next/server";
import Replicate from "replicate";


const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});


export async function POST(req) {

  try {

    const { productInputImageUrlFromImageKit, productInputDescription } = await req?.json();

    const input = {
      image: productInputImageUrlFromImageKit,
      prompt: productInputDescription,
    };

    const videoOutputByAI = await replicate.run("wan-video/wan-2.2-i2v-fast", { input });

    // Convert the Replicate FileOutput into a Blob.
    const generatedVideoBlob = await videoOutputByAI.blob();

    return new Response(generatedVideoBlob, {
      status: 200,
      headers: {
        'Content-Type': 'video/mp4'
      }
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while generating product video.",
      },
      { status: 500 },
    );

  }

}
