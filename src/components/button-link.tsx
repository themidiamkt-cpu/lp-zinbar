import type { ReactNode } from "react";
import type { ActionVariant, IconName } from "@/data/landing-data";

import { Icon } from "@/components/icons";
import { cn } from "@/utils/cn";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  icon?: IconName;
  variant?: ActionVariant;
  className?: string;
  external?: boolean;
  fullWidth?: boolean;
};

export function ButtonLink({
  href,
  children,
  icon,
  variant = "primary",
  className,
  external = false,
  fullWidth = false,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "focus-ring group relative inline-flex items-center justify-center overflow-hidden rounded-full px-5 py-3 text-sm font-semibold transition duration-300 ease-out",
        fullWidth && "w-full",
        variant === "primary" &&
          "cta-ring border border-champagne/20 bg-[linear-gradient(135deg,#8f1d31_0%,#661726_55%,#421019_100%)] text-white hover:-translate-y-0.5 hover:shadow-glow",
        variant === "secondary" &&
          "border border-white/12 bg-white/[0.045] text-ivory hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07]",
        variant === "ghost" &&
          "border border-white/8 bg-transparent text-mist/88 hover:-translate-y-0.5 hover:border-champagne/20 hover:bg-white/[0.045] hover:text-ivory",
        className,
      )}
    >
      <span className="absolute inset-0 translate-y-full bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent)] transition duration-300 group-hover:translate-y-0" />
      <span className="relative z-10 flex items-center gap-2">
        {icon ? <Icon name={icon} className="h-4 w-4" /> : null}
        <span>{children}</span>
      </span>
    </a>
  );
}
