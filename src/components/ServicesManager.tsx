
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Trash2, Edit, Plus } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  user_id: string;
  image_url?: string;
  is_visible?: boolean;
  created_at?: string;
  updated_at?: string;
}

interface NewService {
  title: string;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
}

const ServicesManager = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newService, setNewService] = useState<NewService>({
    title: '',
    name: '',
    description: '',
    price: 0,
    duration_minutes: 30
  });

  useEffect(() => {
    if (user) {
      fetchServices();
    }
  }, [user]);

  const fetchServices = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      // Map database fields to component interface
      const mappedServices = data.map(service => ({
        ...service,
        name: service.title || service.name || ''
      }));

      setServices(mappedServices);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services');
    }
  };

  const addService = async () => {
    if (!user || !newService.title.trim()) return;

    try {
      const serviceData = {
        user_id: user.id,
        title: newService.title,
        description: newService.description,
        price: newService.price,
        duration_minutes: newService.duration_minutes
      };

      const { data, error } = await supabase
        .from('services')
        .insert([serviceData])
        .select()
        .single();

      if (error) throw error;

      const mappedService = {
        ...data,
        name: data.title || ''
      };

      setServices([...services, mappedService]);
      setNewService({
        title: '',
        name: '',
        description: '',
        price: 0,
        duration_minutes: 30
      });
      toast.success('Service added successfully');
    } catch (error) {
      console.error('Error adding service:', error);
      toast.error('Failed to add service');
    }
  };

  const deleteService = async (id: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setServices(services.filter(s => s.id !== id));
      toast.success('Service deleted successfully');
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Service
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Service title"
            value={newService.title}
            onChange={(e) => setNewService({ ...newService, title: e.target.value })}
          />
          <Textarea
            placeholder="Service description"
            value={newService.description}
            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Price"
              value={newService.price}
              onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
            />
            <Input
              type="number"
              placeholder="Duration (minutes)"
              value={newService.duration_minutes}
              onChange={(e) => setNewService({ ...newService, duration_minutes: Number(e.target.value) })}
            />
          </div>
          <Button onClick={addService} disabled={!newService.title.trim()}>
            Add Service
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold">{service.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span>${service.price}</span>
                    <span>{service.duration_minutes} minutes</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(service.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteService(service.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServicesManager;
