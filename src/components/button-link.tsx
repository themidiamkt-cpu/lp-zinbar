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
        "focus-ring group relative inline-flex items-center justify-center overflow-hidden rounded-full px-5 py-3 text-sm font-semibold tracking-wide transition duration-300 ease-out",
        fullWidth && "w-full",
        variant === "primary" &&
          "shimmer-on-hover cta-ring border border-champagne/25 bg-[linear-gradient(135deg,#9d2235_0%,#7a1a2d_45%,#4b121b_100%)] text-white hover:-translate-y-0.5",
        variant === "secondary" &&
          "border border-white/14 bg-white/[0.05] text-ivory hover:-translate-y-0.5 hover:border-champagne/35 hover:bg-white/[0.08]",
        variant === "ghost" &&
          "border border-white/8 bg-transparent text-mist/88 hover:-translate-y-0.5 hover:border-champagne/25 hover:bg-white/[0.045] hover:text-ivory",
        className,
      )}
    >
      <span className="relative z-10 flex items-center gap-2">
        {icon ? <Icon name={icon} className="h-4 w-4" /> : null}
        <span>{children}</span>
        {variant === "primary" ? (
          <Icon
            name="arrowRight"
            className="h-3.5 w-3.5 -translate-x-0.5 opacity-70 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
          />
        ) : null}
      </span>
    </a>
  );
}
