import { siteTheme } from "@/assets/site-theme";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { landingData } from "@/data/landing-data";

const { actions, business, location } = landingData;

export function LocationSection() {
  return (
    <section className="relative py-20 sm:py-24" id="localizacao">
      <div className={siteTheme.glows.wine} />
      <Container className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <Reveal>
          <SectionHeading
            eyebrow={location.eyebrow}
            title={location.title}
            description={location.description}
          />

          <div className="premium-panel mt-8 overflow-hidden p-6">
            <address className="not-italic">
              <p className="text-xl font-semibold text-ivory">{business.name}</p>
              <p className="mt-2 text-base text-mist/82">{business.fullAddress}</p>
            </address>

            <ul className="mt-5 space-y-3 text-sm leading-7 text-mist/78">
              {location.supportPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-champagne" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-sm text-mist/72">{location.mapCaption}</p>

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
          <div className="premium-panel overflow-hidden p-2">
            <div className="overflow-hidden rounded-[24px] border border-white/10">
              <iframe
                src={business.maps.embed}
                title={`Mapa do ${business.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[340px] w-full bg-merlot sm:h-[440px]"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

