import { createFileRoute, Link } from "@tanstack/react-router";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Utensils,
  Coffee,
  Wine,
  Cake,
  Accessibility,
  Car,
  Baby,
  Users,
  CalendarCheck,
  Moon,
  Sun,
  ArrowRight,
} from "lucide-react";

import foodSpread from "../assets/food-spread.jpg";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { restaurantInteriorImage, terraceImage } from "@/lib/images";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "L'Atelier en Ville — Restaurant à Tizi Ouzou" },
      {
        name: "description",
        content:
          "L'Atelier en Ville : restaurant, café et cocktails à Tizi Ouzou. Cuisine halal, terrasse, service à table et ambiance chaleureuse.",
      },
      { property: "og:title", content: "L'Atelier en Ville — Restaurant à Tizi Ouzou" },
      {
        property: "og:description",
        content:
          "Restaurant, café et cocktails à Tizi Ouzou. Cuisine halal, terrasse, service à table et ambiance chaleureuse.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});


const menuHighlights = [
  {
    title: "Burger Atelier",
    description: "Salade, tomate, fromage, viande, chicken, oignon caramélisé, avocat, sauce barbecue.",
    price: "1 650 DA",
    tag: "Burger",
  },
  {
    title: "Assiette Carnivore",
    description: "Assortiment de viandes grillées à partager, toutes halal.",
    price: "3 000 DA",
    tag: "Viandes",
  },
  {
    title: "Salade Royale Atelier",
    description: "Avocat, saumon, champignons, cœur de palmier, asperges, mozzarella.",
    price: "1 900 DA",
    tag: "Entrée",
  },
  {
    title: "Milk-Shake Atelier",
    description: "Figue, datte et fruits secs, préparé minute.",
    price: "750 DA",
    tag: "Milk-shake",
  },
];


const services = [
  { icon: Utensils, label: "Repas sur place", description: "Service à table dans un cadre chaleureux." },
  { icon: Coffee, label: "Cafés & Thés", description: "Grande sélection de cafés et thés d'exception." },
  { icon: Wine, label: "Cocktails & Apéritifs", description: "Cocktails maison et alcools soigneusement choisis." },
  { icon: Cake, label: "Desserts", description: "Pâtisseries et desserts faits maison." },
  { icon: Accessibility, label: "Accessibilité", description: "Entrée, parking et places assises accessibles PMR." },
  { icon: Car, label: "Parking Gratuit", description: "Parking facile et gratuit dans la rue." },
  { icon: Baby, label: "Familles", description: "Chaises hautes et menu enfant disponibles." },
  { icon: Users, label: "Groupes", description: "Parfait pour groupes, étudiants et touristes." },
  { icon: CalendarCheck, label: "Réservations", description: "Réservations acceptées pour déjeuner et dîner." },
  { icon: Moon, label: "Ouvert Tard", description: "Service de restauration ouvert jusqu'à 23 h." },
  { icon: Sun, label: "Terrasse", description: "Terrasse agréable pour les beaux jours." },
  { icon: Utensils, label: "Traiteur", description: "Service traiteur pour vos événements." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero — Split Screen */}
      <section id="accueil" className="relative">
        <div className="grid lg:min-h-[calc(100vh-4rem)] lg:grid-cols-2">
          {/* Image side */}
          <div className="relative order-2 h-80 lg:order-1 lg:h-auto">
            <ResponsiveImage
              image={restaurantInteriorImage}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-burnt-900/40 to-transparent lg:bg-gradient-to-r" />
          </div>

          {/* Content side */}
          <div className="order-1 flex flex-col justify-center px-5 sm:px-8 lg:px-12 lg:order-2 lg:pl-16 xl:pl-24">
            <div className="mx-auto w-full max-w-xl py-16 lg:py-0">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
                <span className="flex h-2 w-2 rounded-full bg-green-500" />
                <span className="text-xs font-medium text-muted-foreground">Ouvert · Ferme à 23:00</span>
              </div>

              <h1 className="font-serif text-4xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                L'Atelier en Ville
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Restaurant, café et cocktails à Tizi Ouzou. Une cuisine halal généreuse, une terrasse ensoleillée et une
                ambiance aussi branchée que décontractée.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-burnt-500 text-burnt-500" />
                  <span className="font-semibold text-foreground">4,1</span>
                  <span>(509 avis)</span>
                </div>
                <span className="hidden sm:inline">·</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-foreground">1 000 – 3 000 DA</span>
                  <span>par personne</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/reservation"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                >
                  Réserver une table
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/commander"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-burnt-500 px-6 py-3 text-sm font-semibold text-warm-white transition-colors hover:bg-burnt-700"
                >
                  Commander en ligne
                </Link>
                <Link
                  to="/menu"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-input bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  Voir le menu
                </Link>
              </div>

              <div className="mt-10 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-burnt-500" />
                  <div>
                    <p className="font-medium text-foreground">Adresse</p>
                    <p className="text-sm text-muted-foreground">
                      M3W2+WV8, Route vers Azib Ahmed et Hasnaoua, Tizi Ouzou 15000
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-burnt-500" />
                  <div>
                    <p className="font-medium text-foreground">Téléphone</p>
                    <p className="text-sm text-muted-foreground">020 94 34 53</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section-padding px-5 sm:px-8 lg:px-12 bg-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-burnt-500">À propos</p>
            <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Un lieu où l'art de la table rencontre la convivialité
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              L'Atelier en Ville est bien plus qu'un restaurant : c'est un lieu de vie. Que vous veniez pour un déjeuner
              rapide entre collègues, un dîner romantique ou un café en terrasse, nous vous accueillons dans un cadre
              chaleureux et soigné.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Notre carte met à l'honneur des produits frais, une cuisine halal savoureuse et des desserts faits maison,
              accompagnés d'une sélection de cafés, thés et cocktails.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="rounded-xl bg-background p-4 shadow-sm">
                <p className="font-serif text-2xl font-medium text-foreground">4,1</p>
                <p className="text-xs text-muted-foreground">Note moyenne</p>
              </div>
              <div className="rounded-xl bg-background p-4 shadow-sm">
                <p className="font-serif text-2xl font-medium text-foreground">509</p>
                <p className="text-xs text-muted-foreground">Avis Google</p>
              </div>
              <div className="rounded-xl bg-background p-4 shadow-sm">
                <p className="font-serif text-2xl font-medium text-foreground">23h</p>
                <p className="text-xs text-muted-foreground">Fermeture</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <ResponsiveImage
              image={terraceImage}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section id="menu" className="section-padding px-5 sm:px-8 lg:px-12 bg-background">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-burnt-500">Menu</p>
              <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                Nos incontournables
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              Une sélection de plats, cafés et cocktails qui font le succès de notre maison.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {menuHighlights.map((item) => (
              <div
                key={item.title}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-burnt-300/30 px-2.5 py-1 text-xs font-semibold text-burnt-900">
                    {item.tag}
                  </span>
                  <span className="font-serif text-lg font-medium text-foreground">{item.price}</span>
                </div>
                <h3 className="font-serif text-xl font-medium text-foreground">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <img
                src={foodSpread}
                alt="Assortiment de plats, cafés et cocktails de L'Atelier en Ville"
                className="h-full w-full object-cover"
                width={1280}
                height={960}
                loading="lazy"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="font-serif text-2xl font-medium text-foreground">Une cuisine généreuse et authentique</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                De petites portions à partager aux plats principaux, en passant par les desserts et les boissons, notre
                carte est pensée pour satisfaire toutes les envies — du petit déjeuner tardif au dîner en solo.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Petit déjeuner",
                  "Déjeuner",
                  "Dîner",
                  "Desserts",
                  "Cocktails",
                  "Plats halal",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-burnt-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section-padding px-5 sm:px-8 lg:px-12 bg-cream">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-burnt-500">Services</p>
            <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Tout pour passer un moment agréable
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Accessible, familial et ouvert tard, L'Atelier en Ville s'adapte à toutes les occasions.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.label}
                className="flex gap-4 rounded-2xl border border-border bg-background p-6 transition-shadow hover:shadow-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-burnt-300/30 text-burnt-900">
                  <service.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-foreground">{service.label}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="avis" className="section-padding px-5 sm:px-8 lg:px-12 bg-background">
        <ReviewsCarousel />
      </section>


      {/* Contact / Location */}
      <section id="contact" className="section-padding px-5 sm:px-8 lg:px-12 bg-burnt-900 text-burnt-300">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-burnt-500">Contact</p>
            <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-warm-white sm:text-4xl">
              Réservez votre table
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-burnt-300">
              Appelez-nous directement ou rendez-vous sur place. Nous serons ravis de vous accueillir pour un déjeuner,
              un dîner ou simplement un café.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href="tel:020943453"
                className="flex items-center gap-4 rounded-2xl border border-burnt-700/50 bg-burnt-900/50 p-4 transition-colors hover:bg-burnt-700/30"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-burnt-700/50 text-burnt-300">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-burnt-300">Téléphone</p>
                  <p className="font-medium text-warm-white">020 94 34 53</p>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-burnt-700/50 bg-burnt-900/50 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-burnt-700/50 text-burnt-300">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-burnt-300">Adresse</p>
                  <p className="font-medium text-warm-white">
                    M3W2+WV8, Route vers Azib Ahmed et Hasnaoua, Tizi Ouzou 15000
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-burnt-700/50 bg-burnt-900/50 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-burnt-700/50 text-burnt-300">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-burnt-300">Horaires</p>
                  <p className="font-medium text-warm-white">Ouvert · Ferme à 23:00</p>
                </div>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=36.7118,4.0458"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-burnt-500 px-6 py-3 text-sm font-semibold text-warm-white transition-colors hover:bg-burnt-300 hover:text-burnt-900"
            >
              <MapPin className="h-4 w-4" />
              Itinéraire
            </a>
          </div>

          <div className="relative min-h-[24rem] overflow-hidden rounded-2xl lg:min-h-full">
            <iframe
              title="Carte L'Atelier en Ville"
              className="absolute inset-0 h-full w-full rounded-2xl border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.1!2d3.9999!3d36.7118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sL'Atelier%20en%20Ville%2C%20Tizi%20Ouzou!5e0!3m2!1sfr!2sdz!4v1234567890"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
