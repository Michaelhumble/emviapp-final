
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Building, MapPin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getSalonsForSale } from "@/utils/featuredContent";

const SalonsForSale = () => {
  const isMobile = useIsMobile();
  const salons = getSalonsForSale(4);

  // Container animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Item animation variants
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Render the salons as a carousel on mobile
  if (isMobile) {
    return (
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Salons for Sale — Start Your Own Business</h2>
            <p className="text-gray-600 text-lg">
              Verified listings from owners ready to pass the torch.
            </p>
          </motion.div>

          <div className="mt-8">
            <Carousel className="w-full">
              <CarouselContent>
                {salons.map((salon) => (
                  <CarouselItem key={salon.id}>
                    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-48 bg-gray-100 relative overflow-hidden flex items-center justify-center">
                        <Building className="h-12 w-12 text-gray-300" />
                      </div>
                      <CardContent className="pt-6 flex-grow">
                        <h3 className="text-lg font-semibold mb-1">{salon.title || `${salon.salon_type || 'Nail'} Salon for Sale`}</h3>
                        <div className="flex items-center text-gray-500 text-sm mb-3">
                          <MapPin className="h-4 w-4 mr-1" /> {salon.location || "Mannheim, Germany"}
                        </div>
                        <div className="flex items-start gap-2 mt-3 mb-3">
                          <Building className="h-4 w-4 text-gray-500 mt-0.5" /> 
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {salon.salon_features?.join(", ") || salon.features?.join(", ") || "5 tables, 2 spa chairs, 6 years, low rent"}
                          </p>
                        </div>
                        <p className="text-primary font-medium mt-2">
                          Price: {salon.asking_price ? `$${salon.asking_price.toLocaleString()}` : (salon.price || "Contact for details")}
                        </p>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" className="w-full" asChild>
                          <Link to="/salon-marketplace">View Details</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex left-0" />
              <CarouselNext className="hidden sm:flex right-0" />
            </Carousel>
          </div>

          <div className="mt-10 text-center">
            <Link to="/salon-marketplace">
              <Button variant="outline" size="lg">
                Browse All Listings
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Render the salons as a grid on desktop
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Salons for Sale — Start Your Own Business</h2>
          <p className="text-gray-600 text-lg">
            Verified listings from owners ready to pass the torch.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {salons.map((salon) => (
            <motion.div key={salon.id} variants={item}>
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-100 relative overflow-hidden flex items-center justify-center">
                  <Building className="h-12 w-12 text-gray-300" />
                </div>
                <CardContent className="pt-6 flex-grow">
                  <h3 className="text-lg font-semibold mb-1">{salon.title || `${salon.salon_type || 'Nail'} Salon for Sale`}</h3>
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin className="h-4 w-4 mr-1" /> {salon.location || "Mannheim, Germany"}
                  </div>
                  <div className="flex items-start gap-2 mt-3 mb-3">
                    <Building className="h-4 w-4 text-gray-500 mt-0.5" /> 
                    <p className="text-sm text-gray-600">
                      {salon.salon_features?.join(", ") || salon.features?.join(", ") || "5 tables, 2 spa chairs, 6 years, low rent"}
                    </p>
                  </div>
                  <p className="text-primary font-medium mt-2">
                    Price: {salon.asking_price ? `$${salon.asking_price.toLocaleString()}` : (salon.price || "Contact for details")}
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/salon-marketplace">View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <Link to="/salon-marketplace">
            <Button variant="outline" size="lg">
              Browse All Listings
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SalonsForSale;
