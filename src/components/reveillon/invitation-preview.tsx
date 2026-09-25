"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/container";
import { eventConfig, tableConfig } from "@/data/reveillon-config";
import { useReveillon } from "./reveillon-provider";
import {
  normalizeInvitationCode,
  type MockInvitation,
} from "./mock-invitations";
import { InvitationQRCode } from "./invitation-qr";

export function InvitationLinks({
  invitations,
}: {
  invitations: MockInvitation[];
}) {
  return (
    <ul className="rv-invitation-list">
      {invitations.map((invitation) => {
        const table = tableConfig.find((t) => t.id === invitation.tableId)!;
        return (
          <li key={invitation.code}>
            <Link href={`/reveillon/convite/${invitation.code}`}>
              <span className="rv-invitation-symbol" aria-hidden="true">
                ✧
              </span>
              <span>
                <strong>
                  Mesa {table.number} · Convite {invitation.guest}
                </strong>
                <small>Setor {table.sector} · 1 pessoa</small>
                <code>{invitation.code}</code>
              </span>
              <span aria-hidden="true">↗</span>
              <span className="sr-only">Abrir convite</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function InvitationLookup() {
  const { invitations, ready } = useReveillon();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  function lookup(event: FormEvent) {
    event.preventDefault();
    const normalized = normalizeInvitationCode(code);
    if (!invitations.some((invitation) => invitation.code === normalized)) {
      setError(
        "Código não encontrado neste navegador. Confira o código ou use o navegador em que a simulação foi concluída.",
      );
      return;
    }
    router.push(`/reveillon/convite/${normalized}`);
  }
  return (
    <Container className="rv-flow-page rv-invitations-page">
      <p className="rv-eyebrow">RÉVEILLON 2027 · ZIN</p>
      <h1 className="rv-title">
        Seu próximo
        <br />
        <em>brinde está aqui.</em>
      </h1>
      <p className="rv-invitation-intro">
        Consulte seu código ou abra um dos convites salvos neste navegador.
      </p>
      <div className="rv-demo-banner">
        CONVITES DEMONSTRATIVOS · Sem validade de entrada.
      </div>
      <form onSubmit={lookup} className="rv-invitation-lookup">
        <label htmlFor="rv-invitation-code">Código do convite</label>
        <div>
          <input
            id="rv-invitation-code"
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
              setError("");
            }}
            placeholder="ZIN-2027-XXXXXXXXXXXX"
            autoCapitalize="characters"
            autoComplete="off"
            spellCheck={false}
            required
            maxLength={40}
            aria-invalid={!!error}
            aria-describedby={error ? "rv-invitation-error" : undefined}
          />
          <button className="rv-button" disabled={!ready}>
            ABRIR CONVITE <span aria-hidden="true">→</span>
          </button>
        </div>
        {error && (
          <p id="rv-invitation-error" role="alert">
            {error}
          </p>
        )}
      </form>
      {!ready ? (
        <p role="status">Carregando seus convites…</p>
      ) : invitations.length ? (
        <>
          <h2 className="rv-invitation-subtitle">
            Meus convites <span>({invitations.length})</span>
          </h2>
          <InvitationLinks invitations={[...invitations].reverse()} />
        </>
      ) : (
        <p className="rv-invitation-intro">
          Nenhum convite salvo ainda. Conclua uma seleção demonstrativa para
          gerar um convite por lugar.
        </p>
      )}
      <p className="rv-fine-print">
        Os convites ficam apenas neste navegador. Limpar os dados do site remove
        os códigos. Não são enviados por e-mail.
      </p>
      <Link className="rv-text-link" href="/reveillon">
        VOLTAR AO RÉVEILLON ↗
      </Link>
    </Container>
  );
}

export function InvitationPreview({ code }: { code: string }) {
  const { invitations, ready, invitationsSaved } = useReveillon();
  const [copyMessage, setCopyMessage] = useState("");
  if (!ready)
    return (
      <Container className="rv-flow-page">
        <p role="status">Carregando convite…</p>
      </Container>
    );
  const invitation = invitations.find(
    (item) => item.code === normalizeInvitationCode(code),
  );
  if (!invitation)
    return (
      <Container className="rv-flow-page rv-invitations-page">
        <p className="rv-eyebrow">CONVITE DEMONSTRATIVO</p>
        <h1 className="rv-title">
          Convite não
          <br />
          <em>encontrado.</em>
        </h1>
        <p className="rv-invitation-intro">
          Este código não está salvo neste navegador. Abra o link no navegador
          em que você concluiu a simulação ou consulte seus códigos.
        </p>
        <Link href="/reveillon/convites" className="rv-button">
          CONSULTAR CONVITES →
        </Link>
      </Container>
    );
  const table = tableConfig.find((t) => t.id === invitation.tableId)!;
  async function copy() {
    try {
      await navigator.clipboard.writeText(invitation!.code);
      setCopyMessage("Código copiado.");
    } catch {
      setCopyMessage("Selecione o código acima para copiá-lo.");
    }
  }
  return (
    <Container className="rv-flow-page rv-invitation-page">
      <p className="rv-eyebrow">UM NOVO ANO. UM NOVO BRINDE.</p>
      <h1 className="rv-title">
        O seu <em>convite.</em>
      </h1>
      <article
        className="rv-personal-invitation"
        aria-label="Convite individual demonstrativo"
      >
        <div className="rv-invitation-head">
          <span className="rv-invitation-venue">ZIN BAR & RESTAURANTE</span>
          <span className="rv-invitation-star" aria-hidden="true">
            ✧
          </span>
          <p>RÉVEILLON</p>
          <strong>2027</strong>
          <em>Uma noite para lembrar.</em>
        </div>
        <div className="rv-invitation-perforation" aria-hidden="true" />
        <div className="rv-invitation-body">
          <p className="rv-overline">CONVITE INDIVIDUAL · 1 PESSOA</p>
          <h2>Mesa {table.number}</h2>
          <p className="rv-invitation-place">
            Setor {table.sector} · Convite {invitation.guest}
          </p>
          <dl className="rv-invitation-details">
            <div>
              <dt>Data</dt>
              <dd>{eventConfig.date}</dd>
            </div>
            <div>
              <dt>Horário</dt>
              <dd>{eventConfig.time}</dd>
            </div>
            <div>
              <dt>Local</dt>
              <dd>{eventConfig.address}</dd>
            </div>
          </dl>
          <div className="rv-invitation-code">
            <InvitationQRCode value={invitation.code} />
            <div className="rv-invitation-code-copy">
              <span>SEU CÓDIGO DE CONSULTA</span>
              <code>{invitation.code}</code>
              <button type="button" onClick={copy}>
                COPIAR CÓDIGO ↗
              </button>
              <p role="status">{copyMessage}</p>
            </div>
          </div>
          <p className="rv-invitation-demo">
            DEMONSTRATIVO · SEM VALIDADE DE ENTRADA
          </p>
          <p className="rv-fine-print">
            Não representa pagamento, reserva ou ingresso real. O QR Code é
            ilustrativo e não é validado na entrada.
          </p>
        </div>
      </article>
      {!invitationsSaved && (
        <p role="alert" className="rv-demo-banner">
          O navegador não permitiu salvar seus convites. Eles estão disponíveis
          apenas enquanto esta página permanecer aberta.
        </p>
      )}
      <p className="rv-invitation-intro">
        Guarde este código ou favorite esta página. Você pode voltar a este
        convite neste mesmo navegador.
      </p>
      <Link href="/reveillon/convites" className="rv-button">
        MEUS CONVITES →
      </Link>
    </Container>
  );
}
