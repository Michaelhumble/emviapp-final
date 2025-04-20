
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';

interface ServiceSelectorProps {
  selectedServices: string[];
  onChange: (services: string[]) => void;
}

export const ServiceSelector = ({ selectedServices, onChange }: ServiceSelectorProps) => {
  const [newService, setNewService] = useState('');

  const addService = () => {
    if (!newService.trim()) return;
    onChange([...selectedServices, newService.trim()]);
    setNewService('');
  };

  const removeService = (index: number) => {
    onChange(selectedServices.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <Label>Services Offered *</Label>
      
      <div className="flex flex-wrap gap-2">
        {selectedServices.map((service, index) => (
          <div 
            key={index}
            className="flex items-center gap-1 bg-secondary px-3 py-1 rounded-full"
          >
            <span className="text-sm">{service}</span>
            <button
              type="button"
              onClick={() => removeService(index)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={newService}
          onChange={e => setNewService(e.target.value)}
          placeholder="Add a service..."
          onKeyPress={e => e.key === 'Enter' && addService()}
        />
        <Button 
          type="button"
          variant="outline" 
          onClick={addService}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
