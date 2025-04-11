
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, DollarSign, Clock } from "lucide-react";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Define service interface
interface ArtistService {
  id: string;
  user_id: string;
  name: string;
  price: number;
  duration: number | null;
  description: string | null;
  created_at: string;
}

// Initial state for new service
const initialServiceState = {
  name: '',
  price: 0,
  duration: 60,
  description: ''
};

const ServicesManager = () => {
  const { user, userRole } = useAuth();
  const queryClient = useQueryClient();
  const isArtist = userRole === 'artist' || userRole === 'nail technician/artist' || userRole === 'renter';
  
  // State for modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Service states
  const [newService, setNewService] = useState(initialServiceState);
  const [currentService, setCurrentService] = useState<ArtistService | null>(null);
  const [serviceIdToDelete, setServiceIdToDelete] = useState<string | null>(null);

  // Fetch services
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['artist-services', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('artist_services')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as ArtistService[];
    },
    enabled: !!user?.id && isArtist
  });

  // Create service mutation
  const createServiceMutation = useMutation({
    mutationFn: async (service: Omit<ArtistService, 'id' | 'user_id' | 'created_at'>) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('artist_services')
        .insert({
          user_id: user.id,
          name: service.name,
          price: service.price,
          duration: service.duration,
          description: service.description
        })
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artist-services', user?.id] });
      toast.success('Service added successfully!');
      setIsAddModalOpen(false);
      setNewService(initialServiceState);
    },
    onError: (error) => {
      console.error('Error adding service:', error);
      toast.error('Failed to add service. Please try again.');
    }
  });

  // Update service mutation
  const updateServiceMutation = useMutation({
    mutationFn: async (service: ArtistService) => {
      const { data, error } = await supabase
        .from('artist_services')
        .update({
          name: service.name,
          price: service.price,
          duration: service.duration,
          description: service.description
        })
        .eq('id', service.id)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artist-services', user?.id] });
      toast.success('Service updated successfully!');
      setIsEditModalOpen(false);
      setCurrentService(null);
    },
    onError: (error) => {
      console.error('Error updating service:', error);
      toast.error('Failed to update service. Please try again.');
    }
  });

  // Delete service mutation
  const deleteServiceMutation = useMutation({
    mutationFn: async (serviceId: string) => {
      const { error } = await supabase
        .from('artist_services')
        .delete()
        .eq('id', serviceId);
        
      if (error) throw error;
      return serviceId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artist-services', user?.id] });
      toast.success('Service deleted successfully!');
      setIsDeleteModalOpen(false);
      setServiceIdToDelete(null);
    },
    onError: (error) => {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service. Please try again.');
    }
  });

  // Handle form submissions
  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newService.name.trim()) {
      toast.error('Service name is required');
      return;
    }
    
    if (newService.price <= 0) {
      toast.error('Price must be greater than zero');
      return;
    }
    
    createServiceMutation.mutate(newService);
  };

  const handleUpdateService = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentService) return;
    
    if (!currentService.name.trim()) {
      toast.error('Service name is required');
      return;
    }
    
    if (currentService.price <= 0) {
      toast.error('Price must be greater than zero');
      return;
    }
    
    updateServiceMutation.mutate(currentService);
  };

  const handleDeleteService = () => {
    if (serviceIdToDelete) {
      deleteServiceMutation.mutate(serviceIdToDelete);
    }
  };

  // Open edit modal with service data
  const openEditModal = (service: ArtistService) => {
    setCurrentService(service);
    setIsEditModalOpen(true);
  };

  // Open delete confirmation modal
  const openDeleteModal = (serviceId: string) => {
    setServiceIdToDelete(serviceId);
    setIsDeleteModalOpen(true);
  };

  // Render appropriate content based on loading state and data
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-slate-200 rounded mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (services.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
            <Plus className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-medium mb-2">No Services Added Yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Add your first service to let clients know what you offer, including pricing and duration.
          </p>
          <Button onClick={() => setIsAddModalOpen(true)}>
            Add Your First Service
          </Button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <Card key={service.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg">{service.name}</h3>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditModal(service)}
                    className="h-8 w-8"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openDeleteModal(service.id)}
                    className="h-8 w-8 text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2 min-h-[40px]">
                {service.description || "No description provided"}
              </p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center text-green-600">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span className="font-medium">${service.price}</span>
                </div>
                
                {service.duration && (
                  <div className="flex items-center text-blue-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{service.duration} min</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-serif">My Services</CardTitle>
          <CardDescription>
            Manage the services you offer to clients
          </CardDescription>
        </div>
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Service
        </Button>
      </CardHeader>
      
      <CardContent>{renderContent()}</CardContent>

      {/* Add Service Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleCreateService}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Service Name *</Label>
                <Input
                  id="name"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  placeholder="e.g. Gel Manicure"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: parseFloat(e.target.value) })}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="0"
                    step="5"
                    value={newService.duration || ''}
                    onChange={(e) => setNewService({ ...newService, duration: parseInt(e.target.value) || null })}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newService.description || ''}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  placeholder="Describe what's included in this service"
                  rows={3}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsAddModalOpen(false);
                  setNewService(initialServiceState);
                }}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={createServiceMutation.isPending}
              >
                {createServiceMutation.isPending ? 'Adding...' : 'Add Service'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Service Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          
          {currentService && (
            <form onSubmit={handleUpdateService}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Service Name *</Label>
                  <Input
                    id="edit-name"
                    value={currentService.name}
                    onChange={(e) => setCurrentService({ ...currentService, name: e.target.value })}
                    placeholder="e.g. Gel Manicure"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-price">Price ($) *</Label>
                    <Input
                      id="edit-price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={currentService.price}
                      onChange={(e) => setCurrentService({ ...currentService, price: parseFloat(e.target.value) })}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="edit-duration">Duration (minutes)</Label>
                    <Input
                      id="edit-duration"
                      type="number"
                      min="0"
                      step="5"
                      value={currentService.duration || ''}
                      onChange={(e) => setCurrentService({ ...currentService, duration: parseInt(e.target.value) || null })}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={currentService.description || ''}
                    onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                    placeholder="Describe what's included in this service"
                    rows={3}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={updateServiceMutation.isPending}
                >
                  {updateServiceMutation.isPending ? 'Updating...' : 'Update Service'}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Service</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p>Are you sure you want to delete this service? This action cannot be undone.</p>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteService}
              disabled={deleteServiceMutation.isPending}
            >
              {deleteServiceMutation.isPending ? 'Deleting...' : 'Delete Service'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ServicesManager;
