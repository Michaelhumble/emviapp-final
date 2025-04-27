
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Star, Users, Clock, CheckCircle, Heart, Instagram, Facebook } from "lucide-react";
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

  // Format hours for display
  const formatHours = (hours: string) => {
    if (hours.toLowerCase() === "closed") return "Closed";
    return hours;
  };

  // Get today's hours
  const getTodayHours = (salon: Salon) => {
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const today = new Date().getDay(); // 0 for Sunday, 1 for Monday, etc.
    const dayName = days[today] as keyof typeof salon.hours;
    return formatHours(salon.hours[dayName]);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-pink-50/30">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Exceptional Beauty Destinations
          </h2>
          <p className="text-lg text-gray-600">
            Discover top-rated salons and spas that consistently deliver extraordinary experiences
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
              <Card className="overflow-hidden h-full transition-all hover:shadow-lg border-none shadow">
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={salon.image} 
                    alt={salon.name} 
                    className="w-full h-full object-cover transition duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Badge className="bg-white/90 text-primary hover:bg-white">
                      {salon.specialty}
                    </Badge>
                    {salon.featured && (
                      <Badge className="bg-purple-600 text-white">
                        Featured
                      </Badge>
                    )}
                  </div>
                  {salon.logo && (
                    <div className="absolute left-4 bottom-4">
                      <div className="h-14 w-14 rounded-full bg-white p-0.5 shadow-md">
                        <img 
                          src={salon.logo} 
                          alt={`${salon.name} logo`}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                  )}
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
                  <div className="flex items-center text-gray-500 mb-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{salon.city}</span>
                    {salon.neighborhood && (
                      <span className="text-sm ml-1">• {salon.neighborhood}</span>
                    )}
                  </div>
                  <div className="flex items-center text-gray-500 mb-4">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">Today: {getTodayHours(salon)}</span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {salon.shortBio || salon.bio.substring(0, 100) + '...'}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {salon.services.slice(0, 3).map((service, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50 text-gray-700">
                        {service}
                      </Badge>
                    ))}
                    {salon.services.length > 3 && (
                      <Badge variant="outline" className="bg-gray-50 text-gray-700">
                        +{salon.services.length - 3} more
                      </Badge>
                    )}
                  </div>
                  {salon.isHiring && (
                    <div className="mb-4">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        <Users className="h-3 w-3 mr-1" />
                        Currently Hiring
                      </Badge>
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex space-x-2">
                      {salon.socialMedia?.instagram && (
                        <Link to={`https://instagram.com/${salon.socialMedia.instagram}`} className="text-gray-500 hover:text-pink-600">
                          <Instagram className="h-4 w-4" />
                        </Link>
                      )}
                      {salon.socialMedia?.facebook && (
                        <Link to={`https://facebook.com/${salon.socialMedia.facebook}`} className="text-gray-500 hover:text-blue-600">
                          <Facebook className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Link to={`/salons/${salon.id}`} className="text-primary hover:text-primary/80 text-sm font-medium">
                        View details →
                      </Link>
                      {salon.bookingLink && (
                        <Button size="sm" variant="default">
                          Book Now
                        </Button>
                      )}
                    </div>
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
