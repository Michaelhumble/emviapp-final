
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, TrendingUp, ArrowRight, Image as ImageIcon } from "lucide-react";
import { useAuth } from "@/context/auth";

type Service = {
  id: string;
  title: string;
  price: number;
  duration_minutes: number;
  image_url?: string | null;
  is_visible?: boolean;
  boost_until?: string | null;
  booking_count?: number;
  description?: string;
};

const mockServices: Service[] = [
  {
    id: "1",
    title: "Gel Manicure",
    price: 40,
    duration_minutes: 50,
    image_url: null,
    is_visible: true,
    boost_until: "2025-12-31",
    booking_count: 32,
    description: "Long-lasting gel polish with trending color options.",
  },
  {
    id: "2",
    title: "Acrylic Nail Extensions",
    price: 55,
    duration_minutes: 80,
    image_url: null,
    is_visible: true,
    boost_until: null,
    booking_count: 20,
    description: "Durable, natural-looking nail extensions by our top techs.",
  },
  {
    id: "3",
    title: "Nail Art Design",
    price: 25,
    duration_minutes: 30,
    image_url: null,
    is_visible: true,
    boost_until: "2025-06-24",
    booking_count: 15,
    description: "Custom nail art design to match your unique style.",
  },
];

function sortServices(services: Service[]) {
  // Boosted first, then by fake booking count, then fallback by id
  return services
    .filter((s) => s.is_visible) // Only active/bookable
    .sort((a, b) => {
      const isBoostedA = Boolean(a.boost_until && new Date(a.boost_until) > new Date());
      const isBoostedB = Boolean(b.boost_until && new Date(b.boost_until) > new Date());
      if (isBoostedA && !isBoostedB) return -1;
      if (!isBoostedA && isBoostedB) return 1;
      // Ranking by booking volume descending
      const countA = a.booking_count || 0;
      const countB = b.booking_count || 0;
      if (countA !== countB) return countB - countA;
      // Fallback sorting (could randomize)
      return a.id.localeCompare(b.id);
    });
}

const SuggestedServicesSection: React.FC = () => {
  const { user } = useAuth();
  // TODO: Replace with Supabase fetch (filter by user preferences, trending, etc.)
  const services = sortServices(mockServices);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <TrendingUp className="text-purple-500 h-6 w-6" />
        Suggested for You
      </h2>
      {services.length === 0 ? (
        <Card className="animate-fade-in">
          <CardContent className="flex flex-col items-center justify-center py-10 text-center">
            <Star className="h-10 w-10 text-purple-300 mb-4 animate-bounce" />
            <p className="text-gray-500 mb-2 font-medium">
              We’ll show you awesome services once you start exploring!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div
          className={
            isMobile
              ? "flex gap-4 overflow-x-auto snap-x scroll-px-4 py-1"
              : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          }
        >
          {services.map((service, idx) => (
            <Card
              key={service.id}
              className={`min-w-[260px] max-w-xs animate-fade-in SNAP-START relative group hover:shadow-lg transition-shadow`}
              style={{ animationDelay: `${idx * 80}ms` }}
              tabIndex={0}
            >
              <div className="rounded-t-lg w-full h-28 bg-gradient-to-tr from-purple-100 via-pink-50 to-purple-50 flex items-center justify-center">
                {/* Service image or icon */}
                {service.image_url ? (
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="h-20 w-20 object-cover rounded-xl border border-gray-100"
                  />
                ) : (
                  <ImageIcon className="h-12 w-12 text-purple-200" aria-label="No service image" />
                )}
              </div>
              <CardContent className="pt-4 pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg leading-snug truncate">{service.title}</h3>
                  {Boolean(service.boost_until && new Date(service.boost_until) > new Date()) && (
                    <span className="ml-1 inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200 uppercase">
                      Trending
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm mb-2 line-clamp-2">{service.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="text-purple-700 text-base font-bold mr-1">${service.price}</span>
                    <span className="text-xs text-gray-400">{service.duration_minutes} min</span>
                  </div>
                </div>
              </CardContent>
              <div className="flex items-center px-6 pb-4 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full min-h-[44px] rounded font-medium"
                  tabIndex={0}
                  onClick={() => {
                    // Replace with route or booking action
                  }}
                >
                  View <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              {/* Future badge slot: "Highly Rated" etc. */}
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default SuggestedServicesSection;
