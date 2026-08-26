import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Minus, Plus, Trash2, ShoppingBag, CheckCircle2, ShoppingCart, Store, MessageCircle } from "lucide-react";
import { formatDA, menuItems } from "@/lib/menu";
import { useCart, type OrderMode } from "@/lib/cart";
import { buildOrderMessage, openWhatsApp, whatsappUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/commander")({
  component: OrderPage,
  head: () => ({
    meta: [
      { title: "Commander en ligne — L'Atelier en Ville, Tizi Ouzou" },
      {
        name: "description",
        content:
          "Commandez en ligne chez L'Atelier en Ville : à emporter ou sur place, paiement à la remise. Plats halal, desserts, cafés et cocktails à Tizi Ouzou.",
      },
      { property: "og:title", content: "Commander en ligne — L'Atelier en Ville" },
      {
        property: "og:description",
        content: "Commande à emporter ou sur place, checkout simple et confirmation immédiate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const PACKAGING_FEE = 100;

const checkoutSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Indiquez votre nom (2 caractères minimum)." })
    .max(80, { message: "Nom trop long (80 caractères maximum)." }),
  phone: z
    .string()
    .trim()
    .min(8, { message: "Numéro de téléphone invalide." })
    .max(20, { message: "Numéro de téléphone invalide." })
    .regex(/^[0-9+\s().-]+$/, { message: "Le téléphone ne peut contenir que des chiffres." }),
  time: z
    .string()
    .trim()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, { message: "Choisissez une heure valide." }),
  table: z.string().trim().max(10, { message: "Numéro de table trop long." }).optional(),
  notes: z.string().trim().max(300, { message: "Note trop longue (300 caractères maximum)." }).optional(),
});

type FormErrors = Partial<Record<keyof z.infer<typeof checkoutSchema>, string>>;

const modes: { id: OrderMode; label: string; description: string; icon: typeof ShoppingBag }[] = [
  {
    id: "emporter",
    label: "À emporter",
    description: "Prêt à récupérer au comptoir · frais d'emballage 100 DA",
    icon: ShoppingBag,
  },
  {
    id: "sur-place",
    label: "Sur place",
    description: "Servi à table, indiquez votre numéro de table",
    icon: Store,
  },
];

function OrderPage() {
  const { detailed, count, subtotal, mode, setMode, add, setQty, remove, clear } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", time: "", table: "", notes: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [confirmed, setConfirmed] = useState<{
    ref: string;
    total: number;
    mode: OrderMode;
    message: string;
  } | null>(null);

  const packaging = mode === "emporter" ? PACKAGING_FEE : 0;
  const total = subtotal + packaging;
  const suggestions = menuItems.filter((item) => !detailed.some((l) => l.item.id === item.id)).slice(0, 4);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = checkoutSchema.safeParse(form);
    if (!parsed.success) {
      const next: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormErrors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    const ref = `AV-${Math.floor(1000 + Math.random() * 9000)}`;
    const message = buildOrderMessage({
      ref,
      mode,
      name: parsed.data.name,
      phone: parsed.data.phone,
      time: parsed.data.time,
      table: parsed.data.table,
      notes: parsed.data.notes,
      lines: detailed.map(({ item, qty }) => ({ name: item.name, qty, price: item.price })),
      subtotal,
      packaging,
      total,
    });
    openWhatsApp(message);
    setConfirmed({ ref, total, mode, message });
    clear();
    setForm({ name: "", phone: "", time: "", table: "", notes: "" });
  };

  if (confirmed) {
    return (
      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-burnt-500" />
          <h1 className="mt-6 font-serif text-3xl font-medium tracking-tight text-foreground">Commande envoyée</h1>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Votre commande <span className="font-semibold text-foreground">{confirmed.ref}</span> a été préparée dans
            WhatsApp
            {confirmed.mode === "emporter" ? " et sera prête au comptoir" : " et sera servie à votre table"}. Envoyez le
            message au gérant pour finaliser — si WhatsApp ne s'est pas ouvert, utilisez le bouton ci-dessous.
          </p>
          <p className="mt-4 font-serif text-2xl font-medium text-foreground">{formatDA(confirmed.total)}</p>
          <p className="text-sm text-muted-foreground">Paiement à la remise de la commande.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={whatsappUrl(confirmed.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <MessageCircle className="h-4 w-4" />
              Ouvrir WhatsApp
            </a>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 rounded-full border border-input bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Commander autre chose
            </Link>
            <button
              type="button"
              onClick={() => setConfirmed(null)}
              className="inline-flex items-center gap-2 rounded-full border border-input bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Retour au panier
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div>
      <section className="bg-cream px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-burnt-500">Commande en ligne</p>
          <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Votre commande
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Choisissez à emporter ou sur place, vérifiez votre panier et validez en une étape. Paiement à la remise, en
            espèces ou par carte.
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-8">
            {/* Mode */}
            <div>
              <h2 className="font-serif text-xl font-medium text-foreground">1. Type de commande</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {modes.map((m) => {
                  const active = mode === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMode(m.id)}
                      aria-pressed={active}
                      className={`flex items-start gap-3 rounded-2xl border p-5 text-left transition-colors ${
                        active ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-secondary"
                      }`}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-burnt-300/30 text-burnt-900">
                        <m.icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-semibold text-foreground">{m.label}</span>
                        <span className="mt-1 block text-sm text-muted-foreground">{m.description}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cart */}
            <div>
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-medium text-foreground">2. Panier</h2>
                {count > 0 && (
                  <button
                    type="button"
                    onClick={clear}
                    className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    Vider le panier
                  </button>
                )}
              </div>

              {count === 0 ? (
                <div className="mt-4 rounded-2xl border border-dashed border-border p-8 text-center">
                  <ShoppingCart className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">Votre panier est vide.</p>
                  <Link
                    to="/menu"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Parcourir le menu
                  </Link>
                </div>
              ) : (
                <ul className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
                  {detailed.map(({ item, qty }) => (
                    <li key={item.id} className="flex flex-wrap items-center gap-4 p-5">
                      <div className="min-w-40 flex-1">
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{formatDA(item.price)} l'unité</p>
                      </div>
                      <div className="flex items-center gap-2 rounded-full border border-input px-1.5 py-1">
                        <button
                          type="button"
                          onClick={() => setQty(item.id, qty - 1)}
                          aria-label={`Retirer un ${item.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-secondary"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold text-foreground">{qty}</span>
                        <button
                          type="button"
                          onClick={() => add(item.id)}
                          aria-label={`Ajouter un ${item.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-secondary"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="w-24 text-right font-serif text-lg text-foreground">
                        {formatDA(item.price * qty)}
                      </span>
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        aria-label={`Supprimer ${item.name}`}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {suggestions.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-semibold text-foreground">Ajouter rapidement</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {suggestions.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => add(item.id)}
                        className="inline-flex items-center gap-2 rounded-full border border-input bg-background px-3.5 py-1.5 text-sm text-foreground transition-colors hover:bg-secondary"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        {item.name} · {formatDA(item.price)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Checkout */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6" noValidate>
              <h2 className="font-serif text-xl font-medium text-foreground">3. Checkout</h2>

              <div className="mt-5 space-y-4">
                <Field label="Nom complet" error={errors.name}>
                  <input
                    type="text"
                    value={form.name}
                    maxLength={80}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Ex. Yacine Meziane"
                  />
                </Field>
                <Field label="Téléphone" error={errors.phone}>
                  <input
                    type="tel"
                    value={form.phone}
                    maxLength={20}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                    placeholder="0X XX XX XX XX"
                  />
                </Field>
                <Field
                  label={mode === "emporter" ? "Heure de retrait" : "Heure d'arrivée"}
                  error={errors.time}
                >
                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                  />
                </Field>
                {mode === "sur-place" && (
                  <Field label="Numéro de table (optionnel)" error={errors.table}>
                    <input
                      type="text"
                      value={form.table}
                      maxLength={10}
                      onChange={(e) => setForm({ ...form, table: e.target.value })}
                      className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Ex. 12"
                    />
                  </Field>
                )}
                <Field label="Notes (optionnel)" error={errors.notes}>
                  <textarea
                    value={form.notes}
                    maxLength={300}
                    rows={3}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full resize-none rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Allergies, sans oignon, brick au thon…"
                  />
                </Field>
              </div>

              <dl className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Sous-total</dt>
                  <dd className="text-foreground">{formatDA(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">
                    {mode === "emporter" ? "Emballage" : "Service à table"}
                  </dt>
                  <dd className="text-foreground">{packaging === 0 ? "Offert" : formatDA(packaging)}</dd>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <dt className="font-semibold text-foreground">Total</dt>
                  <dd className="font-serif text-xl font-medium text-foreground">{formatDA(total)}</dd>
                </div>
              </dl>

              <button
                type="submit"
                disabled={count === 0}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Valider la commande
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Paiement à la remise · en espèces ou par carte
              </p>
            </form>
          </aside>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-medium text-destructive">{error}</span>}
    </label>
  );
}
