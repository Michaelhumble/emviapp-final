
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Salon } from "@/types/salon";
import { getFeaturedSalons } from "@/utils/featuredContent";

const FeaturedSalonsShowcase = () => {
  const [salons, setSalons] = useState<Salon[]>([]);
  
  useEffect(() => {
    // Get featured salons
    const featuredSalons = getFeaturedSalons(3);
    setSalons(featuredSalons);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Top-Rated Beauty Businesses
          </h2>
          <p className="text-lg text-gray-600">
            Discover exceptional salons and spas with proven track records of excellence
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {salons.map((salon) => (
            <motion.div key={salon.id} variants={item}>
              <Card className="overflow-hidden h-full transition-shadow hover:shadow-lg">
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={salon.image} 
                    alt={salon.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/90 text-primary hover:bg-white/80">
                      {salon.specialty}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold font-serif">{salon.name}</h3>
                    <div className="flex items-center text-amber-500">
                      <Star className="w-4 h-4 fill-current mr-1" />
                      <span className="text-sm font-medium">{salon.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({salon.reviewCount})</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{salon.city}</span>
                    {salon.neighborhood && (
                      <span className="text-sm ml-1">• {salon.neighborhood}</span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {salon.shortBio || salon.bio.substring(0, 100) + '...'}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {salon.services.slice(0, 3).map((service, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        {service}
                      </Badge>
                    ))}
                  </div>
                  {salon.isHiring && (
                    <div className="mb-4">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
                        <Users className="h-3 w-3 mr-1" />
                        Currently Hiring
                      </Badge>
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-4">
                    <Link to={`/salons/${salon.id}`} className="text-primary hover:text-primary/80 text-sm font-medium">
                      View details →
                    </Link>
                    <Button size="sm" variant="outline">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Link to="/salons">
            <Button size="lg" variant="outline" className="font-medium">
              Explore All Salons
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSalonsShowcase;
