
import React from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";
import { Scissors, User, Heart, Smile, Tag } from "lucide-react";

// Updated, high-quality Unsplash images for emotionally resonant category experiences
const categories = [
  {
    key: "nails",
    label: "Nails",
    icon: <Tag className="h-8 w-8 text-pink-400" />,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=90", // Glossy manicure close-up
  },
  {
    key: "hair",
    label: "Hair",
    icon: <Scissors className="h-8 w-8 text-purple-400" />,
    image: "https://images.unsplash.com/photo-1519415943484-d278bb99c01d?auto=format&fit=crop&w=400&q=90", // Hair in motion
  },
  {
    key: "lashes",
    label: "Lashes",
    icon: <Scissors className="h-8 w-8 text-fuchsia-400" />,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=90", // Elegant eyelashes close-up
  },
  {
    key: "brows",
    label: "Brows",
    icon: <Smile className="h-8 w-8 text-amber-400" />,
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=90", // Defined brows strong shape
  },
  {
    key: "massage",
    label: "Massage",
    icon: <Tag className="h-8 w-8 text-lime-500" />,
    image: "https://images.unsplash.com/photo-1504198266287-1659872e6590?auto=format&fit=crop&w=400&q=90", // Relaxing spa/massage hands
  },
  {
    key: "skin",
    label: "Skin/Facial",
    icon: <User className="h-8 w-8 text-rose-400" />,
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=90", // Facial mask / clean skincare
  },
  {
    key: "barber",
    label: "Barber",
    icon: <Tag className="h-8 w-8 text-gray-600" />,
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=90", // Barber fade in action
  },
  {
    key: "tattoo",
    label: "Tattoo",
    icon: <Heart className="h-8 w-8 text-gray-900" />,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=90", // Inking session tattoo detail
  },
];

const CustomerBrowseCategories: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleClick = (categoryKey: string) => {
    navigate(`/explore/artists?category=${categoryKey}`);
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
              className="flex-shrink-0 w-36 rounded-xl shadow-sm bg-white border focus:outline-none p-3 flex flex-col items-center transition-transform duration-150 hover:scale-105 active:scale-95 touch-manipulation"
              aria-label={cat.label}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <div className="rounded-xl overflow-hidden bg-gray-50 mb-2 h-20 w-20 flex items-center justify-center relative">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="absolute w-20 h-20 object-cover rounded-xl"
                  style={{ zIndex: 0 }}
                  loading="lazy"
                  width={80}
                  height={80}
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
              className="flex flex-col items-center bg-white border rounded-2xl p-5 shadow-sm hover:shadow-lg transition-transform duration-150 hover:scale-105 active:scale-95 focus:outline-none touch-manipulation"
              aria-label={cat.label}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <div className="relative rounded-xl overflow-hidden mb-2 h-24 w-24 flex items-center justify-center">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="absolute w-24 h-24 object-cover rounded-xl"
                  style={{ zIndex: 0 }}
                  loading="lazy"
                  width={96}
                  height={96}
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
