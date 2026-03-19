import type { ReactNode } from "react";
import type { Metadata } from "next";

import "./globals.css";

import { landingData } from "@/data/landing-data";

export const metadata: Metadata = {
  title: landingData.seo.title,
  description: landingData.seo.description,
  keywords: landingData.seo.keywords,
  applicationName: landingData.business.name,
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  category: "restaurant",
  openGraph: {
    title: landingData.seo.title,
    description: landingData.seo.description,
    images: ["/images/logo.png"],
    locale: "pt_BR",
    siteName: landingData.business.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: landingData.seo.title,
    description: landingData.seo.description,
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
