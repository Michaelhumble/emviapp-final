
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface ServiceFormData {
  title: string;
  description: string;
  price: string;
  duration_minutes: string;
  is_visible: boolean;
}

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration_minutes: number;
  is_visible: boolean;
}

interface ArtistServiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onServiceSaved: () => void;
  initialData?: Service;
}

const ArtistServiceForm = ({ isOpen, onClose, onServiceSaved, initialData }: ArtistServiceFormProps) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!initialData;

  const form = useForm<ServiceFormData>({
    defaultValues: initialData 
      ? {
          title: initialData.title,
          description: initialData.description || "",
          price: initialData.price.toString(),
          duration_minutes: initialData.duration_minutes.toString(),
          is_visible: initialData.is_visible
        }
      : {
          title: "",
          description: "",
          price: "",
          duration_minutes: "60",
          is_visible: true
        }
  });

  const handleSubmit = async (data: ServiceFormData) => {
    if (!user) {
      toast.error("You must be logged in to save services");
      return;
    }

    setIsSubmitting(true);
    try {
      const serviceData = {
        title: data.title,
        description: data.description,
        price: parseFloat(data.price),
        duration_minutes: parseInt(data.duration_minutes),
        is_visible: data.is_visible,
        user_id: user.id,
        updated_at: new Date().toISOString()
      };

      if (isEditing && initialData) {
        // Update existing service
        const { error } = await supabase
          .from("services")
          .update(serviceData)
          .eq("id", initialData.id);

        if (error) throw error;
        toast.success("Service updated successfully");
      } else {
        // Create new service
        const { error } = await supabase
          .from("services")
          .insert(serviceData);

        if (error) throw error;
        toast.success("Service added successfully");
      }

      onServiceSaved();
      onClose();
    } catch (error) {
      console.error("Error saving service:", error);
      toast.error("Failed to save service. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Service" : "Add New Service"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Full Set Acrylic" {...field} />
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
                      placeholder="Describe your service..." 
                      className="h-20 resize-none"
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
                        step="0.01"
                        min="0"
                        placeholder="45.00"
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
                      <Input 
                        type="number" 
                        min="5"
                        step="5"
                        placeholder="60"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="is_visible"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Visible to clients</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Toggle off to hide this service
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={isSubmitting}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                <Check className="mr-2 h-4 w-4" />
                {isEditing ? "Save Changes" : "Add Service"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ArtistServiceForm;
