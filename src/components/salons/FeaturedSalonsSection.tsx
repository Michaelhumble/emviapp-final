
import { Job } from "@/types/job";
import { Badge } from "@/components/ui/badge";
import { Sparkles, MapPin, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface FeaturedSalonsSectionProps {
  featuredSalons: Job[];
  onViewDetails: (salon: Job) => void;
}

const FeaturedSalonsSection = ({ featuredSalons, onViewDetails }: FeaturedSalonsSectionProps) => {
  if (!featuredSalons || featuredSalons.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
            Featured Salon Listings
          </h3>
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600">
            EmviApp AI Featured
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredSalons.slice(0, 3).map((salon) => (
            <div 
              key={salon.id} 
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer"
              onClick={() => onViewDetails(salon)}
            >
              <div 
                className="h-32 bg-center bg-cover" 
                style={{ 
                  backgroundImage: salon.image ? 
                    `url(${salon.image})` : 
                    'url(https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=60)'
                }}
              />
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-blue-900">{salon.company}</h4>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Featured
                  </Badge>
                </div>
                
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  {salon.location}
                </div>
                
                {salon.asking_price && (
                  <div className="flex items-center text-green-600 text-sm font-medium mb-2">
                    <DollarSign className="h-3.5 w-3.5 mr-1" />
                    {salon.asking_price}
                  </div>
                )}
                
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {salon.salon_features?.slice(0, 2).map((feature, i) => (
                    <Badge key={i} variant="outline" className="bg-purple-50 text-purple-700 text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {salon.has_housing && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                      Housing 🏠
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Link to="/salons">
            <Button variant="link" className="text-blue-600 hover:text-blue-800">
              View all salon listings →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSalonsSection;
