
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCcw, Search, Clock, DollarSign, Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSalonServices } from "./useSalonServices";
import { SalonService } from "../types";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import ServiceForm from "./ServiceForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const SalonServiceManagement = () => {
  const { 
    services, 
    loading, 
    error, 
    refreshServices,
    addService, 
    updateService, 
    deleteService,
    toggleServiceVisibility
  } = useSalonServices();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState<SalonService | undefined>(undefined);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);

  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClick = () => {
    setSelectedService(undefined);
    setShowForm(true);
  };

  const handleEditClick = (service: SalonService) => {
    setSelectedService(service);
    setShowForm(true);
  };

  const handleDeleteClick = (id: string) => {
    setServiceToDelete(id);
    setShowDeleteDialog(true);
  };

  const handleFormSubmit = async (serviceData: Omit<SalonService, 'id' | 'created_at' | 'updated_at'>) => {
    if (selectedService) {
      await updateService(selectedService.id, serviceData);
    } else {
      await addService(serviceData);
    }
  };

  const handleConfirmDelete = async () => {
    if (serviceToDelete) {
      await deleteService(serviceToDelete);
      setShowDeleteDialog(false);
      setServiceToDelete(null);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 
        ? `${hours} hr ${remainingMinutes} min` 
        : `${hours} hr`;
    }
  };

  return (
    <Card className="border-purple-100">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-serif text-purple-900">Salon Services</CardTitle>
          <CardDescription>Manage the services offered at your salon</CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            className="text-purple-600"
            onClick={refreshServices}
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button 
            onClick={handleAddClick}
            size="sm"
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search services..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500 mb-2">{error.message}</p>
            <Button 
              variant="outline" 
              onClick={fetchServices}
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-10 border rounded-md bg-gray-50">
            <p className="text-gray-500 mb-2">
              {searchQuery 
                ? "No services match your search" 
                : "No services have been added yet"}
            </p>
            <Button 
              onClick={handleAddClick}
              className="mt-2 bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Service
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredServices.map(service => (
              <div 
                key={service.id} 
                className="border rounded-lg p-4 relative hover:border-purple-200 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg flex items-center">
                      {service.title}
                      {!service.is_visible && (
                        <Badge variant="outline" className="ml-2 text-gray-500">
                          Hidden
                        </Badge>
                      )}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <div className="flex items-center">
                        <DollarSign className="h-3.5 w-3.5 mr-1" />
                        {formatPrice(service.price)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {formatDuration(service.duration_minutes)}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleServiceVisibility(service.id, !service.is_visible)}
                      className="h-8 w-8 p-0"
                    >
                      {service.is_visible ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                      <span className="sr-only">
                        {service.is_visible ? "Hide" : "Show"}
                      </span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditClick(service)}
                      className="h-8 w-8 p-0"
                    >
                      <Pencil className="h-4 w-4 text-blue-500" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteClick(service.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
                
                {service.description && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {service.description}
                  </p>
                )}
                
                <div className="text-xs text-gray-400 mt-3">
                  Created: {formatDate(service.created_at)}
                  {service.updated_at && service.updated_at !== service.created_at && (
                    <span className="ml-2">
                      · Updated: {formatDate(service.updated_at)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <ServiceForm 
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedService}
        title={selectedService ? "Edit Service" : "Add New Service"}
      />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this service. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default SalonServiceManagement;
