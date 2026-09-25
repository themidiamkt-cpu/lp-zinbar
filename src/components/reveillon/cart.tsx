"use client";

import Link from "next/link";
import { Icon } from "@/components/icons";
import {
  sectorConfig,
  eventConfig,
  formatMoney,
  getCartTotal,
  type CartItem,
} from "@/data/reveillon-config";
import { useReveillon } from "./reveillon-provider";

export function CartItems({
  items,
  removable = false,
}: {
  items: CartItem[];
  removable?: boolean;
}) {
  const { removeSector } = useReveillon();
  return (
    <ul className="rv-cart-items">
      {items.map((item) => {
        const sector = sectorConfig.find(
          (entry) => entry.id === item.sectorId,
        )!;
        return (
          <li key={item.sectorId}>
            <div className="rv-cart-table-number">{sector.id}</div>
            <div className="rv-cart-item-copy">
              <strong>Setor {sector.id}</strong>
              <span>
                {sector.name} · {item.quantity}{" "}
                {item.quantity === 1 ? "lugar" : "lugares"}
              </span>
              <span>
                {formatMoney(item.quantity * eventConfig.pricePerPerson)}
              </span>
            </div>
            {removable ? (
              <button
                type="button"
                className="rv-icon-button"
                onClick={() => removeSector(item.sectorId)}
                aria-label={`Remover setor ${sector.id} da seleção`}
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6" />
                </svg>
              </button>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

export function Cart({
  onContinue,
  headingId = "cart-title",
}: {
  onContinue?: () => void;
  headingId?: string;
}) {
  const { items } = useReveillon();
  const quantity = items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div className="rv-cart">
      <p className="rv-eyebrow">SUA NOITE COMEÇA AQUI</p>
      <h3 id={headingId}>
        Sua seleção <span>{quantity}</span>
      </h3>
      {items.length ? (
        <CartItems items={items} removable />
      ) : (
        <div className="rv-cart-empty">
          <Icon name="glass" />
          <strong>Um lugar para brindar.</strong>
          <p>
            Escolha um setor no mapa
            <br />e traga suas boas companhias.
          </p>
        </div>
      )}
      <div className="rv-cart-total">
        <div>
          <span>Total ilustrativo</span>
          <small>
            {quantity}{" "}
            {quantity === 1 ? "lugar selecionado" : "lugares selecionados"}
          </small>
        </div>
        <strong>{formatMoney(getCartTotal(items))}</strong>
      </div>
      {items.length ? (
        <Link
          className="rv-button rv-button-full"
          href="/reveillon/checkout"
          onClick={onContinue}
        >
          CONTINUAR PARA PAGAMENTO <span aria-hidden="true">→</span>
        </Link>
      ) : (
        <button type="button" className="rv-button rv-button-full" disabled>
          SELECIONE UM SETOR <span aria-hidden="true">→</span>
        </button>
      )}
      <p className="rv-cart-disclaimer">
        <Icon name="spark" /> Apenas uma simulação.
        <br />
        Nenhuma cobrança ou reserva será realizada.
      </p>
    </div>
  );
}
