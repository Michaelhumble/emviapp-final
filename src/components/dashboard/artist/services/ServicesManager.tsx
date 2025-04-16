
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Clock, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ServiceCard from "./ServiceCard";
import ServiceFormDialog from "./ServiceFormDialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Service {
  id: string;
  title: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  is_visible: boolean;
  user_id: string;
  created_at?: string;
  updated_at?: string;
}

const ServicesManager = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Fetch services using React Query
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
        
      if (error) throw error;
      return data as Service[];
    },
    enabled: !!user?.id
  });

  // Add service mutation
  const addServiceMutation = useMutation({
    mutationFn: async (service: Omit<Service, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      if (!user?.id) throw new Error("User not authenticated");
      
      const { data, error } = await supabase
        .from("services")
        .insert([{
          ...service,
          user_id: user.id
        }])
        .select();
        
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success("Service added successfully");
      handleCloseForm();
    },
    onError: (error) => {
      console.error("Error adding service:", error);
      toast.error("Failed to add service");
    }
  });

  // Update service mutation
  const updateServiceMutation = useMutation({
    mutationFn: async (service: Service) => {
      const { data, error } = await supabase
        .from("services")
        .update({
          title: service.title,
          description: service.description,
          price: service.price,
          duration_minutes: service.duration_minutes,
          is_visible: service.is_visible,
          updated_at: new Date().toISOString()
        })
        .eq("id", service.id)
        .eq("user_id", user?.id)
        .select();
        
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success("Service updated successfully");
      handleCloseForm();
    },
    onError: (error) => {
      console.error("Error updating service:", error);
      toast.error("Failed to update service");
    }
  });

  // Delete service mutation
  const deleteServiceMutation = useMutation({
    mutationFn: async (serviceId: string) => {
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", serviceId)
        .eq("user_id", user?.id);
        
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success("Service deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service");
    }
  });

  const handleOpenForm = (service?: Service) => {
    setSelectedService(service || null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedService(null);
  };

  const handleSaveService = (serviceData: Partial<Service>) => {
    if (selectedService) {
      updateServiceMutation.mutate({
        ...selectedService,
        ...serviceData
      } as Service);
    } else {
      addServiceMutation.mutate(serviceData as Omit<Service, 'id' | 'user_id' | 'created_at' | 'updated_at'>);
    }
  };

  const handleDeleteService = (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      deleteServiceMutation.mutate(id);
    }
  };

  return (
    <Card className="shadow-md border border-purple-100/50 overflow-hidden">
      <CardHeader className="pb-3 bg-gradient-to-r from-white to-purple-50/30">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="text-xl font-playfair flex items-center">
              Services
            </CardTitle>
            <CardDescription className="text-gray-500">
              Manage the services you offer to clients
            </CardDescription>
          </div>
          
          <Button 
            onClick={() => handleOpenForm()}
            className="bg-primary hover:bg-primary/90 transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Service
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-32 animate-pulse bg-gray-100" />
            ))}
          </div>
        ) : services.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-purple-50/50 border border-dashed border-purple-200 rounded-lg py-12 px-6 flex flex-col items-center justify-center text-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Plus className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Services Added Yet</h3>
            <p className="text-gray-500 mb-6 max-w-md">
              Add your first service to let clients know what you offer, including prices and estimated time.
            </p>
            <Button onClick={() => handleOpenForm()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Service
            </Button>
          </motion.div>
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <ServiceCard
                    service={service}
                    onEdit={() => handleOpenForm(service)}
                    onDelete={() => handleDeleteService(service.id)}
                  />
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Card 
                  className="h-full flex flex-col items-center justify-center p-8 cursor-pointer border-dashed border-purple-200 bg-purple-50/30 hover:bg-purple-50/70 transition-colors"
                  onClick={() => handleOpenForm()}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-medium text-center">Add New Service</p>
                  <ArrowRight className="h-4 w-4 mt-2 text-primary/70" />
                </Card>
              </motion.div>
            </div>
          </AnimatePresence>
        )}
      </CardContent>

      <ServiceFormDialog
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSave={handleSaveService}
        initialData={selectedService}
        isSubmitting={addServiceMutation.isPending || updateServiceMutation.isPending}
      />
    </Card>
  );
};

export default ServicesManager;
