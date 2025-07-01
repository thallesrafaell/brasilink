import { Star } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
  name: string;
  subtitle: string;
  rating: number;
  totalReviews: number;
  heroImage: string;
}

export const HeroSection = ({
  name,
  subtitle,
  rating,
  totalReviews,
  heroImage,
}: HeroSectionProps) => {
  return (
    <section className="relative h-[500px] w-full overflow-hidden">
      <Image
        src={heroImage}
        alt={name}
        fill
        className="object-cover blur-sm"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="px-4 text-center text-white">
          <h1 className="mb-4 text-5xl font-bold drop-shadow-2xl md:text-7xl">
            {name}
          </h1>
          <p className="mb-6 text-xl text-white/90 drop-shadow-lg md:text-2xl">
            {subtitle}
          </p>
          <div className="flex items-center justify-center gap-2 text-lg">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-white/50"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 font-semibold">{rating}</span>
            <span className="text-white/80">({totalReviews} reviews)</span>
          </div>
        </div>
      </div>
    </section>
  );
};
