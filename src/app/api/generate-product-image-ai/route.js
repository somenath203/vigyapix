import { NextResponse } from "next/server";


export async function POST(req) {

  try {

    const { productInputImageUrlFromImageKit, productInputDescription, productInputImageSize } = await req.json();

    console.log("Product Image Input URL: ", productInputImageUrlFromImageKit);
    
    console.log("Product Image Input description: ", productInputDescription);

    console.log("Product Image Input Size: ", productInputImageSize);

    return NextResponse.json(
      {
        success: true,
        message: 'all data received successfully via api endpoint'
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
