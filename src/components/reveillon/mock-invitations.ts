import {
  tableConfig,
  validCartItems,
  type CartItem,
} from "@/data/reveillon-config";

export type MockInvitation = {
  code: string;
  batch: string;
  tableId: string;
  guest: number;
  createdAt: string;
};
export const INVITATIONS_KEY = "zin-reveillon-demo-invitations-v1";
export const INVITATION_BATCH_KEY = "zin-reveillon-demo-batch-v1";
export function normalizeInvitationCode(value: string) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}
export function readInvitations(value: unknown): MockInvitation[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  return value.filter((item): item is MockInvitation => {
    if (!item || typeof item !== "object") return false;
    const table = tableConfig.find((t) => t.id === item.tableId);
    if (
      typeof item.code !== "string" ||
      !/^ZIN-2027-[A-F0-9]{12}$/.test(item.code) ||
      seen.has(item.code) ||
      typeof item.batch !== "string" ||
      !table?.capacity ||
      !Number.isInteger(item.guest) ||
      item.guest < 1 ||
      item.guest > table.capacity ||
      typeof item.createdAt !== "string" ||
      !Number.isFinite(Date.parse(item.createdAt))
    )
      return false;
    seen.add(item.code);
    return true;
  });
}
export function createInvitations(
  items: CartItem[],
  existing: MockInvitation[],
) {
  const batch = crypto.randomUUID();
  const used = new Set(existing.map((item) => item.code));
  const createdAt = new Date().toISOString();
  const invitations = validCartItems(items).flatMap((item) =>
    Array.from({ length: item.quantity }, (_, i) => {
      let code: string;
      do {
        code = `ZIN-2027-${crypto.randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase()}`;
      } while (used.has(code));
      used.add(code);
      return { code, batch, tableId: item.tableId, guest: i + 1, createdAt };
    }),
  );
  return { batch, invitations };
}
