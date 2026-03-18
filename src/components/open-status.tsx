"use client";

import { useEffect, useState } from "react";

import type { WeeklySchedule } from "@/data/landing-data";
import { Badge } from "@/components/badge";
import { Icon } from "@/components/icons";
import { getBusinessStatus } from "@/utils/schedule";
import { cn } from "@/utils/cn";

type OpenStatusProps = {
  schedule: WeeklySchedule;
  timeZone: string;
  tone?: "badge" | "panel" | "line";
};

export function OpenStatus({ schedule, timeZone, tone = "badge" }: OpenStatusProps) {
  const [status, setStatus] = useState(() => ({
    isOpen: false,
    label: "Verificando horário",
    detail: "Atualizando status em tempo real.",
    today: schedule[0],
  }));

  useEffect(() => {
    const update = () => setStatus(getBusinessStatus(schedule, timeZone));

    update();

    const intervalId = window.setInterval(update, 60_000);

    return () => window.clearInterval(intervalId);
  }, [schedule, timeZone]);

  if (tone === "badge") {
    return (
      <Badge tone={status.isOpen ? "accent" : "soft"} className="gap-2 tracking-[0.18em]">
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            status.isOpen ? "animate-pulseSoft bg-emerald-400" : "bg-slate",
          )}
        />
        {status.label}
      </Badge>
    );
  }

  if (tone === "line") {
    return (
      <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-mist/90">
        <span
          className={cn(
            "h-2.5 w-2.5 rounded-full",
            status.isOpen ? "animate-pulseSoft bg-emerald-400" : "bg-slate",
          )}
        />
        <span className="font-medium text-ivory">{status.label}</span>
        <span className="hidden text-mist/65 sm:inline">•</span>
        <span className="text-mist/75">{status.detail}</span>
      </div>
    );
  }

  return (
    <div className="premium-panel rounded-[24px] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-champagne/82">
            Status da casa
          </p>
          <p className="mt-3 text-xl font-semibold text-ivory">{status.label}</p>
          <p className="mt-2 text-sm leading-6 text-mist/75">{status.detail}</p>
        </div>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-2xl border",
            status.isOpen
              ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
              : "border-white/10 bg-white/[0.05] text-mist/70",
          )}
        >
          <Icon name="clock" />
        </div>
      </div>
    </div>
  );
}
