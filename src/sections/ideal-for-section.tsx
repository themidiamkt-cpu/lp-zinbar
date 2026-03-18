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
          />
        </Reveal>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 xl:grid-cols-5 xl:overflow-visible">
          {idealFor.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 70} className="min-w-[272px] md:min-w-0">
              <div className="premium-panel h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-champagne/18">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-champagne">
                  <Icon name={item.icon} />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-ivory">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-mist/76">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

