
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useSalonServices } from './useSalonServices';
import SalonServicesList from './SalonServicesList';
import SalonServiceForm from './SalonServiceForm';
import { SalonService } from '../types';

export default function ServicesTab() {
  const { services, loading, error, addService, updateService, deleteService } = useSalonServices();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<SalonService | undefined>(undefined);

  const handleOpenAddForm = () => {
    setEditingService(undefined);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (service: SalonService) => {
    setEditingService(service);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingService(undefined);
  };

  const handleSubmit = async (serviceData: Omit<SalonService, 'id' | 'created_at' | 'updated_at'>) => {
    if (editingService) {
      await updateService(editingService.id, serviceData);
    } else {
      await addService(serviceData);
    }
    handleCloseForm();
  };

  return (
    <Card className="border-purple-100">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-serif text-purple-900">Salon Services</CardTitle>
        <Button onClick={handleOpenAddForm} size="sm" className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </CardHeader>
      <CardContent>
        <SalonServicesList 
          services={services} 
          onEdit={handleOpenEditForm}
          onDelete={deleteService}
        />
      </CardContent>

      <SalonServiceForm
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        initialData={editingService}
      />
    </Card>
  );
}
