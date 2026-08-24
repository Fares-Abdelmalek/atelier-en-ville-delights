import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

const links = [
  { label: "Accueil", to: "/" as const },
  { label: "Menu", to: "/menu" as const },
  { label: "Commander", to: "/commander" as const },
  { label: "Réserver", to: "/reservation" as const },
];

export function SiteHeader() {
  const { count } = useCart();

  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-border/50 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <Link to="/" className="font-serif text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          L'Atelier en Ville
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="text-sm font-medium transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/commander"
            className="relative inline-flex items-center gap-2 rounded-full border border-input bg-background px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            aria-label={`Panier : ${count} article(s)`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Panier</span>
            {count > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <Link
            to="/reservation"
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Réserver
          </Link>
        </div>
      </div>
      <nav className="flex items-center gap-5 overflow-x-auto border-t border-border/50 px-5 py-2 md:hidden">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            activeOptions={{ exact: link.to === "/" }}
            activeProps={{ className: "text-foreground" }}
            inactiveProps={{ className: "text-muted-foreground" }}
            className="whitespace-nowrap text-sm font-medium"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
