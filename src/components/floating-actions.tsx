import { landingData } from "@/data/landing-data";
import { ButtonLink } from "@/components/button-link";
import { Icon } from "@/components/icons";
import { cn } from "@/utils/cn";

const actions = landingData.actions;

export function FloatingActions() {
  return (
    <>
      <div className="fixed bottom-24 right-4 z-40 hidden flex-col gap-3 xl:flex">
        <ButtonLink
          href={actions.directions.href}
          variant="primary"
          icon={actions.directions.icon}
          external={actions.directions.external}
          className="min-w-[184px] justify-start"
        >
          {actions.directions.label}
        </ButtonLink>
        <ButtonLink
          href={actions.whatsapp.href}
          variant="secondary"
          icon={actions.whatsapp.icon}
          className="min-w-[184px] justify-start"
        >
          {actions.whatsapp.label}
        </ButtonLink>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[rgba(7,5,6,0.92)] px-4 pb-[calc(0.9rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-[620px] items-center gap-2">
          <ButtonLink
            href={actions.directions.href}
            variant="primary"
            icon={actions.directions.icon}
            external={actions.directions.external}
            className="flex-1"
          >
            {actions.directions.shortLabel}
          </ButtonLink>
          <ButtonLink
            href={actions.reservation.href}
            variant="secondary"
            icon={actions.reservation.icon}
            external={actions.reservation.external}
            className="flex-1"
          >
            {actions.reservation.shortLabel}
          </ButtonLink>
          <a
            href={actions.menu.href}
            target={actions.menu.external ? "_blank" : undefined}
            rel={actions.menu.external ? "noreferrer" : undefined}
            className={cn(
              "focus-ring flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-mist/85 transition duration-300 hover:-translate-y-0.5 hover:border-champagne/20 hover:bg-white/[0.08] hover:text-ivory",
            )}
            aria-label={actions.menu.label}
          >
            <Icon name={actions.menu.icon} />
          </a>
        </div>
      </div>

      <a
        href={actions.whatsapp.href}
        className="focus-ring fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-champagne/20 bg-[linear-gradient(180deg,rgba(143,29,49,0.95),rgba(102,23,38,0.92))] text-white shadow-glow transition duration-300 hover:-translate-y-1 lg:bottom-6 lg:hidden"
        aria-label={actions.whatsapp.label}
      >
        <Icon name="whatsapp" className="h-5 w-5" />
      </a>
    </>
  );
}
