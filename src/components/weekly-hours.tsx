"use client";

import { useEffect, useState } from "react";

import type { DayKey, WeeklySchedule } from "@/data/landing-data";
import { Icon } from "@/components/icons";
import { formatPeriods, getTodaySchedule } from "@/utils/schedule";
import { cn } from "@/utils/cn";

type WeeklyHoursProps = {
  schedule: WeeklySchedule;
  timeZone: string;
};

export function WeeklyHours({ schedule, timeZone }: WeeklyHoursProps) {
  const [todayKey, setTodayKey] = useState<DayKey | null>(null);

  useEffect(() => {
    const update = () => {
      const today = getTodaySchedule(schedule, timeZone);
      setTodayKey(today?.key ?? null);
    };

    update();
    const intervalId = window.setInterval(update, 60_000);
    return () => window.clearInterval(intervalId);
  }, [schedule, timeZone]);

  return (
    <ul className="space-y-3">
      {schedule.map((day) => {
        const isToday = day.key === todayKey;
        return (
          <li
            key={day.key}
            className={cn(
              "flex flex-col gap-2 rounded-[20px] border px-4 py-4 transition duration-300 sm:flex-row sm:items-center sm:justify-between",
              isToday
                ? "border-champagne/30 bg-[linear-gradient(95deg,rgba(215,192,151,0.12),rgba(255,255,255,0.02))] shadow-soft"
                : "border-white/8 bg-white/[0.03] hover:border-white/14 hover:bg-white/[0.05]",
            )}
          >
            <div className="flex items-center gap-3">
              {isToday ? (
                <span
                  className="flex h-7 items-center gap-1 rounded-full border border-champagne/25 bg-champagne/10 px-2 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-champagne"
                  aria-label="Hoje"
                >
                  <Icon name="clock" className="h-3 w-3" />
                  Hoje
                </span>
              ) : null}
              <p
                className={cn(
                  "text-base font-semibold",
                  isToday ? "text-ivory" : "text-ivory/92",
                )}
              >
                {day.label}
              </p>
            </div>
            <p
              className={cn(
                "text-sm",
                isToday ? "text-champagne/90" : "text-mist/76",
              )}
            >
              {formatPeriods(day.periods)}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
