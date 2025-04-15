
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Service } from './ServicesManager';

interface ServiceFormProps {
  initialData?: Service;
  onSave: (data: Partial<Service>) => void;
  onCancel: () => void;
}

interface FormErrors {
  title?: string;
  price?: string;
  duration_minutes?: string;
}

const ServiceForm = ({ initialData, onSave, onCancel }: ServiceFormProps) => {
  const [formData, setFormData] = useState<Partial<Service>>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    duration_minutes: initialData?.duration_minutes || 30,
    is_visible: initialData?.is_visible !== false, // Default to true if not specified
    image_url: initialData?.image_url || null,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'price' || name === 'duration_minutes') {
      // Parse numeric values
      const numValue = parseFloat(value);
      setFormData({ ...formData, [name]: isNaN(numValue) ? 0 : numValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error when field is edited
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };
  
  const handleToggleVisible = (checked: boolean) => {
    setFormData({ ...formData, is_visible: checked });
  };
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.title || formData.title.trim().length === 0) {
      newErrors.title = 'Service name is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Service name must be 100 characters or less';
    }
    
    if (typeof formData.price !== 'number' || formData.price <= 0) {
      newErrors.price = 'Price must be greater than zero';
    }
    
    if (typeof formData.duration_minutes !== 'number' || formData.duration_minutes < 5) {
      newErrors.duration_minutes = 'Duration must be at least 5 minutes';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="title">Service Name <span className="text-red-500">*</span></Label>
        <Input 
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Gel Manicure, Acrylic Full Set"
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title}</p>
        )}
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          placeholder="Briefly describe what's included in this service..."
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="price">Price ($) <span className="text-red-500">*</span></Label>
          <Input 
            id="price"
            name="price"
            type="number"
            min="0.01"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            className={errors.price ? "border-red-500" : ""}
          />
          {errors.price && (
            <p className="text-sm text-red-500">{errors.price}</p>
          )}
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="duration_minutes">Duration (minutes) <span className="text-red-500">*</span></Label>
          <Input 
            id="duration_minutes"
            name="duration_minutes"
            type="number"
            min="5"
            step="5"
            value={formData.duration_minutes}
            onChange={handleChange}
            className={errors.duration_minutes ? "border-red-500" : ""}
          />
          {errors.duration_minutes && (
            <p className="text-sm text-red-500">{errors.duration_minutes}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="is_visible" 
          checked={formData.is_visible} 
          onCheckedChange={handleToggleVisible} 
        />
        <Label htmlFor="is_visible">Visible to clients</Label>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          {initialData ? 'Save Changes' : 'Add Service'}
        </Button>
      </div>
    </form>
  );
};

export default ServiceForm;
