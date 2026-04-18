import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DETOFUN HOLIDAYS | Cinematic Tourism Website",
  description: "Experience culture, history, nature, and adventure in Nigeria like never before.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${cormorant.variable} ${outfit.variable} h-full antialiased overflow-x-clip`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col font-body bg-[var(--color-background)] text-[var(--color-foreground)] overflow-x-clip selection:bg-amber-700/50 selection:text-white">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
