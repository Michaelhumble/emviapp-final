
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample salon data
const hiringSalons = [
  {
    id: "1",
    name: "Salon Envy",
    location: "Atlanta, GA",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=60",
    isHiring: true,
  },
  {
    id: "2",
    name: "Luxe Beauty Bar",
    location: "Los Angeles, CA",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1487412947147-5cdbfcfbc095?auto=format&fit=crop&w=800&q=60",
    isHiring: true,
  },
  {
    id: "3",
    name: "The Nail Boutique",
    location: "New York, NY",
    rating: "5.0",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=60",
    isHiring: true,
  }
];

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

const HiringSalonsShowcase = () => {
  const isMobile = useIsMobile();
  
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nail & Beauty Salons Hiring Now</h2>
          <p className="text-lg text-gray-600">
            Connect with top salons looking for talented beauty professionals like you
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {hiringSalons.map((salon) => (
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
                      <span className="text-sm font-medium">{salon.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{salon.location}</span>
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

export default HiringSalonsShowcase;
