import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button-link";
import { Logo } from "@/components/logo";
import { OpenStatus } from "@/components/open-status";
import { landingData } from "@/data/landing-data";

const { actions, business, footer, schedule } = landingData;

export function HeaderSection() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <Container className="premium-panel max-w-[1240px] rounded-[26px] px-4 py-3 sm:px-5">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <Logo />
            <p className="mt-2 hidden text-sm text-mist/70 md:block">
              {business.addressLine} • {business.neighborhood}, {business.city}
            </p>
          </div>

          <div className="hidden items-center gap-3 xl:flex">
            {footer.usefulLinks.slice(0, 4).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="focus-ring text-sm text-mist/78 transition duration-300 hover:text-ivory"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <OpenStatus schedule={schedule.week} timeZone={schedule.timezone} />
            </div>
            <ButtonLink
              href={actions.directions.href}
              icon={actions.directions.icon}
              external={actions.directions.external}
              className="px-4 sm:px-5"
            >
              {actions.directions.shortLabel}
            </ButtonLink>
            <ButtonLink
              href={actions.reservation.href}
              icon={actions.reservation.icon}
              variant="secondary"
              external={actions.reservation.external}
              className="px-4 sm:px-5"
            >
              {actions.reservation.shortLabel}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </header>
  );
}
