import type { Metadata } from "next";
import { HeaderSection } from "@/sections/header-section";
import { FooterSection } from "@/sections/footer-section";
import { ReveillonProvider } from "@/components/reveillon/reveillon-provider";
import "./reveillon.css";

export const metadata: Metadata = {
  title: { absolute: "Réveillon 2027 | Zin Bar & Restaurante" },
  description:
    "Uma noite especial para começar 2027 no Zin. Explore os setores e descubra sua mesa nesta prévia do Réveillon.",
  alternates: { canonical: "/reveillon" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Réveillon 2027 | Zin Bar & Restaurante",
    description: "Uma noite especial para começar 2027 no Zin.",
    url: "/reveillon",
  },
};

export default function ReveillonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rv-shell">
      <ReveillonProvider>
        <a className="rv-skip" href="#conteudo">
          Pular para o conteúdo
        </a>
        <HeaderSection event />
        {children}
        <FooterSection event />
      </ReveillonProvider>
    </div>
  );
}
