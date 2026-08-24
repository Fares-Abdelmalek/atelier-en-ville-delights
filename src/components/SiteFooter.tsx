import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-serif text-lg font-medium text-foreground">L'Atelier en Ville</p>
          <p className="text-sm text-muted-foreground">Restaurant · Café · Cocktails · Tizi Ouzou</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-foreground">
            Accueil
          </Link>
          <Link to="/menu" className="transition-colors hover:text-foreground">
            Menu
          </Link>
          <Link to="/commander" className="transition-colors hover:text-foreground">
            Commander
          </Link>
          <Link to="/reservation" className="transition-colors hover:text-foreground">
            Réserver
          </Link>
          <a href="tel:020943453" className="transition-colors hover:text-foreground">
            020 94 34 53
          </a>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} L'Atelier en Ville.</p>
      </div>
    </footer>
  );
}
