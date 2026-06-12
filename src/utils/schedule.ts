import type {
  DayKey,
  ReservationBlockedDate,
  ScheduleDay,
  SchedulePeriod,
  WeeklySchedule,
} from "@/data/landing-data";

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

function formatTime(minutes: number) {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function getDayKeyFromDate(date: string): DayKey | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return null;
  }

  const dayIndex = new Date(`${date}T12:00:00Z`).getUTCDay();
  const dayMap: DayKey[] = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  return dayMap[dayIndex] ?? null;
}

function getDateStringInTimeZone(timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}`;
}

export function getCurrentDateInTimeZone(timeZone: string) {
  return getDateStringInTimeZone(timeZone);
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

export function getCurrentTimeInMinutes(timeZone: string) {
  return getNowParts(timeZone).minutes;
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

export function getReservationDateMin(timeZone: string) {
  return getDateStringInTimeZone(timeZone);
}

export function getReservationDay(week: WeeklySchedule, date: string) {
  const dayKey = getDayKeyFromDate(date);
  return dayKey ? week.find((day) => day.key === dayKey) : undefined;
}

export function getBlockedReservationDate(
  blockedDates: ReservationBlockedDate[],
  date: string,
) {
  return blockedDates.find((blockedDate) => blockedDate.date === date);
}

export function getReservationTimeOptions(
  week: WeeklySchedule,
  date: string,
  timeZone: string,
  intervalMinutes = 30,
  latestReservationTime?: string,
  blockedDates: ReservationBlockedDate[] = [],
) {
  if (getBlockedReservationDate(blockedDates, date)) {
    return [];
  }

  const day = getReservationDay(week, date);

  if (!day?.periods.length) {
    return [];
  }

  const today = getDateStringInTimeZone(timeZone);
  const now = getNowParts(timeZone);
  const minMinutes = date === today ? now.minutes + intervalMinutes : 0;
  const latestReservationMinutes = latestReservationTime
    ? parseTime(latestReservationTime)
    : Number.POSITIVE_INFINITY;

  return day.periods.flatMap((period) => {
    const opens = parseTime(period.opens);
    const closes = parseTime(period.closes);
    const firstSlot = Math.max(opens, Math.ceil(minMinutes / intervalMinutes) * intervalMinutes);
    const options: string[] = [];

    for (let minutes = firstSlot; minutes < closes; minutes += intervalMinutes) {
      if (minutes <= latestReservationMinutes) {
        options.push(formatTime(minutes));
      }
    }

    return options;
  });
}

export function isReservationSlotAvailable(
  week: WeeklySchedule,
  date: string,
  time: string,
  timeZone: string,
  latestReservationTime?: string,
  blockedDates: ReservationBlockedDate[] = [],
) {
  if (!/^\d{2}:\d{2}$/.test(time)) {
    return false;
  }

  if (date < getDateStringInTimeZone(timeZone)) {
    return false;
  }

  if (getBlockedReservationDate(blockedDates, date)) {
    return false;
  }

  const options = getReservationTimeOptions(
    week,
    date,
    timeZone,
    30,
    latestReservationTime,
    blockedDates,
  );
  return options.includes(time);
}

export function isReservationTimeAfterLimit(time: string, latestReservationTime: string) {
  if (!/^\d{2}:\d{2}$/.test(time)) {
    return false;
  }

  return parseTime(time) > parseTime(latestReservationTime);
}
