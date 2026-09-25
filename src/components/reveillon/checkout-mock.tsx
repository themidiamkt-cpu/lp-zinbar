"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/container";
import { Icon } from "@/components/icons";
import {
  eventConfig,
  formatMoney,
  getCartTotal,
} from "@/data/reveillon-config";
import { useReveillon } from "./reveillon-provider";
import { CartItems } from "./cart";

export function CheckoutMock() {
  const { items, ready, completeMock } = useReveillon();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  if (!ready)
    return (
      <Container className="rv-flow-page">
        <p role="status">Carregando sua seleção…</p>
      </Container>
    );
  if (!items.length && !submitted)
    return (
      <Container className="rv-flow-page rv-empty-checkout">
        <Icon name="glass" />
        <p className="rv-eyebrow">RÉVEILLON 2027</p>
        <h1 className="rv-title">
          O primeiro passo é<br />
          <em>escolher seu lugar.</em>
        </h1>
        <p>Seu carrinho está vazio. Explore os setores e escolha o seu.</p>
        <Link href="/reveillon#mesas" className="rv-button">
          ESCOLHER MEU SETOR →
        </Link>
      </Container>
    );
  return (
    <Container className="rv-flow-page">
      <Link href="/reveillon#mesas" className="rv-back-link">
        ← Voltar para os setores
      </Link>
      <div className="rv-flow-steps">
        <span>01 · Seu setor</span>
        <b>02 · Seus dados</b>
        <span>03 · Confirmação</span>
      </div>
      <p className="rv-eyebrow">FALTA POUCO PARA O BRINDE</p>
      <h1 className="rv-title">
        Os detalhes <em>do seu encontro.</em>
      </h1>
      <p className="rv-demo-banner">
        <Icon name="spark" /> Checkout demonstrativo. Nenhum pagamento será
        realizado.
      </p>
      <div className="rv-checkout-grid">
        <form
          className="rv-checkout-form"
          onSubmit={(event) => {
            event.preventDefault();
            if (submitted || !items.length) return;
            setSubmitted(true);
            completeMock();
            router.push("/reveillon/sucesso");
          }}
        >
          <h2>Seus dados</h2>
          <p>Experimente o formulário com dados de exemplo.</p>
          <label htmlFor="rv-name">
            Nome completo
            <input
              id="rv-name"
              name="name"
              placeholder="Seu nome e sobrenome"
              autoComplete="name"
              minLength={3}
              maxLength={100}
              required
            />
          </label>
          <label htmlFor="rv-phone">
            WhatsApp
            <input
              id="rv-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              placeholder="(19) 99999-9999"
              autoComplete="tel"
              maxLength={22}
              required
              onInput={(event) => {
                const value = event.currentTarget.value.replace(/\D/g, "");
                event.currentTarget.setCustomValidity(
                  /^\d{10,11}$/.test(value) || /^55\d{10,11}$/.test(value)
                    ? ""
                    : "Informe um telefone com DDD, com 10 ou 11 dígitos.",
                );
              }}
            />
          </label>
          <label htmlFor="rv-email">
            E-mail
            <input
              id="rv-email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              autoComplete="email"
              maxLength={150}
              required
            />
          </label>
          <details className="rv-checkout-terms">
            <summary>Termos desta demonstração</summary>
            <p>
              Esta é uma prévia da experiência de compra. Preços e
              disponibilidade são ilustrativos. Os dados deste formulário não
              são enviados nem armazenados. Não há cobrança, reserva, emissão de
              convite ou garantia de lugar. As condições oficiais do evento e de
              cancelamento serão publicadas antes da abertura das vendas.
            </p>
          </details>
          <label className="rv-checkbox">
            <input type="checkbox" name="terms" required />
            <span>
              Li os termos e entendo que esta é uma simulação, sem pagamento ou
              reserva real.
            </span>
          </label>
          <button
            className="rv-button rv-button-full"
            type="submit"
            disabled={submitted}
          >
            {submitted ? "ABRINDO CONFIRMAÇÃO…" : "IR PARA PAGAMENTO"}
            <span aria-hidden="true">→</span>
          </button>
          <p className="rv-fine-print">
            Este botão abre a confirmação visual da simulação.
          </p>
        </form>
        <aside className="rv-order-summary">
          <p className="rv-eyebrow">SEU RÉVEILLON NO ZIN</p>
          <h2>Resumo da seleção</h2>
          <div className="rv-order-event">
            <Icon name="calendar" />
            <div>
              <strong>{eventConfig.date}</strong>
              <span>{eventConfig.time}</span>
            </div>
          </div>
          <CartItems items={items} />
          <div className="rv-cart-total">
            <span>Total ilustrativo</span>
            <strong>{formatMoney(getCartTotal(items))}</strong>
          </div>
          <p className="rv-fine-print">
            Valores demonstrativos, sujeitos à definição do evento.
          </p>
          <Link href="/reveillon#mesas" className="rv-text-link">
            EDITAR MINHA SELEÇÃO ↗
          </Link>
        </aside>
      </div>
    </Container>
  );
}
