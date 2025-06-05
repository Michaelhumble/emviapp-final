
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Mock data for recommended services
const recommendedServices = [
  {
    id: "1",
    title: "Premium Gel Manicure",
    description: "Long-lasting gel color with premium finishes",
    price: 45,
    duration: "45 min",
    artist: { name: "Amy's Nails", avatar: null },
    trending: true,
    image: null
  },
  {
    id: "2",
    title: "Signature Facial",
    description: "Rejuvenating treatment customized for your skin",
    price: 85,
    duration: "60 min",
    artist: { name: "Glow Studio", avatar: null },
    trending: false,
    image: null
  },
  {
    id: "3",
    title: "Hair Color & Style",
    description: "Full color treatment with styling",
    price: 120,
    duration: "120 min",
    artist: { name: "Elle Hair", avatar: null },
    trending: true,
    image: null
  },
  {
    id: "4",
    title: "Express Lash Extensions",
    description: "Quick lash enhancement for natural volume",
    price: 65,
    duration: "45 min",
    artist: { name: "Lash Lab", avatar: null },
    trending: false,
    image: null
  }
];

const RecommendedServicesSection: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const handleViewService = (service: typeof recommendedServices[0]) => {
    // Navigate to artists page to find similar services
    navigate('/artists');
    toast.success(`Looking for ${service.title} services...`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-5">
        <h2 className="text-2xl font-serif font-bold mb-2 text-gray-800 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-purple-500" />
          Suggested for You
        </h2>
        <p className="text-gray-600">
          Services we think you'll love based on your preferences and history
        </p>
      </div>
      
      <div className={isMobile 
        ? "flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x"
        : "grid grid-cols-1 sm:grid-cols-2 gap-4"}
      >
        {recommendedServices.map((service) => (
          <Card
            key={service.id}
            className="group hover:shadow-md transition-shadow border-gray-100 overflow-hidden"
          >
            <div className="h-32 bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center relative">
              {service.image ? (
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <ImageIcon className="h-12 w-12 text-white/40" />
              )}
              
              {service.trending && (
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 border border-purple-200">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Trending
                  </span>
                </div>
              )}
            </div>
            
            <CardContent className="p-4">
              <div className="mb-3">
                <h3 className="font-medium text-lg text-gray-800 mb-1 group-hover:text-purple-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {service.description}
                </p>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-purple-700">${service.price}</span>
                  <span className="text-gray-400 text-sm">•</span>
                  <span className="text-gray-500 text-sm">{service.duration}</span>
                </div>
                
                {service.artist && (
                  <div className="flex items-center text-xs text-gray-500">
                    by {service.artist.name}
                  </div>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full rounded-full border-purple-200 text-purple-700 hover:bg-purple-50"
                onClick={() => handleViewService(service)}
              >
                View <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendedServicesSection;
