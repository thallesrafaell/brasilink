import { MapPin, Phone, Mail, CheckCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AboutSectionProps {
  description: string;
  location: string;
  phone: string;
  email: string;
  features: string[];
}

export const AboutSection = ({
  description,
  location,
  phone,
  email,
  features,
}: AboutSectionProps) => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
            About Our Services
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            {description}
          </p>

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span>{phone}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span>{email}</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Why choose us?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
