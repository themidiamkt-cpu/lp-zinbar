import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { OpenStatus } from "@/components/open-status";
import { landingData } from "@/data/landing-data";

const { actions, business, footer, schedule } = landingData;

export function FooterSection() {
  return (
    <footer className="relative border-t border-white/10 pb-28 pt-14 lg:pb-12">
      <div className="ornament-line absolute inset-x-10 top-0 max-w-[260px]" aria-hidden />
      <Container className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo compact />
          <p className="mt-5 max-w-md text-sm leading-7 text-mist/76">
            {business.name} • {business.fullAddress}. Um endereço no Taquaral para almoço,
            jantar e happy hour com atmosfera acolhedora para família, amigos e encontros
            que pedem mais tempo à mesa.
          </p>
          <div className="mt-5">
            <OpenStatus
              schedule={schedule.week}
              timeZone={schedule.timezone}
              tone="line"
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm">
            <a
              href={actions.directions.href}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center gap-1.5 text-champagne transition duration-300 hover:text-ivory"
            >
              Traçar rota
              <span aria-hidden>→</span>
            </a>
            <a
              href={actions.reservation.href}
              target={actions.reservation.external ? "_blank" : undefined}
              rel={actions.reservation.external ? "noreferrer" : undefined}
              className="focus-ring text-mist/82 transition duration-300 hover:text-champagne"
            >
              Reservar mesa
            </a>
            <a
              href={actions.menu.href}
              target={actions.menu.external ? "_blank" : undefined}
              rel={actions.menu.external ? "noreferrer" : undefined}
              className="focus-ring text-mist/82 transition duration-300 hover:text-champagne"
            >
              Ver cardápio
            </a>
          </div>
        </div>

        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-champagne/85">
            Links úteis
          </p>
          <div className="ornament-line mt-3 max-w-[60px]" aria-hidden />
          <ul className="mt-5 space-y-3 text-sm text-mist/80">
            {footer.usefulLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="focus-ring transition duration-300 hover:text-champagne"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-champagne/85">
            Canais
          </p>
          <div className="ornament-line mt-3 max-w-[60px]" aria-hidden />
          <ul className="mt-5 space-y-3 text-sm text-mist/80">
            {footer.socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  className="focus-ring transition duration-300 hover:text-champagne"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-7 text-xs leading-6 text-mist/56">{footer.copyright}</p>
        </div>
      </Container>

      <div className="mt-10 border-t border-white/6 pt-6 text-center text-xs text-mist/40">
        Criado por{" "}
        <a
          href="https://www.instagram.com/agenciathemidia"
          target="_blank"
          rel="noreferrer"
          className="focus-ring text-mist/60 transition duration-300 hover:text-champagne"
        >
          The Mídia Marketing
        </a>
      </div>
    </footer>
  );
}
