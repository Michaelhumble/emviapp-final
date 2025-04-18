import { useState } from "react";
import { useSalon } from "@/context/salon";
import { Salon } from "@/types/salon";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Store, Edit, Trash2, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const SalonAdminPanel = () => {
  const { salons, createSalon, deleteSalon, updateSalon } = useSalon();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  
  const [formData, setFormData] = useState({
    salon_name: "",
    location: "",
    about: "",
    website: "",
    instagram: "",
    phone: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const openCreateModal = () => {
    setFormData({
      salon_name: "",
      location: "",
      about: "",
      website: "",
      instagram: "",
      phone: ""
    });
    setIsCreateModalOpen(true);
  };
  
  const openEditModal = (salon: Salon) => {
    setSelectedSalon(salon);
    setFormData({
      salon_name: salon.salon_name || "",
      location: salon.location || "",
      about: salon.about || "",
      website: salon.website || "",
      instagram: salon.instagram || "",
      phone: salon.phone || ""
    });
    setIsEditModalOpen(true);
  };
  
  const handleCreateSalon = async () => {
    if (!formData.salon_name.trim()) {
      toast.error("Salon name is required");
      return;
    }
    
    const success = await createSalon(formData);
    if (success) {
      setIsCreateModalOpen(false);
    }
  };
  
  const handleUpdateSalon = async () => {
    if (!selectedSalon || !formData.salon_name.trim()) {
      toast.error("Salon name is required");
      return;
    }
    
    const success = await updateSalon(selectedSalon.id, formData);
    if (success) {
      setIsEditModalOpen(false);
    }
  };
  
  const handleDeleteSalon = async (salonId: string) => {
    await deleteSalon(salonId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Your Salons</h2>
        {salons.length < 3 && (
          <Button onClick={openCreateModal}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Salon
          </Button>
        )}
      </div>
      
      {salons.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <Store className="h-10 w-10 mx-auto text-gray-400 mb-3" />
          <h3 className="font-medium text-lg mb-2">No Salons Yet</h3>
          <p className="text-sm text-gray-500 mb-4">Create your first salon to get started</p>
          <Button onClick={openCreateModal}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Salon
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {salons.map(salon => (
            <Card key={salon.id}>
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span className="truncate">{salon.salon_name}</span>
                </CardTitle>
                <CardDescription>
                  {salon.location || "No location specified"}
                </CardDescription>
              </CardHeader>
              <CardContent className="py-2">
                <div className="text-sm space-y-1">
                  {salon.website && (
                    <div className="flex items-center">
                      <ExternalLink className="h-3 w-3 mr-2 text-gray-400" />
                      <a 
                        href={salon.website.startsWith('http') ? salon.website : `https://${salon.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline truncate"
                      >
                        {salon.website}
                      </a>
                    </div>
                  )}
                  {salon.about && (
                    <p className="text-gray-600 line-clamp-2">{salon.about}</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-2 flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => openEditModal(salon)}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteSalon(salon.id)}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Salon</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="salon_name">Salon Name*</Label>
              <Input
                id="salon_name"
                name="salon_name"
                value={formData.salon_name}
                onChange={handleInputChange}
                placeholder="Enter salon name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="City, State"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="about">About</Label>
              <Textarea
                id="about"
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                placeholder="Brief description of your salon"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="www.yoursalon.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  placeholder="@yoursalon"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(123) 456-7890"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateSalon}>
              Create Salon
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Salon</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit_salon_name">Salon Name*</Label>
              <Input
                id="edit_salon_name"
                name="salon_name"
                value={formData.salon_name}
                onChange={handleInputChange}
                placeholder="Enter salon name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit_location">Location</Label>
              <Input
                id="edit_location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="City, State"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit_about">About</Label>
              <Textarea
                id="edit_about"
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                placeholder="Brief description of your salon"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit_website">Website</Label>
                <Input
                  id="edit_website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="www.yoursalon.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit_instagram">Instagram</Label>
                <Input
                  id="edit_instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  placeholder="@yoursalon"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit_phone">Phone</Label>
              <Input
                id="edit_phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(123) 456-7890"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateSalon}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalonAdminPanel;
