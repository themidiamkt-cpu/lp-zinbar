import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

type BadgeProps = {
  children: ReactNode;
  tone?: "default" | "accent" | "soft";
  className?: string;
};

export function Badge({ children, tone = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em]",
        tone === "default" && "border border-white/10 bg-white/[0.04] text-mist/90",
        tone === "accent" &&
          "border border-champagne/20 bg-champagne/10 text-champagne shadow-soft",
        tone === "soft" && "border border-white/8 bg-white/[0.03] text-mist/75",
        className,
      )}
    >
      {children}
    </span>
  );
}

