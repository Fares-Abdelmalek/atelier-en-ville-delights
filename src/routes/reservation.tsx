import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CalendarCheck, CheckCircle2, Clock, Phone, Users } from "lucide-react";

export const Route = createFileRoute("/reservation")({
  component: ReservationPage,
  head: () => ({
    meta: [
      { title: "Réserver une table — L'Atelier en Ville, Tizi Ouzou" },
      {
        name: "description",
        content:
          "Réservez votre table à L'Atelier en Ville à Tizi Ouzou : choisissez la date, l'heure et le nombre de convives et recevez une confirmation immédiate.",
      },
      { property: "og:title", content: "Réserver une table — L'Atelier en Ville" },
      {
        property: "og:description",
        content: "Réservation en ligne : date, heure, nombre de convives et confirmation immédiate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const timeSlots = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

const today = () => new Date().toISOString().slice(0, 10);

const reservationSchema = z.object({
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
  email: z
    .string()
    .trim()
    .max(255, { message: "Adresse e-mail trop longue." })
    .email({ message: "Adresse e-mail invalide." })
    .optional()
    .or(z.literal("")),
  date: z
    .string()
    .min(1, { message: "Choisissez une date." })
    .refine((value) => value >= today(), { message: "La date doit être aujourd'hui ou plus tard." }),
  time: z.string().min(1, { message: "Choisissez un créneau." }),
  party: z
    .number({ message: "Indiquez le nombre de convives." })
    .int()
    .min(1, { message: "Au moins 1 convive." })
    .max(20, { message: "Pour plus de 20 convives, appelez-nous." }),
  occasion: z.string().trim().max(60).optional(),
  notes: z.string().trim().max(300, { message: "Note trop longue (300 caractères maximum)." }).optional(),
});

type Values = z.infer<typeof reservationSchema>;
type FormErrors = Partial<Record<keyof Values, string>>;

function ReservationPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: today(),
    time: "20:00",
    party: "2",
    occasion: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [confirmation, setConfirmation] = useState<(Values & { ref: string }) | null>(null);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = reservationSchema.safeParse({ ...form, party: Number(form.party) });
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
    setConfirmation({ ...parsed.data, ref: `RV-${Math.floor(1000 + Math.random() * 9000)}` });
  };

  const formattedDate = (value: string) =>
    new Date(`${value}T12:00:00`).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div>
      <section className="bg-cream px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-burnt-500">Réservation</p>
          <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Réservez votre table
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Déjeuner de 12 h à 14 h, dîner de 19 h à 23 h. Terrasse, salle et coin famille disponibles — précisez vos
            envies et nous préparons tout.
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.3fr_1fr]">
          {confirmation ? (
            <div className="rounded-2xl border border-border bg-card p-8">
              <CheckCircle2 className="h-12 w-12 text-burnt-500" />
              <h2 className="mt-6 font-serif text-3xl font-medium tracking-tight text-foreground">
                Réservation confirmée
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Merci {confirmation.name} ! Votre table est réservée sous la référence{" "}
                <span className="font-semibold text-foreground">{confirmation.ref}</span>. Nous vous attendons{" "}
                <span className="font-semibold text-foreground">{formattedDate(confirmation.date)}</span> à{" "}
                <span className="font-semibold text-foreground">{confirmation.time}</span> pour{" "}
                <span className="font-semibold text-foreground">
                  {confirmation.party} {confirmation.party > 1 ? "convives" : "convive"}
                </span>
                . Un rappel vous sera envoyé au {confirmation.phone}.
              </p>
              {confirmation.occasion && (
                <p className="mt-3 text-sm text-muted-foreground">Occasion notée : {confirmation.occasion}</p>
              )}
              <p className="mt-6 text-sm text-muted-foreground">
                Un changement ? Appelez-nous au{" "}
                <a href="tel:020943453" className="font-semibold text-burnt-500 hover:underline">
                  020 94 34 53
                </a>
                .
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmation(null)}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Nouvelle réservation
                </button>
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 rounded-full border border-input bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  Découvrir le menu
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6 sm:p-8" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Nom complet" error={errors.name}>
                  <input
                    type="text"
                    value={form.name}
                    maxLength={80}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                    placeholder="Ex. Lynda Ait Ali"
                  />
                </Field>
                <Field label="Téléphone" error={errors.phone}>
                  <input
                    type="tel"
                    value={form.phone}
                    maxLength={20}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass}
                    placeholder="0X XX XX XX XX"
                  />
                </Field>
                <Field label="E-mail (optionnel)" error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    maxLength={255}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                    placeholder="vous@exemple.com"
                  />
                </Field>
                <Field label="Nombre de convives" error={errors.party}>
                  <select
                    value={form.party}
                    onChange={(e) => setForm({ ...form, party: e.target.value })}
                    className={inputClass}
                  >
                    {Array.from({ length: 20 }).map((_, i) => (
                      <option key={i + 1} value={String(i + 1)}>
                        {i + 1} {i === 0 ? "convive" : "convives"}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Date" error={errors.date}>
                  <input
                    type="date"
                    value={form.date}
                    min={today()}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className={inputClass}
                  />
                </Field>
                <Field label="Occasion (optionnel)" error={errors.occasion}>
                  <select
                    value={form.occasion}
                    onChange={(e) => setForm({ ...form, occasion: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">Aucune</option>
                    <option value="Anniversaire">Anniversaire</option>
                    <option value="Anniversaire enfant">Anniversaire enfant</option>
                    <option value="Dîner romantique">Dîner romantique</option>
                    <option value="Repas d'affaires">Repas d'affaires</option>
                    <option value="Groupe / famille">Groupe / famille</option>
                  </select>
                </Field>
              </div>

              <div className="mt-6">
                <p className="mb-2 text-sm font-medium text-foreground">Créneau horaire</p>
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map((slot) => {
                    const active = form.time === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setForm({ ...form, time: slot })}
                        aria-pressed={active}
                        className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-input bg-background text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                {errors.time && <p className="mt-2 text-xs font-medium text-destructive">{errors.time}</p>}
              </div>

              <div className="mt-6">
                <Field label="Demande particulière (optionnel)" error={errors.notes}>
                  <textarea
                    value={form.notes}
                    rows={3}
                    maxLength={300}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className={`${inputClass} resize-none`}
                    placeholder="Table en terrasse, chaise haute, allergies…"
                  />
                </Field>
              </div>

              <button
                type="submit"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <CalendarCheck className="h-4 w-4" />
                Confirmer la réservation
              </button>
            </form>
          )}

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <InfoCard icon={Clock} title="Horaires">
              Tous les jours · déjeuner 12 h – 14 h, dîner 19 h – 23 h. Service tardif jusqu'à la fermeture.
            </InfoCard>
            <InfoCard icon={Users} title="Groupes & familles">
              Chaises hautes, menu enfant et espaces pour groupes. Au-delà de 20 convives, contactez-nous.
            </InfoCard>
            <InfoCard icon={Phone} title="Besoin d'aide ?">
              Appelez le{" "}
              <a href="tel:020943453" className="font-semibold text-burnt-500 hover:underline">
                020 94 34 53
              </a>{" "}
              — nous répondons pendant les heures de service.
            </InfoCard>
          </aside>
        </div>
      </section>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
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

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Clock;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-border bg-card p-5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-burnt-300/30 text-burnt-900">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="font-serif text-lg font-medium text-foreground">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{children}</p>
      </div>
    </div>
  );
}
