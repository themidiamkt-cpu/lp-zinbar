"use client";

import Link from "next/link";
import { Container } from "@/components/container";
import { Icon } from "@/components/icons";
import {
  formatMoney,
  getCartTotal,
  type CartItem,
} from "@/data/reveillon-config";
import { useReveillon } from "./reveillon-provider";
import { CartItems } from "./cart";

const example: CartItem[] = [{ tableId: "A-14", quantity: 2 }];
export function SuccessMock() {
  const { order, ready } = useReveillon();
  const summary = order?.length ? order : example;
  if (!ready)
    return (
      <Container className="rv-flow-page">
        <p role="status">Carregando confirmação…</p>
      </Container>
    );
  return (
    <Container className="rv-flow-page rv-success-page">
      <div className="rv-demo-banner">
        <Icon name="spark" /> SIMULAÇÃO · Nenhuma cobrança ou reserva foi
        realizada.
      </div>
      <div className="rv-success-check">
        <Icon name="check" />
      </div>
      <p className="rv-eyebrow">PAGAMENTO CONFIRMADO</p>
      <h1 className="rv-title">
        O próximo brinde
        <br />
        <em>é com você.</em>
      </h1>
      <p className="rv-success-message">
        Seu lugar no Réveillon 2027 do
        <br />
        <strong>Zin Bar & Restaurante</strong> está garantido.
      </p>
      <p className="rv-fine-print">
        Texto de confirmação ilustrativo. Esta prévia não garante lugares.
      </p>
      <div className="rv-success-ticket">
        <div className="rv-ticket-top">
          <span>
            RÉVEILLON <strong>2027</strong>
          </span>
          <span>
            Uma nova noite
            <br />
            <small>ZIN BAR & RESTAURANTE</small>
          </span>
        </div>
        <p className="rv-overline">
          {order?.length ? "SUA SELEÇÃO SIMULADA" : "EXEMPLO DE SELEÇÃO"}
        </p>
        <CartItems items={summary} />
        <div className="rv-cart-total">
          <span>Total ilustrativo</span>
          <strong>{formatMoney(getCartTotal(summary))}</strong>
        </div>
        <div className="rv-ticket-bottom">
          <Icon name="glass" />
          <div>
            <strong>Estamos preparando seus convites.</strong>
            <p>Mensagem ilustrativa. Nenhum convite ou QR Code será emitido.</p>
          </div>
        </div>
      </div>
      <Link href="/reveillon" className="rv-button">
        VOLTAR AO RÉVEILLON <span aria-hidden="true">→</span>
      </Link>
    </Container>
  );
}
