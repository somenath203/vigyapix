# Vigyapix – AI Product Ads Generator

[![Vigyapix Project Demo](/readme_images/readmethumbnailimage.png)](https://www.youtube.com/watch?v=_xpTmo3qh0s)

**Create eye-catching product advertisements with the power of AI.**

Click the thumbnail above to watch the Vigyapix project demo on YouTube and see how the application works.

## Contents

- [Introduction](#introduction)
- [For Whom Is This Project?](#for-whom-is-this-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Flow Diagram](#project-flow-diagram)
- [Running the Project Locally](#running-the-project-locally)
- [Disclaimer](#disclaimer)

## Introduction

Vigyapix is an AI-powered product advertising application that helps users create product images and promotional videos using artificial intelligence.

Users can provide product details and upload images to generate product advertisements. The application also allows users to create product images featuring an avatar, making it easier to create different types of promotional content.

Vigyapix includes user authentication and a creation history feature, allowing users to access their previously generated content, preview their images and videos, and download their creations.

The main goal of this project is to make product advertisement creation easier by combining AI-powered content generation with a simple and user-friendly interface.

## For Whom Is This Project?

Vigyapix is designed for people who want to create product advertisements without needing advanced graphic design or video editing skills.

It can be useful for:

- **Small business owners:** Create product advertisements for their products.
- **Online sellers:** Generate promotional images and videos for online stores.
- **Content creators:** Create visual content for social media and other platforms.
- **Marketing professionals:** Explore AI-generated visuals for product promotion.
- **Entrepreneurs and startups:** Create product advertising content for their businesses.

## Features

- **User Authentication:** Sign in securely using Firebase Authentication.
- **AI Product Image Generation:** Generate product advertisement images using OpenAI.
- **AI Product Video Generation:** Generate promotional product videos using Replicate.
- **Product Images with Avatars:** Generate product images featuring an avatar alongside the product.
- **AI-Powered Prompt Generation:** Use OpenAI to generate prompts for product image and video generation.
- **Image and Video Storage:** Store uploaded and generated images and videos using ImageKit.
- **Creation History:** View previously generated product images, product videos, and product images with avatars.
- **Image and Video Preview:** Preview generated images and videos directly from the dashboard.
- **Download Generated Content:** Download generated images and videos.
- **Responsive User Interface:** Use the application on different screen sizes.

## Tech Stack

The following technologies and services were used to build Vigyapix.

| Technology   | Purpose                                                        |
| ------------ | -------------------------------------------------------------- |
| Next.js      | React framework used to build the application.                 |
| Tailwind CSS | Styling the application with utility classes.                  |
| shadcn/ui    | Building reusable and accessible UI components.                |
| Firebase     | User authentication and storing application data in Firestore. |
| ImageKit     | Storing uploaded and generated images and videos.              |
| OpenAI       | Generating prompts and product advertisement images.           |
| Replicate    | Generating product promotional videos using an AI video model. |
| Axios        | Making HTTP requests to external APIs.                         |
| Lucide React | Providing icons for the user interface.                        |
| UUID         | Generating unique identifiers where needed.                    |
| Sonner       | Displaying toast notifications to provide feedback to users.   |

## Project Flow Diagram

```text
                         |----------------------|
                         |       Vigyapix       |
                         |----------------------|
                                    |
                                    |
                         |----------------------|
                         |   User Authentication|
                         |----------------------|
                                    |
                                    |
                         |----------------------|
                         |      Dashboard       |
                         |----------------------|
                                    |
                                    |
              |---------------------|---------------------|
              |                     |                     |
              |                     |                     |
   |-------------------|  |-------------------|  |-------------------|
   | Product Image     |  | Product Video     |  | Product Image     |
   | Generation        |  | Generation        |  | with Avatar       |
   |-------------------|  |-------------------|  |-------------------|
              |                     |                     |
              |                     |                     |
   |-------------------|  |-------------------|  |-------------------|
   | OpenAI            |  | OpenAI            |  | OpenAI            |
   | Prompt Generation |  | Prompt Generation |  | Prompt Generation |
   |-------------------|  |-------------------|  |-------------------|
              |                     |                     |
              |                     |                     |
   |-------------------|  |-------------------|  |-------------------|
   | OpenAI Image      |  | Replicate Video   |  | OpenAI Image      |
   | Generation        |  | Generation        |  | Generation        |
   |-------------------|  |-------------------|  |-------------------|
              |                     |                     |
              |                     |                     |
              |---------------------|---------------------|
                                    |
                                    |
                         |----------------------|
                         |   ImageKit Storage   |
                         |----------------------|
                                    |
                                    |
                         |----------------------|
                         |    Firestore        |
                         |  Save Creation Data  |
                         |----------------------|
                                    |
                                    |
                         |----------------------|
                         | Creation History     |
                         |----------------------|
                                    |
                                    |
                         |----------------------|
                         | Preview and Download |
                         |----------------------|
```

## Running the Project Locally

Follow these steps to run Vigyapix on your local machine.

### 1. Clone the Repository

Open your terminal and run the following command to clone the Vigyapix repository:

```bash
git clone https://github.com/somenath203/vigyapix.git
```

### 2. Navigate to the Project Directory

Move into the project folder:

```bash
cd vigyapix
```

### 3. Install Dependencies

Run the following command to install all the necessary packages:

```bash
pnpm install
```

### 4. Configure Environment Variables

Before running the application, you need to obtain the required credentials from Firebase, ImageKit, OpenAI, and Replicate.

Check the `.env.example` file in the project repository to see the required environment variables.

Create a `.env.local` file in the root directory of the project and add the following variables with your own credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTHDOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key

OPENAI_API_KEY=your_openai_api_key
REPLICATE_API_KEY=your_replicate_api_key
```

Replace the placeholder values with your actual credentials. Make sure the variable names match those used in `.env.example` and the application code.

### 5. Start the Development Server

Run the following command to start the application:

```bash
pnpm dev
```

Once the development server starts, open [http://localhost:3000](http://localhost:3000) in your browser to access Vigyapix.

### Important Notes

- **OpenAI credits:** You must have sufficient available credits in your OpenAI account to generate product images and use the OpenAI-powered features.
- **Replicate credits:** You must have sufficient available credits in your Replicate account to generate product videos.
- **Firebase setup:** Make sure Firebase Authentication and Cloud Firestore are configured for your Firebase project.
- **ImageKit setup:** Make sure you have valid ImageKit credentials for storing and accessing images and videos.

## Disclaimer

Vigyapix uses third-party AI services to generate prompts, images, and videos. The results produced by these AI models may vary and may not always match the user's expectations.

The creator of Vigyapix is not responsible for any inappropriate, misleading, or unintended prompts, images, or videos generated through the application. The behavior and output of the underlying AI models are beyond the creator's direct control.

Users should review the generated content and ensure that its use complies with applicable laws, third-party service policies, and relevant content guidelines.
