import type { DayKey, LandingData } from "@/data/landing-data";

const schemaDayMap: Record<DayKey, string> = {
  monday: "https://schema.org/Monday",
  tuesday: "https://schema.org/Tuesday",
  wednesday: "https://schema.org/Wednesday",
  thursday: "https://schema.org/Thursday",
  friday: "https://schema.org/Friday",
  saturday: "https://schema.org/Saturday",
  sunday: "https://schema.org/Sunday",
};

// ─── Restaurant (LocalBusiness) ───────────────────────────────────────────────
// Cobre: Google Knowledge Panel, Google Maps, AI Overviews, Perplexity, Bing Places
export function buildRestaurantSchema(data: LandingData) {
  const { business, actions, footer, schedule, seo } = data;

  const menuUrl = actions.menu.href.startsWith("http") ? actions.menu.href : undefined;
  const sameAs = footer.socialLinks.map((l) => l.href).filter(Boolean);
  const canonicalUrl = business.siteUrl;

  return {
    "@context": "https://schema.org",
    "@graph": [
      // ── Entidade principal: Restaurant ──────────────────────────────────────
      {
        "@type": ["Restaurant", "BarOrPub", "LocalBusiness"],
        "@id": `${canonicalUrl}/#restaurant`,
        name: business.name,
        alternateName: business.label,
        description: seo.description,
        slogan: business.slogan,
        url: canonicalUrl,
        telephone: business.telephone,
        foundingDate: String(business.foundingYear),
        priceRange: "$$",
        servesCuisine: business.cuisine,
        acceptsReservations: "True",
        currenciesAccepted: "BRL",
        paymentAccepted: "Dinheiro, Cartão de Crédito, Cartão de Débito, Pix",
        ...(menuUrl ? { hasMenu: menuUrl } : {}),
        ...(sameAs.length ? { sameAs } : {}),

        // ── Localização ──────────────────────────────────────────────────────
        address: {
          "@type": "PostalAddress",
          streetAddress: business.addressLine,
          addressLocality: business.city,
          addressRegion: business.state,
          postalCode: business.postalCode,
          addressCountry: "BR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: business.geo.latitude,
          longitude: business.geo.longitude,
        },
        hasMap: business.maps.place,
        areaServed: [
          { "@type": "City", name: business.city },
          { "@type": "Neighborhood", name: business.neighborhood },
        ],
        keywords: seo.keywords.join(", "),

        // ── Avaliação agregada ────────────────────────────────────────────────
        // Campo crítico: AI Overviews do Google cita ratings diretamente
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          bestRating: "5",
          worstRating: "1",
          reviewCount: "1000",
          ratingCount: "1000",
        },

        // ── Imagens ──────────────────────────────────────────────────────────
        image: [
          {
            "@type": "ImageObject",
            url: `${canonicalUrl}/images/real/ambiente-casa-cheia.jpg`,
            name: `Ambiente do ${business.name}`,
          },
          {
            "@type": "ImageObject",
            url: `${canonicalUrl}/images/logo.png`,
            name: `Logo ${business.name}`,
          },
        ],
        logo: {
          "@type": "ImageObject",
          url: `${canonicalUrl}/images/logo.png`,
          name: `Logo ${business.name}`,
        },

        // ── Comodidades ───────────────────────────────────────────────────────
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "Estacionamento", value: true },
          { "@type": "LocationFeatureSpecification", name: "Kids Friendly", value: true },
          { "@type": "LocationFeatureSpecification", name: "Pet Friendly", value: true },
          { "@type": "LocationFeatureSpecification", name: "Reserva gratuita", value: true },
          { "@type": "LocationFeatureSpecification", name: "Música ao vivo", value: true },
          { "@type": "LocationFeatureSpecification", name: "Happy Hour", value: true },
          { "@type": "LocationFeatureSpecification", name: "Ar-condicionado", value: true },
        ],

        // ── Horários ─────────────────────────────────────────────────────────
        openingHoursSpecification: schedule.week.flatMap((day) =>
          day.periods.map((period) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: schemaDayMap[day.key],
            opens: period.opens,
            closes: period.closes,
          })),
        ),

        // ── Avaliações individuais (amostra para IA citar) ───────────────────
        review: data.socialProof.testimonials.map((t) => ({
          "@type": "Review",
          reviewBody: t.quote,
          author: { "@type": "Person", name: t.author },
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        })),
      },

      // ── WebSite ─────────────────────────────────────────────────────────────
      {
        "@type": "WebSite",
        "@id": `${canonicalUrl}/#website`,
        url: canonicalUrl,
        name: business.name,
        description: business.slogan,
        publisher: { "@id": `${canonicalUrl}/#restaurant` },
        inLanguage: "pt-BR",
      },

      // ── WebPage ─────────────────────────────────────────────────────────────
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}/#webpage`,
        url: canonicalUrl,
        name: seo.title,
        description: seo.description,
        isPartOf: { "@id": `${canonicalUrl}/#website` },
        about: { "@id": `${canonicalUrl}/#restaurant` },
        inLanguage: "pt-BR",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: canonicalUrl },
          ],
        },
      },
    ],
  };
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
// Aparece como rich result no Google; fonte primária para AI Overviews em perguntas diretas
export function buildFaqSchema(data: LandingData) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ─── Event (happy hour recorrente) ───────────────────────────────────────────
// GEO: motores de IA identificam eventos associados ao local
export function buildEventSchema(data: LandingData) {
  const { business } = data;
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `Happy Hour no ${business.label}`,
    description: `Happy hour com promoções de drinks, cervejas e porções no ${business.name}, no Taquaral, Campinas. Ambiente agradável para encerrar o dia com amigos.`,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: business.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: business.addressLine,
        addressLocality: business.city,
        addressRegion: business.state,
        postalCode: business.postalCode,
        addressCountry: "BR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: business.geo.latitude,
        longitude: business.geo.longitude,
      },
    },
    organizer: {
      "@type": "Organization",
      name: business.name,
      url: business.siteUrl,
      telephone: business.telephone,
    },
  };
}
