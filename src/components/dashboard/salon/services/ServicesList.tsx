
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, Edit, Trash2, Users } from "lucide-react";
import { type SalonService } from "../types";
import { formatCurrency } from "@/lib/utils";

interface ServicesListProps {
  services: SalonService[];
  loading: boolean;
  error: Error | null;
  onEdit: (service: SalonService) => void;
  onDelete: (id: string) => void;
}

export default function ServicesList({ services, loading, error, onEdit, onDelete }: ServicesListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="h-32 animate-pulse bg-gray-100" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>{error.message}</p>
      </div>
    );
  }

  if (!services.length) {
    return (
      <div className="text-center py-12 bg-gray-50/50 rounded-lg border-2 border-dashed">
        <h3 className="text-lg font-medium mb-2">No Services Added Yet</h3>
        <p className="text-muted-foreground">Add your first service to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service) => (
        <Card key={service.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{service.title}</h3>
              {service.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{service.description}</p>
              )}
              <div className="flex items-center gap-4 mt-3">
                <span className="flex items-center text-emerald-600">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {formatCurrency(service.price)}
                </span>
                <span className="flex items-center text-purple-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {service.duration_minutes}min
                </span>
              </div>
            </div>
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onEdit(service)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => onDelete(service.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
