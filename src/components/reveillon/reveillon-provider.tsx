"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { validCartItems, type CartItem } from "@/data/reveillon-config";

type SelectionContext = {
  items: CartItem[];
  order: CartItem[] | null;
  ready: boolean;
  setTable: (tableId: string, quantity: number) => void;
  removeTable: (tableId: string) => void;
  completeMock: () => void;
};
const Context = createContext<SelectionContext | null>(null);
const CART_KEY = "zin-reveillon-preview-cart-v1";
const ORDER_KEY = "zin-reveillon-preview-order-v1";

export function ReveillonProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [order, setOrder] = useState<CartItem[] | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setItems(
        validCartItems(JSON.parse(sessionStorage.getItem(CART_KEY) || "[]")),
      );
      const storedOrder = validCartItems(
        JSON.parse(sessionStorage.getItem(ORDER_KEY) || "[]"),
      );
      if (storedOrder.length) setOrder(storedOrder);
    } catch {
      /* Navegação privada/armazenamento indisponível: manter estado apenas em memória. */
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

  function setTable(tableId: string, quantity: number) {
    setItems((previous) =>
      validCartItems([
        ...previous.filter((item) => item.tableId !== tableId),
        { tableId, quantity },
      ]),
    );
  }

  function completeMock() {
    setOrder(items);
    try {
      sessionStorage.setItem(ORDER_KEY, JSON.stringify(items));
    } catch {
      /* Opcional. */
    }
    setItems([]);
  }

  return (
    <Context.Provider
      value={{
        items,
        order,
        ready,
        setTable,
        removeTable: (id) =>
          setItems((previous) =>
            previous.filter((item) => item.tableId !== id),
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
