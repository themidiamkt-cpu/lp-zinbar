import type { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: { absolute: "Consultar convites demonstrativos | Zin" },
  alternates: { canonical: "/reveillon/convites" },
};
export default function InvitationsPage() {
  redirect("/reveillon");
}
