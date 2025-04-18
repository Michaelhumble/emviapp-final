
import React, { useState, useEffect } from "react";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { SalonService } from "../types";

interface ServiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (service: Omit<SalonService, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  initialData?: SalonService;
  title: string;
}

const ServiceForm: React.FC<ServiceFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title
}) => {
  const [formData, setFormData] = useState<Omit<SalonService, 'id' | 'created_at' | 'updated_at'>>({
    title: "",
    price: 0,
    duration_minutes: 60,
    description: "",
    is_visible: true
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        price: initialData.price,
        duration_minutes: initialData.duration_minutes,
        description: initialData.description || "",
        is_visible: initialData.is_visible
      });
    } else {
      setFormData({
        title: "",
        price: 0,
        duration_minutes: 60,
        description: "",
        is_visible: true
      });
    }
  }, [initialData, isOpen]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Service name is required";
    }
    
    if (formData.price < 0) {
      newErrors.price = "Price cannot be negative";
    }
    
    if (formData.duration_minutes <= 0) {
      newErrors.duration_minutes = "Duration must be greater than 0";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'duration_minutes' 
        ? parseFloat(value) 
        : value
    }));
  };

  const handleVisibilityChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      is_visible: checked
    }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-purple-900">{title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="title">Service Name</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Haircut, Color, etc."
              className={errors.title ? "border-red-300" : ""}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className={errors.price ? "border-red-300" : ""}
              />
              {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration_minutes">Duration (minutes)</Label>
              <Input
                id="duration_minutes"
                name="duration_minutes"
                type="number"
                min="5"
                step="5"
                value={formData.duration_minutes}
                onChange={handleChange}
                className={errors.duration_minutes ? "border-red-300" : ""}
              />
              {errors.duration_minutes && <p className="text-sm text-red-500">{errors.duration_minutes}</p>}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter service description"
              rows={4}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="is_visible"
              checked={formData.is_visible}
              onCheckedChange={handleVisibilityChange}
            />
            <Label htmlFor="is_visible">Make this service visible to clients</Label>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isSubmitting ? "Saving..." : "Save Service"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceForm;
