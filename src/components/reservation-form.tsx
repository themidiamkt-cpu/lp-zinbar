"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { Icon } from "@/components/icons";

type SubmitState = "idle" | "submitting" | "error";

export function ReservationForm() {
  const router = useRouter();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const params = new URLSearchParams(window.location.search);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      whatsapp: String(formData.get("whatsapp") ?? "").trim(),
      date: String(formData.get("date") ?? ""),
      time: String(formData.get("time") ?? ""),
      guests: Number(formData.get("guests") ?? 0),
      pageUrl: window.location.href,
      referrer: document.referrer,
      utmSource: params.get("utm_source"),
      utmMedium: params.get("utm_medium"),
      utmCampaign: params.get("utm_campaign"),
      utmTerm: params.get("utm_term"),
      utmContent: params.get("utm_content"),
    };

    try {
      const response = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Reservation request failed");
      }

      router.push("/reserva-confirmada");
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-[26px] border border-champagne/25 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(0,0,0,0.2))] p-5 shadow-glow sm:p-6"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-champagne/10 blur-3xl" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-champagne/85">
              Reserva online
            </p>
            <h3 className="mt-3 font-serif text-2xl leading-tight text-ivory">
              Garanta sua mesa
            </h3>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-champagne/25 bg-champagne/10 text-champagne">
            <Icon name="calendar" className="h-5 w-5" />
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mist/68">
              Nome
            </span>
            <input
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Seu nome"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-slate focus:border-champagne/45 focus:bg-white"
            />
          </label>

          <label className="sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mist/68">
              WhatsApp
            </span>
            <input
              name="whatsapp"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              placeholder="(19) 99999-9999"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-slate focus:border-champagne/45 focus:bg-white"
            />
          </label>

          <label>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mist/68">
              Data
            </span>
            <input
              name="date"
              type="date"
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-ink outline-none transition [color-scheme:light] focus:border-champagne/45 focus:bg-white"
            />
          </label>

          <label>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mist/68">
              Horário
            </span>
            <input
              name="time"
              type="time"
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-ink outline-none transition [color-scheme:light] focus:border-champagne/45 focus:bg-white"
            />
          </label>

          <label className="sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mist/68">
              Número de pessoas
            </span>
            <input
              name="guests"
              type="number"
              min="1"
              max="80"
              required
              inputMode="numeric"
              placeholder="Ex: 4"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-slate focus:border-champagne/45 focus:bg-white"
            />
          </label>
        </div>

        {submitState === "error" ? (
          <p className="mt-4 rounded-2xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-100">
            Não conseguimos enviar sua reserva agora. Tente novamente em alguns segundos.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitState === "submitting"}
          className="focus-ring shimmer-on-hover cta-ring group relative mt-6 inline-flex w-full items-center justify-center overflow-hidden rounded-full border border-champagne/25 bg-[linear-gradient(135deg,#9d2235_0%,#7a1a2d_45%,#4b121b_100%)] px-5 py-3 text-sm font-semibold tracking-wide text-white transition duration-300 ease-out hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Icon name="calendar" className="h-4 w-4" />
            {submitState === "submitting" ? "Enviando reserva..." : "Enviar reserva"}
            <Icon
              name="arrowRight"
              className="h-3.5 w-3.5 -translate-x-0.5 opacity-70 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
            />
          </span>
        </button>
      </div>
    </form>
  );
}
