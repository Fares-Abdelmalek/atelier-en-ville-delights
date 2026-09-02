import interiorAvif480 from "../assets/restaurant-interior-480.avif.asset.json";
import interiorAvif768 from "../assets/restaurant-interior-768.avif.asset.json";
import interiorAvif1080 from "../assets/restaurant-interior-1080.avif.asset.json";
import interiorWebp480 from "../assets/restaurant-interior-480.webp.asset.json";
import interiorWebp768 from "../assets/restaurant-interior-768.webp.asset.json";
import interiorWebp1080 from "../assets/restaurant-interior-1080.webp.asset.json";
import interiorJpg480 from "../assets/restaurant-interior-480.jpg.asset.json";
import interiorJpg768 from "../assets/restaurant-interior-768.jpg.asset.json";
import interiorJpg1080 from "../assets/restaurant-interior-1080.jpg.asset.json";

import terraceAvif480 from "../assets/terrace-480.avif.asset.json";
import terraceAvif768 from "../assets/terrace-768.avif.asset.json";
import terraceAvif1080 from "../assets/terrace-1080.avif.asset.json";
import terraceWebp480 from "../assets/terrace-480.webp.asset.json";
import terraceWebp768 from "../assets/terrace-768.webp.asset.json";
import terraceWebp1080 from "../assets/terrace-1080.webp.asset.json";
import terraceJpg480 from "../assets/terrace-480.jpg.asset.json";
import terraceJpg768 from "../assets/terrace-768.jpg.asset.json";
import terraceJpg1080 from "../assets/terrace-1080.jpg.asset.json";

export type ResponsiveImageSource = {
  avif: string;
  webp: string;
  jpg: string;
  fallback: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

const srcset = (entries: Array<[{ url: string }, number]>) =>
  entries.map(([asset, w]) => `${asset.url} ${w}w`).join(", ");

export const restaurantInteriorImage: ResponsiveImageSource = {
  avif: srcset([
    [interiorAvif480, 480],
    [interiorAvif768, 768],
    [interiorAvif1080, 1080],
  ]),
  webp: srcset([
    [interiorWebp480, 480],
    [interiorWebp768, 768],
    [interiorWebp1080, 1080],
  ]),
  jpg: srcset([
    [interiorJpg480, 480],
    [interiorJpg768, 768],
    [interiorJpg1080, 1080],
  ]),
  fallback: interiorJpg1080.url,
  width: 1080,
  height: 1946,
  alt:
    "Salle intérieure du restaurant L'Atelier en Ville à Tizi Ouzou : tables en bois dressées, banquettes et éclairage tamisé",
  caption:
    "L'Atelier en Ville, Tizi Ouzou — salle intérieure haut de gamme à l'ambiance décontractée, idéale pour un déjeuner, un dîner romantique ou un repas en groupe.",
};

export const terraceImage: ResponsiveImageSource = {
  avif: srcset([
    [terraceAvif480, 480],
    [terraceAvif768, 768],
    [terraceAvif1080, 1080],
  ]),
  webp: srcset([
    [terraceWebp480, 480],
    [terraceWebp768, 768],
    [terraceWebp1080, 1080],
  ]),
  jpg: srcset([
    [terraceJpg480, 480],
    [terraceJpg768, 768],
    [terraceJpg1080, 1080],
  ]),
  fallback: terraceJpg1080.url,
  width: 1080,
  height: 1918,
  alt:
    "Détail de la décoration de L'Atelier en Ville : coin salon chaleureux avec assises confortables et lumière douce",
  caption:
    "Cadre agréable et branché de L'Atelier en Ville : coin salon confortable pour un café, un thé ou un cocktail à Tizi Ouzou.",
};

import logoAsset from "../assets/logo-atelier-en-ville.jpg.asset.json";
import qrCodeAsset from "../assets/qrcode-atelier-en-ville.png.asset.json";

export const logoImage = {
  url: logoAsset.url,
  alt: "Logo de L'Atelier en Ville, restaurant, café et cocktails à Tizi Ouzou",
};

export const qrCodeImage = {
  url: qrCodeAsset.url,
  alt: "QR code pour accéder au site de L'Atelier en Ville, restaurant à Tizi Ouzou",
  caption: "Scannez ce QR code pour ouvrir le site web de L'Atelier en Ville.",
};
