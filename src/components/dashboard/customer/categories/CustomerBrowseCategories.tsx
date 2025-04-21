
import React from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import {
  Scissors,
  Eye,
  Brush,
  Sparkles,
  Paintbrush,
  HandMetal, // for tattoo
  Hairdryer, // for barber replacement
} from "lucide-react";

// Soft pastel gradient classes per category (tailwind custom colors + bg blur)
const categoryData = [
  {
    key: "nails",
    label: "Nails",
    Icon: Paintbrush, // Changed from Nail to Paintbrush
    gradient: "from-pink-200/70 to-rose-100/90",
    badge: "✨ Popular"
  },
  {
    key: "hair",
    label: "Hair",
    Icon: Scissors,
    gradient: "from-purple-200/80 to-purple-300/70",
  },
  {
    key: "lashes",
    label: "Lashes",
    Icon: Eye,
    gradient: "from-pink-100/70 to-gray-100/90",
  },
  {
    key: "brows",
    label: "Brows",
    Icon: Brush,
    gradient: "from-stone-100/80 to-orange-50/90",
  },
  {
    key: "massage",
    label: "Massage",
    Icon: Sparkles,
    gradient: "from-mint-200/60 to-teal-100/80",
  },
  {
    key: "skin",
    label: "Facial",
    Icon: Brush,
    gradient: "from-blue-100/80 to-purple-100/80",
  },
  {
    key: "barber",
    label: "Barber",
    Icon: Hairdryer, // Replaced Comb with Hairdryer
    gradient: "from-gray-100/80 to-blue-200/80",
  },
  {
    key: "tattoo",
    label: "Tattoo",
    Icon: HandMetal,
    gradient: "from-purple-800/70 to-indigo-300/80",
    badge: "🔥 Trending"
  },
];

const CustomerBrowseCategories: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleClick = (categoryKey: string) => {
    navigate(`/explore/artists?category=${categoryKey}`);
  };

  if (!categoryData || categoryData.length === 0) {
    return (
      <div className="py-8 flex flex-col items-center">
        <span className="text-gray-400">No categories available right now.</span>
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2 font-playfair">
        Browse by Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 md:gap-7">
        {categoryData.map(({ key, label, Icon, gradient, badge }) => (
          <button
            key={key}
            onClick={() => handleClick(key)}
            aria-label={label}
            className={`
              group relative flex flex-col items-center justify-center
              rounded-2xl shadow-sm 
              border border-white/30
              backdrop-blur-lg
              bg-gradient-to-br ${gradient}
              p-6 transition-all 
              hover:scale-105 hover:shadow-xl hover:border-white/60
              focus:outline-none touch-manipulation
              min-h-[160px]
              active:scale-98
            `}
            style={{
              WebkitTapHighlightColor: "transparent",
              boxShadow: "0 2px 24px 0 rgba(134, 128, 162, 0.08)",
            }}
          >
            {badge && (
              <div className="absolute top-3 right-3 z-10">
                <Badge
                  variant="secondary"
                  className="bg-white/80 text-primary font-semibold px-2.5 py-0.5 shadow-md rounded-full text-xs"
                >
                  {badge}
                </Badge>
              </div>
            )}
            <div
              className="
                flex items-center justify-center mb-3 
                rounded-full bg-white/30 backdrop-blur-sm border border-white/40
                w-14 h-14 shadow-sm
                group-hover:ring-2 group-hover:ring-primary/30 transition
              "
            >
              <Icon className="h-8 w-8 text-primary" strokeWidth={2.2} />
            </div>
            <span className="mt-2 text-lg font-playfair text-gray-800 text-center select-none tracking-tight">
              {label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CustomerBrowseCategories;

