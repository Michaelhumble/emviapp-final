
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import ServiceList from "./ServiceList";
import EmptyServiceState from "./EmptyServiceState";
import ServiceFormDialog from "./ServiceFormDialog";
import { Service } from "./ServicesManager";

const ArtistServiceManager = () => {
  // State
  const [services, setServices] = useState<Service[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle adding a new service
  const handleAddService = (serviceData: Partial<Service>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create a new service with generated ID
      const newService: Service = {
        id: Date.now().toString(),
        title: serviceData.title || "",
        description: serviceData.description || null,
        price: serviceData.price || 0,
        duration_minutes: serviceData.duration_minutes || 60,
        is_visible: serviceData.is_visible !== false,
        user_id: "current-user-id", // Replace with actual user ID
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setServices([...services, newService]);
      setIsAddDialogOpen(false);
      setIsSubmitting(false);
      toast.success("Service added successfully!");
    }, 800); // Simulate network delay
  };

  // Handle editing a service
  const handleEditService = (serviceData: Partial<Service>) => {
    if (!currentService) return;
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedServices = services.map(service => 
        service.id === currentService.id ? { ...currentService, ...serviceData, updated_at: new Date().toISOString() } : service
      );
      
      setServices(updatedServices);
      setIsEditDialogOpen(false);
      setCurrentService(null);
      setIsSubmitting(false);
      toast.success("Service updated successfully!");
    }, 800); // Simulate network delay
  };

  // Handle deleting a service
  const handleDeleteService = (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      // Simulate API call
      setTimeout(() => {
        setServices(services.filter(service => service.id !== id));
        toast.success("Service deleted successfully!");
      }, 500);
    }
  };

  // Open edit dialog with service data
  const openEditDialog = (service: Service) => {
    setCurrentService(service);
    setIsEditDialogOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      <Card className="border-purple-100 shadow-sm">
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
          {services.length === 0 ? (
            <EmptyServiceState onAddClick={() => setIsAddDialogOpen(true)} />
          ) : (
            <ServiceList 
              services={services} 
              onEditService={openEditDialog} 
              onDeleteService={handleDeleteService} 
            />
          )}
        </CardContent>
      </Card>

      {/* Add Service Dialog */}
      <ServiceFormDialog 
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddService}
        isSubmitting={isSubmitting}
      />

      {/* Edit Service Dialog */}
      <ServiceFormDialog 
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        initialData={currentService}
        onSave={handleEditService}
        isSubmitting={isSubmitting}
      />
    </motion.div>
  );
};

export default ArtistServiceManager;
