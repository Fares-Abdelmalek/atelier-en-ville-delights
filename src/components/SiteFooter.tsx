import { Link } from "@tanstack/react-router";
import { logoImage, qrCodeImage } from "@/lib/images";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand */}
          <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
            <div className="flex items-center gap-3">
              <img
                src={logoImage.url}
                alt={logoImage.alt}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="font-serif text-lg font-medium text-foreground">L'Atelier en Ville</p>
                <p className="text-sm text-muted-foreground">Restaurant · Café · Cocktails · Tizi Ouzou</p>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Cuisine halal généreuse, terrasse ensoleillée et ambiance chaleureuse au cœur de Tizi Ouzou.
            </p>
          </div>

          {/* Navigation */}
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

          {/* QR Code */}
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-4 text-center">
            <img
              src={qrCodeImage.url}
              alt={qrCodeImage.alt}
              width={120}
              height={120}
              className="h-28 w-28 rounded-lg bg-white object-contain p-1"
            />
            <p className="max-w-[10rem] text-xs text-muted-foreground">{qrCodeImage.caption}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} L'Atelier en Ville.</p>
        </div>
      </div>
    </footer>
  );
}
