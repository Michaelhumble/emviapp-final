
import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, DollarSign } from "lucide-react";

interface ServicesListProps {
  services: any[];
  loading: boolean;
  limit?: number;
}

const ServicesList: React.FC<ServicesListProps> = ({ 
  services = [], 
  loading = false,
  limit = 5
}) => {
  const limitedServices = services.slice(0, limit);
  
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
      </div>
    );
  }
  
  if (limitedServices.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        <DollarSign className="h-12 w-12 mx-auto mb-2 text-muted-foreground/50" />
        <p>No services added yet</p>
        <p className="text-sm mt-1">Add services to start accepting bookings</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {limitedServices.map((service, idx) => (
        <Card key={service.id || idx} className="p-3 flex items-center gap-3">
          <div className="flex-1">
            <div className="font-medium">{service.title || service.name}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {service.duration_minutes || service.duration || 60} min
            </div>
          </div>
          <div className="px-3 py-1 text-sm font-medium rounded-full bg-green-50 text-green-800">
            ${service.price}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ServicesList;
