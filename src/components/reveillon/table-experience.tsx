"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/container";
import { Icon } from "@/components/icons";
import {
  tableConfig,
  sectorConfig,
  statusLabels,
  formatMoney,
  getCartTotal,
  type SectorId,
  type VenueTable,
} from "@/data/reveillon-config";
import { InteractiveVenueMap, SectorFilter } from "./interactive-venue-map";
import { TableSelectionModal } from "./table-selection-modal";
import { Cart } from "./cart";
import { Dialog } from "./dialog";
import { useReveillon } from "./reveillon-provider";

export function TableExperience() {
  const { items } = useReveillon();
  const [sector, setSector] = useState<SectorId | null>(null);
  const [selectedTable, setSelectedTable] = useState<VenueTable | null>(null);
  const [focusedTable, setFocusedTable] = useState<VenueTable | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [view, setView] = useState<"map" | "list">("map");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [mapReached, setMapReached] = useState(false);
  const section = useRef<HTMLElement>(null);
  const tables = tableConfig.filter(
    (table) =>
      (!sector || table.sector === sector) &&
      (!onlyAvailable || table.status === "available"),
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
    setFocusedTable(null);
  }
  function chooseFromList(table: VenueTable) {
    setFocusedTable(table);
    setSector(table.sector);
    setView("map");
    setSelectedTable(table);
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
              Explore os ambientes, encontre sua mesa
              <br />e escolha quem vai brindar com você.
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
              aria-label="Forma de encontrar mesas"
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
                <Icon name="menu" /> Encontrar uma mesa
              </button>
            </div>
            <div hidden={view !== "map"}>
              <InteractiveVenueMap
                sector={sector}
                onSectorChange={changeSector}
                focusedTable={focusedTable}
                onSelect={setSelectedTable}
              />
            </div>
            {view === "list" ? (
              <div className="rv-table-finder">
                <div className="rv-finder-header">
                  <div>
                    <h3>Encontrar uma mesa</h3>
                    <p>Escolha um setor e toque em uma mesa.</p>
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
                  <span>Mostrar somente mesas disponíveis</span>
                </label>
                <p className="rv-fine-print" role="status">
                  {tables.length} mesas nesta visualização
                </p>
                <div className="rv-table-list">
                  {tables.length === 0 ? (
                    <p className="rv-muted">
                      Nenhuma mesa disponível neste setor. Escolha outro setor
                      ou desmarque o filtro de disponibilidade.
                    </p>
                  ) : null}
                  {tables.map((table) => (
                    <button
                      key={table.id}
                      type="button"
                      data-list-table={table.id}
                      className={
                        items.some((item) => item.tableId === table.id)
                          ? "rv-list-table rv-list-table-selected"
                          : "rv-list-table"
                      }
                      disabled={table.status !== "available"}
                      onClick={() => chooseFromList(table)}
                    >
                      <span className="rv-list-table-number">
                        {table.number}
                      </span>
                      <span>
                        <strong>
                          Mesa {table.number}
                          {table.needsReview ? " *" : ""}
                        </strong>
                        <small>
                          {table.sector
                            ? `Setor ${table.sector}`
                            : "Setor a confirmar"}{" "}
                          ·{" "}
                          {table.capacity
                            ? `${table.capacity} lugares`
                            : "Capacidade a confirmar"}
                        </small>
                      </span>
                      <span className="rv-list-table-status">
                        {items.some((item) => item.tableId === table.id)
                          ? "Sua seleção"
                          : statusLabels[table.status]}
                        <span aria-hidden="true">
                          {table.status === "available" ? "↗" : "—"}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="rv-map-footnote">
              <Icon name="spark" />
              <p>
                Preços e disponibilidade são demonstrativos.
                <br />
                Sua seleção não bloqueia mesas e não realiza reservas.
              </p>
            </div>
            <details className="rv-map-review">
              <summary>
                Sobre a planta e mesas em revisão{" "}
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                A disposição foi reconstruída a partir da planta fornecida.
                Posições e capacidades precisam de validação final pela equipe.
              </p>
              <ul>
                <li>
                  <strong>Setor C:</strong> o número 34 aparece em duas mesas.
                  Os dois desenhos foram mantidos com identificadores internos
                  distintos. O número 28 não aparece e não foi criado.
                </li>
                <li>
                  <strong>Mesa 27, setor B:</strong> quantidade de cadeiras
                  pouco legível; capacidade pendente.
                </li>
                <li>
                  <strong>Mesas 59–62, setor I:</strong> a referência não
                  informa cadeiras; capacidades pendentes.
                </li>
                <li>
                  <strong>Mesa 100:</strong> aparece ao lado do bar, fora dos
                  setores; setor e participação a confirmar.
                </li>
              </ul>
              <p>
                Mesas marcadas com * estão indisponíveis nesta prévia até a
                revisão.
              </p>
            </details>
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
        {selectedTable ? (
          <TableSelectionModal
            key={selectedTable.id}
            table={selectedTable}
            onClose={() => setSelectedTable(null)}
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
