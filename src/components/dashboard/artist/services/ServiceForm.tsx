
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { X, Check, DollarSign, Clock, Save, Loader2 } from 'lucide-react';
import { Service } from './ServicesManager';

interface ServiceFormProps {
  initialData?: Partial<Service>;
  onSave: (data: Partial<Service>) => Promise<void>;
  onCancel: () => void;
}

const ServiceForm = ({ initialData, onSave, onCancel }: ServiceFormProps) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [price, setPrice] = useState(initialData?.price?.toString() || '');
  const [durationHours, setDurationHours] = useState(Math.floor((initialData?.duration_minutes || 0) / 60).toString());
  const [durationMinutes, setDurationMinutes] = useState(((initialData?.duration_minutes || 0) % 60).toString());
  const [isVisible, setIsVisible] = useState(initialData?.is_visible !== false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      newErrors.price = 'Valid price is required';
    }
    
    const hours = Number(durationHours) || 0;
    const minutes = Number(durationMinutes) || 0;
    const totalMinutes = hours * 60 + minutes;
    
    if (totalMinutes <= 0) {
      newErrors.duration = 'Duration must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    const hours = Number(durationHours) || 0;
    const minutes = Number(durationMinutes) || 0;
    const totalMinutes = hours * 60 + minutes;
    
    try {
      await onSave({
        title,
        description: description || null,
        price: Number(price),
        duration_minutes: totalMinutes,
        is_visible: isVisible
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">
          {initialData ? 'Edit Service' : 'Add New Service'}
        </h3>
        <Button variant="ghost" size="sm" onClick={onCancel} disabled={isSubmitting}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="title" className={errors.title ? 'text-red-500' : ''}>
            Service Name*
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Gel Manicure"
            className={errors.title ? 'border-red-500' : ''}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="description">
            Description (Optional)
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your service..."
            rows={3}
          />
        </div>
        
        <div>
          <Label htmlFor="price" className={errors.price ? 'text-red-500' : ''}>
            Price*
          </Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              className={`pl-10 ${errors.price ? 'border-red-500' : ''}`}
            />
          </div>
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="duration" className={errors.duration ? 'text-red-500' : ''}>
            Duration*
          </Label>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                id="duration-hours"
                type="number"
                min="0"
                max="24"
                value={durationHours}
                onChange={(e) => setDurationHours(e.target.value)}
                placeholder="0"
                className={`pl-10 ${errors.duration ? 'border-red-500' : ''}`}
              />
              <span className="absolute right-3 top-2.5 text-gray-500">hr</span>
            </div>
            <div className="relative flex-1">
              <Input
                id="duration-minutes"
                type="number"
                min="0"
                max="59"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(e.target.value)}
                placeholder="0"
                className={errors.duration ? 'border-red-500' : ''}
              />
              <span className="absolute right-3 top-2.5 text-gray-500">min</span>
            </div>
          </div>
          {errors.duration && (
            <p className="text-red-500 text-xs mt-1">{errors.duration}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="visible"
            checked={isVisible}
            onCheckedChange={setIsVisible}
          />
          <Label htmlFor="visible" className="cursor-pointer">
            {isVisible ? 'Visible to clients' : 'Hidden from clients'}
          </Label>
        </div>
        
        <div className="pt-2 flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Service
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;
