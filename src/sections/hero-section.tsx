import Image from "next/image";

import { siteTheme } from "@/assets/site-theme";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { landingData } from "@/data/landing-data";

const { actions, business, hero } = landingData;

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-32 sm:pt-36 lg:pb-24" id="topo">
      <Image
        src="/images/hero-zin.svg"
        alt={`Atmosfera premium do ${business.name} no ${business.neighborhood}`}
        fill
        priority
        className="object-cover object-center opacity-[0.18]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,5,6,0.52),rgba(7,5,6,0.72)_40%,rgba(7,5,6,0.92)_100%)]" />
      <div className="hero-grid absolute inset-0 opacity-[0.12]" />
      <div className={siteTheme.glows.heroLeft} />
      <div className={siteTheme.glows.heroRight} />

      <Container className="relative">
        <Reveal>
          <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(20,11,13,0.72),rgba(7,5,6,0.76))] p-6 shadow-premium backdrop-blur-sm sm:p-8 lg:p-12">
            <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-champagne/8 blur-3xl" />
            <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-garnet/20 blur-3xl" />

            <p className="relative text-sm font-medium tracking-[0.12em] text-champagne/84">
              {hero.overline}
            </p>

            <h1 className="relative mt-6 max-w-[1120px] font-serif text-[2.95rem] leading-[0.94] text-ivory sm:text-[4.1rem] lg:text-[5.2rem] xl:text-[5.8rem]">
              {hero.title}
            </h1>

            <p className="relative mt-6 max-w-3xl text-base leading-8 text-mist/84 sm:text-lg">
              {hero.subtitle}
            </p>

            <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
              <ButtonLink href={actions.whatsapp.href} icon={actions.whatsapp.icon} variant="ghost">
                {actions.whatsapp.label}
              </ButtonLink>
            </div>

            <p className="relative mt-7 max-w-3xl text-sm leading-7 text-mist/70">
              {hero.supportingLine}
            </p>

            <ul className="relative mt-10 grid gap-4 md:grid-cols-3">
              {hero.proofItems.map((item) => (
                <li key={item.title} className="premium-panel rounded-[26px] p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.045] text-champagne">
                    <Icon name={item.icon} className="h-4 w-4" />
                  </div>
                  <p className="mt-4 text-base font-semibold text-ivory">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-mist/70">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
