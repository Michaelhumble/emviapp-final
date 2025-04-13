
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

// Define the service interface to match what comes from Supabase
interface SupabaseService {
  id: string;
  title: string;
  price: number;
  duration_minutes: number;
  description?: string;
  image_url?: string;
  is_visible?: boolean;
  user_id: string;
  created_at: string;
  updated_at?: string;
}

// Extended service item to include category
type ServiceItem = SupabaseService & {
  category: string;
};

// Form state interface
interface ServiceFormState {
  title: string;
  price: string;
  duration: string;
  category: string;
}

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
  const [serviceForm, setServiceForm] = useState<ServiceFormState>({
    title: '',
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
        .eq('user_id', currentSalon.id)
        .order('title', { ascending: true });
      
      if (error) throw error;
      
      // Convert the raw data to our ServiceItem type with a category
      const servicesWithCategory: ServiceItem[] = (data || []).map((service: SupabaseService) => ({
        ...service,
        category: 'Other' // Set a default category since it's not in the database
      }));
      
      setServices(servicesWithCategory);
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
      title: '',
      price: '',
      duration: '',
      category: 'Nails',
    });
    setIsEditing(false);
    setCurrentService(null);
    setIsServiceModalOpen(true);
  };
  
  const openEditModal = (service: ServiceItem) => {
    // Convert duration_minutes back to human-readable form
    const durationStr = parseDurationMinutesToString(service.duration_minutes);
    
    setServiceForm({
      title: service.title,
      price: service.price.toString(),
      duration: durationStr,
      category: service.category,
    });
    setIsEditing(true);
    setCurrentService(service);
    setIsServiceModalOpen(true);
  };
  
  // Helper to convert duration string to minutes
  const parseDurationToMinutes = (duration: string): number => {
    // Handle "X min" or "X hour(s)" format
    if (duration.includes('min')) {
      return parseInt(duration.replace(/\D/g, ''), 10);
    } else if (duration.includes('hour')) {
      const hours = parseInt(duration.replace(/\D/g, ''), 10);
      return hours * 60;
    }
    // Default - assume raw minutes
    return parseInt(duration, 10) || 30; // Default to 30 minutes if parsing fails
  };
  
  // Helper to convert minutes to human-readable duration
  const parseDurationMinutesToString = (minutes: number): string => {
    if (minutes >= 60 && minutes % 60 === 0) {
      const hours = minutes / 60;
      return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    }
    return `${minutes} min`;
  };
  
  const handleAddService = async () => {
    if (!currentSalon?.id) {
      toast.error("No salon selected");
      return;
    }
    
    if (!serviceForm.title || !serviceForm.price || !serviceForm.duration) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try {
      const durationMinutes = parseDurationToMinutes(serviceForm.duration);
      
      // Create the service object for Supabase - without category since it's not in the database
      const newServiceData = {
        user_id: currentSalon.id,
        title: serviceForm.title,
        price: parseFloat(serviceForm.price),
        duration_minutes: durationMinutes,
        is_visible: true
      };
      
      const { data, error } = await supabase
        .from('services')
        .insert(newServiceData)
        .select();
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        // Create a ServiceItem with the category from our form
        const newServiceWithCategory: ServiceItem = {
          ...data[0] as SupabaseService,
          category: serviceForm.category
        };
        
        setServices(prev => [...prev, newServiceWithCategory]);
      }
      
      setIsServiceModalOpen(false);
      toast.success(`${serviceForm.title} service added successfully`);
    } catch (err) {
      console.error('Error adding service:', err);
      toast.error('Failed to add service. Please try again.');
    }
  };
  
  const handleUpdateService = async () => {
    if (!currentService || !currentSalon?.id) return;
    
    try {
      const durationMinutes = parseDurationToMinutes(serviceForm.duration);
      
      // Prepare update data - without category
      const updatedServiceData = {
        title: serviceForm.title,
        price: parseFloat(serviceForm.price),
        duration_minutes: durationMinutes,
      };
      
      const { error } = await supabase
        .from('services')
        .update(updatedServiceData)
        .eq('id', currentService.id)
        .eq('user_id', currentSalon.id);
      
      if (error) throw error;
      
      // Update local state with category
      setServices(prev => 
        prev.map(service => 
          service.id === currentService.id 
            ? { 
                ...service, 
                ...updatedServiceData,
                category: serviceForm.category // Keep the category in our local state
              } 
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
    if (!confirm(`Are you sure you want to delete "${service.title}"?`)) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', service.id)
        .eq('user_id', currentSalon?.id);
      
      if (error) throw error;
      
      setServices(prev => prev.filter(s => s.id !== service.id));
      toast.success(`${service.title} has been deleted`);
    } catch (err) {
      console.error('Error deleting service:', err);
      toast.error('Failed to delete service. Please try again.');
    }
  };
  
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };
  
  const formatDuration = (minutes: number) => {
    return parseDurationMinutesToString(minutes);
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
                      <TableCell className="font-medium">{service.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getCategoryColor(service.category)}>
                          {service.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDuration(service.duration_minutes)}</TableCell>
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
                        <h4 className="font-semibold text-base">{service.title}</h4>
                        <Badge variant="outline" className={`${getCategoryColor(service.category)} mt-1`}>
                          {service.category}
                        </Badge>
                        <div className="flex items-center mt-2 text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>{formatDuration(service.duration_minutes)}</span>
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
                value={serviceForm.title}
                onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})}
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
              <p className="text-sm text-muted-foreground">Examples: "30 min", "1 hour", "45 min"</p>
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
