import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: { absolute: "Confirmação demonstrativa | Zin Bar & Restaurante" },
  alternates: { canonical: "/reveillon/sucesso" },
};
export default function SuccessPage() {
  redirect("/reveillon");
}
