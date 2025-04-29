
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Star, Building } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/context/auth";

// Sample salon data with no images
const hiringSalons = [
  {
    id: "1",
    name: "Salon Envy",
    location: "Atlanta, GA",
    rating: "4.9",
    image: "",
    isHiring: true,
    specialty: "Full Service Salon"
  },
  {
    id: "2",
    name: "Luxe Beauty Bar",
    location: "Los Angeles, CA",
    rating: "4.8",
    image: "",
    isHiring: true,
    specialty: "Nail Spa"
  },
  {
    id: "3",
    name: "The Nail Boutique",
    location: "New York, NY",
    rating: "5.0",
    image: "",
    isHiring: true,
    specialty: "Nail Art Studio"
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
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  
  const handleViewDetails = (salonId: string) => {
    if (isSignedIn) {
      navigate(`/salons/${salonId}`);
    } else {
      navigate(`/sign-in?redirect=${encodeURIComponent(`/salons/${salonId}`)}`);
    }
  };
  
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
              <Card className="overflow-hidden h-full transition-shadow hover:shadow-lg border-gray-100">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <Building className="h-12 w-12 text-gray-300" />
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
                  
                  {salon.specialty && (
                    <Badge variant="outline" className="mb-3 bg-blue-50 text-blue-700 border-blue-200">
                      {salon.specialty}
                    </Badge>
                  )}
                  
                  <p className="text-primary font-medium mt-2">
                    {salon.isHiring ? "Currently Hiring" : "Contact for Opportunities"}
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <button 
                    onClick={() => handleViewDetails(salon.id)} 
                    className="text-primary hover:text-primary/80 text-sm font-medium cursor-pointer flex items-center"
                  >
                    {isSignedIn ? "View details →" : "Sign in to view details →"}
                  </button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-14 text-center">
          <Link to="/salons">
            <Button size="lg" variant="outline" className="font-medium">
              <Building className="mr-2 h-4 w-4" />
              Explore All Salons
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HiringSalonsShowcase;
