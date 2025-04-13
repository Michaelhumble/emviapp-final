
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  PlusCircle, 
  MoreVertical, 
  Edit, 
  Trash2, 
  RefreshCw, 
  Clock,
  DollarSign,
  Tag
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSalon } from "@/context/salon";
import { Badge } from "@/components/ui/badge";

type ServiceItem = {
  id: string;
  name: string;
  price: number;
  duration: string;
  category: string;
  salon_id: string;
  created_at: string;
  updated_at?: string;
};

const SERVICE_CATEGORIES = [
  "Nails",
  "Hair",
  "Waxing",
  "Facial",
  "Massage",
  "Makeup",
  "Brows & Lashes",
  "Other"
];

const SalonServiceManager = () => {
  const { currentSalon } = useSalon();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Service modal state
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<ServiceItem | null>(null);
  const [serviceForm, setServiceForm] = useState({
    name: '',
    price: '',
    duration: '',
    category: 'Nails',
  });
  
  const fetchServices = async () => {
    if (!currentSalon?.id) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('salon_id', currentSalon.id)
        .order('name', { ascending: true });
      
      if (error) throw error;
      
      setServices(data || []);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load salon services. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (currentSalon?.id) {
      fetchServices();
    }
  }, [currentSalon?.id]);
  
  const openAddModal = () => {
    setServiceForm({
      name: '',
      price: '',
      duration: '',
      category: 'Nails',
    });
    setIsEditing(false);
    setCurrentService(null);
    setIsServiceModalOpen(true);
  };
  
  const openEditModal = (service: ServiceItem) => {
    setServiceForm({
      name: service.name,
      price: service.price.toString(),
      duration: service.duration,
      category: service.category,
    });
    setIsEditing(true);
    setCurrentService(service);
    setIsServiceModalOpen(true);
  };
  
  const handleAddService = async () => {
    if (!currentSalon?.id) {
      toast.error("No salon selected");
      return;
    }
    
    if (!serviceForm.name || !serviceForm.price || !serviceForm.duration) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try {
      const newService = {
        salon_id: currentSalon.id,
        name: serviceForm.name,
        price: parseFloat(serviceForm.price),
        duration: serviceForm.duration,
        category: serviceForm.category,
      };
      
      const { data, error } = await supabase
        .from('services')
        .insert(newService)
        .select();
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setServices(prev => [...prev, data[0]]);
      }
      
      setIsServiceModalOpen(false);
      toast.success(`${serviceForm.name} service added successfully`);
    } catch (err) {
      console.error('Error adding service:', err);
      toast.error('Failed to add service. Please try again.');
    }
  };
  
  const handleUpdateService = async () => {
    if (!currentService || !currentSalon?.id) return;
    
    try {
      const updatedService = {
        name: serviceForm.name,
        price: parseFloat(serviceForm.price),
        duration: serviceForm.duration,
        category: serviceForm.category,
      };
      
      const { error } = await supabase
        .from('services')
        .update(updatedService)
        .eq('id', currentService.id)
        .eq('salon_id', currentSalon.id);
      
      if (error) throw error;
      
      setServices(prev => 
        prev.map(service => 
          service.id === currentService.id 
            ? { ...service, ...updatedService } 
            : service
        )
      );
      
      setIsServiceModalOpen(false);
      toast.success(`Service updated successfully`);
    } catch (err) {
      console.error('Error updating service:', err);
      toast.error('Failed to update service. Please try again.');
    }
  };
  
  const handleDeleteService = async (service: ServiceItem) => {
    if (!confirm(`Are you sure you want to delete "${service.name}"?`)) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', service.id)
        .eq('salon_id', currentSalon?.id);
      
      if (error) throw error;
      
      setServices(prev => prev.filter(s => s.id !== service.id));
      toast.success(`${service.name} has been deleted`);
    } catch (err) {
      console.error('Error deleting service:', err);
      toast.error('Failed to delete service. Please try again.');
    }
  };
  
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };
  
  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      "Nails": "bg-pink-100 text-pink-800",
      "Hair": "bg-purple-100 text-purple-800",
      "Waxing": "bg-yellow-100 text-yellow-800",
      "Facial": "bg-blue-100 text-blue-800",
      "Massage": "bg-green-100 text-green-800",
      "Makeup": "bg-orange-100 text-orange-800",
      "Brows & Lashes": "bg-indigo-100 text-indigo-800",
      "Other": "bg-gray-100 text-gray-800"
    };
    
    return colors[category] || "bg-gray-100 text-gray-800";
  };
  
  return (
    <Card className="mt-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Salon Services</CardTitle>
          <CardDescription>Manage your salon service offerings</CardDescription>
        </div>
        <Button onClick={openAddModal} size="sm">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-8 flex flex-col items-center justify-center text-gray-500">
            <RefreshCw className="h-6 w-6 animate-spin mb-2" />
            <p>Loading services...</p>
          </div>
        ) : error ? (
          <div className="py-8 text-center text-red-500">
            <p>{error}</p>
            <Button 
              variant="outline" 
              className="mt-2"
              onClick={fetchServices}
            >
              Try Again
            </Button>
          </div>
        ) : services.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 flex items-center justify-center rounded-full mb-4">
              <Tag className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-1">No services added yet</h3>
            <p className="text-gray-500 mb-4">
              Add your first service to start managing your offerings
            </p>
            <Button onClick={openAddModal}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Your First Service
            </Button>
          </div>
        ) : (
          <div>
            {/* Desktop view */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map(service => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getCategoryColor(service.category)}>
                          {service.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{service.duration}</TableCell>
                      <TableCell>{formatPrice(service.price)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditModal(service)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteService(service)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Mobile view */}
            <div className="md:hidden space-y-4">
              {services.map(service => (
                <Card key={service.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-base">{service.name}</h4>
                        <Badge variant="outline" className={`${getCategoryColor(service.category)} mt-1`}>
                          {service.category}
                        </Badge>
                        <div className="flex items-center mt-2 text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>{service.duration}</span>
                        </div>
                        <div className="flex items-center mt-1 text-sm font-medium">
                          <DollarSign className="h-3.5 w-3.5 mr-1" />
                          <span>{formatPrice(service.price)}</span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditModal(service)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteService(service)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      {/* Add/Edit Service Dialog */}
      <Dialog open={isServiceModalOpen} onOpenChange={setIsServiceModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Service' : 'Add New Service'}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Update the details of this service'
                : 'Add a new service to your salon offerings'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="serviceName">Service Name</Label>
              <Input
                id="serviceName"
                placeholder="e.g., Gel Manicure"
                value={serviceForm.name}
                onChange={(e) => setServiceForm({...serviceForm, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceCategory">Category</Label>
              <Select 
                value={serviceForm.category} 
                onValueChange={(val) => setServiceForm({...serviceForm, category: val})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="servicePrice">Price (USD)</Label>
              <div className="relative">
                <DollarSign className="h-4 w-4 absolute left-3 top-2.5 text-gray-500" />
                <Input
                  id="servicePrice"
                  type="number"
                  placeholder="0.00"
                  className="pl-8"
                  value={serviceForm.price}
                  onChange={(e) => setServiceForm({...serviceForm, price: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceDuration">Duration</Label>
              <Input
                id="serviceDuration"
                placeholder="e.g., 30 min, 1 hour"
                value={serviceForm.duration}
                onChange={(e) => setServiceForm({...serviceForm, duration: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsServiceModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={isEditing ? handleUpdateService : handleAddService}>
              {isEditing ? 'Save Changes' : 'Add Service'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SalonServiceManager;
