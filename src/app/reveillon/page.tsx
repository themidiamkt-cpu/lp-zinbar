import {
  ReveillonHero,
  EventHighlights,
  HowItWorks,
  EventInfo,
  ReveillonFAQ,
  ReveillonCTA,
} from "@/components/reveillon/event-sections";
import { VenueOverview } from "@/components/reveillon/venue-overview";

export default function ReveillonPage() {
  return (
    <main id="conteudo">
      <ReveillonHero />
      <EventHighlights />
      <HowItWorks />
      <VenueOverview />
      <EventInfo />
      <ReveillonFAQ />
      <ReveillonCTA />
    </main>
  );
}
