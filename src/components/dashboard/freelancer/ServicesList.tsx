
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Service {
  id: string;
  title: string;
  description: string | null;
  price: number;
  duration_minutes: number;
}

interface ServicesListProps {
  services: Service[];
  loading: boolean;
  limit?: number;
}

const ServicesList = ({ services, loading, limit = 3 }: ServicesListProps) => {
  const navigate = useNavigate();
  
  // Limit the services to show
  const displayServices = services.slice(0, limit);
  
  return (
    <>
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-16 w-full rounded-md" />
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-8 bg-muted/20 rounded-lg">
          <DollarSign className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <h3 className="text-lg font-medium">No services added yet</h3>
          <p className="text-muted-foreground mt-1 mb-4">
            Add services to let clients know what you offer
          </p>
          <Button onClick={() => navigate("/services/setup")}>
            <Plus className="h-4 w-4 mr-1" />
            Add Your First Service
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {displayServices.map(service => (
            <Card 
              key={service.id}
              className="hover:shadow-md transition-shadow border-muted"
            >
              <CardContent className="p-4">
                <div>
                  <h3 className="font-medium">{service.title}</h3>
                  {service.description && (
                    <p className="text-muted-foreground text-sm mt-1 line-clamp-1">
                      {service.description}
                    </p>
                  )}
                  <div className="flex mt-2 text-sm space-x-4">
                    <div className="flex items-center">
                      <DollarSign className="h-3.5 w-3.5 mr-1 text-amber-600" />
                      <span>${service.price}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1 text-amber-600" />
                      <span>{service.duration_minutes} mins</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default ServicesList;
