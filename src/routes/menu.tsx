import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Info, ShoppingBag } from "lucide-react";
import {
  dietTagLabels,
  formatDA,
  menuCategories,
  menuItems,
  type DietTag,
  type MenuItem,
} from "@/lib/menu";
import { useCart } from "@/lib/cart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/menu")({
  component: MenuPage,
  head: () => ({
    meta: [
      { title: "Menu & Carte — L'Atelier en Ville, Tizi Ouzou" },
      {
        name: "description",
        content:
          "Découvrez la carte de L'Atelier en Ville : petit déjeuner, entrées à partager, plats halal, desserts maison, cafés, thés et cocktails à Tizi Ouzou.",
      },
      { property: "og:title", content: "Menu & Carte — L'Atelier en Ville" },
      {
        property: "og:description",
        content:
          "Petit déjeuner, plats halal, desserts maison, cafés et cocktails. Tags végétarien, sans gluten et menu enfant.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const filterTags: DietTag[] = ["halal", "vegetarien", "enfants", "sans-gluten", "partager"];

function TagPill({ tag }: { tag: DietTag }) {
  return (
    <span className="rounded-full bg-burnt-300/30 px-2.5 py-1 text-xs font-semibold text-burnt-900">
      {dietTagLabels[tag]}
    </span>
  );
}

function MenuPage() {
  const { add } = useCart();
  const [activeTags, setActiveTags] = useState<DietTag[]>([]);
  const [selected, setSelected] = useState<MenuItem | null>(null);

  const filtered = useMemo(
    () =>
      activeTags.length === 0
        ? menuItems
        : menuItems.filter((item) => activeTags.every((tag) => item.tags.includes(tag))),
    [activeTags],
  );

  const toggleTag = (tag: DietTag) =>
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  const addToCart = (item: MenuItem) => {
    add(item.id);
    toast.success(`${item.name} ajouté au panier`);
  };

  return (
    <div>
      <section className="bg-cream px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-burnt-500">Notre carte</p>
          <h1 className="mt-3 max-w-2xl font-serif text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
            Menu de L'Atelier en Ville
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Toutes nos viandes sont halal. Filtrez la carte selon vos préférences, consultez les détails de chaque plat
            et ajoutez vos envies au panier pour une commande à emporter ou sur place.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm font-medium text-foreground">Filtres :</span>
            {filterTags.map((tag) => {
              const active = activeTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  aria-pressed={active}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {dietTagLabels[tag]}
                </button>
              );
            })}
            {activeTags.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTags([])}
                className="text-sm font-semibold text-burnt-500 underline-offset-4 hover:underline"
              >
                Réinitialiser
              </button>
            )}
          </div>

          <nav className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {menuCategories.map((cat) => (
              <a key={cat.id} href={`#${cat.id}`} className="transition-colors hover:text-foreground">
                {cat.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-16">
          {menuCategories.map((cat) => {
            const items = filtered.filter((item) => item.category === cat.id);
            if (items.length === 0) return null;
            return (
              <div key={cat.id} id={cat.id} className="scroll-mt-32">
                <div className="border-b border-border pb-4">
                  <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                    {cat.label}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">{cat.description}</p>
                </div>
                <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-serif text-xl font-medium text-foreground">{item.name}</h3>
                        <span className="whitespace-nowrap font-serif text-lg font-medium text-foreground">
                          {formatDA(item.price)}
                        </span>
                      </div>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <TagPill key={tag} tag={tag} />
                        ))}
                      </div>
                      <div className="mt-5 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => addToCart(item)}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                          <Plus className="h-4 w-4" />
                          Ajouter
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelected(item)}
                          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-input bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                        >
                          <Info className="h-4 w-4" />
                          Détails
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground">
              Aucun plat ne correspond à ces filtres. Essayez d'en retirer un.
            </p>
          )}

          <div className="flex flex-col items-center gap-4 rounded-2xl bg-cream p-8 text-center">
            <h2 className="font-serif text-2xl font-medium text-foreground">Prêt à commander ?</h2>
            <p className="max-w-xl text-sm text-muted-foreground">
              Finalisez votre commande à emporter ou sur place en quelques clics, ou réservez une table pour ce soir.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/commander"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <ShoppingBag className="h-4 w-4" />
                Voir mon panier
              </Link>
              <Link
                to="/reservation"
                className="inline-flex items-center gap-2 rounded-full border border-input bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Réserver une table
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl font-medium">{selected.name}</DialogTitle>
                <DialogDescription>{selected.description}</DialogDescription>
              </DialogHeader>
              <p className="text-sm leading-relaxed text-foreground">{selected.details}</p>
              <div className="flex flex-wrap gap-1.5">
                {selected.tags.map((tag) => (
                  <TagPill key={tag} tag={tag} />
                ))}
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
                <span className="font-serif text-xl font-medium text-foreground">{formatDA(selected.price)}</span>
                <button
                  type="button"
                  onClick={() => {
                    addToCart(selected);
                    setSelected(null);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4" />
                  Ajouter au panier
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
