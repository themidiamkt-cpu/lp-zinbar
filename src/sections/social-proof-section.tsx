import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { landingData } from "@/data/landing-data";

const { actions, socialProof } = landingData;

export function SocialProofSection() {
  return (
    <section className="py-20 sm:py-24" id="avaliacoes">
      <Container className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <Reveal>
          <SectionHeading
            eyebrow={socialProof.eyebrow}
            title={socialProof.title}
            description={socialProof.description}
          />

          <div className="premium-panel-strong mt-8 p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-champagne/84">
              Autoridade local
            </p>
            <div className="mt-6 flex items-end gap-4">
              <p className="font-serif text-6xl leading-none text-ivory">{socialProof.ratingLabel}</p>
              <div className="pb-2">
                <div className="flex items-center gap-1 text-champagne">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Icon key={index} name="star" className="h-4 w-4" />
                  ))}
                </div>
                <p className="mt-2 text-sm text-mist/74">{socialProof.reviewsLabel}</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-mist/76">{socialProof.ratingCaption}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {socialProof.trustPoints.map((point) => (
                <span
                  key={point}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-medium text-mist/88"
                >
                  {point}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4">
          {socialProof.testimonials.map((item, index) => (
            <Reveal key={item.author} delay={index * 90}>
              <figure className="premium-panel p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-champagne/16 bg-champagne/10 text-champagne">
                  <Icon name="quote" />
                </div>
                <blockquote className="mt-5 text-lg leading-8 text-ivory">{item.quote}</blockquote>
                <figcaption className="mt-4 text-sm font-medium text-mist/70">{item.author}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
