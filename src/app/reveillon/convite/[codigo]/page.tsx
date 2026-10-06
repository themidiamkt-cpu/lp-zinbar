import type { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: { absolute: "Seu convite demonstrativo | Zin" },
  alternates: { canonical: "/reveillon/convites" },
};
export default async function InvitationPage({
  params,
}: {
  params: Promise<{ codigo: string }>;
}) {
  redirect("/reveillon");
}
