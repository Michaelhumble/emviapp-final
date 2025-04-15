
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Clock, DollarSign } from 'lucide-react';
import { Service } from './ServicesManager';

interface ServiceItemProps {
  service: Service;
  onEdit: () => void;
  onDelete: () => void;
}

const ServiceItem = ({ service, onEdit, onDelete }: ServiceItemProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-medium text-base">{service.title}</h3>
            {service.description && (
              <p className="text-sm text-gray-500 max-w-xl">
                {service.description}
              </p>
            )}
            
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center text-emerald-600">
                <DollarSign className="h-4 w-4 mr-1" />
                <span className="font-medium">${service.price}</span>
              </div>
              <div className="flex items-center text-indigo-600">
                <Clock className="h-4 w-4 mr-1" />
                <span>{formatDuration(service.duration_minutes)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => {
                if (confirm('Are you sure you want to delete this service?')) {
                  onDelete();
                }
              }}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Format duration as hours and minutes
const formatDuration = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  return remainingMinutes > 0 
    ? `${hours} hr ${remainingMinutes} min` 
    : `${hours} hr`;
};

export default ServiceItem;
