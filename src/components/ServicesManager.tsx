
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Trash2, Edit, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Service } from '@/pages/u/artist-profile/types';

interface ServicesManagerProps {
  services: Service[];
  onServicesChange: (services: Service[]) => void;
}

const ServicesManager: React.FC<ServicesManagerProps> = ({ services, onServicesChange }) => {
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    category: ''
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      duration: '',
      category: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const serviceData: Service = {
      id: editingService?.id || `service-${Date.now()}`,
      name: formData.title, // Map title to name for consistency
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      price_type: 'fixed', // Default value
      duration: formData.duration, // Keep as string
      duration_minutes: parseInt(formData.duration) || 60, // Convert to minutes
      category: formData.category,
      created_at: editingService?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_visible: true,
      user_id: editingService?.user_id || ''
    };

    if (editingService) {
      // Update existing service
      const updatedServices = services.map(service => 
        service.id === editingService.id ? serviceData : service
      );
      onServicesChange(updatedServices);
    } else {
      // Add new service
      onServicesChange([...services, serviceData]);
    }

    setIsAddingService(false);
    setEditingService(null);
    resetForm();
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price.toString(),
      duration: service.duration || '60',
      category: service.category || ''
    });
    setIsAddingService(true);
  };

  const handleDelete = (serviceId: string) => {
    const updatedServices = services.filter(service => service.id !== serviceId);
    onServicesChange(updatedServices);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Services & Pricing
          <Dialog open={isAddingService} onOpenChange={setIsAddingService}>
            <DialogTrigger asChild>
              <Button onClick={() => { resetForm(); setEditingService(null); }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Service Name</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Gel Manicure"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your service..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="15"
                    step="15"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="60"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category (Optional)</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="e.g., Nails, Hair, etc."
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingService ? 'Update Service' : 'Add Service'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsAddingService(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {services.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No services added yet. Click "Add Service" to get started.
          </p>
        ) : (
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium">{service.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    <div className="flex gap-4 mt-2 text-sm text-gray-500">
                      <span>Price: {formatPrice(service.price)}</span>
                      <span>Duration: {service.duration || service.duration_minutes} min</span>
                      {service.category && <span>Category: {service.category}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(service)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServicesManager;
