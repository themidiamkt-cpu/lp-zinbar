import type { Metadata } from "next";
import { InvitationLookup } from "@/components/reveillon/invitation-preview";
export const metadata: Metadata = { title: {absolute:"Consultar convites demonstrativos | Zin"}, alternates:{canonical:"/reveillon/convites"} };
export default function InvitationsPage() {return <main id="conteudo"><InvitationLookup/></main>;}
