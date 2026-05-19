import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import LenisProvider from "@/components/providers/LenisProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AIStudio — AI Product Photography Platform",
    template: "%s | AIStudio",
  },
  description:
    "Transform your product photos with AI-powered professional studio lighting, cinematic backgrounds, and commercial-grade aesthetics. Generate stunning product photography in seconds.",
  keywords: [
    "AI product photography",
    "product image generation",
    "AI studio",
    "commercial photography",
    "product photos",
    "AI image generation",
  ],
  authors: [{ name: "AIStudio" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AIStudio",
    title: "AIStudio — AI Product Photography Platform",
    description:
      "Transform your product photos with AI-powered professional studio lighting, cinematic backgrounds, and commercial-grade aesthetics.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIStudio — AI Product Photography Platform",
    description:
      "Transform your product photos with AI-powered professional studio lighting, cinematic backgrounds, and commercial-grade aesthetics.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LenisProvider>
          {children}
        </LenisProvider>
        <Toaster
          position="top-right"
          richColors
          theme="dark"
          toastOptions={{
            style: {
              background: "#1E1E24",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#FAFAFA",
            },
          }}
        />
      </body>
    </html>
  );
}
