import { AboutSection } from "@/components/AboutSection";
import { CTASection } from "@/components/CTASection";
import { FixedThemeToggle } from "@/components/FixedThemeToggle";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface UserPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Simulating client data - will come from database later
const getClientData = (id: string) => {
  return {
    id,
    name: "Magic Touch",
    subtitle: "Cleaning and Maintenance Services",
    description:
      "We offer high-quality cleaning and maintenance services for residences and businesses. Our qualified team is always ready to meet your needs with excellence and professionalism.",
    location: "São Paulo, SP",
    phone: "(11) 99999-9999",
    email: "contact@magictouch.com.br",
    rating: 4.9,
    totalReviews: 247,
    avatar: "/hero.jpg",
    services: [
      {
        id: 1,
        name: "Complete Residential Cleaning",
        description:
          "Complete cleaning service for your home, including all rooms, bathrooms, kitchen and outdoor areas.",
        price: 150.0,
        duration: 3, // hours
        image: "/hero.jpg",
      },
      {
        id: 2,
        name: "Post-Construction Cleaning",
        description:
          "Specialized cleaning after renovations and construction, removing debris and leaving the environment ready for use.",
        price: 250.0,
        duration: 5,
        image: "/hero.jpg",
      },
      {
        id: 3,
        name: "Garden Maintenance",
        description:
          "Complete care for your garden, including pruning, watering, fertilizing and basic landscaping.",
        price: 100.0,
        duration: 2,
        image: "/hero.jpg",
      },
      {
        id: 4,
        name: "Office Cleaning",
        description:
          "Maintenance and cleaning of corporate spaces, ensuring a clean and organized work environment.",
        price: 200.0,
        duration: 4,
        image: "/hero.jpg",
      },
    ],
    features: [
      "Qualified professionals",
      "Eco-friendly products",
      "Modern equipment",
      "Quality guarantee",
      "24/7 service",
      "Free quote",
    ],
  };
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

const formatDuration = (duration: number) => {
  if (duration === 1) return "1 hour";
  return `${duration} hours`;
};

const UserPage = async ({ params }: UserPageProps) => {
  const { id } = await params;
  const clientData = getClientData(id);

  return (
    <>
      <FixedThemeToggle />

      <ScrollArea className="h-screen">
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <HeroSection
            name={clientData.name}
            subtitle={clientData.subtitle}
            rating={clientData.rating}
            totalReviews={clientData.totalReviews}
            heroImage={clientData.avatar}
          />

          <AboutSection
            description={clientData.description}
            location={clientData.location}
            phone={clientData.phone}
            email={clientData.email}
            features={clientData.features}
          />

          <Separator className="my-8" />

          <ServicesSection
            services={clientData.services}
            formatCurrency={formatCurrency}
            formatDuration={formatDuration}
          />

          <CTASection phone={clientData.phone} email={clientData.email} />

          <Footer
            name={clientData.name}
            subtitle={clientData.subtitle}
            location={clientData.location}
            phone={clientData.phone}
            email={clientData.email}
          />
        </div>
      </ScrollArea>
    </>
  );
};

export default UserPage;
