import { Container } from "@/components/container";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { landingData } from "@/data/landing-data";

const { idealFor } = landingData;

export function IdealForSection() {
  return (
    <section className="py-20 sm:py-24" id="ideal-para">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={idealFor.eyebrow}
            title={idealFor.title}
            description={idealFor.description}
            align="center"
          />
        </Reveal>

        <div className="pretty-scroll mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 sm:grid sm:grid-cols-2 sm:overflow-visible md:grid-cols-3 xl:grid-cols-5">
          {idealFor.items.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 70}
              className="min-w-[260px] snap-start sm:min-w-0"
            >
              <article className="premium-panel card-hover relative h-full overflow-hidden p-6 text-left">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-champagne/20 bg-champagne/10 text-champagne">
                  <Icon name={item.icon} />
                </div>
                <h3 className="mt-5 font-serif text-lg leading-tight text-ivory">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-mist/76">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
