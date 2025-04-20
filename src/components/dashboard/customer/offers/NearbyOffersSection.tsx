
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { BadgePercent, BadgeDollarSign, MapPin, Star, ArrowRight } from "lucide-react";

// Mock offers data (to be replaced with Supabase-powered data later)
const mockOffers = [
  {
    id: "1",
    name: "Glow Beauty Salon",
    type: "salon",
    isBoosted: true,
    offerTitle: "$10 Off Gel Nails",
    description: "Enjoy $10 off your next gel nail service. Limited time!",
    location: { city: "San Jose", state: "CA" },
    badge: "HOT",
    thumbnail: null,
    boosts_until: "2025-12-31"
  },
  {
    id: "2",
    name: "Anna Nguyen",
    type: "artist",
    isBoosted: false,
    offerTitle: "Spring Set Special",
    description: "Get fresh spring designs for only $38/set.",
    location: { city: "San Jose", state: "CA" },
    badge: "Verified",
    thumbnail: null,
    boosts_until: null
  },
  {
    id: "3",
    name: "Nail Paradise",
    type: "salon",
    isBoosted: true,
    offerTitle: "20% OFF First Visit",
    description: "Save 20% on your first session with us.",
    location: { city: "Milpitas", state: "CA" },
    badge: "HOT",
    thumbnail: null,
    boosts_until: "2025-12-31"
  },
  // ... Add more as needed
];

function sortBoostedFirst(offers: typeof mockOffers) {
  // Boosted first, then recent (mock), then fallback to all
  return offers.sort((a, b) => {
    if (a.isBoosted && !b.isBoosted) return -1;
    if (!a.isBoosted && b.isBoosted) return 1;
    return 0;
  });
}

const NearbyOffersSection = () => {
  const isMobile = useIsMobile();
  const offers = sortBoostedFirst(mockOffers);

  // Only include valid/unexpired (mock filtering)
  const filteredOffers = offers.filter(
    (offer) =>
      !offer.boosts_until || new Date(offer.boosts_until) > new Date()
  );

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <BadgePercent className="text-yellow-500 h-6 w-6" /> Offers Near You
      </h2>
      {filteredOffers.length === 0 ? (
        <Card className="animate-fade-in">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <BadgeDollarSign className="h-10 w-10 text-yellow-300 mb-4 animate-bounce" />
            <p className="text-gray-500 mb-2 font-medium">
              No offers found near you. Check back soon!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className={isMobile ? "flex flex-col gap-4" : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6"}>
          {filteredOffers.map((offer, idx) => (
            <Card
              key={offer.id}
              className={`flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow animate-fade-in relative`}
              style={{ minHeight: isMobile ? 150 : 200, animationDelay: `${idx * 80}ms` }}
              tabIndex={0}
            >
              <CardHeader className="flex-row items-center gap-3 pb-2">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-1 text-lg">
                    {offer.name}
                    {offer.badge && (
                      <span className="ml-2 inline-flex items-center text-yellow-600 bg-yellow-50 border border-yellow-200 rounded-full px-2 py-0.5 text-xs font-semibold">
                        {offer.badge}
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {offer.location.city}, {offer.location.state}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="py-0">
                <div className="mb-3">
                  <h4 className="text-base font-semibold mb-1 text-primary">{offer.offerTitle}</h4>
                  <p className="text-sm text-gray-600">{offer.description}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between mt-auto pt-2">
                <Button 
                  className="h-11 min-h-[44px] w-full sm:w-auto"
                  variant="default"
                  size="sm"
                >
                  Book Now <ArrowRight className="ml-1 h-4 w-4"/>
                </Button>
              </CardFooter>
              {/* Future: Offer image/thumbnail slot */}
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default NearbyOffersSection;
