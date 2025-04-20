
import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCustomerDashboard } from "@/hooks/useCustomerDashboard";
import { useAuth } from "@/context/auth";
import { ArrowRight, Image as ImageIcon, Star } from "lucide-react";

type Service = {
  id: string;
  title: string;
  price: number;
  artist_name?: string;
  salon_name?: string;
  category?: string;
  image_url?: string | null;
  boosted_until?: string | null;
  popularity?: number; // e.g. total bookings
};

// Mock: fallback services; in production, replace with supabase trending fetch
const popularServices: Service[] = [
  {
    id: "11",
    title: "Acrylic Full Set",
    price: 55,
    artist_name: "Anna Nails",
    category: "Nails",
    boosted_until: "2025-07-01",
    popularity: 45,
    image_url: null
  },
  {
    id: "12",
    title: "Eyebrow Wax",
    price: 28,
    artist_name: "Kelly Browbar",
    category: "Brows",
    popularity: 31,
    image_url: null
  },
  {
    id: "13",
    title: "Relaxation Massage",
    price: 75,
    artist_name: "Soothe Spa",
    category: "Massage",
    popularity: 28,
    image_url: null
  }
  // ...add more as fallback
];

// Modified to have a more specific type for its parameter
const getCategory = (service: { title: string; category?: string; }) => {
  // Very basic, normally would use backend field or heuristics
  if (service.category) return service.category;
  if (/nail/i.test(service.title)) return "Nails";
  if (/brow|eyebrow/i.test(service.title)) return "Brows";
  if (/massage/i.test(service.title)) return "Massage";
  return "Other";
};

const RecommendedServicesSection: React.FC = () => {
  const { user } = useAuth();
  const { bookings, favorites } = useCustomerDashboard();

  // Gather sorted categories based on user data
  const topCategories = useMemo(() => {
    const categoryCount: Record<string, number> = {};
    
    // Fixed: Ensure bookings with service data are properly processed
    bookings.forEach(b => {
      if (b.service && b.service.title) {
        const cat = getCategory(b.service);
        if (cat) categoryCount[cat] = (categoryCount[cat] || 0) + 1;
      }
    });
    
    // Fixed: Ensure favorites with specialty data are properly processed
    favorites.forEach(f => {
      if (f.specialty) {
        const cat = getCategory({ title: f.specialty, category: f.specialty });
        if (cat) categoryCount[cat] = (categoryCount[cat] || 0) + 1;
      }
    });
    
    const sorted = Object.entries(categoryCount).sort((a,b) => b[1]-a[1]);
    return sorted.map(([cat]) => cat);
  }, [bookings, favorites]);

  // Mock: in real app, fetch recommended list from Supabase using top categories
  const recommended: Service[] = useMemo(() => {
    let recs: Service[] = [];
    if (topCategories.length > 0) {
      for (const cat of topCategories) {
        const matched = popularServices.filter(s => getCategory(s) === cat);
        recs = recs.concat(matched);
      }
      // Remove duplicates by id
      recs = recs.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
      // Sort by trending/boosted first
      recs.sort((a, b) => {
        const isBoostA = Boolean(a.boosted_until && new Date(a.boosted_until) > new Date());
        const isBoostB = Boolean(b.boosted_until && new Date(b.boosted_until) > new Date());
        if (isBoostA && !isBoostB) return -1;
        if (!isBoostA && isBoostB) return 1;
        return (b.popularity || 0) - (a.popularity || 0);
      });
      if (recs.length === 0) recs = popularServices;
    } else {
      recs = popularServices;
    }
    return recs.slice(0, 6);
  }, [topCategories]);

  // Reason for recommendation (for banner)
  const hasPersonalized = topCategories.length > 0;

  // Responsive determination
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  if (!user) return null;

  return (
    <section className="mb-10 animate-fade-in">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
        <Star className="text-purple-500 h-6 w-6" />
        Recommended for You
      </h2>
      {hasPersonalized ? (
        <p className="text-purple-600 mb-3 text-sm font-medium flex items-center gap-2">
          Based on your previous bookings and favorites
        </p>
      ) : (
        <p className="text-gray-500 mb-3 text-sm">
          Trending services you may like
        </p>
      )}
      <div className={isMobile 
        ? "flex gap-4 overflow-x-auto snap-x scroll-px-4 pb-2 pt-1"
        : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"}
      >
        {recommended.map((service, idx) => (
          <Card
            key={service.id}
            className={`min-w-[260px] max-w-xs snap-start animate-fade-in relative group hover:shadow-lg transition-shadow`}
            style={{ animationDelay: `${idx * 70}ms` }}
            tabIndex={0}
          >
            <div className="rounded-t-lg w-full h-24 bg-gradient-to-tr from-purple-100 via-pink-50 to-purple-50 flex items-center justify-center">
              {service.image_url ? (
                <img
                  src={service.image_url}
                  alt={service.title}
                  className="h-16 w-16 object-cover rounded-xl border border-gray-100"
                />
              ) : (
                <ImageIcon className="h-10 w-10 text-purple-200" aria-label="No image" />
              )}
            </div>
            <CardContent className="pt-3 pb-2">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-base leading-snug truncate">{service.title}</h3>
                {Boolean(service.boosted_until && new Date(service.boosted_until) > new Date()) && (
                  <span className="ml-1 inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200 uppercase">
                    Trending
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-purple-700 font-bold">${service.price}</span>
                {service.artist_name && (
                  <span className="text-xs text-gray-500 ml-2 truncate">by {service.artist_name}</span>
                )}
              </div>
            </CardContent>
            <div className="flex items-center px-6 pb-4 pt-1">
              <Button
                variant="outline"
                size="sm"
                className="w-full min-h-[38px] rounded font-medium"
                tabIndex={0}
                onClick={() => {
                  // Optionally provide action: open booking modal or go to detail
                }}
              >
                Book <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            {/* Future add category/tag badges, star ratings, etc. */}
          </Card>
        ))}
      </div>
    </section>
  );
};

export default RecommendedServicesSection;
