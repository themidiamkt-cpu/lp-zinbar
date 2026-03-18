import { Container } from "@/components/container";
import { OpenStatus } from "@/components/open-status";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { landingData } from "@/data/landing-data";
import { formatPeriods } from "@/utils/schedule";

const { hoursSection, schedule } = landingData;

export function HoursSection() {
  return (
    <section className="py-20 sm:py-24" id="horarios">
      <Container className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <Reveal>
          <SectionHeading
            eyebrow={hoursSection.eyebrow}
            title={hoursSection.title}
            description={hoursSection.description}
          />

          <div className="mt-8 flex flex-wrap gap-3">
            <OpenStatus schedule={schedule.week} timeZone={schedule.timezone} tone="line" />
          </div>

          {hoursSection.happyHourLabel ? (
            <p className="mt-5 text-sm text-mist/72">{hoursSection.happyHourLabel}</p>
          ) : null}
        </Reveal>

        <Reveal delay={110}>
          <div className="premium-panel overflow-hidden p-6">
            <div className="space-y-4">
              {schedule.week.map((day) => (
                <div
                  key={day.key}
                  className="flex flex-col gap-2 rounded-[20px] border border-white/8 bg-white/[0.03] px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <p className="text-base font-semibold text-ivory">{day.label}</p>
                  <p className="text-sm text-mist/76">{formatPeriods(day.periods)}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
