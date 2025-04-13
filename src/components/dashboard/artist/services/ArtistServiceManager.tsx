
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, DollarSign, Clock, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Define service interface
interface Service {
  id: string;
  name: string;
  price: number;
  duration: number | null;
}

const ArtistServiceManager = () => {
  // Mock data - would be replaced with API calls later
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
            <div className="text-center py-12 bg-slate-50 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto mb-4 flex items-center justify-center">
                <Plus className="h-6 w-6 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No services listed yet.</h3>
              <p className="text-sm text-slate-500 mb-4">
                Start adding your services to let clients know what you offer.
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                Add Your First Service
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <Card key={service.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium">{service.name}</h3>
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
                    <div className="flex justify-between mt-2 text-sm">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3.5 w-3.5 text-green-600" />
                        <span>${service.price}</span>
                      </div>
                      {service.duration && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-indigo-600" />
                          <span>{service.duration} mins</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Service Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleAddService}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Service Name</Label>
                <Input 
                  id="name" 
                  value={newService.name} 
                  onChange={(e) => setNewService({...newService, name: e.target.value})}
                  placeholder="e.g. Gel Full Set" 
                  required
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
                    min="0" 
                    step="5"
                    value={newService.duration} 
                    onChange={(e) => setNewService({...newService, duration: parseInt(e.target.value)})}
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Service</Button>
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
          
          {currentService && (
            <form onSubmit={handleEditService}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Service Name</Label>
                  <Input 
                    id="edit-name" 
                    value={currentService.name} 
                    onChange={(e) => setCurrentService({...currentService, name: e.target.value})}
                    placeholder="e.g. Gel Full Set" 
                    required
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
                      value={currentService.price} 
                      onChange={(e) => setCurrentService({...currentService, price: parseFloat(e.target.value)})}
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
                      onChange={(e) => setCurrentService({...currentService, duration: parseInt(e.target.value) || null})}
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
    </motion.div>
  );
};

export default ArtistServiceManager;
