import Image from "next/image";

import { siteTheme } from "@/assets/site-theme";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Icon } from "@/components/icons";
import { OpenStatus } from "@/components/open-status";
import { Reveal } from "@/components/reveal";
import { landingData } from "@/data/landing-data";

const { actions, business, hero, schedule, socialProof } = landingData;

export function HeroSection() {
  return (
    <section
      className="relative isolate overflow-hidden pb-20 pt-32 sm:pt-36 lg:pb-28"
      id="topo"
    >
      <Image
        src="/images/real/ambiente-casa-cheia.jpg"
        alt={`Atmosfera premium do ${business.name} no ${business.neighborhood}`}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-[0.22]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,5,6,0.55),rgba(7,5,6,0.78)_42%,rgba(7,5,6,0.96)_100%)]" />
      <div className="hero-grid absolute inset-0 opacity-[0.12]" />
      <div className={siteTheme.glows.heroLeft} />
      <div className={siteTheme.glows.heroRight} />

      <Container className="relative">
        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(20,11,13,0.78),rgba(7,5,6,0.82))] p-6 shadow-premium backdrop-blur-md sm:p-9 lg:p-14">
            {/* decorative top gold line */}
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-champagne/60 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-champagne/10 blur-3xl" />
            <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-garnet/25 blur-3xl" />

            {/* live status + location pill */}
            <div className="relative flex flex-wrap items-center gap-3">
              <OpenStatus
                schedule={schedule.week}
                timeZone={schedule.timezone}
                tone="badge"
              />
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-medium tracking-[0.1em] text-mist/85">
                <Icon name="mapPin" className="h-3.5 w-3.5 text-champagne" />
                {business.neighborhood}, {business.city}/{business.state}
              </span>
            </div>

            <p className="relative mt-6 text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-champagne/85">
              {hero.overline.replace(/^[^•]*•\s*/, "")}
            </p>

            <h1 className="relative mt-4 max-w-[1120px] font-serif text-[1.85rem] leading-[1.04] text-ivory sm:text-[3.4rem] sm:leading-[0.98] lg:text-[4.75rem] xl:text-[5.4rem]">
              {hero.title}
            </h1>

            <p className="relative mt-6 max-w-3xl text-base leading-[1.7] text-mist/86 sm:text-lg sm:leading-[1.75]">
              {hero.subtitle}
            </p>

            {/* Primary CTA row */}
            <div className="relative mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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

              {/* Tertiary links — softer hierarchy */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:ml-3 sm:border-l sm:border-white/10 sm:pl-5">
                <a
                  href={actions.menu.href}
                  target={actions.menu.external ? "_blank" : undefined}
                  rel={actions.menu.external ? "noreferrer" : undefined}
                  className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-mist/85 transition duration-300 hover:text-champagne"
                >
                  <Icon name={actions.menu.icon} className="h-4 w-4" />
                  {actions.menu.label}
                </a>
                <a
                  href={actions.whatsapp.href}
                  target={actions.whatsapp.external ? "_blank" : undefined}
                  rel={actions.whatsapp.external ? "noreferrer" : undefined}
                  className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-mist/85 transition duration-300 hover:text-champagne"
                >
                  <Icon name={actions.whatsapp.icon} className="h-4 w-4" />
                  {actions.whatsapp.label}
                </a>
              </div>
            </div>

            <p className="relative mt-7 max-w-3xl text-sm leading-7 text-mist/70">
              {hero.supportingLine}
            </p>

            {/* Inline stat row */}
            <div className="relative mt-10 grid grid-cols-2 gap-4 border-t border-white/8 pt-7 sm:flex sm:flex-wrap sm:items-stretch sm:gap-x-8 sm:gap-y-4">
              <div className="flex items-center gap-3">
                <span className="stat-number text-3xl sm:text-4xl">
                  {socialProof.ratingLabel}
                </span>
                <div className="leading-tight">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-champagne/75">
                    Google
                  </p>
                  <p className="text-sm text-mist/82">
                    1.000+ avaliações
                  </p>
                </div>
              </div>
              <span className="hidden h-10 w-px self-center bg-white/10 sm:block" />
              <div className="flex items-center gap-3">
                <span className="stat-number text-3xl sm:text-4xl">19</span>
                <div className="leading-tight">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-champagne/75">
                    Anos
                  </p>
                  <p className="text-sm text-mist/82">
                    Presença local no Taquaral
                  </p>
                </div>
              </div>
              <span className="hidden h-10 w-px self-center bg-white/10 sm:block" />
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-champagne/25 bg-champagne/10 text-champagne">
                  <Icon name="calendar" className="h-5 w-5" />
                </span>
                <div className="leading-tight">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-champagne/75">
                    Reserva
                  </p>
                  <p className="text-sm text-mist/82">Gratuita • mesa garantida</p>
                </div>
              </div>
            </div>

            {/* Proof cards — refined */}
            <ul className="relative mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {hero.proofItems.map((item) => (
                <li
                  key={item.title}
                  className="group relative rounded-[24px] border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-champagne/25 hover:bg-white/[0.06]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-champagne transition group-hover:bg-champagne/10">
                      <Icon name={item.icon} className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-semibold text-ivory">{item.title}</p>
                  </div>
                  <p className="mt-3 text-[0.85rem] leading-6 text-mist/72">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
