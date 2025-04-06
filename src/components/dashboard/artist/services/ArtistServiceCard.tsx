
import { useState } from "react";
import { Edit, Trash, DollarSign, Clock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import ArtistServiceForm from "./ArtistServiceForm";

interface Service {
  id: string;
  title: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  is_visible: boolean;
}

interface ArtistServiceCardProps {
  service: Service;
  onServiceUpdated: () => void;
}

const ArtistServiceCard = ({ service, onServiceUpdated }: ArtistServiceCardProps) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isUpdatingVisibility, setIsUpdatingVisibility] = useState(false);

  // Format price to always show 2 decimal places
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(service.price);

  // Format duration as hours and minutes
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
        .update({ is_visible: !service.is_visible, updated_at: new Date() })
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
      <Card className={`hover:shadow-md transition-shadow relative ${!service.is_visible ? 'opacity-70' : ''}`}>
        {!service.is_visible && (
          <span className="absolute top-2 right-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center">
            <EyeOff className="h-3 w-3 mr-1" />
            Hidden
          </span>
        )}
        <CardContent className="p-5">
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
        </CardContent>
      </Card>

      {/* Edit Form Dialog */}
      {showEditForm && (
        <ArtistServiceForm
          isOpen={showEditForm}
          onClose={() => setShowEditForm(false)}
          onServiceSaved={onServiceUpdated}
          initialData={service}
        />
      )}

      {/* Delete Confirmation Dialog */}
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
