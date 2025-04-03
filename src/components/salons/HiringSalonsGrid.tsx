
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone } from "lucide-react";

interface HiringSalon {
  id: string;
  name: string;
  location: string;
  jobTitle: {
    vi: string;
    en: string;
  };
  salary: string;
  features: string[];
  phone: string;
  image: string;
}

interface HiringSalonsGridProps {
  hiringSalons: HiringSalon[];
}

const HiringSalonsGrid = ({ hiringSalons }: HiringSalonsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hiringSalons.map((salon) => (
        <motion.div
          key={salon.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: Number(salon.id) * 0.1 }}
        >
          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
            <div 
              className="h-48 bg-center bg-cover relative" 
              style={{ backgroundImage: `url(${salon.image})` }}
            >
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg line-clamp-1">{salon.name}</h3>
                <Badge>{salon.salary}</Badge>
              </div>
              
              <div className="mb-4">
                <h4 className="text-primary font-medium">
                  {salon.jobTitle.vi} / {salon.jobTitle.en}
                </h4>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{salon.location}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {salon.features.map((feature, index) => (
                  <Badge key={index} variant="outline" className="bg-orange-50">
                    {feature}
                  </Badge>
                ))}
              </div>
              
              <div className="flex justify-between mt-4">
                <Button variant="outline" className="gap-1">
                  <Phone className="h-4 w-4" />
                  {salon.phone}
                </Button>
                <Button>
                  Message
                </Button>
              </div>
              
              <div className="text-xs text-center text-gray-500 mt-4 pt-2 border-t">
                Want your ad seen nationwide? 
                <Button variant="link" className="text-xs p-0 h-auto ml-1">Boost Ad</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default HiringSalonsGrid;
