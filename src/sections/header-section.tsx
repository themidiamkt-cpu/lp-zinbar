import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button-link";
import { Logo } from "@/components/logo";
import { OpenStatus } from "@/components/open-status";
import { landingData } from "@/data/landing-data";

const { actions, business, footer, schedule } = landingData;

export function HeaderSection({ event = false }: { event?: boolean }) {
  const links = event
    ? [
        { label: "A experiência", href: "/reveillon#experiencia" },
        { label: "Escolha sua mesa", href: "/reveillon#mesas" },
        { label: "O evento", href: "/reveillon#evento" },
        { label: "Dúvidas", href: "/reveillon#faq" },
      ]
    : footer.usefulLinks.slice(0, 4);
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <Container className="premium-panel max-w-[1240px] rounded-[26px] px-4 py-3 sm:px-5">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            {event ? (
              <a href="/" aria-label="Página inicial">
                <Logo event />
              </a>
            ) : (
              <Logo />
            )}
            <p className="mt-1.5 hidden text-xs text-mist/68 md:block">
              {business.addressLine} · {business.neighborhood}, {business.city}
            </p>
          </div>

          <nav
            className="hidden items-center gap-6 xl:flex"
            aria-label="Navegação principal"
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="focus-ring relative text-sm font-medium text-mist/82 transition duration-300 hover:text-champagne after:absolute after:inset-x-0 after:-bottom-1 after:mx-auto after:h-px after:w-0 after:bg-champagne after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className={event ? "hidden" : "hidden lg:block"}>
              <OpenStatus
                schedule={schedule.week}
                timeZone={schedule.timezone}
              />
            </div>
            <ButtonLink
              href={event ? "/reveillon#mesas" : actions.reservation.href}
              icon={event ? "spark" : actions.reservation.icon}
              external={event ? false : actions.reservation.external}
              className="px-3 text-sm sm:px-5 sm:text-base"
            >
              {event ? "Mesas" : actions.reservation.shortLabel}
            </ButtonLink>
            <ButtonLink
              href={actions.directions.href}
              icon={actions.directions.icon}
              variant="secondary"
              external={actions.directions.external}
              className={
                event ? "hidden" : "hidden px-4 sm:inline-flex sm:px-5"
              }
            >
              {actions.directions.shortLabel}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </header>
  );
}
