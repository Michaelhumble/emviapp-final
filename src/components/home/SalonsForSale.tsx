
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Banknote, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getNailSalonImage, NAIL_SALON_IMAGES } from "@/utils/nailSalonImages";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

// Sample data for salons for sale with expanded categories
const salonsForSale = [
  {
    id: "s1",
    name: "Glossy Nail Spa",
    location: "San Francisco, CA",
    price: "$175,000",
    description: "Established nail salon with loyal clientele and premium location",
    isNail: true,
    imageIndex: 0
  },
  {
    id: "s2",
    name: "Serenity Facial & Spa",
    location: "Los Angeles, CA",
    price: "$250,000",
    description: "Upscale full-service beauty salon with modern facial treatment rooms",
    isNail: false,
    isSpa: true,
    isFacial: true,
    imageIndex: 1
  },
  {
    id: "s3",
    name: "Lush Lashes & Beauty",
    location: "Miami, FL",
    price: "$130,000",
    description: "Turnkey beauty salon specializing in lash extensions and makeup services",
    isNail: false,
    isLash: true,
    isMakeup: true,
    imageIndex: 2
  }
];

const SalonsForSale = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Beauty Salons For Sale</h2>
          <p className="text-lg text-gray-600">
            Exclusive opportunities to own established salons with proven track records
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {salonsForSale.map((salon, index) => (
            <motion.div
              key={salon.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  {/* Select appropriate image based on salon type */}
                  <ImageWithFallback
                    src={
                      salon.isNail ? NAIL_SALON_IMAGES.luxuryLarge : 
                      salon.isSpa || salon.isFacial ? "/lovable-uploads/c540558f-09db-483f-b844-bacb8824f789.png" :
                      salon.isLash || salon.isMakeup ? "/lovable-uploads/6fdf0a39-d203-4f5a-90ba-808059c3ae5e.png" :
                      NAIL_SALON_IMAGES.executiveNails
                    }
                    alt={salon.name}
                    className="w-full h-full object-cover"
                    priority={true}
                    fallbackImage={
                      salon.isSpa ? "/lovable-uploads/ada4c504-75cf-45ce-a673-c81a22b9dbe3.png" :
                      salon.isLash ? "/lovable-uploads/6fdf0a39-d203-4f5a-90ba-808059c3ae5e.png" :
                      NAIL_SALON_IMAGES.modernDeluxe
                    }
                  />
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Badge className="mb-2 bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200">
                      For Sale
                    </Badge>
                    <h3 className="text-xl font-semibold mt-2">{salon.name}</h3>
                    <div className="flex items-center text-gray-500 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{salon.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{salon.description}</p>
                  
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center text-emerald-700 font-semibold">
                      <Banknote className="w-4 h-4 mr-1" />
                      {salon.price}
                    </div>
                    
                    <Link to={`/salons-for-sale/${salon.id}`} className="flex items-center text-primary hover:text-primary/80 font-medium">
                      Details <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-14 text-center">
          <Link to="/salons-for-sale">
            <Button size="lg" className="font-medium">
              Browse All Listings
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SalonsForSale;
