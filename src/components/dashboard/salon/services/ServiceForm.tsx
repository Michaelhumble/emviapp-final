import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { SalonService } from "../types";
import { FileUpload } from "@/components/ui/file-upload";
import { toast } from "sonner";

export interface ServiceFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (serviceData: Omit<SalonService, "id" | "created_at" | "updated_at">) => Promise<void>;
  initialData?: SalonService;
  title?: string;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ 
  open, 
  onClose, 
  onSubmit, 
  initialData, 
  title = initialData ? "Edit Service" : "Add Service" 
}) => {
  const [formData, setFormData] = useState<Partial<SalonService>>({
    name: "",
    description: "",
    price: 0,
    duration_min: 60,
    image_url: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description || "",
        price: initialData.price,
        duration_min: initialData.duration_min,
        image_url: initialData.image_url
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        duration_min: 60,
        image_url: ""
      });
    }
  }, [initialData, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: parseInt(value, 10) }));
  };

  const handleFileUpload = (url: string) => {
    setFormData(prev => ({ ...prev, image_url: url }));
  };

  const handleSubmit = async () => {
    if (!formData.name || typeof formData.price !== 'number' || !formData.duration_min) {
      toast.error("Please fill out all required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(formData as Omit<SalonService, "id" | "created_at" | "updated_at">);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const durationOptions = [
    { value: 15, label: "15 minutes" },
    { value: 30, label: "30 minutes" },
    { value: 45, label: "45 minutes" },
    { value: 60, label: "1 hour" },
    { value: 75, label: "1 hour 15 minutes" },
    { value: 90, label: "1 hour 30 minutes" },
    { value: 105, label: "1 hour 45 minutes" },
    { value: 120, label: "2 hours" },
    { value: 150, label: "2 hours 30 minutes" },
    { value: 180, label: "3 hours" }
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Service Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="e.g. Gel Manicure"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price || 0}
                onChange={handleNumberChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="duration_min">Duration</Label>
              <Select
                value={String(formData.duration_min || 60)}
                onValueChange={(value) => handleSelectChange("duration_min", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map(option => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              placeholder="Describe what this service includes"
              rows={3}
            />
          </div>

          <div className="grid gap-2">
            <Label>Service Image (Optional)</Label>
            <FileUpload
              onUploadComplete={handleFileUpload}
              initialUrl={formData.image_url}
              bucket="salon_photos"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : initialData ? "Update" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceForm;
