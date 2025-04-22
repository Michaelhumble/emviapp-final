
import { useState } from "react";
import { Edit, Trash, DollarSign, Clock, Eye, EyeOff, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import ArtistServiceForm from "./ArtistServiceForm";
import { Service } from "@/components/profile/artist/components/types";

import { motion } from "framer-motion";

interface ArtistServiceCardProps {
  service: Service;
  onServiceUpdated: () => void;
}

const ArtistServiceCard = ({ service, onServiceUpdated }: ArtistServiceCardProps) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isUpdatingVisibility, setIsUpdatingVisibility] = useState(false);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(service.price);

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 
      ? `${hours} hr ${remainingMinutes} min` 
      : `${hours} hr`;
  };

  const handleToggleVisibility = async () => {
    setIsUpdatingVisibility(true);
    try {
      const { error } = await supabase
        .from("services")
        .update({ is_visible: !service.is_visible, updated_at: new Date().toISOString() })
        .eq("id", service.id);

      if (error) throw error;
      
      toast.success(`Service ${service.is_visible ? 'hidden' : 'made visible'}`);
      onServiceUpdated();
    } catch (error) {
      console.error("Error updating service visibility:", error);
      toast.error("Failed to update service visibility");
    } finally {
      setIsUpdatingVisibility(false);
    }
  };

  const handleDeleteService = async () => {
    try {
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", service.id);

      if (error) throw error;
      
      toast.success("Service deleted successfully");
      onServiceUpdated();
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service");
    } finally {
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <motion.div
        className="rounded-xl shadow-sm border bg-white flex flex-col h-full transition-all"
        whileHover={{ scale: 1.045 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {!service.is_visible && (
          <span className="absolute top-2 right-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center">
            <EyeOff className="h-3 w-3 mr-1" />
            Hidden
          </span>
        )}
        <CardContent className="p-0">
          {service.image_url ? (
            <div className="relative w-full h-32 overflow-hidden rounded-t-lg">
              <img 
                src={service.image_url} 
                alt={service.title} 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="bg-gray-100 h-12 flex items-center justify-center rounded-t-lg">
              <ImageIcon className="h-6 w-6 text-gray-400" />
            </div>
          )}
          
          <div className="p-5">
            <h3 className="font-semibold text-lg">{service.title}</h3>
            
            {service.description && (
              <p className="text-gray-600 text-sm mt-1 mb-3">{service.description}</p>
            )}
            
            <div className="flex items-center justify-between mt-2">
              <div className="space-y-1">
                <div className="flex items-center text-purple-700 font-medium">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {formattedPrice}
                </div>
                
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  {formatDuration(service.duration_minutes)}
                </div>
              </div>
              
              <div className="flex space-x-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={() => setShowEditForm(true)}
                  aria-label="Edit service"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 text-gray-500 hover:text-purple-700" 
                  onClick={handleToggleVisibility}
                  disabled={isUpdatingVisibility}
                  aria-label={service.is_visible ? "Hide service" : "Show service"}
                >
                  {service.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 text-gray-500 hover:text-red-600" 
                  onClick={() => setShowDeleteDialog(true)}
                  aria-label="Delete service"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </motion.div>

      {showEditForm && (
        <ArtistServiceForm
          isOpen={showEditForm}
          onClose={() => setShowEditForm(false)}
          onServiceSaved={onServiceUpdated}
          initialData={service}
        />
      )}

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the service "{service.title}".
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteService}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ArtistServiceCard;
