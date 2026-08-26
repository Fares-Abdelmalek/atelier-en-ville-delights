import { formatDA } from "./menu";

/** Numéro WhatsApp du gérant, au format international sans + ni espaces. */
export const MANAGER_WHATSAPP = "213770000000";

export function whatsappUrl(message: string) {
  return `https://wa.me/${MANAGER_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message: string) {
  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
}

export type OrderMessageInput = {
  ref: string;
  mode: "emporter" | "sur-place";
  name: string;
  phone: string;
  time: string;
  table?: string | undefined;
  notes?: string | undefined;
  lines: { name: string; qty: number; price: number }[];
  subtotal: number;
  packaging: number;
  total: number;
};

export function buildOrderMessage(o: OrderMessageInput) {
  const items = o.lines.map((l) => `• ${l.qty} × ${l.name} — ${formatDA(l.price * l.qty)}`).join("\n");
  return [
    `*Nouvelle commande ${o.ref}* — L'Atelier en Ville`,
    "",
    `Type : ${o.mode === "emporter" ? "À emporter" : "Sur place"}`,
    `Nom : ${o.name}`,
    `Téléphone : ${o.phone}`,
    `${o.mode === "emporter" ? "Heure de retrait" : "Heure d'arrivée"} : ${o.time}`,
    ...(o.mode === "sur-place" && o.table ? [`Table : ${o.table}`] : []),
    "",
    "*Détail :*",
    items,
    "",
    `Sous-total : ${formatDA(o.subtotal)}`,
    `${o.mode === "emporter" ? "Emballage" : "Service à table"} : ${o.packaging === 0 ? "Offert" : formatDA(o.packaging)}`,
    `*Total : ${formatDA(o.total)}*`,
    ...(o.notes ? ["", `Notes : ${o.notes}`] : []),
    "",
    "Paiement à la remise.",
  ].join("\n");
}

export type ReservationMessageInput = {
  ref: string;
  name: string;
  phone: string;
  email?: string | undefined;
  date: string;
  time: string;
  party: number;
  occasion?: string | undefined;
  notes?: string | undefined;
};

export function buildReservationMessage(r: ReservationMessageInput) {
  return [
    `*Nouvelle réservation ${r.ref}* — L'Atelier en Ville`,
    "",
    `Nom : ${r.name}`,
    `Téléphone : ${r.phone}`,
    ...(r.email ? [`E-mail : ${r.email}`] : []),
    `Date : ${r.date}`,
    `Heure : ${r.time}`,
    `Convives : ${r.party}`,
    ...(r.occasion ? [`Occasion : ${r.occasion}`] : []),
    ...(r.notes ? [`Demande : ${r.notes}`] : []),
    "",
    "Merci de confirmer la disponibilité.",
  ].join("\n");
}
