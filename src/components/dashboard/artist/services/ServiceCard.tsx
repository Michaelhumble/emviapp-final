
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Clock, Edit, Trash2 } from "lucide-react";

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number | null;
}

interface ServiceCardProps {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
}

const ServiceCard = ({ service, onEdit, onDelete }: ServiceCardProps) => {
  return (
    <Card key={service.id} className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-medium">{service.name}</h3>
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7"
              onClick={() => onEdit(service)}
            >
              <Edit className="h-3.5 w-3.5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 text-red-500"
              onClick={() => onDelete(service.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <div className="flex items-center gap-1">
            <DollarSign className="h-3.5 w-3.5 text-green-600" />
            <span>${service.price}</span>
          </div>
          {service.duration && (
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-indigo-600" />
              <span>{service.duration} mins</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
