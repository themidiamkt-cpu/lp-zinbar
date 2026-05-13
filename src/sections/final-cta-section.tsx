import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { landingData } from "@/data/landing-data";

const { actions, finalCta, socialProof } = landingData;

export function FinalCtaSection() {
  return (
    <section className="pb-20 pt-8 sm:pb-24" id="cta-final">
      <Container>
        <Reveal>
          <div className="premium-panel-strong relative overflow-hidden px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <div className="hero-grid absolute inset-0 opacity-15" />
            <div
              className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-champagne/12 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -left-12 bottom-0 h-72 w-72 rounded-full bg-garnet/30 blur-3xl"
              aria-hidden
            />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-champagne/85">
                  {finalCta.eyebrow}
                </p>
                <h2 className="section-title mt-5">{finalCta.title}</h2>
                <div className="ornament-line mt-5 max-w-[120px]" aria-hidden />
                <p className="section-body mt-5 max-w-2xl">{finalCta.description}</p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <ButtonLink
                    href={actions.reservation.href}
                    icon={actions.reservation.icon}
                    external={actions.reservation.external}
                  >
                    {actions.reservation.label}
                  </ButtonLink>
                  <ButtonLink
                    href={actions.directions.href}
                    icon={actions.directions.icon}
                    variant="secondary"
                    external={actions.directions.external}
                  >
                    {actions.directions.label}
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

              {/* Lateral stat highlight */}
              <aside className="relative rounded-[26px] border border-champagne/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(0,0,0,0.2))] p-5 sm:p-7">
                <div className="flex items-center gap-2 text-champagne">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Icon key={index} name="star" className="h-4 w-4" />
                  ))}
                </div>
                <p className="stat-number mt-4 text-[3rem] sm:text-[3.4rem]">
                  {socialProof.ratingLabel}
                </p>
                <p className="mt-2 text-sm font-medium text-mist/82">
                  {socialProof.reviewsLabel}
                </p>
                <div className="ornament-line my-6" aria-hidden />
                <ul className="space-y-2 text-sm text-mist/82">
                  <li className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-champagne/25 bg-champagne/10 text-champagne">
                      <Icon name="check" className="h-3 w-3" />
                    </span>
                    Reserva gratuita
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-champagne/25 bg-champagne/10 text-champagne">
                      <Icon name="check" className="h-3 w-3" />
                    </span>
                    Estacionamento
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-champagne/25 bg-champagne/10 text-champagne">
                      <Icon name="check" className="h-3 w-3" />
                    </span>
                    Aniversariante ganha bolo
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
