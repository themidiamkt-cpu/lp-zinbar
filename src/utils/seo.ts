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

export function buildRestaurantSchema(data: LandingData) {
  const menuUrl = data.actions.menu.href.startsWith("http") ? data.actions.menu.href : undefined;
  const sameAs = data.footer.socialLinks.map((item) => item.href).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: data.business.name,
    description: data.seo.description,
    servesCuisine: data.business.cuisine,
    priceRange: "$$",
    acceptsReservations: true,
    hasMap: data.business.maps.place,
    ...(menuUrl ? { menu: menuUrl } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: data.business.addressLine,
      addressLocality: data.business.city,
      addressRegion: data.business.state,
      addressCountry: "BR",
    },
    areaServed: {
      "@type": "City",
      name: data.business.city,
    },
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Kids friendly",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Pet friendly",
        value: true,
      },
    ],
    openingHoursSpecification: data.schedule.week.flatMap((day) =>
      day.periods.map((period) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: schemaDayMap[day.key],
        opens: period.opens,
        closes: period.closes,
      })),
    ),
  };
}

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

