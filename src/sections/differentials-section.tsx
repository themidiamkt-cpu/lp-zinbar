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

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {differentials.items.map((item, index) => {
            const isFeatured = index === 1;
            return (
              <Reveal key={item.title} delay={index * 70}>
                <article
                  className={cn(
                    "card-hover relative h-full overflow-hidden p-7",
                    isFeatured
                      ? "rounded-[28px] border border-champagne/30 bg-[linear-gradient(180deg,rgba(123,24,42,0.35),rgba(20,11,13,0.95))] shadow-glow"
                      : "premium-panel",
                  )}
                >
                  {isFeatured ? (
                    <span
                      className="absolute right-5 top-5 rounded-full border border-champagne/35 bg-black/40 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-champagne"
                      aria-hidden
                    >
                      Destaque
                    </span>
                  ) : null}
                  <div
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-2xl border text-champagne",
                      isFeatured
                        ? "border-champagne/35 bg-[linear-gradient(140deg,rgba(215,192,151,0.25),rgba(255,255,255,0.04))]"
                        : "border-champagne/20 bg-champagne/10",
                    )}
                  >
                    <Icon name={item.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 max-w-[20ch] font-serif text-2xl leading-tight text-ivory">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-mist/78">{item.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
