import { Container } from "@/components/container";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { landingData } from "@/data/landing-data";

const { highlights } = landingData;

export function HighlightsSection() {
  return (
    <section className="relative py-20 sm:py-24" id="destaques">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={highlights.eyebrow}
            title={highlights.title}
            description={highlights.description}
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <article className="premium-panel card-hover relative h-full overflow-hidden p-7">
                <span className="index-pill" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-champagne/22 bg-[linear-gradient(140deg,rgba(215,192,151,0.18),rgba(123,24,42,0.18))] text-champagne shadow-soft">
                  <Icon name={item.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-6 max-w-[18ch] font-serif text-2xl leading-tight text-ivory">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-mist/76">{item.description}</p>
                <div
                  className="pointer-events-none absolute inset-x-7 bottom-5 h-px bg-gradient-to-r from-champagne/0 via-champagne/30 to-champagne/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
