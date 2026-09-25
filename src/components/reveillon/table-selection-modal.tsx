"use client";

import { useState } from "react";
import {
  eventConfig,
  formatMoney,
  sectorConfig,
  sectorCapacity,
  type SectorId,
} from "@/data/reveillon-config";
import { Dialog } from "./dialog";
import { useReveillon } from "./reveillon-provider";

export function SectorSelectionModal({
  sectorId,
  onClose,
}: {
  sectorId: SectorId;
  onClose: () => void;
}) {
  const { items, setSectorSelection } = useReveillon();
  const sector = sectorConfig.find((entry) => entry.id === sectorId)!;
  const capacity = sectorCapacity(sectorId);
  const existing = items.find((item) => item.sectorId === sectorId);
  const [quantity, setQuantity] = useState(
    existing?.quantity ?? Math.min(2, capacity || 1),
  );
  const available = capacity > 0;
  return (
    <Dialog
      titleId="sector-modal-title"
      onClose={onClose}
      className="rv-table-dialog"
    >
      <p className="rv-eyebrow">{sector.name.toUpperCase()}</p>
      <div className="rv-modal-table-art" aria-hidden="true">
        <span className="rv-mini-table round">{sector.id}</span>
      </div>
      <h2 id="sector-modal-title">Setor {sector.id}</h2>
      <p className="rv-muted">
        {available
          ? `${capacity} lugares disponíveis no setor`
          : "Setor esgotado nesta prévia"}
      </p>
      {available ? (
        <>
          <div className="rv-quantity-row">
            <label htmlFor="rv-quantity">
              Seus lugares
              <small>Capacidade de {capacity} pessoas no setor</small>
            </label>
            <div className="rv-stepper">
              <button
                type="button"
                disabled={quantity <= 1}
                onClick={() => setQuantity((value) => value - 1)}
                aria-label="Diminuir quantidade"
              >
                −
              </button>
              <output id="rv-quantity" aria-live="polite">
                {quantity}
              </output>
              <button
                type="button"
                disabled={quantity >= capacity}
                onClick={() => setQuantity((value) => value + 1)}
                aria-label="Aumentar quantidade"
              >
                +
              </button>
            </div>
          </div>
          <p className="rv-price-person">
            <strong>{formatMoney(eventConfig.pricePerPerson)}</strong> por
            pessoa <span>{eventConfig.priceLabel}</span>
          </p>
          <div className="rv-modal-subtotal">
            <span>Subtotal</span>
            <strong>
              {formatMoney(quantity * eventConfig.pricePerPerson)}
            </strong>
          </div>
          <button
            type="button"
            className="rv-button rv-button-full"
            onClick={() => {
              setSectorSelection(sector.id, quantity);
              onClose();
            }}
          >
            {existing ? "ATUALIZAR SELEÇÃO" : "ADICIONAR AO CARRINHO"}
            <span aria-hidden="true">→</span>
          </button>
        </>
      ) : (
        <button
          type="button"
          className="rv-button rv-button-full"
          onClick={onClose}
        >
          VOLTAR AO MAPA
        </button>
      )}
      <p className="rv-fine-print">
        A mesa exata dentro do setor é definida pela equipe do Zin no dia do
        evento. Prévia visual · sua seleção não gera uma reserva.
      </p>
    </Dialog>
  );
}
