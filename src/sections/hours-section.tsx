import { Container } from "@/components/container";
import { OpenStatus } from "@/components/open-status";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { WeeklyHours } from "@/components/weekly-hours";
import { landingData } from "@/data/landing-data";

const { hoursSection, schedule } = landingData;

export function HoursSection() {
  return (
    <section className="py-20 sm:py-24" id="horarios">
      <Container className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <Reveal>
          <SectionHeading
            eyebrow={hoursSection.eyebrow}
            title={hoursSection.title}
            description={hoursSection.description}
          />

          <div className="mt-8 flex flex-wrap gap-3">
            <OpenStatus
              schedule={schedule.week}
              timeZone={schedule.timezone}
              tone="panel"
            />
          </div>

          {hoursSection.happyHourLabel ? (
            <p className="mt-5 text-sm text-mist/72">{hoursSection.happyHourLabel}</p>
          ) : null}
        </Reveal>

        <Reveal delay={110}>
          <div className="premium-panel overflow-hidden p-5 sm:p-6">
            <WeeklyHours schedule={schedule.week} timeZone={schedule.timezone} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
