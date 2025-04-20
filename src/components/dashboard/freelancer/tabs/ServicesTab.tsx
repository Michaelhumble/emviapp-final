
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Clock, DollarSign } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface Service {
  id: string;
  title: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  is_visible: boolean;
  user_id: string;
}

const serviceFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().optional(),
  price: z.coerce.number().min(1, "Price must be at least 1"),
  duration_minutes: z.coerce.number().min(5, "Duration must be at least 5 minutes"),
  is_visible: z.boolean().default(true),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

const ServicesTab = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      duration_minutes: 60,
      is_visible: true,
    },
  });

  useEffect(() => {
    const fetchServices = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setServices(data || []);
      } catch (error) {
        console.error("Error fetching services:", error);
        toast.error("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [user?.id]);

  const handleAddService = () => {
    setEditingService(null);
    form.reset({
      title: "",
      description: "",
      price: 0,
      duration_minutes: 60,
      is_visible: true,
    });
    setDialogOpen(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    form.reset({
      title: service.title,
      description: service.description || "",
      price: service.price,
      duration_minutes: service.duration_minutes,
      is_visible: service.is_visible,
    });
    setDialogOpen(true);
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", serviceId);

      if (error) throw error;

      // Update local state
      setServices((prev) => prev.filter((s) => s.id !== serviceId));
      toast.success("Service deleted successfully");
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service");
    }
  };

  const onSubmit = async (values: ServiceFormValues) => {
    if (!user?.id) return;

    try {
      setIsSubmitting(true);

      if (editingService) {
        // Update existing service
        const { error } = await supabase
          .from("services")
          .update({
            title: values.title,
            description: values.description,
            price: values.price,
            duration_minutes: values.duration_minutes,
            is_visible: values.is_visible,
          })
          .eq("id", editingService.id);

        if (error) throw error;

        // Update local state
        setServices((prev) =>
          prev.map((s) =>
            s.id === editingService.id
              ? {
                  ...s,
                  title: values.title,
                  description: values.description || null,
                  price: values.price,
                  duration_minutes: values.duration_minutes,
                  is_visible: values.is_visible,
                }
              : s
          )
        );

        toast.success("Service updated successfully");
      } else {
        // Create new service
        const { data, error } = await supabase
          .from("services")
          .insert({
            user_id: user.id,
            title: values.title,
            description: values.description,
            price: values.price,
            duration_minutes: values.duration_minutes,
            is_visible: values.is_visible,
          })
          .select("*")
          .single();

        if (error) throw error;

        // Update local state
        setServices((prev) => [data, ...prev]);
        toast.success("Service added successfully");
      }

      setDialogOpen(false);
    } catch (error) {
      console.error("Error saving service:", error);
      toast.error("Failed to save service");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-sm border border-amber-100 bg-white">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Your Services</CardTitle>
            <Button onClick={handleAddService} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Service
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full rounded-md" />
              ))}
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-8 bg-muted/20 rounded-lg">
              <DollarSign className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <h3 className="text-lg font-medium">No services yet</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                Add services to let clients know what you offer
              </p>
              <Button onClick={handleAddService}>
                <Plus className="h-4 w-4 mr-1" />
                Add Your First Service
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {services.map((service) => (
                <Card
                  key={service.id}
                  className="hover:shadow-md transition-shadow border-muted"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-lg">{service.title}</h3>
                        {service.description && (
                          <p className="text-muted-foreground text-sm mt-1">
                            {service.description}
                          </p>
                        )}
                        <div className="flex mt-2 text-sm space-x-4">
                          <div className="flex items-center">
                            <DollarSign className="h-3.5 w-3.5 mr-1 text-amber-600" />
                            <span>${service.price}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1 text-amber-600" />
                            <span>{service.duration_minutes} mins</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditService(service)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
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

      {/* Service Form Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Edit Service" : "Add New Service"}
            </DialogTitle>
            <DialogDescription>
              {editingService
                ? "Update your service details below"
                : "Fill in the details for your new service"}
            </DialogDescription>
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
                      <Input placeholder="e.g. Manicure, Pedicure" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what's included in this service"
                        {...field}
                      />
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
                          min="0"
                          step="0.01"
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
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" min="5" step="5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? "Saving..."
                    : editingService
                    ? "Update Service"
                    : "Add Service"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesTab;
