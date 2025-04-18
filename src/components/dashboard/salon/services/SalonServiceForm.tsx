
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SalonService } from '../types';
import { FileUpload } from '@/components/ui/file-upload';

interface SalonServiceFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (serviceData: Omit<SalonService, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  initialData?: SalonService;
}

const SalonServiceForm: React.FC<SalonServiceFormProps> = ({ 
  open, 
  onClose, 
  onSubmit, 
  initialData 
}) => {
  const [formData, setFormData] = useState<Omit<SalonService, 'id' | 'created_at' | 'updated_at'>>({
    salon_id: '',
    name: '',
    description: '',
    price: 0,
    duration_min: 30,
    image_url: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        salon_id: initialData.salon_id,
        name: initialData.name,
        description: initialData.description || '',
        price: initialData.price,
        duration_min: initialData.duration_min,
        image_url: initialData.image_url || '',
      });
    } else {
      // Reset form for new service
      setFormData({
        salon_id: '',
        name: '',
        description: '',
        price: 0,
        duration_min: 30,
        image_url: '',
      });
    }
  }, [initialData, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || formData.price <= 0 || formData.duration_min <= 0) {
      // Basic validation
      return;
    }

    await onSubmit(formData);
    onClose();
  };

  const handleFileUpload = (url: string) => {
    setFormData(prev => ({ ...prev, image_url: url }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Service' : 'Add New Service'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Service Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Gel Manicure"
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Optional service description"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <Label htmlFor="duration_min">Duration (minutes) *</Label>
              <Input
                id="duration_min"
                name="duration_min"
                type="number"
                min="5"
                value={formData.duration_min}
                onChange={handleChange}
                placeholder="30"
                required
              />
            </div>
          </div>
          <div>
            <Label>Service Image (Optional)</Label>
            <FileUpload 
              onUploadComplete={handleFileUpload}
              initialUrl={formData.image_url}
              bucket="salon_photos"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Update Service' : 'Add Service'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SalonServiceForm;
