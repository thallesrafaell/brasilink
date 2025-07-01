import { Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
}

interface ServiceCardProps {
  service: Service;
  // eslint-disable-next-line no-unused-vars
  formatCurrency: (value: number) => string;
  // eslint-disable-next-line no-unused-vars
  formatDuration: (duration: number) => string;
}

export const ServiceCard = ({
  service,
  formatCurrency,
  formatDuration,
}: ServiceCardProps) => {
  return (
    <Card className="group mx-auto h-full max-w-sm border-0 shadow-lg transition-all duration-300 hover:shadow-2xl">
      <CardHeader className="px-6 pt-6 pb-4">
        <CardTitle className="mb-2 line-clamp-2 min-h-[3.5rem] text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {service.name}
        </CardTitle>
        <CardDescription className="line-clamp-3 min-h-[4rem] text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {service.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 pt-0 pb-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-500 dark:bg-gray-700 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span>{formatDuration(service.duration)}</span>
          </div>
          <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
            {formatCurrency(service.price)}
          </div>
        </div>

        <div className="text-center">
          <Button className="w-full rounded-lg bg-blue-600 font-semibold text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
