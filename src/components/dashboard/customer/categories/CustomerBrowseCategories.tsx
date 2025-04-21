
import React from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";

// Correcting import: import spa as Spa since lucide-react exports 'spa' lowercase
import { Scissors, User, Heart, Smile, Tag, spa as Spa } from "lucide-react";

const categories = [
  {
    key: "nails",
    label: "Nails",
    icon: <Tag className="h-8 w-8 text-pink-400" />, // no nail icon, use Tag as placeholder
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=400&q=80",
  },
  {
    key: "hair",
    label: "Hair",
    icon: <Scissors className="h-8 w-8 text-purple-400" />,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
  },
  {
    key: "lashes",
    label: "Lashes",
    icon: <Scissors className="h-8 w-8 text-fuchsia-400" />,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=400&q=80",
  },
  {
    key: "brows",
    label: "Brows",
    icon: <Smile className="h-8 w-8 text-amber-400" />,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
  },
  {
    key: "massage",
    label: "Massage",
    icon: <Spa className="h-8 w-8 text-lime-500" />,
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=400&q=80",
  },
  {
    key: "skin",
    label: "Skin/Facial",
    icon: <User className="h-8 w-8 text-rose-400" />,
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=400&q=80",
  },
  {
    key: "barber",
    label: "Barber",
    icon: <Scissors className="h-8 w-8 text-gray-600" />,
    image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=400&q=80",
  },
  {
    key: "tattoo",
    label: "Tattoo",
    icon: <Heart className="h-8 w-8 text-gray-900" />,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
  },
];

const CustomerBrowseCategories: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleClick = (categoryKey: string) => {
    navigate(`/discover?category=${categoryKey}`);
  };

  if (!categories || categories.length === 0) {
    return (
      <div className="py-8 flex flex-col items-center">
        <span className="text-gray-400">No categories available right now.</span>
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
        Browse by Category
      </h2>
      {isMobile ? (
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleClick(cat.key)}
              className="flex-shrink-0 w-40 rounded-xl shadow-sm bg-white border focus:outline-none p-3 flex flex-col items-center transition hover:scale-[1.04] active:scale-95"
              aria-label={cat.label}
            >
              <div className="rounded-xl overflow-hidden bg-gray-50 mb-2 h-20 w-20 flex items-center justify-center relative">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="absolute w-20 h-20 object-cover rounded-xl"
                  style={{ zIndex: 0 }}
                />
                <span className="relative z-10">{cat.icon}</span>
              </div>
              <span className="mt-2 font-medium text-base text-gray-700">{cat.label}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 md:gap-7">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleClick(cat.key)}
              className="flex flex-col items-center bg-white border rounded-2xl p-5 shadow-sm hover:shadow-lg transition hover:scale-[1.03] active:scale-95"
              aria-label={cat.label}
            >
              <div className="relative rounded-xl overflow-hidden mb-2 h-24 w-24 flex items-center justify-center">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="absolute w-24 h-24 object-cover rounded-xl"
                  style={{ zIndex: 0 }}
                />
                <span className="relative z-10">{cat.icon}</span>
              </div>
              <span className="mt-2 font-medium text-lg text-gray-700">{cat.label}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default CustomerBrowseCategories;

