import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { landingData } from "@/data/landing-data";

const { actions, finalCta } = landingData;

export function FinalCtaSection() {
  return (
    <section className="pb-20 pt-8 sm:pb-24" id="cta-final">
      <Container>
        <Reveal>
          <div className="premium-panel-strong relative overflow-hidden px-6 py-10 sm:px-8 sm:py-12 lg:px-10">
            <div className="hero-grid absolute inset-0 opacity-15" />
            <div className="relative z-10 max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-champagne/84">
                {finalCta.eyebrow}
              </p>
              <h2 className="mt-5 section-title">{finalCta.title}</h2>
              <p className="section-body mt-5 max-w-2xl">{finalCta.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink
                  href={actions.directions.href}
                  icon={actions.directions.icon}
                  external={actions.directions.external}
                >
                  {actions.directions.label}
                </ButtonLink>
                <ButtonLink
                  href={actions.reservation.href}
                  icon={actions.reservation.icon}
                  variant="secondary"
                  external={actions.reservation.external}
                >
                  {actions.reservation.label}
                </ButtonLink>
                <ButtonLink
                  href={actions.menu.href}
                  icon={actions.menu.icon}
                  variant="ghost"
                  external={actions.menu.external}
                >
                  {actions.menu.label}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
