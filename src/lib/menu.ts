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
  | "entrees-froides"
  | "volailles"
  | "pates"
  | "risotto"
  | "viandes"
  | "sauces"
  | "mijotes"
  | "burgers"
  | "desserts"
  | "glaces"
  | "detox"
  | "milk-shakes"
  | "cocktails"
  | "mojitos"
  | "jus"
  | "boissons-fraiches"
  | "boissons-chaudes"
  | "the"
  | "lattes-glaces";

export const menuCategories: { id: MenuCategoryId; label: string; description: string }[] = [
  { id: "entrees-froides", label: "Entrées froides", description: "Salades fraîches et entrées généreuses." },
  { id: "volailles", label: "Volailles", description: "Poulet et dinde grillés, en sauce ou mijotés." },
  { id: "pates", label: "Pâtes", description: "Pâtes fraîches préparées à la commande." },
  { id: "risotto", label: "Risotto", description: "Riz crémeux, garnitures au choix." },
  { id: "viandes", label: "Viandes", description: "Grillades et pièces de boucher, toutes halal." },
  { id: "sauces", label: "Sauces au choix", description: "À ajouter à votre viande ou volaille." },
  { id: "mijotes", label: "Mijotés", description: "Nos plats longuement mijotés en sauce." },
  { id: "burgers", label: "Burgers", description: "Pain maison, frites et sauces signature." },
  { id: "desserts", label: "Desserts", description: "Gâteaux, gaufres et douceurs maison." },
  { id: "glaces", label: "Glaces", description: "Coupes glacées gourmandes." },
  { id: "detox", label: "Détox", description: "Jus pressés vitaminés." },
  { id: "milk-shakes", label: "Milk-shakes", description: "Onctueux, préparés minute." },
  { id: "cocktails", label: "Cocktails", description: "Cocktails de fruits frais sans alcool." },
  { id: "mojitos", label: "Mojitos", description: "Nos mojitos frais à la menthe." },
  { id: "jus", label: "Jus de fruit", description: "Selon les fruits de saison." },
  { id: "boissons-fraiches", label: "Boissons fraîches", description: "Sodas et eaux." },
  { id: "boissons-chaudes", label: "Boissons chaudes", description: "Cafés, capsules et chocolats." },
  { id: "the", label: "Thé & infusions", description: "Théières et infusions aux herbes." },
  { id: "lattes-glaces", label: "Cafés latté glacé", description: "Nos cafés glacés signature." },
];

const item = (
  id: string,
  name: string,
  price: number,
  category: MenuCategoryId,
  description: string,
  tags: DietTag[],
  details?: string,
): MenuItem => ({ id, name, description, price, category, tags, details: details ?? description });

export const menuItems: MenuItem[] = [
  // Entrées froides
  item("ef-01", "Salade Niçoise", 800, "entrees-froides", "Cœur de laitue, tomate, oignon, poivron, haricot vert, anchois, olive noire, maïs, œuf poché, thon", ["halal", "sans-gluten"]),
  item("ef-02", "Salade César", 900, "entrees-froides", "Salade, tomate, croûtons, œuf dur, camembert, poulet pané", ["halal"]),
  item("ef-03", "Tomate Mozzarella Caprice", 950, "entrees-froides", "Tomate, sauce pesto, mozzarella", ["halal", "vegetarien", "sans-gluten"]),
  item("ef-04", "Salade Méditerranéenne", 1000, "entrees-froides", "Salade, tomate, carotte, betterave, haricot vert, maïs, cornichons, camembert, mozzarella", ["halal", "vegetarien", "sans-gluten"]),
  item("ef-05", "Salade Sibérienne", 1000, "entrees-froides", "Poulet, cornichon, câpres, tomate cerise, sauce tartare", ["halal"]),
  item("ef-06", "Croustillant de Tomate Mozzarella", 1200, "entrees-froides", "Avocat, sauce pesto, mozzarella", ["halal", "vegetarien"]),
  item("ef-07", "Salade Pâte à l'Italienne", 1400, "entrees-froides", "Oignon, tomate, concombre, cornichon, olives, farfalle, maïs, anchois, mozzarella", ["halal"]),
  item("ef-08", "Salade Poulpe aux Petits Légumes", 1500, "entrees-froides", "Salade, tomate, oignon, citron, cornichons, poulpe", ["halal", "sans-gluten"]),
  item("ef-09", "Salade Exotique", 1600, "entrees-froides", "Fruits de saison, avocat, crevettes, sauce piquante", ["halal", "epice", "sans-gluten"]),
  item("ef-10", "Salade Royale Atelier", 1900, "entrees-froides", "Cœur de laitue, tomate, avocat, saumon, champignons, échalotes, cœur de palmier, asperges, maïs, mozzarella", ["halal", "partager"]),

  // Volailles
  item("vo-01", "Cuisse de Poulet Grillée", 1150, "volailles", "Cuisse de poulet grillée, garniture au choix", ["halal", "sans-gluten"]),
  item("vo-02", "Blanc de Poulet Grillé", 1300, "volailles", "Blanc de poulet grillé, garniture au choix", ["halal", "sans-gluten"]),
  item("vo-03", "Paupiettes de Poulet à la Florentine", 1500, "volailles", "Paupiettes de poulet aux épinards à la florentine", ["halal"]),
  item("vo-04", "Suprême de Poulet Tandoori", 1550, "volailles", "Suprême de poulet mariné aux épices tandoori", ["halal", "epice"]),
  item("vo-05", "Suprême de Poulet à la Crème de Champignons", 1600, "volailles", "Suprême de poulet, sauce crémeuse aux champignons", ["halal"]),
  item("vo-06", "Blanquette de Poulet au Curry", 1600, "volailles", "Poulet mijoté au curry et à la crème", ["halal", "epice"]),
  item("vo-07", "Émincé de Dinde Tikka Massala", 1700, "volailles", "Émincé de dinde, sauce tikka massala", ["halal", "epice"]),
  item("vo-08", "Blanc de Poulet à l'Italienne", 1800, "volailles", "Blanc de poulet, tomate, mozzarella, basilic", ["halal"]),
  item("vo-09", "Mille-feuille Norvégien", 2000, "volailles", "Mille-feuille de volaille et saumon", ["halal"]),

  // Pâtes
  item("pa-01", "Spaghetti all'Arrabbiata", 900, "pates", "Spaghetti sauce tomate relevée (piquant)", ["halal", "vegetarien", "epice"]),
  item("pa-02", "Spaghetti Carbonara", 1150, "pates", "Spaghetti, crème, œuf, viande fumée halal", ["halal"]),
  item("pa-03", "Spaghetti Bolognaise", 1400, "pates", "Spaghetti, sauce bolognaise maison", ["halal"]),
  item("pa-04", "Tagliatelle Alfredo", 1200, "pates", "Tagliatelle, sauce crémeuse au parmesan", ["halal", "vegetarien"]),
  item("pa-05", "Penne Quatre Fromages", 1350, "pates", "Penne, sauce aux quatre fromages", ["halal", "vegetarien"]),
  item("pa-06", "Linguine au Saumon", 1500, "pates", "Linguine, saumon, crème et aneth", ["halal"]),

  // Risotto
  item("ri-01", "Risotto Chorizo", 1400, "risotto", "Riz crémeux, chorizo de volaille halal", ["halal", "sans-gluten"]),
  item("ri-02", "Risotto Poulet Champignons", 1400, "risotto", "Riz crémeux, poulet et champignons", ["halal", "sans-gluten"]),
  item("ri-03", "Risotto Crevettes Blanches", 1800, "risotto", "Riz crémeux, crevettes blanches", ["halal", "sans-gluten"]),

  // Viandes
  item("vi-01", "Assortiment de Brochettes", 1850, "viandes", "Assortiment de brochettes grillées", ["halal", "partager"]),
  item("vi-02", "Steak Haché Farci au Fromage", 1950, "viandes", "Steak haché farci au fromage fondant", ["halal"]),
  item("vi-03", "Entrecôte Grillée", 2100, "viandes", "Entrecôte grillée, cuisson au choix", ["halal", "sans-gluten"]),
  item("vi-04", "Foie Grillé", 2300, "viandes", "Foie de veau grillé", ["halal", "sans-gluten"]),
  item("vi-05", "Filet Grillé", 2500, "viandes", "Filet de bœuf grillé", ["halal", "sans-gluten"]),
  item("vi-06", "Piccata de Bœuf", 2550, "viandes", "Fines escalopes de bœuf poêlées", ["halal"]),
  item("vi-07", "Côte d'Agneau", 2800, "viandes", "Côtes d'agneau grillées", ["halal", "sans-gluten"]),
  item("vi-08", "Assiette Carnivore", 3000, "viandes", "Assortiment de viandes grillées", ["halal", "partager"]),
  item("vi-09", "Côte de Bœuf (le kg)", 6000, "viandes", "Côte de bœuf grillée, prix au kilo", ["halal", "partager"], "Prix au kilogramme, à partager. Pesée avant cuisson."),
  item("vi-10", "T-Bone Steak (le kg)", 8000, "viandes", "T-bone grillé, prix au kilo", ["halal", "partager"], "Prix au kilogramme, à partager. Pesée avant cuisson."),

  // Sauces
  item("sa-01", "Sauce au choix", 400, "sauces", "Fromage, persil, tandoori, roquefort, champignons, poivre, moutarde à l'ancienne, crème balsamique", ["halal"], "Précisez la sauce souhaitée dans les notes de commande."),

  // Mijotés
  item("mi-01", "Foie à la Provençale", 2500, "mijotes", "Foie mijoté à la provençale", ["halal"]),
  item("mi-02", "Émincé de Bœuf à la Crème de Champignons", 2650, "mijotes", "Émincé de bœuf, sauce crémeuse aux champignons", ["halal"]),
  item("mi-03", "Filet au Poivre Vert", 2900, "mijotes", "Filet de bœuf, sauce au poivre vert", ["halal"]),
  item("mi-04", "Noisettes d'Agneau à la Crème d'Ail", 3100, "mijotes", "Noisettes d'agneau, crème d'ail", ["halal"]),

  // Burgers
  item("bu-01", "Burger Chicken", 900, "burgers", "Salade, tomate, fromage, poulet pané", ["halal", "enfants"]),
  item("bu-02", "Burger Classic", 1000, "burgers", "Salade, tomate, fromage, viande", ["halal", "enfants"]),
  item("bu-03", "Burger Atelier", 1650, "burgers", "Salade, tomate, fromage, viande, chicken, oignon caramélisé, avocat, sauce barbecue", ["halal"]),
  item("bu-04", "Burger King Kong", 1800, "burgers", "Salade, tomate, fromage, double viande, sauce brisket", ["halal"]),

  // Desserts
  item("de-01", "Cheesecake", 400, "desserts", "Cheesecake du jour", ["halal", "vegetarien"]),
  item("de-02", "Gâteaux du Jour", 400, "desserts", "Sélection de gâteaux préparés le matin", ["halal", "vegetarien"]),
  item("de-03", "Crème Brûlée", 400, "desserts", "Crème vanille caramélisée", ["halal", "vegetarien", "sans-gluten"]),
  item("de-04", "Crème Renversée", 400, "desserts", "Flan caramel maison", ["halal", "vegetarien", "sans-gluten"]),
  item("de-05", "Vérine aux Fruits", 450, "desserts", "Vérine crémeuse aux fruits frais", ["halal", "vegetarien"]),
  item("de-06", "Fondant au Chocolat", 500, "desserts", "Fondant au cœur coulant", ["halal", "vegetarien"]),
  item("de-07", "Gaufre", 550, "desserts", "Au miel, au Nutella ou à la confiture", ["halal", "vegetarien", "enfants"], "Garniture au choix : miel, Nutella ou confiture — précisez en notes."),
  item("de-08", "Gaufre aux Fruits", 750, "desserts", "Gaufre garnie de fruits frais, miel, Nutella ou confiture", ["halal", "vegetarien", "enfants"]),
  item("de-09", "Pain Cake", 550, "desserts", "Au miel, au Nutella ou à la confiture", ["halal", "vegetarien"]),
  item("de-10", "Pain Cake aux Fruits", 750, "desserts", "Pain cake garni de fruits frais", ["halal", "vegetarien"]),
  item("de-11", "Pain Cake aux Fruits Secs & Boule de Glace", 850, "desserts", "Fruits secs, boule de glace, miel, Nutella ou confiture", ["halal", "vegetarien"]),
  item("de-12", "Salade aux Fruits", 850, "desserts", "Fruits frais de saison", ["halal", "vegetarien", "sans-gluten"]),
  item("de-13", "Assiette de Fruits Atelier", 1200, "desserts", "Grande assiette de fruits de saison", ["halal", "vegetarien", "sans-gluten", "partager"]),

  // Glaces
  item("gl-01", "Dame Blanche aux Fruits", 850, "glaces", "Vanille, ananas, yaourt", ["halal", "vegetarien"]),
  item("gl-02", "Banana Split", 850, "glaces", "Vanille, fraise, chocolat, banane", ["halal", "vegetarien", "enfants"]),
  item("gl-03", "Hérisson", 900, "glaces", "Fraise, chocolat, vanille", ["halal", "vegetarien", "enfants"]),

  // Détox
  item("dx-01", "Helthy", 500, "detox", "Concombre, citron, gingembre, pomme, dattes", ["halal", "vegetarien", "sans-gluten"]),
  item("dx-02", "Minceur", 500, "detox", "Pomme, citron, carotte, épinard", ["halal", "vegetarien", "sans-gluten"]),
  item("dx-03", "Iron Green", 550, "detox", "Concombre, céleri, persil, épinard, menthe", ["halal", "vegetarien", "sans-gluten"]),
  item("dx-04", "Power Diet", 550, "detox", "Citron, orange, gingembre, curcuma", ["halal", "vegetarien", "sans-gluten"]),
  item("dx-05", "Red Boost", 600, "detox", "Pomme, orange, betterave, citron, carotte", ["halal", "vegetarien", "sans-gluten"]),

  // Milk-shakes
  item("ms-01", "Milk-Shake Banane", 500, "milk-shakes", "Banane et lait frais", ["halal", "vegetarien", "enfants"]),
  item("ms-02", "Milk-Shake Fresh à la Menthe", 500, "milk-shakes", "Menthe fraîche et lait", ["halal", "vegetarien"]),
  item("ms-03", "Milk-Shake Chocolat Framboise", 500, "milk-shakes", "Chocolat et framboise", ["halal", "vegetarien", "enfants"]),
  item("ms-04", "Milk-Shake Oreo", 550, "milk-shakes", "Biscuits Oreo et lait", ["halal", "vegetarien", "enfants"]),
  item("ms-05", "Milk-Shake Lotus", 550, "milk-shakes", "Spéculoos Lotus et lait", ["halal", "vegetarien", "enfants"]),
  item("ms-06", "Milk-Shake Fruits Secs", 650, "milk-shakes", "Assortiment de fruits secs", ["halal", "vegetarien"]),
  item("ms-07", "Milk-Shake Power", 700, "milk-shakes", "Banane, flocons d'avoine, amande", ["halal", "vegetarien"]),
  item("ms-08", "Milk-Shake Atelier", 750, "milk-shakes", "Figue, datte, fruits secs", ["halal", "vegetarien"]),

  // Cocktails
  item("co-01", "Cocktail Fruits de Saison", 450, "cocktails", "Fruits frais de saison", ["halal", "vegetarien", "sans-gluten"]),
  item("co-02", "Cocktail Délice", 450, "cocktails", "Banane, fraise, poire", ["halal", "vegetarien", "sans-gluten"]),
  item("co-03", "Cocktail Fresh Passion", 450, "cocktails", "Fruit de la passion, orange, menthe", ["halal", "vegetarien", "sans-gluten"]),
  item("co-04", "Cocktail Acapulco", 500, "cocktails", "Ananas, pêche, framboise, raisin sec", ["halal", "vegetarien", "sans-gluten"]),
  item("co-05", "Cocktail Green", 500, "cocktails", "Pomme, citron, kiwi, menthe", ["halal", "vegetarien", "sans-gluten"]),
  item("co-06", "Cocktail Gourmand", 500, "cocktails", "Banane, ananas, fraise, lait de coco", ["halal", "vegetarien", "sans-gluten"]),
  item("co-07", "Cocktail Super Berry", 500, "cocktails", "Fraise, framboise, banane, citron", ["halal", "vegetarien", "sans-gluten"]),
  item("co-08", "Cocktail Ceausescu", 550, "cocktails", "Banane, pomme, ananas, raisin sec", ["halal", "vegetarien", "sans-gluten"]),
  item("co-09", "Cocktail The Owl Cocktail House", 550, "cocktails", "Jus d'hibiscus, sirop vanille, ananas, citron", ["halal", "vegetarien", "sans-gluten"]),
  item("co-10", "Cocktail Parfum de Femme", 600, "cocktails", "Orange, ananas, citron, lait d'amande, grenadine", ["halal", "vegetarien", "sans-gluten"]),
  item("co-11", "Cocktail Clean Body", 700, "cocktails", "Ananas, banane, purée de mangue, kiwi, avocat", ["halal", "vegetarien", "sans-gluten"]),

  // Mojitos
  item("mo-01", "Mojito Classico", 450, "mojitos", "Menthe fraîche, citron vert, sucre de canne", ["halal", "vegetarien", "sans-gluten"]),
  item("mo-02", "Mojito Miel Gingembre", 500, "mojitos", "Miel, gingembre, menthe", ["halal", "vegetarien", "sans-gluten"]),
  item("mo-03", "Mojito Fruit Rouge", 500, "mojitos", "Fruits rouges et menthe", ["halal", "vegetarien", "sans-gluten"]),
  item("mo-04", "Mojito Fruit de la Passion", 500, "mojitos", "Fruit de la passion et menthe", ["halal", "vegetarien", "sans-gluten"]),
  item("mo-05", "Mojito Bleu Curaçao", 500, "mojitos", "Sirop bleu curaçao et menthe", ["halal", "vegetarien", "sans-gluten"]),
  item("mo-06", "Mojito Framboise", 500, "mojitos", "Framboise et menthe", ["halal", "vegetarien", "sans-gluten"]),
  item("mo-07", "Mojito Fraise", 500, "mojitos", "Fraise et menthe", ["halal", "vegetarien", "sans-gluten"]),

  // Jus
  item("ju-01", "Jus de Fruit — Selon la Saison", 500, "jus", "Jus pressé selon les fruits de saison", ["halal", "vegetarien", "sans-gluten", "enfants"]),

  // Boissons fraîches
  item("bf-01", "Boisson Gazeuse en Canette", 150, "boissons-fraiches", "Coca, Fanta, Pepsi, Hamoud, Schweppes, Sprite", ["halal", "vegetarien", "sans-gluten"]),
  item("bf-02", "Eau Gazeuse PM", 100, "boissons-fraiches", "Petite bouteille d'eau gazeuse", ["halal", "vegetarien", "sans-gluten"]),
  item("bf-03", "Eau Gazeuse GM", 200, "boissons-fraiches", "Grande bouteille d'eau gazeuse", ["halal", "vegetarien", "sans-gluten"]),
  item("bf-04", "Eau Minérale PM", 50, "boissons-fraiches", "Petite bouteille d'eau minérale", ["halal", "vegetarien", "sans-gluten"]),
  item("bf-05", "Eau Minérale GM", 100, "boissons-fraiches", "Grande bouteille d'eau minérale", ["halal", "vegetarien", "sans-gluten"]),

  // Boissons chaudes
  item("bc-01", "Café Capsule Davidoff", 250, "boissons-chaudes", "Café en capsule Davidoff", ["halal", "vegetarien", "sans-gluten"]),
  item("bc-02", "Café Capsule L'Or", 300, "boissons-chaudes", "Café en capsule L'Or", ["halal", "vegetarien", "sans-gluten"]),
  item("bc-03", "Café Capsule Nespresso", 300, "boissons-chaudes", "Café en capsule Nespresso", ["halal", "vegetarien", "sans-gluten"]),
  item("bc-04", "Café Capsule Lavazza", 300, "boissons-chaudes", "Café en capsule Lavazza", ["halal", "vegetarien", "sans-gluten"]),
  item("bc-05", "Café Capsule Illy", 300, "boissons-chaudes", "Café en capsule Illy", ["halal", "vegetarien", "sans-gluten"]),
  item("bc-06", "Café au Lait", 250, "boissons-chaudes", "Café allongé au lait chaud", ["halal", "vegetarien", "sans-gluten"]),
  item("bc-07", "Lait au Chocolat", 250, "boissons-chaudes", "Lait chaud au chocolat", ["halal", "vegetarien", "enfants"]),
  item("bc-08", "Cappuccino", 300, "boissons-chaudes", "Café, mousse de lait onctueuse", ["halal", "vegetarien", "sans-gluten"]),
  item("bc-09", "Café Moka", 300, "boissons-chaudes", "Café, Nutella, chantilly", ["halal", "vegetarien"]),
  item("bc-10", "Macchiato", 300, "boissons-chaudes", "Café & mousse de lait : chocolat, noisette, caramel ou vanille", ["halal", "vegetarien"]),
  item("bc-11", "Dalgona Café", 300, "boissons-chaudes", "Café & mousse de café : chocolat, noisette, caramel ou vanille", ["halal", "vegetarien"]),
  item("bc-12", "Chocolat Chaud", 300, "boissons-chaudes", "Chocolat chaud maison", ["halal", "vegetarien", "enfants"]),
  item("bc-13", "Chocolat Viennois", 350, "boissons-chaudes", "Chocolat chaud et chantilly", ["halal", "vegetarien", "enfants"]),

  // Thé
  item("th-01", "Théière Deux Personnes", 300, "the", "Théière pour deux", ["halal", "vegetarien", "sans-gluten", "partager"]),
  item("th-02", "Théière Quatre Personnes", 600, "the", "Théière pour quatre", ["halal", "vegetarien", "sans-gluten", "partager"]),
  item("th-03", "Thé Infusion", 150, "the", "Thé infusé nature", ["halal", "vegetarien", "sans-gluten"]),
  item("th-04", "Infusion aux Herbes", 350, "the", "Fraise, jasmin, camomille, fleur de grenade, takerwait, lavande, origan", ["halal", "vegetarien", "sans-gluten"]),
  item("th-05", "Tisane Verveine", 150, "the", "Infusion de verveine", ["halal", "vegetarien", "sans-gluten"]),

  // Cafés latté glacé
  item("lg-01", "Café Cremoso", 300, "lattes-glaces", "Nescafé, miel, glaçons, lait", ["halal", "vegetarien"]),
  item("lg-02", "Tiramisu Iced Latté", 300, "lattes-glaces", "Lait, café, glaçons, chantilly", ["halal", "vegetarien"]),
  item("lg-03", "Brownie Dalgona Latté", 350, "lattes-glaces", "Café, mousse de café, glaçons, lait, chantilly", ["halal", "vegetarien"]),
  item("lg-04", "Latté Glacé au Curcuma", 350, "lattes-glaces", "Lait, curcuma, glaçons, café", ["halal", "vegetarien"]),
  item("lg-05", "Oreo Cream", 400, "lattes-glaces", "Fromage frais, Oreo, lait, café, glaçons", ["halal", "vegetarien"]),
  item("lg-06", "Banana Cream", 450, "lattes-glaces", "Café, glaçons, milk-shake banane", ["halal", "vegetarien"]),
  item("lg-07", "Latté Glacé Lotus", 400, "lattes-glaces", "Fromage frais, Lotus, lait, café, glaçons", ["halal", "vegetarien"]),
];

export const formatDA = (value: number) => `${value.toLocaleString("fr-FR")} DA`;
