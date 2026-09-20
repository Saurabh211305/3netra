import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";
import "./globals.css";

const displayFont = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.3netra.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "3NETRA | Intelligent Security & Surveillance Solutions",
  description:
    "3NETRA helps homes, businesses and institutions identify security gaps and deploy intelligent CCTV, surveillance, access control and ongoing security solutions.",
  keywords: [
    "CCTV",
    "security solutions",
    "AI surveillance",
    "security camera installation",
    "commercial security",
    "industrial security",
    "access control",
    "AMC",
    "security audit",
    "surveillance systems",
  ],
  openGraph: {
    title: "3NETRA | Intelligent Security & Surveillance Solutions",
    description:
      "You don't need more cameras. You need fewer blind spots. 3NETRA identifies security gaps and deploys the right technology.",
    url: siteUrl,
    siteName: "3NETRA",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "3NETRA | Intelligent Security & Surveillance Solutions",
    description: "You don't need more cameras. You need fewer blind spots.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        {children}
        <AnalyticsScripts />
      </body>
    </html>
  );
}
