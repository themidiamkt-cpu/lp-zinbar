import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { OpenStatus } from "@/components/open-status";
import { landingData } from "@/data/landing-data";

const { actions, business, footer, schedule } = landingData;

export function FooterSection() {
  return (
    <footer className="border-t border-white/10 pb-28 pt-10 lg:pb-10">
      <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <Logo compact />
          <p className="mt-5 max-w-md text-sm leading-7 text-mist/74">
            {business.name} • {business.fullAddress}. Um endereço no Taquaral para almoço,
            jantar e happy hour com atmosfera acolhedora para família, amigos e encontros que
            pedem mais tempo à mesa.
          </p>
          <div className="mt-5">
            <OpenStatus schedule={schedule.week} timeZone={schedule.timezone} tone="line" />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={actions.directions.href}
              target="_blank"
              rel="noreferrer"
              className="focus-ring text-sm text-champagne transition duration-300 hover:text-ivory"
            >
              Traçar rota
            </a>
            <a
              href={actions.reservation.href}
              target={actions.reservation.external ? "_blank" : undefined}
              rel={actions.reservation.external ? "noreferrer" : undefined}
              className="focus-ring text-sm text-mist/78 transition duration-300 hover:text-ivory"
            >
              Reservar mesa
            </a>
            <a
              href={actions.menu.href}
              target={actions.menu.external ? "_blank" : undefined}
              rel={actions.menu.external ? "noreferrer" : undefined}
              className="focus-ring text-sm text-mist/78 transition duration-300 hover:text-ivory"
            >
              Ver cardápio
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-champagne/82">
            Links úteis
          </p>
          <ul className="mt-5 space-y-3 text-sm text-mist/78">
            {footer.usefulLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="focus-ring transition duration-300 hover:text-ivory">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-champagne/82">
            Canais
          </p>
          <ul className="mt-5 space-y-3 text-sm text-mist/78">
            {footer.socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  className="focus-ring transition duration-300 hover:text-ivory"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs leading-6 text-mist/56">{footer.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
