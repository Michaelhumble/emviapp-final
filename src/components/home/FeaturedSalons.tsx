
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";
import { getFeaturedSalons } from "@/utils/featuredContent";
import { useEffect, useState } from "react";
import { Salon } from "@/types/salon";

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

const FeaturedSalons = () => {
  const [salons, setSalons] = useState<Salon[]>([]);
  
  // Premium images for featured salons
  const premiumImages = [
    "/lovable-uploads/a98d2b96-e38c-43a0-9abe-d846764a9e11.png",
    "/lovable-uploads/2fba1cd5-b1ed-4030-b7e1-06517fbab43e.png",
    "/lovable-uploads/89ef4a43-b461-47fc-8b2d-97b07318a891.png"
  ];
  
  useEffect(() => {
    const featuredSalons = getFeaturedSalons(3);
    // Add our premium images to the salons
    const enhancedSalons = featuredSalons.map((salon, index) => ({
      ...salon,
      image: premiumImages[index % premiumImages.length]
    }));
    setSalons(enhancedSalons);
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Beauty Salons</h2>
          <p className="text-lg text-gray-600">
            Discover exceptional salons with opportunities for talented beauty professionals
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
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={salon.image} 
                    alt={salon.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{salon.name}</h3>
                    <div className="flex items-center text-amber-500">
                      <Star className="w-4 h-4 fill-current mr-1" />
                      <span className="text-sm font-medium">{salon.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{salon.city}</span>
                  </div>
                  <p className="text-primary font-medium">
                    {salon.isHiring ? "Currently Hiring" : "Contact for Opportunities"}
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link to={`/salons/${salon.id}`} className="text-primary hover:text-primary/80 text-sm font-medium">
                    View details →
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-14 text-center">
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

export default FeaturedSalons;
