"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { validCartItems, type CartItem } from "@/data/reveillon-config";

import {
  createInvitations,
  readInvitations,
  INVITATIONS_KEY,
  INVITATION_BATCH_KEY,
  type MockInvitation,
} from "./mock-invitations";

type SelectionContext = {
  invitations: MockInvitation[];
  orderInvitations: MockInvitation[];
  invitationsSaved: boolean;
  items: CartItem[];
  order: CartItem[] | null;
  ready: boolean;
  setSectorSelection: (sectorId: string, quantity: number) => void;
  removeSector: (sectorId: string) => void;
  completeMock: () => void;
};
const Context = createContext<SelectionContext | null>(null);
const CART_KEY = "zin-reveillon-preview-cart-v1";
const ORDER_KEY = "zin-reveillon-preview-order-v1";

export function ReveillonProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [order, setOrder] = useState<CartItem[] | null>(null);
  const [invitations, setInvitations] = useState<MockInvitation[]>([]);
  const [batch, setBatch] = useState<string | null>(null);
  const [invitationsSaved, setInvitationsSaved] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let storedOrder: CartItem[] = [];
    try {
      setItems(
        validCartItems(JSON.parse(sessionStorage.getItem(CART_KEY) || "[]")),
      );
      storedOrder = validCartItems(
        JSON.parse(sessionStorage.getItem(ORDER_KEY) || "[]"),
      );
      if (storedOrder.length) setOrder(storedOrder);
    } catch {
      /* Navegação privada/armazenamento indisponível: manter estado apenas em memória. */
    }
    try {
      let saved = readInvitations(
        JSON.parse(localStorage.getItem(INVITATIONS_KEY) || "[]"),
      );
      let savedBatch = sessionStorage.getItem(INVITATION_BATCH_KEY);
      // Compatibilidade com simulações feitas antes dos convites individuais.
      if (storedOrder.length && !savedBatch) {
        const generated = createInvitations(storedOrder, saved);
        saved = [...saved, ...generated.invitations];
        savedBatch = generated.batch;
        setInvitations(saved);
        setBatch(savedBatch);
        localStorage.setItem(INVITATIONS_KEY, JSON.stringify(saved));
        sessionStorage.setItem(INVITATION_BATCH_KEY, savedBatch);
      }
      setInvitations(saved);
      setBatch(savedBatch);
    } catch {
      setInvitationsSaved(false);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      sessionStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      /* Opcional. */
    }
  }, [items, ready]);

  function setSectorSelection(sectorId: string, quantity: number) {
    setItems((previous) =>
      validCartItems([
        ...previous.filter((item) => item.sectorId !== sectorId),
        { sectorId, quantity },
      ]),
    );
  }

  function completeMock() {
    if (!items.length) return;
    let previous = invitations;
    try {
      previous = readInvitations(
        JSON.parse(localStorage.getItem(INVITATIONS_KEY) || "[]"),
      );
    } catch {
      /* Usar os convites em memória. */
    }
    const generated = createInvitations(items, previous);
    const next = [...previous, ...generated.invitations];
    setInvitations(next);
    setBatch(generated.batch);
    try {
      localStorage.setItem(INVITATIONS_KEY, JSON.stringify(next));
      setInvitationsSaved(true);
    } catch {
      setInvitationsSaved(false);
    }
    setOrder(items);
    try {
      sessionStorage.setItem(ORDER_KEY, JSON.stringify(items));
      sessionStorage.setItem(INVITATION_BATCH_KEY, generated.batch);
    } catch {
      /* Opcional. */
    }
    setItems([]);
  }

  return (
    <Context.Provider
      value={{
        invitations,
        orderInvitations: invitations.filter((item) => item.batch === batch),
        invitationsSaved,
        items,
        order,
        ready,
        setSectorSelection,
        removeSector: (id) =>
          setItems((previous) =>
            previous.filter((item) => item.sectorId !== id),
          ),
        completeMock,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useReveillon() {
  const value = useContext(Context);
  if (!value) throw new Error("ReveillonProvider ausente");
  return value;
}
