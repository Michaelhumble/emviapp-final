import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration_minutes: number;
}

const ServicesManager = () => {
  const { user, userRole } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');

  // Check if user can manage services (salon owners, artists, freelancers)
  const canManageServices = userRole === 'salon' || userRole === 'owner' || 
                           userRole === 'artist' || userRole === 'nail technician/artist' ||
                           userRole === 'freelancer';

  useEffect(() => {
    loadServices();
  }, [user?.id]);

  const loadServices = async () => {
    if (!user?.id) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('user_id', user.id);
      if (error) throw error;
      setServices(data || []);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load services');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setDuration('');
    setEditingService(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    const serviceData = {
      user_id: user.id,
      name,
      description,
      price: parseFloat(price),
      duration_minutes: parseInt(duration, 10),
    };

    try {
      if (editingService) {
        // Update existing service
        const { data, error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', editingService.id)
          .select();
        if (error) throw error;
        setServices(services.map(s => (s.id === editingService.id ? { ...s, ...serviceData } : s)));
        toast.success('Service updated successfully');
      } else {
        // Create new service
        const { data, error } = await supabase
          .from('services')
          .insert([serviceData])
          .select();
        if (error) throw error;
        setServices([...services, ...(data || [])]);
        toast.success('Service created successfully');
      }
      loadServices();
      resetForm();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save service');
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setName(service.name);
    setDescription(service.description || '');
    setPrice(service.price.toString());
    setDuration(service.duration_minutes.toString());
  };

  const handleDelete = async (serviceId: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId);
      if (error) throw error;
      setServices(services.filter(s => s.id !== serviceId));
      toast.success('Service deleted successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete service');
    }
  };

  if (!canManageServices) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-gray-500">
            Service management is only available for salon owners, artists, and freelancers.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Services</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
          <Button type="submit">
            {editingService ? 'Update Service' : 'Add Service'}
          </Button>
          {editingService && (
            <Button type="button" variant="secondary" onClick={resetForm}>
              Cancel Edit
            </Button>
          )}
        </form>

        {isLoading ? (
          <p>Loading services...</p>
        ) : (
          <div className="space-y-2">
            {services.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{service.name}</h4>
                  <p className="text-sm text-gray-600">
                    {service.description || 'No description'} - ${service.price} - {service.duration_minutes} mins
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(service)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(service.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {services.length === 0 && <p>No services added yet.</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServicesManager;
