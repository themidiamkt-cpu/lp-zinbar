import type { DayKey, ScheduleDay, SchedulePeriod, WeeklySchedule } from "@/data/landing-data";

const orderedDays: DayKey[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

function parseTime(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function getNowParts(timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const weekday = parts.find((part) => part.type === "weekday")?.value.toLowerCase() as DayKey;
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");

  return {
    weekday,
    minutes: hour * 60 + minute,
  };
}

export function formatPeriods(periods: SchedulePeriod[]) {
  if (!periods.length) {
    return "Fechado";
  }

  return periods.map((period) => `${period.opens} às ${period.closes}`).join(" • ");
}

function getNextOpening(week: WeeklySchedule, todayIndex: number) {
  for (let offset = 1; offset <= orderedDays.length; offset += 1) {
    const nextIndex = (todayIndex + offset) % orderedDays.length;
    const nextDay = week[nextIndex];

    if (nextDay?.periods.length) {
      return {
        day: nextDay,
        opens: nextDay.periods[0]?.opens,
      };
    }
  }

  return null;
}

export function getBusinessStatus(week: WeeklySchedule, timeZone: string) {
  const now = getNowParts(timeZone);
  const todayIndex = orderedDays.indexOf(now.weekday);
  const today = week[todayIndex] ?? week[0];

  if (!today) {
    return {
      isOpen: false,
      label: "Horário indisponível",
      detail: "Atualize a agenda da casa no arquivo central.",
      today,
    };
  }

  const currentPeriod = today.periods.find((period) => {
    const opens = parseTime(period.opens);
    const closes = parseTime(period.closes);
    return now.minutes >= opens && now.minutes < closes;
  });

  if (currentPeriod) {
    return {
      isOpen: true,
      label: "Aberto agora",
      detail: `Fecha às ${currentPeriod.closes}`,
      today,
    };
  }

  const nextToday = today.periods.find((period) => now.minutes < parseTime(period.opens));

  if (nextToday) {
    return {
      isOpen: false,
      label: "Fechado no momento",
      detail: `Abre hoje às ${nextToday.opens}`,
      today,
    };
  }

  const nextOpening = getNextOpening(week, todayIndex);

  if (nextOpening) {
    return {
      isOpen: false,
      label: "Fechado no momento",
      detail: `Abre ${nextOpening.day.label.toLowerCase()} às ${nextOpening.opens}`,
      today,
    };
  }

  return {
    isOpen: false,
    label: "Fechado no momento",
    detail: "Consulte o horário atualizado.",
    today,
  };
}

export function getTodaySchedule(week: WeeklySchedule, timeZone: string): ScheduleDay | undefined {
  const now = getNowParts(timeZone);
  const todayIndex = orderedDays.indexOf(now.weekday);
  return week[todayIndex] ?? week[0];
}

