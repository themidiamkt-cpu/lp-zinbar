import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { landingData } from "@/data/landing-data";

const { actions, reservation } = landingData;

const actionCards = [
  {
    title: "Traçar rota agora",
    description: "Abra o mapa e reduza a fricção de quem já quer sair de casa ou do trabalho.",
    action: actions.directions,
  },
  {
    title: "Reservar mesa",
    description: "Facilite a decisão de grupos, famílias e encontros marcados com antecedência.",
    action: actions.reservation,
  },
  {
    title: "Ver cardápio",
    description: "Antecipe o estilo da casa e aumente a segurança de quem ainda quer conferir as opções.",
    action: actions.menu,
  },
  {
    title: "Falar no WhatsApp",
    description: "Deixe um canal direto e visível para dúvidas rápidas, reservas e confirmações.",
    action: actions.whatsapp,
  },
];

export function ReservationSection() {
  return (
    <section className="py-20 sm:py-24" id="reserva">
      <Container>
        <div className="premium-panel-strong overflow-hidden p-6 sm:p-7 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <SectionHeading
                eyebrow={reservation.eyebrow}
                title={reservation.title}
                description={reservation.description}
              />

              <ul className="mt-8 space-y-4">
                {reservation.notes.map((note) => (
                  <li key={note} className="flex items-start gap-3 text-sm leading-7 text-mist/78">
                    <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full border border-champagne/16 bg-champagne/10 text-champagne">
                      <Icon name="check" className="h-4 w-4" />
                    </span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-2">
              {actionCards.map((item, index) => (
                <Reveal key={item.title} delay={index * 70}>
                  <div className="rounded-[26px] border border-white/10 bg-black/10 p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-champagne">
                      <Icon name={item.action.icon} />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-ivory">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-mist/76">{item.description}</p>
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
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

