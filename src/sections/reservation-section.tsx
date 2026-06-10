import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { ReservationForm } from "@/components/reservation-form";
import { SectionHeading } from "@/components/section-heading";
import { landingData } from "@/data/landing-data";

const { actions, reservation } = landingData;

const actionCards = [
  {
    title: "Traçar rota agora",
    description:
      "Abra o mapa e reduza a fricção de quem já quer sair de casa ou do trabalho.",
    action: actions.directions,
  },
  {
    title: "Ver cardápio",
    description:
      "Antecipe o estilo da casa e aumente a segurança de quem ainda quer conferir as opções.",
    action: actions.menu,
  },
  {
    title: "Falar no WhatsApp",
    description:
      "Deixe um canal direto e visível para dúvidas rápidas, reservas e confirmações.",
    action: actions.whatsapp,
  },
];

export function ReservationSection() {
  return (
    <section className="py-20 sm:py-24" id="reserva">
      <Container>
        <div className="premium-panel-strong relative overflow-hidden p-6 sm:p-8 lg:p-10">
          <div
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-champagne/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-garnet/25 blur-3xl"
            aria-hidden
          />

          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <SectionHeading
                eyebrow={reservation.eyebrow}
                title={reservation.title}
                description={reservation.description}
              />

              <ul className="mt-8 space-y-4">
                {reservation.notes.map((note) => (
                  <li
                    key={note}
                    className="flex items-start gap-3 text-sm leading-7 text-mist/86"
                  >
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-champagne/25 bg-champagne/12 text-champagne">
                      <Icon name="check" className="h-4 w-4" />
                    </span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="grid gap-4">
              <Reveal delay={80}>
                <ReservationForm />
              </Reveal>

              <div className="grid gap-3 sm:grid-cols-3">
                {actionCards.map((item, index) => (
                  <Reveal key={item.title} delay={index * 70 + 140}>
                    <article className="card-hover relative h-full overflow-hidden rounded-[24px] border border-white/10 bg-black/15 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-champagne">
                        <Icon name={item.action.icon} className="h-4 w-4" />
                      </div>
                      <h3 className="mt-4 font-serif text-lg leading-tight text-ivory">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs leading-6 text-mist/76">
                        {item.description}
                      </p>
                      <div className="mt-4">
                        <ButtonLink
                          href={item.action.href}
                          icon={item.action.icon}
                          external={item.action.external}
                          variant={item.action.variant}
                          fullWidth
                          className="px-3 text-xs"
                        >
                          {item.action.shortLabel}
                        </ButtonLink>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
