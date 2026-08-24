import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export type Review = {
  name: string;
  initials: string;
  rating: number;
  when: string;
  text: string;
};

export const googleReviews: Review[] = [
  {
    name: "Amine K.",
    initials: "AK",
    rating: 5,
    when: "il y a 1 semaine",
    text: "Excellent rapport qualité-prix. La terrasse est magnifique et le service très attentionné. Le couscous royal est généreux.",
  },
  {
    name: "Sarah B.",
    initials: "SB",
    rating: 4,
    when: "il y a 2 semaines",
    text: "Très bon café et desserts délicieux. Ambiance décontractée, cadre agréable, idéal pour travailler l'après-midi.",
  },
  {
    name: "Karim L.",
    initials: "KL",
    rating: 5,
    when: "il y a 3 semaines",
    text: "Parfait pour un dîner entre amis. Les cocktails sont excellents et la cuisine halal est bien maîtrisée.",
  },
  {
    name: "Lynda A.",
    initials: "LA",
    rating: 5,
    when: "il y a 1 mois",
    text: "Nous sommes venus en famille : chaises hautes, menu enfant et personnel adorable. Les pâtisseries orientales sont un must.",
  },
  {
    name: "Yacine M.",
    initials: "YM",
    rating: 4,
    when: "il y a 1 mois",
    text: "Service tard le soir, ce qui est rare à Tizi Ouzou. Le tagine d'agneau était fondant. Parking facile juste devant.",
  },
  {
    name: "Nadia T.",
    initials: "NT",
    rating: 5,
    when: "il y a 2 mois",
    text: "Grand choix de thés et une théière à la menthe parfaite. Cadre haut de gamme mais prix raisonnables.",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Note : ${rating} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-burnt-500 text-burnt-500" : "text-muted-foreground/40"}`}
        />
      ))}
    </div>
  );
}

export function ReviewsCarousel() {
  const average =
    googleReviews.reduce((sum, r) => sum + r.rating, 0) / googleReviews.length;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-burnt-500">Avis Google</p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Ce que disent nos clients
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Avis récents publiés sur Google · note moyenne des derniers avis {average.toFixed(1).replace(".", ",")}/5
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
            <Star className="h-5 w-5 fill-burnt-500 text-burnt-500" />
            <span className="font-semibold text-foreground">4,1</span>
            <span className="text-sm text-muted-foreground">sur 509 avis Google</span>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=L'Atelier+en+Ville+Tizi+Ouzou"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-burnt-500 underline-offset-4 hover:underline"
          >
            Voir tous les avis sur Google
          </a>
        </div>
      </div>

      <Carousel opts={{ align: "start", loop: true }} className="mt-12">
        <CarouselContent className="-ml-4">
          {googleReviews.map((review) => (
            <CarouselItem key={review.name} className="pl-4 sm:basis-1/2 lg:basis-1/3">
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                <Quote className="h-6 w-6 text-burnt-300" />
                <p className="mt-4 flex-1 leading-relaxed text-foreground">{review.text}</p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-burnt-300/30 text-sm font-semibold text-burnt-900">
                    {review.initials}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.when}</p>
                  </div>
                  <Stars rating={review.rating} />
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-8 flex justify-center gap-3 sm:justify-end">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
}
