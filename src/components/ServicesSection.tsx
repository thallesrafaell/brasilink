import { ServiceCard } from "@/components/ServiceCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  image: string;
}

interface ServicesSectionProps {
  services: Service[];
  // eslint-disable-next-line no-unused-vars
  formatCurrency: (value: number) => string;
  // eslint-disable-next-line no-unused-vars
  formatDuration: (duration: number) => string;
}

export const ServicesSection = ({
  services,
  formatCurrency,
  formatDuration,
}: ServicesSectionProps) => {
  return (
    <section className="bg-white px-4 py-16 dark:bg-gray-800">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Our Services
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            We offer a wide range of professional services to meet all your
            needs
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="mx-auto w-full max-w-5xl"
        >
          <CarouselContent className="-ml-3 md:-ml-4">
            {services.map((service) => (
              <CarouselItem
                key={service.id}
                className="basis-full pl-3 sm:basis-1/2 md:basis-1/2 md:pl-4 lg:basis-1/3 xl:basis-1/3"
              >
                <div className="h-full">
                  <ServiceCard
                    service={service}
                    formatCurrency={formatCurrency}
                    formatDuration={formatDuration}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};
