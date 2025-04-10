
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  ListPlus, Edit, Trash2, Plus, DollarSign, Clock, Tag 
} from "lucide-react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SalonService {
  id: string;
  title: string;
  price: number;
  duration_minutes: number;
  category?: string;
  description?: string;
}

const SERVICE_CATEGORIES = [
  "Manicure",
  "Pedicure",
  "Nail Art",
  "Acrylic",
  "Gel",
  "Waxing",
  "Facial",
  "Massage",
  "Hair",
  "Other"
];

const SalonServiceManager = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<SalonService[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<SalonService>>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchServices();
    }
  }, [user]);

  const fetchServices = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('user_id', user?.id)
        .order('title');
        
      if (error) throw error;
      
      setServices(data || []);
    } catch (err) {
      console.error("Error fetching services:", err);
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };
  
  const handleOpenDialog = (service?: SalonService) => {
    if (service) {
      setCurrentService(service);
      setIsEditing(true);
    } else {
      setCurrentService({});
      setIsEditing(false);
    }
    setIsDialogOpen(true);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentService(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCategoryChange = (value: string) => {
    setCurrentService(prev => ({ ...prev, category: value }));
  };
  
  const handleSubmit = async () => {
    // Basic validation
    if (!currentService.title || !currentService.price || !currentService.duration_minutes) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try {
      if (isEditing && currentService.id) {
        // Update existing service
        const { error } = await supabase
          .from('services')
          .update({
            title: currentService.title,
            price: currentService.price,
            duration_minutes: currentService.duration_minutes,
            category: currentService.category,
            description: currentService.description
          })
          .eq('id', currentService.id);
          
        if (error) throw error;
        
        setServices(prev => 
          prev.map(service => 
            service.id === currentService.id ? { ...service, ...currentService as SalonService } : service
          )
        );
        
        toast.success("Service updated successfully");
      } else {
        // Create new service
        const { data, error } = await supabase
          .from('services')
          .insert({
            user_id: user?.id,
            title: currentService.title,
            price: currentService.price,
            duration_minutes: currentService.duration_minutes,
            category: currentService.category,
            description: currentService.description
          })
          .select();
          
        if (error) throw error;
        
        if (data) {
          setServices(prev => [...prev, data[0]]);
          toast.success("Service added successfully");
        }
      }
      
      setIsDialogOpen(false);
      setCurrentService({});
    } catch (err) {
      console.error("Error saving service:", err);
      toast.error("Failed to save service");
    }
  };
  
  const handleDeleteService = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setServices(prev => prev.filter(service => service.id !== id));
      toast.success(`"${title}" has been deleted`);
    } catch (err) {
      console.error("Error deleting service:", err);
      toast.error("Failed to delete service");
    }
  };
  
  return (
    <Card className="border-green-100">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center">
          <ListPlus className="h-5 w-5 text-green-500 mr-2" />
          Service Offerings
        </CardTitle>
        <Button size="sm" onClick={() => handleOpenDialog()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </CardHeader>
      
      <CardContent>
        {loading ? (
          <div className="text-center py-8 text-gray-500">
            <p>Loading services...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-8 text-gray-500 border border-dashed rounded-md">
            <ListPlus className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p className="mb-2">No services listed yet</p>
            <Button size="sm" variant="outline" onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Add your first service
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.title}</TableCell>
                    <TableCell>
                      {service.category ? (
                        <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                          {service.category}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </TableCell>
                    <TableCell>${service.price}</TableCell>
                    <TableCell>{service.duration_minutes} min</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleOpenDialog(service)}
                        >
                          <Edit className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleDeleteService(service.id, service.title)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        
        {/* Add/Edit Service Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isEditing ? 'Edit Service' : 'Add New Service'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="title">Service Name</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Gel Manicure"
                  value={currentService.title || ''}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={currentService.category || ''}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_CATEGORIES.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="29.99"
                      className="pl-8"
                      value={currentService.price || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration_minutes">Duration (min)</Label>
                  <div className="relative">
                    <Clock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="duration_minutes"
                      name="duration_minutes"
                      type="number"
                      min="5"
                      step="5"
                      placeholder="30"
                      className="pl-8"
                      value={currentService.duration_minutes || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Brief description of the service"
                  value={currentService.description || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSubmit}>
                {isEditing ? 'Save Changes' : 'Add Service'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default SalonServiceManager;
