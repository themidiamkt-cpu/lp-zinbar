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
import { InvitationLinks } from "./invitation-preview";
import { CartItems } from "./cart";

const example: CartItem[] = [{ sectorId: "A", quantity: 2 }];
export function SuccessMock() {
  const { order, ready, orderInvitations, invitationsSaved } = useReveillon();
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
            <strong>
              {orderInvitations.length
                ? `${orderInvitations.length} convites demonstrativos prontos.`
                : "Seus convites aparecem após concluir uma simulação."}
            </strong>
            <p>Um código por lugar. Sem validade de entrada.</p>
          </div>
        </div>
      </div>
      {orderInvitations.length > 0 && (
        <section
          className="rv-success-invitations"
          aria-label="Seus convites demonstrativos"
        >
          <h2 className="rv-invitation-subtitle">Um lugar. Um convite.</h2>
          <InvitationLinks invitations={orderInvitations} />
          <p className="rv-fine-print">
            Salvos neste navegador. Abra cada convite para consultar seu código
            individual.
          </p>
        </section>
      )}
      {!invitationsSaved && (
        <p role="alert" className="rv-demo-banner">
          Não foi possível salvar os convites neste navegador. Eles ficarão
          disponíveis apenas nesta sessão aberta.
        </p>
      )}
      <Link href="/reveillon/convites" className="rv-button">
        CONSULTAR MEUS CONVITES →
      </Link>
      <Link href="/reveillon" className="rv-text-link">
        VOLTAR AO RÉVEILLON <span aria-hidden="true">→</span>
      </Link>
    </Container>
  );
}
