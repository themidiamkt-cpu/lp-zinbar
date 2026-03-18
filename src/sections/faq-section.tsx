import { AccordionItem } from "@/components/accordion";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { landingData } from "@/data/landing-data";

const { faq } = landingData;

export function FaqSection() {
  return (
    <section className="py-20 sm:py-24" id="faq">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={faq.eyebrow}
            title={faq.title}
            description={faq.description}
            align="center"
          />
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {faq.items.map((item, index) => (
            <Reveal key={item.question} delay={index * 60}>
              <AccordionItem question={item.question} answer={item.answer} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

