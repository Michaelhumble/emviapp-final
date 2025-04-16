
import { motion } from "framer-motion";
import { Clock, DollarSign, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Service } from "./ServicesManager";

interface ServiceCardProps {
  service: Service;
  onEdit: () => void;
  onDelete: () => void;
}

const ServiceCard = ({ service, onEdit, onDelete }: ServiceCardProps) => {
  // Format price to currency
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(service.price);

  // Format duration to hours and minutes
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 
      ? `${hours} hr ${remainingMinutes} min` 
      : `${hours} hr`;
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow border-purple-100/70">
      <CardContent className="p-0">
        <div className="p-5">
          {/* Service Title */}
          <div className="flex justify-between items-start">
            <h3 className="font-playfair text-lg font-semibold">{service.title}</h3>
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-purple-100/80"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                aria-label="Edit service"
              >
                <Pencil className="h-4 w-4 text-purple-700" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-red-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                aria-label="Delete service"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
          
          {/* Description - if available */}
          {service.description && (
            <p className="text-gray-600 text-sm mt-2 line-clamp-2">{service.description}</p>
          )}
          
          {/* Price and Duration */}
          <div className="flex items-center mt-4 gap-6">
            <div className="flex items-center text-green-600">
              <DollarSign className="h-4 w-4 mr-1" />
              <span className="font-medium">{formattedPrice}</span>
            </div>
            
            <div className="flex items-center text-purple-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>{formatDuration(service.duration_minutes)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
