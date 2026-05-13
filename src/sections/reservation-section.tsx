import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { landingData } from "@/data/landing-data";
import { cn } from "@/utils/cn";

const { actions, reservation } = landingData;

const actionCards = [
  {
    title: "Traçar rota agora",
    description:
      "Abra o mapa e reduza a fricção de quem já quer sair de casa ou do trabalho.",
    action: actions.directions,
  },
  {
    title: "Reservar agora",
    description:
      "Facilite a decisão de grupos, famílias e encontros marcados com antecedência sem custo de reserva.",
    action: actions.reservation,
    featured: true,
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

            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {actionCards.map((item, index) => (
                <Reveal key={item.title} delay={index * 70}>
                  <article
                    className={cn(
                      "card-hover relative h-full overflow-hidden rounded-[26px] p-6",
                      item.featured
                        ? "border border-champagne/30 bg-[linear-gradient(180deg,rgba(143,29,49,0.32),rgba(7,5,6,0.7))] shadow-glow"
                        : "border border-white/10 bg-black/15",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={cn(
                          "flex h-11 w-11 items-center justify-center rounded-2xl border text-champagne",
                          item.featured
                            ? "border-champagne/30 bg-champagne/12"
                            : "border-white/10 bg-white/[0.05]",
                        )}
                      >
                        <Icon name={item.action.icon} />
                      </div>
                      {item.featured ? (
                        <span className="rounded-full border border-champagne/30 bg-black/40 px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-champagne">
                          Recomendado
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-5 font-serif text-xl leading-tight text-ivory">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-mist/78">{item.description}</p>
                    <div className="mt-5">
                      <ButtonLink
                        href={item.action.href}
                        icon={item.action.icon}
                        external={item.action.external}
                        variant={item.action.variant}
                        fullWidth
                      >
                        {item.action.label}
                      </ButtonLink>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
