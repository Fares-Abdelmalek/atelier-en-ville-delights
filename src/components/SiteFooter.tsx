import { Link } from "@tanstack/react-router";
import { logoImage } from "@/lib/images";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:gap-4 sm:text-left">
          <img src={logoImage.url} alt={logoImage.alt} width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
          <div>
          <p className="font-serif text-lg font-medium text-foreground">L'Atelier en Ville</p>
          <p className="text-sm text-muted-foreground">Restaurant · Café · Cocktails · Tizi Ouzou</p>
          </div>
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
