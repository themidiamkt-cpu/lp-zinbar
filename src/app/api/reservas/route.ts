import { NextResponse } from "next/server";

import { landingData } from "@/data/landing-data";
import { isReservationSlotAvailable } from "@/utils/schedule";

const WEBHOOK_URL = "https://automacao2.themidiamarketing.com.br/webhook/zin-reservas";
const { schedule } = landingData;

type ReservationPayload = {
  name?: string;
  whatsapp?: string;
  date?: string;
  time?: string;
  guests?: number;
  pixGuaranteeRequired?: boolean;
  pixGuaranteeAcknowledged?: boolean;
  pageUrl?: string;
  referrer?: string;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmTerm?: string | null;
  utmContent?: string | null;
};

export async function POST(request: Request) {
  let payload: ReservationPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = payload.name?.trim();
  const whatsapp = payload.whatsapp?.trim();
  const date = payload.date?.trim();
  const time = payload.time?.trim();
  const guests = Number(payload.guests);

  if (!name || !whatsapp || !date || !time || !Number.isFinite(guests) || guests < 1) {
    return NextResponse.json({ error: "Missing reservation fields" }, { status: 400 });
  }

  if (!isReservationSlotAvailable(schedule.week, date, time, schedule.timezone)) {
    return NextResponse.json({ error: "Reservation time unavailable" }, { status: 400 });
  }

  const pixGuaranteeRequired = guests > 20;

  if (pixGuaranteeRequired && !payload.pixGuaranteeAcknowledged) {
    return NextResponse.json({ error: "Pix guarantee acknowledgement required" }, { status: 400 });
  }

  const webhookPayload = {
    event: "reservation_request",
    source: "zinbar.com.br",
    submittedAt: new Date().toISOString(),
    reservation: {
      name,
      whatsapp,
      date,
      time,
      guests,
      pixGuaranteeRequired,
      pixGuaranteeAcknowledged: pixGuaranteeRequired ? true : Boolean(payload.pixGuaranteeAcknowledged),
    },
    tracking: {
      pageUrl: payload.pageUrl,
      referrer: payload.referrer,
      utmSource: payload.utmSource,
      utmMedium: payload.utmMedium,
      utmCampaign: payload.utmCampaign,
      utmTerm: payload.utmTerm,
      utmContent: payload.utmContent,
    },
  };

  const webhookResponse = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(webhookPayload),
  });

  if (!webhookResponse.ok) {
    return NextResponse.json({ error: "Webhook request failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
