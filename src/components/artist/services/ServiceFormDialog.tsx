
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ServiceProps {
  id?: string;
  name: string;
  price: number;
  duration: number | null;
  description?: string | null;
}

interface ServiceFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceProps;
  onServiceChange: (field: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isEditing: boolean;
}

const ServiceFormDialog = ({
  isOpen,
  onClose,
  service,
  onServiceChange,
  onSubmit,
  isEditing
}: ServiceFormDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Service" : "Add New Service"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Service Name</Label>
              <Input 
                id="name" 
                value={service.name} 
                onChange={(e) => onServiceChange('name', e.target.value)}
                placeholder="e.g. Gel Full Set" 
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input 
                  id="price" 
                  type="number" 
                  min="0" 
                  step="0.01"
                  value={service.price} 
                  onChange={(e) => onServiceChange('price', parseFloat(e.target.value))}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input 
                  id="duration" 
                  type="number" 
                  min="0" 
                  step="5"
                  value={service.duration || ''} 
                  onChange={(e) => {
                    const value = e.target.value === '' ? null : parseInt(e.target.value);
                    onServiceChange('duration', value);
                  }}
                  placeholder="60"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea 
                id="description" 
                value={service.description || ''} 
                onChange={(e) => onServiceChange('description', e.target.value)}
                placeholder="Brief description of what's included in this service"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Save Changes" : "Add Service"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceFormDialog;
