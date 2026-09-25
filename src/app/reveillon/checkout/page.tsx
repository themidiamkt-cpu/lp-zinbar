import type { Metadata } from "next";
import { CheckoutMock } from "@/components/reveillon/checkout-mock";

export const metadata: Metadata = {
  title: { absolute: "Checkout demonstrativo | Zin Bar & Restaurante" },
  alternates: { canonical: "/reveillon/checkout" },
};
export default function CheckoutPage() {
  return (
    <main id="conteudo">
      <CheckoutMock />
    </main>
  );
}
