
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import ServiceList from "./ServiceList";
import EmptyServiceState from "./EmptyServiceState";
import ServiceFormDialog from "./ServiceFormDialog";

// Define service interface
interface Service {
  id: string;
  name: string;
  price: number;
  duration: number | null;
}

const ArtistServiceManager = () => {
  // State
  const [services, setServices] = useState<Service[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [newService, setNewService] = useState({
    name: "",
    price: 0,
    duration: 30,
  });

  // Handle adding a new service
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!newService.name.trim()) {
      toast.error("Service name is required");
      return;
    }
    
    if (newService.price <= 0) {
      toast.error("Price must be greater than zero");
      return;
    }
    
    const service = {
      id: Date.now().toString(),
      name: newService.name,
      price: newService.price,
      duration: newService.duration,
    };
    
    setServices([...services, service]);
    setIsAddDialogOpen(false);
    setNewService({ name: "", price: 0, duration: 30 });
    toast.success("Service added successfully!");
  };

  // Handle editing a service
  const handleEditService = (e: React.FormEvent) => {
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
    
    setServices(services.map(service => 
      service.id === currentService.id ? currentService : service
    ));
    
    setIsEditDialogOpen(false);
    setCurrentService(null);
    toast.success("Service updated successfully!");
  };

  // Handle deleting a service
  const handleDeleteService = (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter(service => service.id !== id));
      toast.success("Service deleted successfully!");
    }
  };

  // Open edit dialog with service data
  const openEditDialog = (service: Service) => {
    setCurrentService(service);
    setIsEditDialogOpen(true);
  };

  // Handle form field changes for new service
  const handleNewServiceChange = (field: string, value: any) => {
    setNewService({ ...newService, [field]: value });
  };

  // Handle form field changes for current service
  const handleCurrentServiceChange = (field: string, value: any) => {
    if (currentService) {
      setCurrentService({ ...currentService, [field]: value });
    }
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
        service={newService}
        onServiceChange={handleNewServiceChange}
        onSubmit={handleAddService}
        isEditing={false}
      />

      {/* Edit Service Dialog */}
      {currentService && (
        <ServiceFormDialog 
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          service={currentService}
          onServiceChange={handleCurrentServiceChange}
          onSubmit={handleEditService}
          isEditing={true}
        />
      )}
    </motion.div>
  );
};

export default ArtistServiceManager;
