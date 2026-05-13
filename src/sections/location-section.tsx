import { siteTheme } from "@/assets/site-theme";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { landingData } from "@/data/landing-data";

const { actions, business, location } = landingData;

export function LocationSection() {
  return (
    <section className="relative py-20 sm:py-24" id="localizacao">
      <div className={siteTheme.glows.wine} />
      <Container className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <Reveal>
          <SectionHeading
            eyebrow={location.eyebrow}
            title={location.title}
            description={location.description}
          />

          <div className="premium-panel card-hover mt-8 overflow-hidden p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-champagne/22 bg-champagne/10 text-champagne">
                <Icon name="mapPin" className="h-5 w-5" />
              </span>
              <address className="not-italic">
                <p className="font-serif text-2xl leading-tight text-ivory">
                  {business.name}
                </p>
                <p className="mt-2 text-base text-mist/82">{business.fullAddress}</p>
                {/* Telefone visível no HTML — consistência NAP para crawlers de IA */}
                <a
                  href={`tel:${business.telephone}`}
                  className="mt-1 block text-sm text-champagne/80 transition hover:text-champagne"
                  aria-label={`Ligar para o ${business.name}`}
                >
                  {business.telephoneDisplay}
                </a>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-mist/80">
                    Estacionamento
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-mist/80">
                    Família & pets
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-mist/80">
                    Reserva grátis
                  </span>
                </div>
              </address>
            </div>

            <div className="ornament-line mt-7" aria-hidden />

            <ul className="mt-6 space-y-3.5 text-sm leading-7 text-mist/82">
              {location.supportPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-champagne/22 bg-champagne/10 text-champagne">
                    <Icon name="check" className="h-3 w-3" />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-mist/72">{location.mapCaption}</p>

            <div className="mt-6">
              <ButtonLink
                href={actions.directions.href}
                icon={actions.directions.icon}
                external={actions.directions.external}
              >
                {actions.directions.label}
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="premium-panel glow-on-hover overflow-hidden p-2">
            <div className="relative overflow-hidden rounded-[24px] border border-white/10">
              <iframe
                src={business.maps.embed}
                title={`Mapa do ${business.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[280px] w-full bg-merlot sm:h-[360px] lg:h-[480px]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/40 to-transparent" />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
