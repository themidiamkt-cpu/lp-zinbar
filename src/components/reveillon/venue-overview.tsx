"use client";

import { useState } from "react";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button-link";
import { eventConfig, type SectorId } from "@/data/reveillon-config";
import { InteractiveVenueMap, SectorFilter } from "./interactive-venue-map";

export function VenueOverview() {
  const [sector, setSector] = useState<SectorId | null>(null);
  return (
    <section
      id="mesas"
      className="rv-section rv-selection-section rv-whatsapp-overview"
    >
      <Container>
        <div className="rv-section-heading">
          <div>
            <p className="rv-eyebrow">CONHEÇA OS AMBIENTES</p>
            <h2 className="rv-title">
              Toda boa noite
              <br />
              começa <em>à mesa.</em>
            </h2>
          </div>
          <p>
            Explore os setores do Zin.
            <br />
            Consulte disponibilidade e valores pelo WhatsApp.
          </p>
        </div>
        <div className="rv-selection-toolbar">
          <span className="rv-filter-label">SETORES</span>
          <SectorFilter selected={sector} onChange={setSector} />
        </div>
        <InteractiveVenueMap
          sector={sector}
          onSectorChange={setSector}
          onSelectSector={setSector}
          informational
        />
        <div className="rv-whatsapp-map-contact">
          <p>
            As vendas do Réveillon são feitas pelo WhatsApp da equipe do Zin.
          </p>
          <ButtonLink href={eventConfig.whatsappHref} external icon="whatsapp">
            FALAR SOBRE O RÉVEILLON
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
