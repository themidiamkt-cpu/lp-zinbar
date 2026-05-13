import { FloatingActions } from "@/components/floating-actions";
import { FinalCtaSection } from "@/sections/final-cta-section";
import { FooterSection } from "@/sections/footer-section";
import { GallerySection } from "@/sections/gallery-section";
import { HeaderSection } from "@/sections/header-section";
import { HeroSection } from "@/sections/hero-section";
import { HighlightsSection } from "@/sections/highlights-section";
import { HoursSection } from "@/sections/hours-section";
import { IdealForSection } from "@/sections/ideal-for-section";
import { LocationSection } from "@/sections/location-section";
import { FaqSection } from "@/sections/faq-section";
import { ReservationSection } from "@/sections/reservation-section";
import { SocialProofSection } from "@/sections/social-proof-section";
import { DifferentialsSection } from "@/sections/differentials-section";
import { landingData } from "@/data/landing-data";
import { buildFaqSchema, buildRestaurantSchema, buildEventSchema } from "@/utils/seo";

export default function Home() {
  const restaurantSchema = buildRestaurantSchema(landingData);
  const faqSchema = buildFaqSchema(landingData);
  const eventSchema = buildEventSchema(landingData);

  return (
    <>
      {/* Restaurant + WebSite + WebPage — base do Knowledge Panel e GEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      {/* FAQ — rich result e fonte primária para AI Overviews em perguntas diretas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Event — associa happy hour ao local para buscas de eventos */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      <div className="relative overflow-x-hidden bg-ink text-ivory">
        <HeaderSection />

        <main>
          <HeroSection />
          <HighlightsSection />
          <LocationSection />
          <DifferentialsSection />
          <GallerySection />
          <IdealForSection />
          <SocialProofSection />
          <ReservationSection />
          <HoursSection />
          <FaqSection />
          <FinalCtaSection />
        </main>

        <FooterSection />
        <FloatingActions />
      </div>
    </>
  );
}
