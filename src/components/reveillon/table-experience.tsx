"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/container";
import { Icon } from "@/components/icons";
import {
  sectorConfig,
  sectorCapacity,
  formatMoney,
  getCartTotal,
  type SectorId,
} from "@/data/reveillon-config";
import { InteractiveVenueMap, SectorFilter } from "./interactive-venue-map";
import { SectorSelectionModal } from "./table-selection-modal";
import { Cart } from "./cart";
import { Dialog } from "./dialog";
import { useReveillon } from "./reveillon-provider";

export function TableExperience() {
  const { items } = useReveillon();
  const [sector, setSector] = useState<SectorId | null>(null);
  const [selectedSector, setSelectedSector] = useState<SectorId | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [view, setView] = useState<"map" | "list">("map");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [mapReached, setMapReached] = useState(false);
  const section = useRef<HTMLElement>(null);
  const sectors = sectorConfig.filter(
    (item) =>
      (!sector || item.id === sector) &&
      (!onlyAvailable || sectorCapacity(item.id) > 0),
  );
  const quantity = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (!section.current) return;
    const observer = new IntersectionObserver(
      ([entry]) =>
        setMapReached(entry.isIntersecting || entry.boundingClientRect.top < 0),
      { rootMargin: "0px 0px -20% 0px" },
    );
    observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  function changeSector(id: SectorId | null) {
    setSector(id);
  }
  function chooseSector(id: SectorId) {
    setSector(id);
    setView("map");
    setSelectedSector(id);
  }

  return (
    <section
      ref={section}
      id="mesas"
      className="rv-section rv-selection-section"
    >
      <Container>
        <div className="rv-section-heading">
          <div>
            <p className="rv-eyebrow">ESCOLHA ONDE CELEBRAR</p>
            <h2 className="rv-title">
              Toda boa noite
              <br />
              começa <em>à mesa.</em>
            </h2>
          </div>
          <div>
            <p>
              Explore os ambientes, encontre seu setor
              <br />e escolha quantos vão brindar com você.
            </p>
            <span className="rv-section-meta">
              14 SETORES <span>·</span> DIFERENTES FORMAS DE VIVER O ZIN
            </span>
          </div>
        </div>
        <div className="rv-selection-toolbar">
          <span className="rv-filter-label">SETORES</span>
          <SectorFilter selected={sector} onChange={changeSector} />
        </div>
        <div className="rv-selection-layout">
          <div className="rv-map-column">
            <div
              className="rv-view-switch"
              role="group"
              aria-label="Forma de encontrar um setor"
            >
              <button
                type="button"
                aria-pressed={view === "map"}
                onClick={() => setView("map")}
              >
                <Icon name="mapPin" /> Mapa interativo
              </button>
              <button
                type="button"
                aria-pressed={view === "list"}
                onClick={() => setView("list")}
              >
                <Icon name="menu" /> Encontrar um setor
              </button>
            </div>
            <div hidden={view !== "map"}>
              <InteractiveVenueMap
                sector={sector}
                onSectorChange={changeSector}
                onSelectSector={setSelectedSector}
              />
            </div>
            {view === "list" ? (
              <div className="rv-table-finder">
                <div className="rv-finder-header">
                  <div>
                    <h3>Encontrar um setor</h3>
                    <p>Escolha um setor disponível para ver os detalhes.</p>
                  </div>
                  <label htmlFor="rv-sector-select">
                    Setor
                    <select
                      id="rv-sector-select"
                      value={sector ?? ""}
                      onChange={(event) =>
                        changeSector(
                          (event.target.value || null) as SectorId | null,
                        )
                      }
                    >
                      <option value="">Todos os setores</option>
                      {sectorConfig.map((item) => (
                        <option key={item.id} value={item.id}>
                          Setor {item.id} · {item.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="rv-checkbox rv-available-filter">
                  <input
                    type="checkbox"
                    checked={onlyAvailable}
                    onChange={(event) => setOnlyAvailable(event.target.checked)}
                  />
                  <span>Mostrar somente setores disponíveis</span>
                </label>
                <p className="rv-fine-print" role="status">
                  {sectors.length} setores nesta visualização
                </p>
                <div className="rv-table-list">
                  {sectors.length === 0 ? (
                    <p className="rv-muted">
                      Nenhum setor disponível com este filtro. Desmarque o
                      filtro de disponibilidade.
                    </p>
                  ) : null}
                  {sectors.map((item) => {
                    const capacity = sectorCapacity(item.id);
                    const inCart = items.some(
                      (cartItem) => cartItem.sectorId === item.id,
                    );
                    return (
                      <button
                        key={item.id}
                        type="button"
                        data-list-sector={item.id}
                        className={
                          inCart
                            ? "rv-list-table rv-list-table-selected"
                            : "rv-list-table"
                        }
                        disabled={capacity <= 0}
                        onClick={() => chooseSector(item.id)}
                      >
                        <span className="rv-list-table-number">
                          {item.id}
                        </span>
                        <span>
                          <strong>Setor {item.id}</strong>
                          <small>
                            {item.name} ·{" "}
                            {capacity > 0
                              ? `${capacity} lugares`
                              : "Esgotado nesta prévia"}
                          </small>
                        </span>
                        <span className="rv-list-table-status">
                          {inCart ? "Sua seleção" : capacity > 0 ? "Disponível" : "Esgotado"}
                          <span aria-hidden="true">
                            {capacity > 0 ? "↗" : "—"}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
            <div className="rv-map-footnote">
              <Icon name="spark" />
              <p>
                Preços e disponibilidade são demonstrativos.
                <br />
                Sua seleção não bloqueia setores e não realiza reservas.
              </p>
            </div>
          </div>
          <aside className="rv-desktop-cart">
            <Cart />
          </aside>
        </div>
        {mapReached || quantity > 0 ? (
          <div className="rv-mobile-cart-bar">
            <div aria-live="polite">
              <span>
                {quantity
                  ? `${quantity} ${quantity === 1 ? "lugar selecionado" : "lugares selecionados"}`
                  : "Sua seleção"}
              </span>
              <strong>{formatMoney(getCartTotal(items))}</strong>
            </div>
            <button
              type="button"
              className="rv-button"
              onClick={() => setCartOpen(true)}
            >
              VER CARRINHO <span className="rv-cart-count">{quantity}</span>
            </button>
          </div>
        ) : null}
        {selectedSector ? (
          <SectorSelectionModal
            key={selectedSector}
            sectorId={selectedSector}
            onClose={() => setSelectedSector(null)}
          />
        ) : null}
        {cartOpen ? (
          <Dialog
            titleId="mobile-cart-title"
            onClose={() => setCartOpen(false)}
            className="rv-cart-dialog"
          >
            <Cart
              headingId="mobile-cart-title"
              onContinue={() => setCartOpen(false)}
            />
          </Dialog>
        ) : null}
        <div className="rv-sr-only" aria-live="polite" role="status">
          {quantity} lugares na sua seleção. Total ilustrativo:{" "}
          {formatMoney(getCartTotal(items))}.
        </div>
      </Container>
    </section>
  );
}
