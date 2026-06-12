"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { Icon } from "@/components/icons";
import { landingData } from "@/data/landing-data";
import type { ReservationMode } from "@/data/landing-data";
import {
  getBlockedReservationDate,
  getReservationDateMin,
  getReservationTimeOptions,
} from "@/utils/schedule";

type SubmitState = "idle" | "submitting" | "error";

const { reservation, schedule } = landingData;
const minReservationDate = getReservationDateMin(schedule.timezone);

function getReservationErrorMessage(error: string) {
  if (reservation.blockedDates.some((blockedDate) => blockedDate.reason === error)) {
    return error;
  }

  switch (error) {
    case `Reservations are only available until ${reservation.sameDayCutoffTime}`:
      return `Não aceitamos reservas para horários depois de ${reservation.sameDayCutoffTime}. Escolha um horário até esse limite.`;
    case "Pix guarantee acknowledgement required":
      return "Confirme no formulário que você está ciente do Pix necessário para seguir com essa reserva.";
    case "Billiards already reserved for this night":
      return "O bilhar já está reservado para essa noite. Escolha outra data ou fale com a casa pelo WhatsApp.";
    case "Reservation time unavailable":
      return "Esse horário não está mais disponível. Escolha outro horário para continuar.";
    default:
      return "Não conseguimos enviar sua reserva agora. Tente novamente em alguns segundos.";
  }
}

export function ReservationForm() {
  const router = useRouter();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitError, setSubmitError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [reservationType, setReservationType] = useState<ReservationMode>("table");
  const selectedBlockedDate = selectedDate
    ? getBlockedReservationDate(reservation.blockedDates, selectedDate)
    : undefined;

  const timeOptions = selectedDate
    ? getReservationTimeOptions(
        schedule.week,
        selectedDate,
        schedule.timezone,
        30,
        reservation.sameDayCutoffTime,
        reservation.blockedDates,
      )
    : [];
  const requiresPixGuarantee =
    Number(guestCount) > 20 || reservationType === "billiards";
  const isSubmitDisabled =
    submitState === "submitting" || (Boolean(selectedDate) && !timeOptions.length);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");
    setSubmitError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const params = new URLSearchParams(window.location.search);
    const formReservationType =
      formData.get("reservationType") === "billiards" ? "billiards" : "table";

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      whatsapp: String(formData.get("whatsapp") ?? "").trim(),
      reservationType: formReservationType,
      date: String(formData.get("date") ?? ""),
      time: String(formData.get("time") ?? ""),
      guests: Number(formData.get("guests") ?? 0),
      pixGuaranteeRequired:
        Number(formData.get("guests") ?? 0) > 20 || formReservationType === "billiards",
      pixGuaranteeAcknowledged: formData.get("pixGuaranteeAcknowledged") === "on",
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
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? "Reservation request failed");
      }

      router.push("/reserva-confirmada");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? getReservationErrorMessage(error.message)
          : getReservationErrorMessage("Reservation request failed"),
      );
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
              Tipo de reserva
            </span>
            <select
              name="reservationType"
              value={reservationType}
              onChange={(event) => setReservationType(event.target.value as ReservationMode)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-ink outline-none transition [color-scheme:light] focus:border-champagne/45 focus:bg-white"
            >
              {reservation.modes.map((mode) => (
                <option key={mode.value} value={mode.value}>
                  {mode.label}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs leading-6 text-mist/68">
              {
                reservation.modes.find((mode) => mode.value === reservationType)?.description
              }
            </p>
          </label>

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
              min={minReservationDate}
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-ink outline-none transition [color-scheme:light] focus:border-champagne/45 focus:bg-white"
            />
          </label>

          <label>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mist/68">
              Horário
            </span>
            <select
              name="time"
              required
              disabled={!selectedDate || !timeOptions.length}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-ink outline-none transition [color-scheme:light] focus:border-champagne/45 focus:bg-white disabled:cursor-not-allowed disabled:bg-white/70 disabled:text-slate"
            >
              <option value="">
                {!selectedDate
                  ? "Escolha a data"
                  : selectedBlockedDate
                    ? "Data indisponível"
                  : timeOptions.length
                    ? "Escolha o horário"
                    : "Sem horários disponíveis"}
              </option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
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
              value={guestCount}
              onChange={(event) => setGuestCount(event.target.value)}
              placeholder="Ex: 4"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-slate focus:border-champagne/45 focus:bg-white"
            />
          </label>
        </div>

        <div className="mt-4 rounded-2xl border border-champagne/20 bg-white/[0.04] p-4 text-sm leading-6 text-mist/82">
          {selectedBlockedDate
            ? selectedBlockedDate.reason
            : `Você pode enviar a reserva a qualquer hora do dia, mas os horários disponíveis vão apenas até ${reservation.sameDayCutoffTime}.`}
        </div>

        {requiresPixGuarantee ? (
          <div className="mt-4 rounded-2xl border border-champagne/30 bg-champagne/10 p-4 text-sm leading-6 text-mist/88">
            <p className="font-semibold text-ivory">
              {reservationType === "billiards"
                ? "A reserva do bilhar exige Pix antecipado para confirmação."
                : "Reservas acima de 20 pessoas precisam de Pix de garantia."}
            </p>
            <p className="mt-1">
              {reservationType === "billiards"
                ? "Só pode existir uma reserva de bilhar por noite. A equipe vai validar a disponibilidade e enviar os dados do Pix pelo WhatsApp para concluir a confirmação."
                : "A equipe do Zin Bar vai enviar os dados do Pix pelo WhatsApp para confirmar a reserva do grupo."}
            </p>
            <label className="mt-3 flex items-start gap-3 text-mist/86">
              <input
                name="pixGuaranteeAcknowledged"
                type="checkbox"
                required={requiresPixGuarantee}
                className="mt-1 h-4 w-4 rounded border-white/20 accent-champagne"
              />
              <span>
                Estou ciente de que será necessário fazer um Pix para essa reserva seguir para
                confirmação.
              </span>
            </label>
          </div>
        ) : null}

        {submitState === "error" ? (
          <p className="mt-4 rounded-2xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-100">
            {submitError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="focus-ring shimmer-on-hover cta-ring group relative mt-6 inline-flex w-full items-center justify-center overflow-hidden rounded-full border border-champagne/25 bg-[linear-gradient(135deg,#9d2235_0%,#7a1a2d_45%,#4b121b_100%)] px-5 py-3 text-sm font-semibold tracking-wide text-white transition duration-300 ease-out hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Icon name="calendar" className="h-4 w-4" />
            {submitState === "submitting"
              ? "Enviando reserva..."
              : selectedBlockedDate
                ? "Reservas encerradas nesta data"
                : "Enviar reserva"}
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
