import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shadowstack.sh"),
  title: {
    default: "ShadowStack — Joensuu's clan of AI natives",
    template: "%s · ShadowStack",
  },
  description:
    "ShadowStack is Joensuu's clan of AI natives — a community of builders shipping real products in real time through coding jams, nano-hacks, and events.",
  keywords: [
    "ShadowStack",
    "Joensuu",
    "AI",
    "vibe coding",
    "coding jams",
    "startups",
    "North Karelia",
  ],
  openGraph: {
    title: "ShadowStack — Joensuu's clan of AI natives",
    description:
      "A community of builders shipping real products in real time. Coding jams, nano-hacks, and events for AI-native founders in Eastern Finland.",
    type: "website",
    locale: "en",
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
      className={`dark ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
