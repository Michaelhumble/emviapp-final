
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, ArrowRight } from "lucide-react";

interface FeaturedSalonsSectionProps {
  featuredSalons: any[];
  onViewDetails: (salon: any) => void;
}

const FeaturedSalonsSection: React.FC<FeaturedSalonsSectionProps> = ({ featuredSalons, onViewDetails }) => {
  if (featuredSalons.length === 0) return null;
  
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
        <h2 className="text-xl font-semibold">Featured Salons</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {featuredSalons.map((salon, index) => (
          <motion.div
            key={salon.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden border-purple-100 hover:shadow-md hover:border-purple-200 transition-all">
              <div 
                className="h-40 bg-cover bg-center relative" 
                style={{ 
                  backgroundImage: `url(${salon.image || 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=60'})` 
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60">
                  <Badge className="absolute top-3 right-3 bg-yellow-500 text-white border-none">
                    <Star className="h-3 w-3 mr-1 fill-white" /> Featured
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-base mb-1">{salon.company || salon.salon_name || 'Unnamed Salon'}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <MapPin className="h-3.5 w-3.5 mr-1" /> {salon.location}
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {salon.description}
                </p>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
                  onClick={() => onViewDetails(salon)}
                >
                  View Details <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSalonsSection;
