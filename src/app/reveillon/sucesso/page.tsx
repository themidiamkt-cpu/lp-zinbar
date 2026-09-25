import type { Metadata } from "next";
import { SuccessMock } from "@/components/reveillon/success-mock";

export const metadata: Metadata = {
  title: { absolute: "Confirmação demonstrativa | Zin Bar & Restaurante" },
  alternates: { canonical: "/reveillon/sucesso" },
};
export default function SuccessPage() {
  return (
    <main id="conteudo">
      <SuccessMock />
    </main>
  );
}
