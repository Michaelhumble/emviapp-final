
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Eye, EyeOff, Clock, DollarSign } from 'lucide-react';
import { Service } from './ServicesManager';

interface ServiceItemProps {
  service: Service;
  onEdit: () => void;
  onDelete: () => void;
}

const ServiceItem = ({ service, onEdit, onDelete }: ServiceItemProps) => {
  // Format duration in hours and minutes
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 
      ? `${hours} hr ${remainingMinutes} min` 
      : `${hours} hr`;
  };

  return (
    <div className="relative bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow group">
      <div className="flex justify-between">
        <div className="space-y-1">
          <h3 className="font-medium">{service.title}</h3>
          {service.description && (
            <p className="text-sm text-gray-600">{service.description}</p>
          )}
          <div className="flex items-center space-x-4 mt-1">
            <div className="text-emerald-700 font-medium text-sm flex items-center">
              <DollarSign className="h-3.5 w-3.5 mr-0.5" />
              {service.price.toFixed(2)}
            </div>
            <div className="text-gray-600 text-sm flex items-center">
              <Clock className="h-3.5 w-3.5 mr-0.5" />
              {formatDuration(service.duration_minutes)}
            </div>
            {!service.is_visible && (
              <div className="text-gray-500 text-xs bg-gray-100 px-2 py-0.5 rounded-full flex items-center">
                <EyeOff className="h-3 w-3 mr-1" />
                Hidden
              </div>
            )}
          </div>
        </div>
        
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={onEdit}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
