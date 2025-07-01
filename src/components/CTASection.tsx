import { Phone, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CTASectionProps {
  phone: string;
  email: string;
}

export const CTASection = ({ phone, email }: CTASectionProps) => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-16">
      <div className="mx-auto max-w-4xl text-center text-white">
        <h2 className="mb-4 text-4xl font-bold">Ready to Hire Our Services?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
          Contact us and request a free quote. We are ready to serve you!
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-white font-semibold text-blue-600 transition-colors hover:bg-blue-50"
          >
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" />
              Call Now
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-white font-semibold text-blue-600 transition-colors hover:bg-blue-50"
          >
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center justify-center gap-2"
            >
              <Mail className="h-5 w-5" />
              Send Email
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
