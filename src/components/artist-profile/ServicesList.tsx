
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  description?: string;
}

interface ServicesListProps {
  services: Service[];
  onSelectService?: (service: Service) => void;
  isSelectable?: boolean;
}

const ServicesList = ({ services, onSelectService, isSelectable = false }: ServicesListProps) => {
  if (services.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No services available at this time.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {services.map((service) => (
        <Card 
          key={service.id} 
          className={`overflow-hidden transition-all duration-200 ${
            isSelectable ? 'hover:border-primary cursor-pointer' : ''
          }`}
          onClick={() => isSelectable && onSelectService && onSelectService(service)}
        >
          <CardContent className="p-0">
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-lg">{service.name}</h3>
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
                  ${service.price}
                </Badge>
              </div>
              
              {service.description && (
                <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
              )}
              
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>{service.duration}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ServicesList;
