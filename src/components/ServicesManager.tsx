
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Service } from '@/pages/u/artist-profile/types';

const ServicesManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    category: ''
  });
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Map the data to include name from title for compatibility
      const mappedServices = data?.map(service => ({
        ...service,
        name: service.title, // Add name property from title
        price_type: service.price_type || 'fixed',
        duration: service.duration || '30 minutes'
      })) || [];
      
      setServices(mappedServices);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services');
    }
  };

  const handleAddService = async () => {
    if (!newService.title || !newService.price) {
      toast.error('Please fill in title and price');
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('services')
        .insert([{
          title: newService.title,
          description: newService.description,
          price: parseFloat(newService.price),
          duration: newService.duration || '30 minutes',
          category: newService.category,
          user_id: user.id,
          duration_minutes: parseInt(newService.duration) || 30,
          price_type: 'fixed'
        }])
        .select()
        .single();

      if (error) throw error;

      // Add name property for compatibility
      const serviceWithName = {
        ...data,
        name: data.title
      };

      setServices([serviceWithName, ...services]);
      setNewService({ title: '', description: '', price: '', duration: '', category: '' });
      setIsAddingNew(false);
      toast.success('Service added successfully');
    } catch (error) {
      console.error('Error adding service:', error);
      toast.error('Failed to add service');
    }
  };

  const handleDeleteService = async (id: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setServices(services.filter(service => service.id !== id));
      toast.success('Service deleted successfully');
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service');
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Services</CardTitle>
        <Button 
          onClick={() => setIsAddingNew(true)}
          className="flex items-center gap-2"
          disabled={isAddingNew}
        >
          <Plus className="h-4 w-4" />
          Add Service
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAddingNew && (
          <Card className="p-4 border-dashed">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Service Title</Label>
                <Input
                  id="title"
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                  placeholder="e.g., Classic Manicure"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  placeholder="Describe your service..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                    placeholder="25.00"
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    value={newService.duration}
                    onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                    placeholder="30"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newService.category}
                  onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                  placeholder="e.g., Manicure, Pedicure"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddService} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Service
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsAddingNew(false);
                    setNewService({ title: '', description: '', price: '', duration: '', category: '' });
                  }}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {services.length === 0 && !isAddingNew ? (
          <div className="text-center py-8 text-gray-500">
            <p>No services added yet</p>
            <p className="text-sm">Click "Add Service" to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((service) => (
              <Card key={service.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold">{service.title || service.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    <div className="flex gap-4 mt-2 text-sm">
                      <span className="font-medium text-green-600">${service.price}</span>
                      <span className="text-gray-500">{service.duration}</span>
                      {service.category && (
                        <span className="text-blue-600">{service.category}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(service.id)}
                      className="flex items-center gap-1"
                    >
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteService(service.id)}
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServicesManager;
