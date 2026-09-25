import type { Metadata } from "next";
import { InvitationPreview } from "@/components/reveillon/invitation-preview";
export const metadata: Metadata = {title:{absolute:"Seu convite demonstrativo | Zin"}, alternates:{canonical:"/reveillon/convites"}};
export default async function InvitationPage({params}: {params:Promise<{codigo:string}>}) {const {codigo} = await params;return <main id="conteudo"><InvitationPreview code={codigo}/></main>;}
