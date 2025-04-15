
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Settings, Clock, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import ServiceItem from './ServiceItem';
import ServiceForm from './ServiceForm';

export interface Service {
  id: string;
  title: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  is_visible: boolean;
  image_url: string | null;
}

const ServicesManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  useEffect(() => {
    if (user) {
      fetchServices();
    }
  }, [user]);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setServices(data as Service[]);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: "Error loading services",
        description: "Please refresh the page to try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddService = () => {
    setEditingService(null);
    setShowAddForm(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setShowAddForm(true);
  };

  const handleDeleteService = async (id: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);
      
      if (error) throw error;
      
      setServices(services.filter(s => s.id !== id));
      
      toast({
        title: "Service deleted",
        description: "Service has been removed successfully."
      });
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: "Deletion failed",
        description: "There was a problem removing this service.",
        variant: "destructive"
      });
    }
  };

  const handleSaveService = async (serviceData: Partial<Service>) => {
    try {
      if (editingService) {
        // Update existing service
        const { error } = await supabase
          .from('services')
          .update({
            title: serviceData.title,
            description: serviceData.description,
            price: serviceData.price,
            duration_minutes: serviceData.duration_minutes,
            is_visible: serviceData.is_visible,
            image_url: serviceData.image_url,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingService.id)
          .eq('user_id', user?.id);
        
        if (error) throw error;
        
        // Update local state
        setServices(services.map(s => s.id === editingService.id ? { ...s, ...serviceData } : s));
        
        toast({
          title: "Service updated",
          description: "Changes have been saved successfully."
        });
      } else {
        // Add new service
        const { data, error } = await supabase
          .from('services')
          .insert({
            user_id: user?.id,
            title: serviceData.title,
            description: serviceData.description,
            price: serviceData.price,
            duration_minutes: serviceData.duration_minutes,
            is_visible: serviceData.is_visible || true,
            image_url: serviceData.image_url
          })
          .select();
        
        if (error) throw error;
        
        // Add to local state
        setServices([data[0] as Service, ...services]);
        
        toast({
          title: "Service added",
          description: "New service has been created successfully."
        });
      }
      
      // Close form
      setShowAddForm(false);
      setEditingService(null);
    } catch (error) {
      console.error('Error saving service:', error);
      toast({
        title: "Save failed",
        description: "There was a problem saving this service.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="shadow-sm border-green-100">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-serif flex items-center">
          <Settings className="h-5 w-5 mr-2 text-emerald-500" />
          Services
        </CardTitle>
        <CardDescription>
          Manage the services you offer to clients
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {showAddForm ? (
          <ServiceForm 
            initialData={editingService || undefined}
            onSave={handleSaveService}
            onCancel={() => {
              setShowAddForm(false);
              setEditingService(null);
            }}
          />
        ) : (
          <>
            <div className="mb-4">
              <Button 
                onClick={handleAddService}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New Service
              </Button>
            </div>
            
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div 
                    key={i} 
                    className="h-24 rounded-md bg-gray-100 animate-pulse"
                  />
                ))}
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
                <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No services offered yet</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={handleAddService}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Service
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {services.map((service) => (
                  <ServiceItem
                    key={service.id}
                    service={service}
                    onEdit={() => handleEditService(service)}
                    onDelete={() => handleDeleteService(service.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ServicesManager;
