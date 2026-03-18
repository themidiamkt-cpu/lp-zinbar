import { FloatingActions } from "@/components/floating-actions";
import { FinalCtaSection } from "@/sections/final-cta-section";
import { FooterSection } from "@/sections/footer-section";
import { GallerySection } from "@/sections/gallery-section";
import { HeaderSection } from "@/sections/header-section";
import { HeroSection } from "@/sections/hero-section";
import { HoursSection } from "@/sections/hours-section";
import { IdealForSection } from "@/sections/ideal-for-section";
import { LocationSection } from "@/sections/location-section";
import { FeaturedMenuSection } from "@/sections/menu-section";
import { FaqSection } from "@/sections/faq-section";
import { ReservationSection } from "@/sections/reservation-section";
import { SocialProofSection } from "@/sections/social-proof-section";
import { DifferentialsSection } from "@/sections/differentials-section";
import { landingData } from "@/data/landing-data";
import { buildFaqSchema, buildRestaurantSchema } from "@/utils/seo";

export default function Home() {
  const restaurantSchema = buildRestaurantSchema(landingData);
  const faqSchema = buildFaqSchema(landingData);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="relative overflow-x-hidden bg-ink text-ivory">
        <HeaderSection />

        <main>
          <HeroSection />
          <LocationSection />
          <DifferentialsSection />
          <GallerySection />
          <IdealForSection />
          <FeaturedMenuSection />
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

