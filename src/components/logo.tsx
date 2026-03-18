import { landingData } from "@/data/landing-data";
import { cn } from "@/utils/cn";

type LogoProps = {
  compact?: boolean;
};

export function Logo({ compact = false }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-champagne/25 bg-[linear-gradient(180deg,rgba(143,29,49,0.52),rgba(15,9,10,0.92))] text-sm font-semibold tracking-[0.4em] text-champagne shadow-glow">
        Z
      </div>

      <div>
        <p className="font-serif text-xl leading-none tracking-[0.08em] text-ivory">
          {landingData.business.label}
        </p>
        <p
          className={cn(
            "mt-1 text-[0.68rem] uppercase tracking-[0.26em] text-mist/70",
            compact && "hidden sm:block",
          )}
        >
          {landingData.business.brandDescriptor}
        </p>
      </div>
    </div>
  );
}
