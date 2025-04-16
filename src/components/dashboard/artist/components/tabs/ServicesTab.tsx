
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, DollarSign, Edit, Plus, Trash2, Loader2, 
  Tags, Pencil, X, CheckCircle
} from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Define service interface
interface Service {
  id: string;
  title: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  is_visible: boolean;
  user_id: string;
  created_at?: string;
  updated_at?: string;
}

// Form schema for service validation
const serviceSchema = z.object({
  title: z.string().min(1, "Service name is required"),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  duration_minutes: z.coerce.number().min(5, "Duration must be at least 5 minutes"),
  is_visible: z.boolean().default(true),
});

// Duration options for select
const durationOptions = [
  { value: 15, label: "15 minutes" },
  { value: 30, label: "30 minutes" },
  { value: 45, label: "45 minutes" },
  { value: 60, label: "1 hour" },
  { value: 75, label: "1 hour 15 minutes" },
  { value: 90, label: "1 hour 30 minutes" },
  { value: 105, label: "1 hour 45 minutes" },
  { value: 120, label: "2 hours" },
  { value: 150, label: "2 hours 30 minutes" },
  { value: 180, label: "3 hours" },
];

export default function ServicesTab() {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Initialize form with Zod resolver
  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      duration_minutes: 60,
      is_visible: true,
    },
  });

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, [user]);

  // Fetch all services for the current user
  const fetchServices = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      setServices(data as Service[]);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to load services");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle opening dialog for adding a service
  const handleAddService = () => {
    setEditingService(null);
    form.reset({
      title: "",
      description: "",
      price: 0,
      duration_minutes: 60,
      is_visible: true,
    });
    setIsDialogOpen(true);
  };

  // Handle opening dialog for editing a service
  const handleEditService = (service: Service) => {
    setEditingService(service);
    form.reset({
      title: service.title,
      description: service.description || "",
      price: service.price,
      duration_minutes: service.duration_minutes,
      is_visible: service.is_visible,
    });
    setIsDialogOpen(true);
  };

  // Handle form submission for adding/editing a service
  const onSubmit = async (values: z.infer<typeof serviceSchema>) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      if (editingService) {
        // Update existing service
        const { error } = await supabase
          .from("services")
          .update(values)
          .eq("id", editingService.id)
          .eq("user_id", user.id);
        
        if (error) throw error;
        
        toast.success("Service updated successfully");
      } else {
        // Add new service
        const { error } = await supabase
          .from("services")
          .insert([{ ...values, user_id: user.id }]);
        
        if (error) throw error;
        
        toast.success("Service added successfully");
      }
      
      // Refresh services and close dialog
      fetchServices();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving service:", error);
      toast.error("Failed to save service");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle deleting a service
  const handleDeleteService = async () => {
    if (!user || !serviceToDelete) return;
    
    try {
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", serviceToDelete.id)
        .eq("user_id", user.id);
      
      if (error) throw error;
      
      // Update local state
      setServices(services.filter(s => s.id !== serviceToDelete.id));
      toast.success("Service deleted successfully");
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service");
    } finally {
      setIsDeleteDialogOpen(false);
      setServiceToDelete(null);
    }
  };

  // Format price to display with 2 decimal places
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  // Format duration to display in a readable format
  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    }
    
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${remainingMinutes} min`;
  };

  // Card variants for animations
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    }),
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-serif flex items-center">
          <Tags className="h-6 w-6 text-primary mr-2" /> 
          Service Menu
        </h2>
        
        <Button onClick={handleAddService} className="flex items-center">
          <Plus className="mr-1 h-4 w-4" />
          Add New Service
        </Button>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="h-[150px] animate-pulse bg-gray-100">
              <CardContent className="p-4"></CardContent>
            </Card>
          ))}
        </div>
      ) : services.length === 0 ? (
        <Card className="bg-muted/30 border-dashed border-2 border-gray-200">
          <CardContent className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Tags className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Services Added Yet</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Add your services so clients know what you offer, including prices and estimated time.
            </p>
            <Button onClick={handleAddService}>
              <Plus className="mr-1 h-4 w-4" />
              Add Your First Service
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                custom={index}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={cardVariants}
                layoutId={service.id}
              >
                <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-lg">{service.title}</h3>
                        <div className="flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 rounded-full"
                            onClick={() => handleEditService(service)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 rounded-full text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => {
                              setServiceToDelete(service);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {service.description && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                          {service.description}
                        </p>
                      )}
                      
                      <div className="flex space-x-4 mt-4">
                        <div className="flex items-center text-emerald-600 font-medium">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {formatPrice(service.price)}
                        </div>
                        
                        <div className="flex items-center text-purple-600">
                          <Clock className="h-4 w-4 mr-1" />
                          {formatDuration(service.duration_minutes)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      
      {/* Service Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Edit Service" : "Add New Service"}
            </DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Full Set Gel Nails" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="duration_minutes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(parseInt(value))}
                        defaultValue={String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {durationOptions.map((option) => (
                            <SelectItem key={option.value} value={String(option.value)}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what's included in this service"
                        className="resize-none min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      {editingService ? "Update Service" : "Save Service"}
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the service 
              "{serviceToDelete?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteService}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
