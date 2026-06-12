import { NextResponse } from "next/server";

import { landingData } from "@/data/landing-data";
import { isReservationSlotAvailable, isReservationTimeAfterLimit } from "@/utils/schedule";

const WEBHOOK_URL = "https://automacao2.themidiamarketing.com.br/webhook/zin-reservas";
const { reservation, schedule } = landingData;

type ReservationPayload = {
  name?: string;
  whatsapp?: string;
  reservationType?: "table" | "billiards";
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
  const reservationType = payload.reservationType === "billiards" ? "billiards" : "table";
  const date = payload.date?.trim();
  const time = payload.time?.trim();
  const guests = Number(payload.guests);

  if (!name || !whatsapp || !date || !time || !Number.isFinite(guests) || guests < 1) {
    return NextResponse.json({ error: "Missing reservation fields" }, { status: 400 });
  }

  if (isReservationTimeAfterLimit(time, reservation.sameDayCutoffTime)) {
    return NextResponse.json(
      { error: `Reservations are only available until ${reservation.sameDayCutoffTime}` },
      { status: 400 },
    );
  }

  if (
    !isReservationSlotAvailable(
      schedule.week,
      date,
      time,
      schedule.timezone,
      reservation.sameDayCutoffTime,
    )
  ) {
    return NextResponse.json({ error: "Reservation time unavailable" }, { status: 400 });
  }

  const pixGuaranteeRequired = guests > 20 || reservationType === "billiards";

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
      reservationType,
      date,
      time,
      guests,
      pixGuaranteeRequired,
      pixGuaranteeAcknowledged: pixGuaranteeRequired
        ? true
        : Boolean(payload.pixGuaranteeAcknowledged),
      sameDayCutoffTime: reservation.sameDayCutoffTime,
      nightReservationKey: reservationType === "billiards" ? date : undefined,
      exclusivePerNight: reservationType === "billiards",
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

  let webhookResponse: Response;

  try {
    webhookResponse = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(webhookPayload),
    });
  } catch {
    return NextResponse.json({ error: "Webhook request failed" }, { status: 502 });
  }

  if (!webhookResponse.ok) {
    if (webhookResponse.status === 409 && reservationType === "billiards") {
      return NextResponse.json({ error: "Billiards already reserved for this night" }, { status: 409 });
    }

    return NextResponse.json({ error: "Webhook request failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
