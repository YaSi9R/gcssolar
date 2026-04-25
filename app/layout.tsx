import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GCS Group Solar | Leading Solar Solutions Provider",
  description: "Innovative solar energy solutions for residential, commercial, and industrial needs. Join the green revolution with GCS Group Solar.",
  keywords: "solar panel, solar energy, solar installation, GCS Group Solar, Gurgaon solar, renewable energy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-body">
        {children}
      </body>
    </html>
  );
}
