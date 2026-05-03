import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import PWARegister from "@/components/PWARegister";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["400", "700"],
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sentinel India 2026",
  description: "A neutral, technology-driven ecosystem for the Indian electorate.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <PWARegister />
        {children}
      </body>
    </html>
  );
}
