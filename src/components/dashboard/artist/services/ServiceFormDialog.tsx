
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Check, X } from "lucide-react";
import { Service } from "./ServicesManager";

interface ServiceFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Service>) => void;
  initialData?: Service | null;
  isSubmitting?: boolean;
}

const ServiceFormDialog = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData, 
  isSubmitting = false 
}: ServiceFormDialogProps) => {
  const [formData, setFormData] = useState<Partial<Service>>({
    title: "",
    description: "",
    price: 0,
    duration_minutes: 60,
    is_visible: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when dialog opens/closes or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          title: initialData.title || "",
          description: initialData.description || "",
          price: initialData.price || 0,
          duration_minutes: initialData.duration_minutes || 60,
          is_visible: initialData.is_visible !== false
        });
      } else {
        setFormData({
          title: "",
          description: "",
          price: 0,
          duration_minutes: 60,
          is_visible: true
        });
      }
      setErrors({});
    }
  }, [isOpen, initialData]);

  const handleChange = (field: keyof Service, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title?.trim()) {
      newErrors.title = "Service name is required";
    }
    
    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Price must be greater than zero";
    }
    
    if (!formData.duration_minutes || formData.duration_minutes < 15) {
      newErrors.duration_minutes = "Duration must be at least 15 minutes";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  // Generate duration options (15 min intervals up to 2 hours)
  const durationOptions = [];
  for (let i = 15; i <= 120; i += 15) {
    durationOptions.push(i);
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-playfair text-xl">
            {initialData ? "Edit Service" : "Add New Service"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-5 py-4">
            {/* Service Name */}
            <div className="grid gap-2">
              <Label htmlFor="title" className={errors.title ? "text-red-500" : ""}>
                Service Name
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="e.g. Full Set Acrylic"
                className={errors.title ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
            </div>

            {/* Price */}
            <div className="grid gap-2">
              <Label htmlFor="price" className={errors.price ? "text-red-500" : ""}>
                Price ($)
              </Label>
              <Input
                id="price"
                type="number"
                min="1"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleChange("price", parseFloat(e.target.value))}
                placeholder="45.00"
                className={errors.price ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
            </div>

            {/* Duration */}
            <div className="grid gap-2">
              <Label htmlFor="duration" className={errors.duration_minutes ? "text-red-500" : ""}>
                Duration
              </Label>
              <Select
                value={formData.duration_minutes?.toString()}
                onValueChange={(value) => handleChange("duration_minutes", parseInt(value))}
              >
                <SelectTrigger id="duration" className={errors.duration_minutes ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map((minutes) => (
                    <SelectItem key={minutes} value={minutes.toString()}>
                      {minutes < 60 ? `${minutes} minutes` : 
                        minutes === 60 ? `1 hour` : 
                        `${Math.floor(minutes / 60)} hour ${minutes % 60 > 0 ? `${minutes % 60} min` : ''}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.duration_minutes && (
                <span className="text-red-500 text-sm">{errors.duration_minutes}</span>
              )}
            </div>

            {/* Description (Optional) */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Describe what's included in this service"
                className="resize-none"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
              className="gap-1"
            >
              <X className="h-4 w-4" /> Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="gap-1 bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              {initialData ? "Update Service" : "Add Service"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceFormDialog;
