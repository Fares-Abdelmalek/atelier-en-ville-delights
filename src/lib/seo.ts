import { menuCategories, menuItems } from "./menu";

export const SITE_URL = "https://atelier-en-ville-delights.lovable.app";

const openingHours = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "08:00",
    closes: "23:00",
  },
];

export const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${SITE_URL}/#restaurant`,
  name: "L'Atelier en Ville",
  description:
    "Restaurant, café et cocktails à Tizi Ouzou : cuisine halal, terrasse, service à table et ambiance chaleureuse.",
  url: SITE_URL,
  telephone: "+213 20 94 34 53",
  priceRange: "1 000–3 000 DA",
  servesCuisine: ["Algérienne", "Internationale", "Café", "Cocktails"],
  currenciesAccepted: "DZD",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Route vers Azib Ahmed et Hasnaoua",
    addressLocality: "Tizi Ouzou",
    postalCode: "15000",
    addressCountry: "DZ",
  },
  geo: { "@type": "GeoCoordinates", latitude: 36.7118, longitude: 4.0459 },
  hasMap: "https://maps.google.com/?q=L'Atelier+en+Ville+Tizi+Ouzou",
  openingHoursSpecification: openingHours,
  acceptsReservations: `${SITE_URL}/reservation`,
  hasMenu: `${SITE_URL}/menu`,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.1",
    reviewCount: "509",
    bestRating: "5",
  },
  amenityFeature: [
    "Terrasse",
    "Vente à emporter",
    "Repas sur place",
    "Plats halal",
    "Menu enfant",
    "Parking gratuit",
    "Entrée accessible en fauteuil roulant",
  ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
};

export const menuSchema = {
  "@context": "https://schema.org",
  "@type": "Menu",
  "@id": `${SITE_URL}/menu#menu`,
  name: "Carte de L'Atelier en Ville",
  url: `${SITE_URL}/menu`,
  inLanguage: "fr",
  hasMenuSection: menuCategories.map((category) => ({
    "@type": "MenuSection",
    name: category.label,
    description: category.description,
    hasMenuItem: menuItems
      .filter((item) => item.category === category.id)
      .map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
        offers: {
          "@type": "Offer",
          price: item.price,
          priceCurrency: "DZD",
        },
        suitableForDiet: item.tags.includes("vegetarien")
          ? "https://schema.org/VegetarianDiet"
          : undefined,
      })),
  })),
};

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});
