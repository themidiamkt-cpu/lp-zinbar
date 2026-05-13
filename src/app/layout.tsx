import type { ReactNode } from "react";
import type { Metadata } from "next";

import "./globals.css";

import { landingData } from "@/data/landing-data";

const { business, seo } = landingData;

export const metadata: Metadata = {
  // ── Base URL para resolver caminhos relativos em OG/Twitter ────────────────
  metadataBase: new URL(business.siteUrl),

  // ── Identidade da página ───────────────────────────────────────────────────
  title: {
    default: seo.title,
    template: `%s | ${business.name}`,
  },
  description: seo.description,
  keywords: seo.keywords,
  applicationName: business.name,
  category: "restaurant",

  // ── Canonical e alternates ─────────────────────────────────────────────────
  // Evita conteúdo duplicado e consolida sinal de link
  alternates: {
    canonical: business.siteUrl,
    languages: { "pt-BR": business.siteUrl },
  },

  // ── Robots ─────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large", // preview grande favorece AI Overviews
      "max-snippet": -1,            // sem limite de trecho — favorece citações GEO
      "max-video-preview": -1,
    },
  },

  // ── Open Graph ─────────────────────────────────────────────────────────────
  // Usado por Facebook, WhatsApp, LinkedIn e crawlers de IA
  openGraph: {
    type: "website",
    url: business.siteUrl,
    siteName: business.name,
    locale: "pt_BR",
    title: seo.title,
    description: seo.description,
    images: [
      {
        url: "/images/real/ambiente-casa-cheia.jpg",
        width: 1200,
        height: 630,
        alt: `Ambiente do ${business.name} no ${business.neighborhood}, ${business.city}`,
        type: "image/jpeg",
      },
    ],
  },

  // ── Twitter / X ────────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: ["/images/real/ambiente-casa-cheia.jpg"],
  },

  // ── Ícones ─────────────────────────────────────────────────────────────────
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },

  // ── Geo meta tags ──────────────────────────────────────────────────────────
  // Sinais de localização para Bing, Yahoo e mecanismos de IA locais
  other: {
    "geo.region": `BR-${business.state}`,
    "geo.placename": `${business.neighborhood}, ${business.city}, ${business.state}`,
    "geo.position": `${business.geo.latitude};${business.geo.longitude}`,
    ICBM: `${business.geo.latitude}, ${business.geo.longitude}`,
    // NAP estruturado para crawlers de IA (consistência Nome-Endereço-Telefone)
    "business:contact_data:street_address": business.addressLine,
    "business:contact_data:locality": business.city,
    "business:contact_data:region": business.state,
    "business:contact_data:country_name": "Brasil",
    "business:contact_data:phone_number": business.telephone,
    "business:contact_data:website": business.siteUrl,
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
