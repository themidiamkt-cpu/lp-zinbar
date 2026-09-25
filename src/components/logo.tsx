import Image from "next/image";

import { landingData } from "@/data/landing-data";
import { cn } from "@/utils/cn";

type LogoProps = {
  compact?: boolean;
  event?: boolean;
};

export function Logo({ compact = false, event = false }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/images/logo.png"
        alt={`Logo ${event ? "Zin Bar & Restaurante" : landingData.business.label}`}
        width={48}
        height={48}
        className="h-12 w-12 rounded-full shadow-glow"
        priority
      />

      <div>
        <p className="font-serif text-xl leading-none tracking-[0.08em] text-ivory">
          {event ? "Zin Bar & Restaurante" : landingData.business.label}
        </p>
        <p
          className={cn(
            "mt-1 text-[0.68rem] uppercase tracking-[0.26em] text-mist/70",
            compact && "hidden sm:block",
          )}
        >
          {event ? "Réveillon 2027" : landingData.business.brandDescriptor}
        </p>
      </div>
    </div>
  );
}
