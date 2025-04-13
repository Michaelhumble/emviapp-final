
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, DollarSign, Clock, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ServiceFormDialog from "./ServiceFormDialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

// Define service interface
interface Service {
  id: string;
  name: string;
  price: number;
  duration: number | null;
  description: string | null;
  user_id: string;
  created_at: string;
}

const ArtistServicesManager = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [newService, setNewService] = useState({
    name: "",
    price: 0,
    duration: 60,
    description: ""
  });

  // Fetch services when component mounts
  useEffect(() => {
    fetchServices();
  }, [user]);

  // Fetch all services for the logged-in artist
  const fetchServices = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("artist_services")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
        
      if (error) throw error;
      
      setServices(data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to load your services");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle adding a new service
  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to add services");
      return;
    }
    
    // Simple validation
    if (!newService.name.trim()) {
      toast.error("Service name is required");
      return;
    }
    
    if (newService.price <= 0) {
      toast.error("Price must be greater than zero");
      return;
    }
    
    try {
      const { error } = await supabase
        .from("artist_services")
        .insert([{
          ...newService,
          user_id: user.id
        }]);
        
      if (error) throw error;
      
      setIsAddDialogOpen(false);
      resetNewService();
      toast.success("Service added successfully!");
      fetchServices();
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("Failed to add service");
    }
  };

  // Handle editing a service
  const handleEditService = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentService) return;
    
    // Simple validation
    if (!currentService.name.trim()) {
      toast.error("Service name is required");
      return;
    }
    
    if (currentService.price <= 0) {
      toast.error("Price must be greater than zero");
      return;
    }
    
    try {
      const { error } = await supabase
        .from("artist_services")
        .update({
          name: currentService.name,
          price: currentService.price,
          duration: currentService.duration,
          description: currentService.description
        })
        .eq("id", currentService.id);
        
      if (error) throw error;
      
      setIsEditDialogOpen(false);
      setCurrentService(null);
      toast.success("Service updated successfully!");
      fetchServices();
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Failed to update service");
    }
  };

  // Handle deleting a service
  const handleDeleteService = async () => {
    if (!serviceToDelete) return;
    
    try {
      const { error } = await supabase
        .from("artist_services")
        .delete()
        .eq("id", serviceToDelete);
        
      if (error) throw error;
      
      setIsDeleteDialogOpen(false);
      setServiceToDelete(null);
      toast.success("Service deleted successfully!");
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service");
    }
  };

  // Reset new service form
  const resetNewService = () => {
    setNewService({
      name: "",
      price: 0,
      duration: 60,
      description: ""
    });
  };

  // Format duration as hours and minutes
  const formatDuration = (minutes: number | null) => {
    if (!minutes) return "N/A";
    
    if (minutes < 60) return `${minutes} min`;
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    return remainingMinutes > 0 
      ? `${hours} hr ${remainingMinutes} min` 
      : `${hours} hr`;
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
              {services.map(service => (
                <Card key={service.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="font-medium">{service.name}</h3>
                        
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
                          
                          {service.duration && (
                            <span className="flex items-center text-purple-600">
                              <Clock className="h-3.5 w-3.5 mr-0.5" />
                              {formatDuration(service.duration)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0" 
                          onClick={() => {
                            setCurrentService(service);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-red-500" 
                          onClick={() => {
                            setServiceToDelete(service.id);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
      />

      {/* Edit Service Dialog */}
      {currentService && (
        <ServiceFormDialog 
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          service={currentService}
          onServiceChange={(field, value) => 
            setCurrentService({ ...currentService, [field]: value })
          }
          onSubmit={handleEditService}
          isEditing={true}
        />
      )}

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

export default ArtistServicesManager;
