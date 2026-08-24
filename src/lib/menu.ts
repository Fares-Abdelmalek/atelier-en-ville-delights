export type DietTag = "halal" | "vegetarien" | "enfants" | "sans-gluten" | "epice" | "partager";

export const dietTagLabels: Record<DietTag, string> = {
  halal: "Halal",
  vegetarien: "Végétarien",
  enfants: "Menu enfant",
  "sans-gluten": "Sans gluten",
  epice: "Épicé",
  partager: "À partager",
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number; // DA
  category: MenuCategoryId;
  tags: DietTag[];
  details: string;
};

export type MenuCategoryId =
  | "petit-dejeuner"
  | "entrees"
  | "plats"
  | "desserts"
  | "cafes-thes"
  | "cocktails";

export const menuCategories: { id: MenuCategoryId; label: string; description: string }[] = [
  {
    id: "petit-dejeuner",
    label: "Petit déjeuner",
    description: "Servi jusqu'à 11 h 30, avec viennoiseries maison.",
  },
  {
    id: "entrees",
    label: "Entrées & à partager",
    description: "Petites portions généreuses, parfaites pour la table.",
  },
  { id: "plats", label: "Plats", description: "Nos spécialités mijotées et grillées, toutes halal." },
  { id: "desserts", label: "Desserts", description: "Pâtisseries et douceurs préparées chaque matin." },
  { id: "cafes-thes", label: "Cafés & thés", description: "Notre grande sélection de cafés et de thés." },
  { id: "cocktails", label: "Cocktails & apéritifs", description: "Créations de nos barmen, avec ou sans alcool." },
];

export const menuItems: MenuItem[] = [
  {
    id: "pt-01",
    name: "Formule Atelier",
    description: "Café ou thé, jus pressé, msemen, beurre et confiture maison.",
    price: 650,
    category: "petit-dejeuner",
    tags: ["halal", "vegetarien"],
    details: "Servie de 8 h à 11 h 30. Msemen préparé à la commande, confiture d'abricot maison.",
  },
  {
    id: "pt-02",
    name: "Œufs Brouillés Fermiers",
    description: "Œufs crémeux, pain grillé au levain, herbes fraîches.",
    price: 550,
    category: "petit-dejeuner",
    tags: ["halal", "vegetarien"],
    details: "Œufs fermiers locaux, beurre doux, ciboulette. Version sans pain disponible.",
  },
  {
    id: "pt-03",
    name: "Pancakes des Petits",
    description: "Trois pancakes moelleux, miel ou chocolat, fruits frais.",
    price: 450,
    category: "petit-dejeuner",
    tags: ["halal", "vegetarien", "enfants"],
    details: "Portion enfant. Sirop d'érable, pâte à tartiner ou miel de montagne au choix.",
  },
  {
    id: "en-01",
    name: "Mezze de l'Atelier",
    description: "Houmous, caviar d'aubergine, olives marinées, pain chaud.",
    price: 900,
    category: "entrees",
    tags: ["halal", "vegetarien", "partager"],
    details: "Planche pour 2 à 3 personnes. Pain cuit au four à la commande.",
  },
  {
    id: "en-02",
    name: "Bricks Croustillantes",
    description: "Feuilles de brick garnies au thon ou au poulet, citron confit.",
    price: 600,
    category: "entrees",
    tags: ["halal", "partager"],
    details: "Quatre pièces. Précisez thon ou poulet dans les notes de commande.",
  },
  {
    id: "en-03",
    name: "Salade Chorba Verte",
    description: "Jeunes pousses, avocat, grenade, vinaigrette au citron.",
    price: 700,
    category: "entrees",
    tags: ["halal", "vegetarien", "sans-gluten"],
    details: "Sans gluten. Peut être servie en plat avec supplément poulet grillé.",
  },
  {
    id: "pl-01",
    name: "Couscous Royal",
    description: "Semoule fine, légumes de saison, agneau, poulet et merguez.",
    price: 1200,
    category: "plats",
    tags: ["halal", "epice"],
    details: "Viandes certifiées halal. Bouillon relevé servi à part, harissa sur demande.",
  },
  {
    id: "pl-02",
    name: "Tagine d'Agneau aux Pruneaux",
    description: "Épaule d'agneau mijotée, pruneaux, amandes, épices douces.",
    price: 1500,
    category: "plats",
    tags: ["halal"],
    details: "Mijoté 4 heures. Servi avec semoule ou pommes de terre confites.",
  },
  {
    id: "pl-03",
    name: "Entrecôte Grillée & Frites Maison",
    description: "Pièce de bœuf grillée, beurre aux herbes, frites fraîches.",
    price: 1800,
    category: "plats",
    tags: ["halal"],
    details: "Cuisson au choix. Bœuf halal de Kabylie, frites coupées main.",
  },
  {
    id: "pl-04",
    name: "Assiette des Petits Chefs",
    description: "Escalope panée ou boulettes, purée maison, légumes fondants.",
    price: 600,
    category: "plats",
    tags: ["halal", "enfants"],
    details: "Menu enfant : plat + jus + boule de glace. Chaises hautes disponibles.",
  },
  {
    id: "pl-05",
    name: "Risotto aux Légumes Rôtis",
    description: "Riz crémeux, courgettes, poivrons confits, parmesan.",
    price: 1100,
    category: "plats",
    tags: ["halal", "vegetarien", "sans-gluten"],
    details: "Version vegan possible (sans parmesan ni beurre) — précisez en notes.",
  },
  {
    id: "de-01",
    name: "Fondant au Chocolat",
    description: "Cœur coulant, glace vanille de Madagascar.",
    price: 500,
    category: "desserts",
    tags: ["halal", "vegetarien"],
    details: "Cuit à la commande, comptez 12 minutes de préparation.",
  },
  {
    id: "de-02",
    name: "Assiette de Pâtisseries Orientales",
    description: "Baklawa, makrout, cornes de gazelle, amandes grillées.",
    price: 550,
    category: "desserts",
    tags: ["halal", "vegetarien", "partager"],
    details: "Six pièces à partager, préparées par notre pâtissier chaque matin.",
  },
  {
    id: "de-03",
    name: "Cheesecake Figue & Miel",
    description: "Base sablée, crème légère, figues fraîches, miel de Kabylie.",
    price: 520,
    category: "desserts",
    tags: ["halal", "vegetarien"],
    details: "Sans gélatine animale. Disponible selon la saison des figues.",
  },
  {
    id: "ca-01",
    name: "Café Crème Signature",
    description: "Notre torréfaction maison, mousse de lait onctueuse.",
    price: 250,
    category: "cafes-thes",
    tags: ["halal", "vegetarien"],
    details: "Grains arabica torréfiés localement. Lait d'amande disponible.",
  },
  {
    id: "ca-02",
    name: "Espresso Double",
    description: "Corsé et intense, servi avec un carré de chocolat.",
    price: 220,
    category: "cafes-thes",
    tags: ["halal", "vegetarien", "sans-gluten"],
    details: "Notre café le plus demandé pour l'après-déjeuner.",
  },
  {
    id: "ca-03",
    name: "Théière de Menthe Fraîche",
    description: "Thé vert gunpowder, menthe du jardin, pignons.",
    price: 400,
    category: "cafes-thes",
    tags: ["halal", "vegetarien", "partager"],
    details: "Théière pour deux. Grand choix de thés : jasmin, earl grey, verveine.",
  },
  {
    id: "co-01",
    name: "Cocktail Maison Sienne",
    description: "Fruits rouges, citron vert, sirop d'hibiscus, eau pétillante.",
    price: 650,
    category: "cocktails",
    tags: ["halal", "vegetarien"],
    details: "Version sans alcool par défaut, version alcoolisée sur place uniquement.",
  },
  {
    id: "co-02",
    name: "Mojito Atelier",
    description: "Menthe fraîche pilée, citron vert, sucre de canne.",
    price: 700,
    category: "cocktails",
    tags: ["vegetarien"],
    details: "Avec ou sans alcool. Service au bar jusqu'à 22 h 30.",
  },
  {
    id: "co-03",
    name: "Limonade Kabyle",
    description: "Citron pressé, fleur d'oranger, glace pilée.",
    price: 350,
    category: "cocktails",
    tags: ["halal", "vegetarien", "sans-gluten", "enfants"],
    details: "Sans alcool, appréciée des enfants. Servie en grand verre givré.",
  },
];

export const formatDA = (value: number) => `${value.toLocaleString("fr-FR")} DA`;
