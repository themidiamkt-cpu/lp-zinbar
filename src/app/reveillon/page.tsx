import {
  ReveillonHero,
  EventHighlights,
  HowItWorks,
  EventInfo,
  ReveillonFAQ,
  ReveillonCTA,
} from "@/components/reveillon/event-sections";
import { TableExperience } from "@/components/reveillon/table-experience";

export default function ReveillonPage() {
  return (
    <main id="conteudo">
      <ReveillonHero />
      <EventHighlights />
      <HowItWorks />
      <TableExperience />
      <EventInfo />
      <ReveillonFAQ />
      <ReveillonCTA />
    </main>
  );
}
