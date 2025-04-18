
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Clock, DollarSign } from 'lucide-react';
import { SalonService } from '../types';

interface SalonServicesListProps {
  services: SalonService[];
  onEdit: (service: SalonService) => void;
  onDelete: (id: string) => void;
}

const SalonServicesList: React.FC<SalonServicesListProps> = ({ 
  services, 
  onEdit, 
  onDelete 
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (services.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50/50 rounded-lg border-2 border-dashed">
        <h3 className="text-lg font-medium mb-2">No Services Added Yet</h3>
        <p className="text-muted-foreground">Add your first service to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map(service => (
        <Card key={service.id} className="p-4 flex flex-col">
          {service.image_url && (
            <div className="w-full h-48 relative mb-4">
              <img 
                src={service.image_url} 
                alt={service.name} 
                className="object-cover rounded-lg w-full h-full"
              />
            </div>
          )}
          <div className="flex-grow">
            <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
            {service.description && (
              <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                {service.description}
              </p>
            )}
            <div className="flex justify-between items-center text-sm mt-2">
              <div className="flex items-center text-green-600">
                <DollarSign className="h-4 w-4 mr-1" />
                {formatPrice(service.price)}
              </div>
              <div className="flex items-center text-purple-600">
                <Clock className="h-4 w-4 mr-1" />
                {service.duration_min} min
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onEdit(service)}
              className="text-blue-500 hover:text-blue-600"
            >
              <Edit className="h-4 w-4 mr-2" /> Edit
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onDelete(service.id)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SalonServicesList;
