import { Geist, Geist_Mono } from "next/font/google";

import { AuthProvider } from "@/components/AuthProvider";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "Vigyapix",
  description:
    "Turn product images into scroll-stopping image and video ads with AI. Upload a photo, add a prompt, and get ready-to-share ads in minutes.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>

        <AuthProvider>
          {children}
        </AuthProvider>

      </body>
      
    </html>
  );
}
