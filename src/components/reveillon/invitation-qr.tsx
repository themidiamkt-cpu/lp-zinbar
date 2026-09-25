"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export function InvitationQRCode({ value }: { value: string }) {
  const [svg, setSvg] = useState("");
  useEffect(() => {
    let active = true;
    QRCode.toString(value, {
      type: "svg",
      margin: 0,
      color: { dark: "#4a101d", light: "#ffffff00" },
    })
      .then((markup) => {
        if (active) setSvg(markup);
      })
      .catch(() => {
        if (active) setSvg("");
      });
    return () => {
      active = false;
    };
  }, [value]);

  return (
    <span className="rv-invitation-qr" role="img" aria-label={`Código QR demonstrativo do convite ${value}`}>
      {svg ? (
        <span className="rv-invitation-qr-art" dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <span className="rv-invitation-qr-loading" aria-hidden="true" />
      )}
      <span className="rv-invitation-qr-corner" aria-hidden="true" />
      <span className="rv-invitation-qr-corner" aria-hidden="true" />
      <span className="rv-invitation-qr-corner" aria-hidden="true" />
      <span className="rv-invitation-qr-corner" aria-hidden="true" />
    </span>
  );
}
