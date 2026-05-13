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
      <Container className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <Reveal>
          <SectionHeading
            eyebrow={socialProof.eyebrow}
            title={socialProof.title}
            description={socialProof.description}
          />

          <div className="premium-panel-strong relative mt-8 overflow-hidden p-6 sm:p-8">
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-champagne/15 blur-3xl"
              aria-hidden
            />
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-champagne/85">
              Autoridade local
            </p>

            <div className="mt-5 flex items-end gap-5">
              {socialProof.ratingLabel ? (
                <p className="stat-number text-[3.4rem] sm:text-[4.2rem]">
                  {socialProof.ratingLabel}
                </p>
              ) : null}
              <div className="pb-2">
                <div className="flex items-center gap-1 text-champagne">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Icon key={index} name="star" className="h-4 w-4" />
                  ))}
                </div>
                <p className="mt-2 text-sm font-medium text-mist/86">
                  {socialProof.reviewsLabel}
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-7 text-mist/78">
              {socialProof.ratingCaption}
            </p>

            <div className="ornament-line my-7" aria-hidden />

            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-2">
              {socialProof.trustPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-mist/88"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-champagne/22 bg-champagne/10 text-champagne">
                    <Icon name="check" className="h-3 w-3" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4">
          {socialProof.testimonials.map((item, index) => (
            <Reveal key={item.author} delay={index * 90}>
              <figure className="premium-panel card-hover relative overflow-hidden p-7">
                <span
                  className="pointer-events-none absolute -right-4 -top-4 font-serif text-[6rem] leading-none text-champagne/8"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-champagne/22 bg-champagne/10 text-champagne">
                  <Icon name="quote" />
                </div>
                <blockquote className="relative mt-5 font-serif text-lg leading-[1.55] text-ivory sm:text-xl">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-2 text-sm font-medium text-champagne/85">
                  <span className="h-px w-6 bg-champagne/40" />
                  {item.author}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
