import { siteTheme } from "@/assets/site-theme";
import { Container } from "@/components/container";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { landingData } from "@/data/landing-data";
import { cn } from "@/utils/cn";

const { differentials } = landingData;

export function DifferentialsSection() {
  return (
    <section className="relative py-20 sm:py-24" id="diferenciais">
      <div className={siteTheme.glows.gold} />
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={differentials.eyebrow}
            title={differentials.title}
            description={differentials.description}
          />
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {differentials.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <div
                className={cn(
                  "premium-panel h-full p-6",
                  siteTheme.cardHover,
                  index === 1 && "border-champagne/18 bg-white/[0.07]",
                )}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-champagne/20 bg-champagne/10 text-champagne">
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

