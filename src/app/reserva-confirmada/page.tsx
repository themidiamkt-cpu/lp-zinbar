import type { Metadata } from "next";

import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Icon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { landingData } from "@/data/landing-data";

const { actions, business } = landingData;

export const metadata: Metadata = {
  title: "Reserva confirmada",
  description: `Recebemos sua solicitação de reserva no ${business.name}.`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReservationConfirmedPage() {
  return (
    <main className="min-h-screen bg-ink px-4 py-8 text-ivory sm:px-6">
      <Container className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <section className="premium-panel-strong relative w-full max-w-3xl overflow-hidden p-6 text-center sm:p-10 lg:p-12">
          <div className="hero-grid absolute inset-0 opacity-15" />
          <div
            className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-champagne/12 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-garnet/30 blur-3xl"
            aria-hidden
          />

          <div className="relative z-10">
            <div className="flex justify-center">
              <Logo compact />
            </div>

            <div className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-full border border-champagne/30 bg-champagne/12 text-champagne shadow-glow">
              <Icon name="check" className="h-8 w-8" />
            </div>

            <p className="mt-7 text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-champagne/85">
              Reserva enviada
            </p>
            <h1 className="section-title mx-auto mt-4 max-w-2xl">
              Recebemos sua solicitação de reserva.
            </h1>
            <p className="section-body mx-auto mt-5 max-w-xl">
              A equipe do Zin Bar vai conferir os dados e chamar você pelo WhatsApp para
              confirmar os detalhes da mesa.
            </p>

            <div className="mx-auto mt-9 flex max-w-xl flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/" icon="arrowRight">
                Voltar ao site
              </ButtonLink>
              <ButtonLink
                href={actions.whatsapp.href}
                icon={actions.whatsapp.icon}
                variant="secondary"
                external={actions.whatsapp.external}
              >
                Falar no WhatsApp
              </ButtonLink>
            </div>

            <p className="mx-auto mt-8 max-w-md text-sm leading-7 text-mist/62">
              {business.fullAddress} • {business.telephoneDisplay}
            </p>
          </div>
        </section>
      </Container>
    </main>
  );
}
