
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Check, X, Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { useProfileCompletion } from "@/components/profile/hooks/useProfileCompletion";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Service, ServiceFormData } from "@/components/profile/artist/components/types";

interface ArtistServiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onServiceSaved: () => void;
  initialData?: Service;
}

const ArtistServiceForm = ({ isOpen, onClose, onServiceSaved, initialData }: ArtistServiceFormProps) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(initialData?.image_url || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { markTaskComplete } = useProfileCompletion();
  const isEditing = !!initialData;

  const form = useForm<ServiceFormData>({
    defaultValues: initialData 
      ? {
          title: initialData.title,
          description: initialData.description || "",
          price: initialData.price.toString(),
          duration_minutes: initialData.duration_minutes.toString(),
          is_visible: initialData.is_visible,
          image_url: initialData.image_url
        }
      : {
          title: "",
          description: "",
          price: "",
          duration_minutes: "60",
          is_visible: true,
          image_url: ""
        }
  });

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    
    // Validate file type and size
    const fileType = file.type;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(fileType)) {
      toast.error('Please upload a JPEG, PNG, or WebP image');
      return;
    }
    
    // 5MB limit (in bytes)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }
    
    // Show preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    // Upload to Supabase
    try {
      setIsUploading(true);
      setUploadProgress(15);
      
      // Create path with user ID for proper permissions
      const filePath = `${user.id}/${Date.now()}_${file.name}`;
      
      setUploadProgress(30);
      
      const { data, error } = await supabase.storage
        .from('service_images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) throw error;
      
      setUploadProgress(70);
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('service_images')
        .getPublicUrl(data.path);
      
      setUploadProgress(100);
      
      // Set the form value
      form.setValue('image_url', urlData.publicUrl);
      
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image. Please try again.');
      setPreviewImage(null);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

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
        image_url: data.image_url || null,
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
        
        // Mark the task as complete in the profile progress tracker
        markTaskComplete("services_added");
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
  
  const handleRemoveImage = () => {
    setPreviewImage(null);
    form.setValue('image_url', '');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Service" : "Add New Service"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Image upload section */}
            <div className="mb-4">
              <FormLabel>Service Image (Optional)</FormLabel>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/jpeg,image/png,image/webp"
              />
              
              <div 
                onClick={handleImageClick}
                className={`mt-2 border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center cursor-pointer 
                  ${isUploading ? 'bg-gray-50' : 'hover:bg-gray-50'} transition-colors
                  ${previewImage ? 'h-48' : 'h-32'}`}
              >
                {previewImage ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={previewImage} 
                      alt="Service preview" 
                      className="h-full mx-auto object-contain rounded"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1 h-7 w-7 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage();
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : isUploading ? (
                  <div className="text-center">
                    <div className="animate-spin h-8 w-8 border-2 border-primary rounded-full border-t-transparent mx-auto mb-2"></div>
                    <p className="text-sm text-gray-500">Uploading... {uploadProgress}%</p>
                  </div>
                ) : (
                  <>
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                      <ImageIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">Click to upload an image</p>
                      <p className="text-xs text-gray-500 mt-1">JPEG, PNG or WebP (max 5MB)</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Service name is required" }}
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
                rules={{ 
                  required: "Price is required",
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: "Please enter a valid price"
                  }
                }}
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
                rules={{ 
                  required: "Duration is required",
                  min: {
                    value: 5,
                    message: "Duration must be at least 5 minutes"
                  }
                }}
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
                disabled={isSubmitting || isUploading}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              
              <Button 
                type="submit"
                disabled={isSubmitting || isUploading}
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
