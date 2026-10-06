import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: { absolute: "Checkout demonstrativo | Zin Bar & Restaurante" },
  alternates: { canonical: "/reveillon/checkout" },
};
export default function CheckoutPage() {
  redirect("/reveillon");
}
