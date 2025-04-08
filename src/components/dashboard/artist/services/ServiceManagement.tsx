
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const ServiceManagement = () => {
  const { t } = useTranslation();
  const { user, userProfile, refreshUserProfile } = useAuth();
  const [services, setServices] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newService, setNewService] = useState("");
  const [editingService, setEditingService] = useState({ index: -1, value: "" });
  const [deletingIndex, setDeletingIndex] = useState(-1);

  // Load services from user profile
  useEffect(() => {
    if (userProfile) {
      setServices(userProfile.skills || []);
      setIsLoading(false);
    }
  }, [userProfile]);

  // Save services to Supabase
  const saveServicesToSupabase = async (updatedServices: string[]) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from("users")
        .update({ 
          skills: updatedServices,
          updated_at: new Date().toISOString()
        })
        .eq("id", user.id);
        
      if (error) throw error;
      
      // Refresh user profile to get updated data
      await refreshUserProfile();
      
    } catch (error) {
      console.error("Error saving services:", error);
      toast.error("Failed to save services. Please try again.");
    }
  };

  // Add a new service
  const handleAddService = async () => {
    if (!newService.trim()) {
      toast.error("Service name cannot be empty");
      return;
    }
    
    const updatedServices = [...services, newService.trim()];
    setServices(updatedServices);
    await saveServicesToSupabase(updatedServices);
    
    setNewService("");
    setShowAddDialog(false);
    toast.success("Service added successfully!");
  };

  // Edit a service
  const handleEditService = async () => {
    if (!editingService.value.trim()) {
      toast.error("Service name cannot be empty");
      return;
    }
    
    if (editingService.index >= 0) {
      const updatedServices = [...services];
      updatedServices[editingService.index] = editingService.value.trim();
      
      setServices(updatedServices);
      await saveServicesToSupabase(updatedServices);
      
      setShowEditDialog(false);
      toast.success("Service updated successfully!");
    }
  };

  // Delete a service
  const handleDeleteService = async () => {
    if (deletingIndex >= 0) {
      const updatedServices = services.filter((_, i) => i !== deletingIndex);
      
      setServices(updatedServices);
      await saveServicesToSupabase(updatedServices);
      
      setShowDeleteDialog(false);
      toast.success("Service removed successfully!");
    }
  };

  // Open edit dialog
  const openEditDialog = (index: number) => {
    setEditingService({ index, value: services[index] });
    setShowEditDialog(true);
  };

  // Open delete dialog
  const openDeleteDialog = (index: number) => {
    setDeletingIndex(index);
    setShowDeleteDialog(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-serif">
            {t({
              english: "Services You Offer",
              vietnamese: "Dịch Vụ Bạn Cung Cấp"
            })}
          </CardTitle>
          <CardDescription>
            {t({
              english: "Let salons and clients know exactly what you offer",
              vietnamese: "Cho khách hàng và chủ tiệm biết bạn đang làm dịch vụ gì"
            })}
          </CardDescription>
        </div>
        <Button 
          onClick={() => setShowAddDialog(true)}
          size="sm"
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          {t({
            english: "Add New Service",
            vietnamese: "Thêm Dịch Vụ Mới"
          })}
        </Button>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-8 bg-gray-100 animate-pulse rounded-full w-1/3"></div>
            <div className="h-8 bg-gray-100 animate-pulse rounded-full w-1/2"></div>
            <div className="h-8 bg-gray-100 animate-pulse rounded-full w-1/4"></div>
          </div>
        ) : services.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {services.map((service, index) => (
                <motion.div
                  key={`${service}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="group relative"
                >
                  <div className="px-3 py-1.5 rounded-full bg-[#9A7B69]/10 text-[#9A7B69] border border-[#9A7B69]/20 flex items-center">
                    <span>{service}</span>
                    <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                      <button 
                        onClick={() => openEditDialog(index)}
                        className="text-[#9A7B69] hover:text-[#9A7B69]/70 p-1 rounded-full"
                      >
                        <Edit2 className="h-3 w-3" />
                      </button>
                      <button 
                        onClick={() => openDeleteDialog(index)}
                        className="text-red-500 hover:text-red-400 p-1 rounded-full"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-8 px-4">
            <div className="w-16 h-16 mx-auto bg-[#9A7B69]/10 rounded-full flex items-center justify-center mb-4">
              <Plus className="h-8 w-8 text-[#9A7B69]" />
            </div>
            <h3 className="text-lg font-medium mb-2">
              {t({
                english: "No services added yet",
                vietnamese: "Chưa có dịch vụ nào"
              })}
            </h3>
            <p className="text-gray-500 mb-4 max-w-md mx-auto">
              {t({
                english: "Let salons and clients know exactly what you offer.",
                vietnamese: "Cho khách hàng và chủ tiệm biết bạn đang làm dịch vụ gì."
              })}
            </p>
            <Button 
              onClick={() => setShowAddDialog(true)}
              variant="outline"
              className="border-[#9A7B69]/30 text-[#9A7B69] hover:bg-[#9A7B69]/10"
            >
              <Plus className="h-4 w-4 mr-1" />
              {t({
                english: "Add New Service",
                vietnamese: "Thêm Dịch Vụ Mới"
              })}
            </Button>
          </div>
        )}
      </CardContent>

      {/* Add Service Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {t({
                english: "Add New Service",
                vietnamese: "Thêm Dịch Vụ Mới"
              })}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-service">
                {t({
                  english: "Service Name",
                  vietnamese: "Tên Dịch Vụ"
                })}
              </Label>
              <Input
                id="new-service"
                placeholder={t({
                  english: "e.g. Acrylic Nails, Gel-X, Microblading",
                  vietnamese: "Ví dụ: Làm Móng Acrylic, Gel-X, Xăm Lông Mày"
                })}
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              {t({
                english: "Cancel",
                vietnamese: "Hủy"
              })}
            </Button>
            <Button onClick={handleAddService}>
              {t({
                english: "Add Service",
                vietnamese: "Thêm Dịch Vụ"
              })}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Service Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {t({
                english: "Edit Service",
                vietnamese: "Chỉnh Sửa Dịch Vụ"
              })}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-service">
                {t({
                  english: "Service Name",
                  vietnamese: "Tên Dịch Vụ"
                })}
              </Label>
              <Input
                id="edit-service"
                value={editingService.value}
                onChange={(e) => setEditingService({ ...editingService, value: e.target.value })}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              {t({
                english: "Cancel",
                vietnamese: "Hủy"
              })}
            </Button>
            <Button onClick={handleEditService}>
              {t({
                english: "Save Changes",
                vietnamese: "Lưu Thay Đổi"
              })}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t({
                english: "Are you sure?",
                vietnamese: "Bạn có chắc chắn không?"
              })}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t({
                english: "This will remove the service from your profile. This action cannot be undone.",
                vietnamese: "Điều này sẽ xóa dịch vụ khỏi hồ sơ của bạn. Hành động này không thể hoàn tác."
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {t({
                english: "Cancel",
                vietnamese: "Hủy"
              })}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteService} className="bg-red-600 hover:bg-red-700">
              {t({
                english: "Delete",
                vietnamese: "Xóa"
              })}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default ServiceManagement;
