
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ServicesList from "./ServicesList";
import ServiceForm from "./ServiceForm";
import { useSalonServices } from "./useSalonServices";
import type { SalonService } from "../types";

export default function ServicesTab() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<SalonService | null>(null);
  const { services, loading, error, addService, updateService, deleteService } = useSalonServices();

  const handleEditService = (service: SalonService) => {
    setEditingService(service);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingService(null);
  };

  const handleSubmit = async (serviceData: Partial<SalonService>) => {
    if (editingService) {
      await updateService(editingService.id, serviceData);
    } else {
      await addService(serviceData);
    }
    handleCloseForm();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-serif">Salon Services</CardTitle>
          </div>
          <Button onClick={() => setIsFormOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </CardHeader>
        <CardContent>
          <ServicesList 
            services={services}
            loading={loading}
            error={error}
            onEdit={handleEditService}
            onDelete={deleteService}
          />
        </CardContent>
      </Card>

      <ServiceForm 
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        initialData={editingService}
      />
    </div>
  );
}
