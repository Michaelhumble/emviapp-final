
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, DollarSign, Clock, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Service type definition
interface Service {
  id: string;
  title: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  is_visible: boolean;
  user_id: string;
}

const ArtistServicesSection: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    price: 0,
    duration_minutes: 30,
    is_visible: true
  });

  // Fetch services
  const { data: services, isLoading } = useQuery({
    queryKey: ['services', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("user_id", user.id)
        .order("title", { ascending: true });
        
      if (error) throw error;
      return data as Service[];
    },
    enabled: !!user?.id
  });

  // Add service mutation
  const addServiceMutation = useMutation({
    mutationFn: async (service: Omit<Service, 'id' | 'user_id'>) => {
      if (!user?.id) throw new Error("User not authenticated");
      
      const { data, error } = await supabase
        .from("services")
        .insert([{
          ...service,
          user_id: user.id
        }])
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services', user?.id] });
      toast.success("Service added successfully!");
      setIsAddDialogOpen(false);
      resetNewService();
    },
    onError: (error) => {
      console.error("Error adding service:", error);
      toast.error("Failed to add service. Please try again.");
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
          is_visible: service.is_visible
        })
        .eq("id", service.id)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services', user?.id] });
      toast.success("Service updated successfully!");
      setIsEditDialogOpen(false);
      setServiceToEdit(null);
    },
    onError: (error) => {
      console.error("Error updating service:", error);
      toast.error("Failed to update service. Please try again.");
    }
  });

  // Delete service mutation
  const deleteServiceMutation = useMutation({
    mutationFn: async (serviceId: string) => {
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", serviceId);
        
      if (error) throw error;
      return serviceId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services', user?.id] });
      toast.success("Service deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service. Please try again.");
    }
  });

  // Reset new service form
  const resetNewService = () => {
    setNewService({
      title: "",
      description: "",
      price: 0,
      duration_minutes: 30,
      is_visible: true
    });
  };

  // Handle form submission for adding a service
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    addServiceMutation.mutate(newService);
  };

  // Handle form submission for editing a service
  const handleEditService = (e: React.FormEvent) => {
    e.preventDefault();
    if (serviceToEdit) {
      updateServiceMutation.mutate(serviceToEdit);
    }
  };

  // Handle delete service
  const handleDeleteService = (serviceId: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      deleteServiceMutation.mutate(serviceId);
    }
  };

  // Open edit dialog with service data
  const openEditDialog = (service: Service) => {
    setServiceToEdit(service);
    setIsEditDialogOpen(true);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-medium">Your Services</CardTitle>
          <CardDescription>Manage the services you offer to clients</CardDescription>
        </div>
        <Button 
          onClick={() => setIsAddDialogOpen(true)} 
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> Add Service
        </Button>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 animate-pulse bg-gray-100 rounded-md"></div>
            ))}
          </div>
        ) : services && services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map(service => (
              <Card key={service.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{service.title}</h3>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={() => openEditDialog(service)}
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 text-red-500"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                    {service.description || "No description provided."}
                  </p>
                  
                  <div className="flex justify-between mt-2 text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5 text-green-600" />
                      <span>${service.price}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-indigo-600" />
                      <span>{service.duration_minutes} mins</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Plus className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Services Added Yet</h3>
            <p className="text-muted-foreground mb-4 max-w-md mx-auto">
              Add your services so clients know what you offer, including prices and estimated time.
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              Add Your First Service
            </Button>
          </div>
        )}
      </CardContent>

      {/* Add Service Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleAddService}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Service Name</Label>
                <Input 
                  id="title" 
                  value={newService.title} 
                  onChange={(e) => setNewService({...newService, title: e.target.value})}
                  placeholder="e.g. Full Set Acrylic" 
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={newService.description} 
                  onChange={(e) => setNewService({...newService, description: e.target.value})}
                  placeholder="Describe what's included in this service"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    min="0" 
                    step="0.01"
                    value={newService.price} 
                    onChange={(e) => setNewService({...newService, price: parseFloat(e.target.value)})}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input 
                    id="duration" 
                    type="number" 
                    min="5" 
                    step="5"
                    value={newService.duration_minutes} 
                    onChange={(e) => setNewService({...newService, duration_minutes: parseInt(e.target.value)})}
                    required
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Service</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Service Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          
          {serviceToEdit && (
            <form onSubmit={handleEditService}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-title">Service Name</Label>
                  <Input 
                    id="edit-title" 
                    value={serviceToEdit.title} 
                    onChange={(e) => setServiceToEdit({...serviceToEdit, title: e.target.value})}
                    placeholder="e.g. Full Set Acrylic" 
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea 
                    id="edit-description" 
                    value={serviceToEdit.description || ''} 
                    onChange={(e) => setServiceToEdit({...serviceToEdit, description: e.target.value})}
                    placeholder="Describe what's included in this service"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-price">Price ($)</Label>
                    <Input 
                      id="edit-price" 
                      type="number" 
                      min="0" 
                      step="0.01"
                      value={serviceToEdit.price} 
                      onChange={(e) => setServiceToEdit({...serviceToEdit, price: parseFloat(e.target.value)})}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="edit-duration">Duration (minutes)</Label>
                    <Input 
                      id="edit-duration" 
                      type="number" 
                      min="5" 
                      step="5"
                      value={serviceToEdit.duration_minutes} 
                      onChange={(e) => setServiceToEdit({...serviceToEdit, duration_minutes: parseInt(e.target.value)})}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Update Service</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ArtistServicesSection;
