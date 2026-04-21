// Client-side state store using localStorage. No backend.
import type { Plan } from "@/data/plans";

const KEY_CART = "fs_cart_v1";
const KEY_CUPOS = "fs_cupos_v1";
const KEY_RESERVAS = "fs_reservas_v1";
const KEY_CHECKOUT = "fs_checkout_v1";

export type CartItem = {
  planId: Plan["id"];
  name: string;
  price: number;
  episode: string;
};

export type CheckoutData = {
  empresa: string;
  industria: string;
  presupuesto: string;
  tipoIntegracion: string;
  objetivo: string;
  email: string;
  whatsapp: string;
};

export type Reserva = {
  id: string;
  createdAt: string;
  items: CartItem[];
  total: number;
  anticipo: number;
  checkout: CheckoutData;
  comprobante?: string; // dataURL preview
  status: "pendiente" | "pago_subido" | "aprobado" | "en_produccion";
};

const isClient = () => typeof window !== "undefined";

function read<T>(key: string, fallback: T): T {
  if (!isClient()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (!isClient()) return;
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("fs:storage"));
}

// Cart
export const getCart = () => read<CartItem[]>(KEY_CART, []);
export const setCart = (items: CartItem[]) => write(KEY_CART, items);
export const addToCart = (item: CartItem) => {
  const cart = getCart();
  cart.push(item);
  setCart(cart);
};
export const removeFromCart = (idx: number) => {
  const cart = getCart();
  cart.splice(idx, 1);
  setCart(cart);
};
export const clearCart = () => setCart([]);

// Cupos
export const getCupos = () => read<number>(KEY_CUPOS, 3);
export const setCupos = (n: number) => write(KEY_CUPOS, n);

// Checkout
export const getCheckout = () => read<CheckoutData | null>(KEY_CHECKOUT, null);
export const setCheckout = (d: CheckoutData) => write(KEY_CHECKOUT, d);

// Reservas
export const getReservas = () => read<Reserva[]>(KEY_RESERVAS, []);
export const saveReserva = (r: Reserva) => {
  const list = getReservas();
  list.unshift(r);
  write(KEY_RESERVAS, list);
};
export const updateReservaStatus = (id: string, status: Reserva["status"]) => {
  const list = getReservas().map((r) => (r.id === id ? { ...r, status } : r));
  write(KEY_RESERVAS, list);
};

export const onStoreChange = (cb: () => void) => {
  if (!isClient()) return () => {};
  const handler = () => cb();
  window.addEventListener("fs:storage", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("fs:storage", handler);
    window.removeEventListener("storage", handler);
  };
};
