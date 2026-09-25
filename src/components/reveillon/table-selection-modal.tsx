"use client";

import { useState } from "react";
import {
  eventConfig,
  formatMoney,
  type VenueTable,
} from "@/data/reveillon-config";
import { Dialog } from "./dialog";
import { useReveillon } from "./reveillon-provider";

export function TableSelectionModal({
  table,
  onClose,
}: {
  table: VenueTable;
  onClose: () => void;
}) {
  const { items, setTable } = useReveillon();
  const existing = items.find((item) => item.tableId === table.id);
  const [quantity, setQuantity] = useState(
    existing?.quantity ?? Math.min(2, table.capacity ?? 1),
  );
  const available = table.status === "available" && table.capacity !== null;
  return (
    <Dialog
      titleId="table-modal-title"
      onClose={onClose}
      className="rv-table-dialog"
    >
      <p className="rv-eyebrow">
        {table.sector ? `SETOR ${table.sector}` : "SALÃO · SETOR A CONFIRMAR"}
      </p>
      <div className="rv-modal-table-art" aria-hidden="true">
        <span className={`rv-mini-table ${table.shape}`}>{table.number}</span>
      </div>
      <h2 id="table-modal-title">Mesa {table.number}</h2>
      <p className="rv-muted">
        {table.capacity === null
          ? "Capacidade a confirmar"
          : `${table.capacity} lugares${available ? " disponíveis" : " na referência"}`}
      </p>
      {table.needsReview ? (
        <p className="rv-review-note">{table.reviewNote}</p>
      ) : null}
      {available ? (
        <>
          <div className="rv-quantity-row">
            <label htmlFor="rv-quantity">
              Seus lugares<small>Capacidade de {table.capacity} pessoas</small>
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
                disabled={quantity >= (table.capacity ?? 0)}
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
              setTable(table.id, quantity);
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
        Prévia visual · sua seleção não gera uma reserva.
      </p>
    </Dialog>
  );
}
