
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, DollarSign, Clock, Pencil, Trash2, Loader2 } from 'lucide-react';
import { useArtistServices, ServiceFormData } from '@/hooks/useArtistServices';
import { useProfileCompletion } from '@/hooks/useProfileCompletion';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import ServiceFormDialog from './ServiceFormDialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const ServiceManager: React.FC = () => {
  const { 
    services, 
    isLoading, 
    addService, 
    updateService, 
    deleteService 
  } = useArtistServices();
  
  const { markTaskComplete, isTaskComplete } = useProfileCompletion();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [serviceIdToDelete, setServiceIdToDelete] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [newService, setNewService] = useState<ServiceFormData>({
    title: '',
    description: '',
    price: 0,
    duration_minutes: 60,
    is_visible: true
  });
  const [editingService, setEditingService] = useState<ServiceFormData>({
    title: '',
    description: '',
    price: 0,
    duration_minutes: 60,
    is_visible: true
  });

  // Format duration as hours and minutes
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    return remainingMinutes > 0 
      ? `${hours} hr ${remainingMinutes} min` 
      : `${hours} hr`;
  };

  // Handle adding a new service
  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const result = await addService(newService);
      if (result) {
        setIsAddDialogOpen(false);
        resetNewService();
        
        // Mark task as complete
        if (!isTaskComplete('service_added')) {
          markTaskComplete('service_added');
        }
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Handle editing a service
  const handleEditService = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const serviceId = editingService.id;
      if (!serviceId) return;
      
      // Remove id from the update data
      const { id, ...updateData } = editingService;
      
      const success = await updateService(serviceId, updateData);
      if (success) {
        setIsEditDialogOpen(false);
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Handle deleting a service
  const handleDeleteService = async () => {
    if (!serviceIdToDelete) return;
    
    try {
      const success = await deleteService(serviceIdToDelete);
      if (success) {
        setIsDeleteDialogOpen(false);
        setServiceIdToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  // Reset new service form
  const resetNewService = () => {
    setNewService({
      title: '',
      description: '',
      price: 0,
      duration_minutes: 60,
      is_visible: true
    });
  };

  // Open the edit dialog with service data
  const openEditServiceDialog = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;
    
    setEditingService({
      id: service.id,
      title: service.title,
      description: service.description || '',
      price: service.price,
      duration_minutes: service.duration_minutes,
      is_visible: service.is_visible
    });
    
    setIsEditDialogOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-xl font-serif">My Services</CardTitle>
            <CardDescription>
              What I offer, how much I charge, and how long it takes.
            </CardDescription>
          </div>
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            size="sm" 
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" /> Add Service
          </Button>
        </CardHeader>
        
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-9 w-16" />
                </div>
              ))}
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Plus className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">No services added yet</h3>
              <p className="text-gray-500 mb-4 max-w-md mx-auto">
                Add your first service to let clients know what you offer.
              </p>
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Your First Service
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {services.map(service => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className={`overflow-hidden ${!service.is_visible ? 'bg-gray-50/50 opacity-75' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <h3 className="font-medium">{service.title}</h3>
                            
                            {service.description && (
                              <p className="text-sm text-gray-500 max-w-xs">
                                {service.description}
                              </p>
                            )}
                            
                            <div className="flex items-center gap-3 mt-2 text-sm">
                              <span className="flex items-center text-green-600">
                                <DollarSign className="h-3.5 w-3.5 mr-0.5" />
                                ${service.price}
                              </span>
                              
                              {service.duration_minutes && (
                                <span className="flex items-center text-purple-600">
                                  <Clock className="h-3.5 w-3.5 mr-0.5" />
                                  {formatDuration(service.duration_minutes)}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex space-x-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0" 
                              onClick={() => openEditServiceDialog(service.id)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-red-500" 
                              onClick={() => {
                                setServiceIdToDelete(service.id);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {!service.is_visible && (
                          <div className="mt-2 text-xs text-muted-foreground">
                            <span className="italic">This service is hidden from clients</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Service Dialog */}
      <ServiceFormDialog 
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        service={newService}
        onServiceChange={(field, value) => 
          setNewService({ ...newService, [field]: value })
        }
        onSubmit={handleAddService}
        isEditing={false}
        isSaving={isSaving}
      />

      {/* Edit Service Dialog */}
      <ServiceFormDialog 
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        service={editingService}
        onServiceChange={(field, value) => 
          setEditingService({ ...editingService, [field]: value })
        }
        onSubmit={handleEditService}
        isEditing={true}
        isSaving={isSaving}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Service</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this service? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteService} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default ServiceManager;
