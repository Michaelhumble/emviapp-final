
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number | null;
}

interface ServiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  service: Partial<Service>;
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
}: ServiceFormProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Service" : "Add New Service"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Service Name</Label>
              <Input 
                id="name" 
                value={service.name || ''} 
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
                  min="1" 
                  step="0.01"
                  value={service.price === 0 ? '' : service.price} 
                  onChange={(e) => {
                    const value = e.target.value === '' ? 0 : Math.max(1, parseFloat(e.target.value));
                    onServiceChange('price', value);
                  }}
                  placeholder="45.00"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input 
                  id="duration" 
                  type="number" 
                  min="5" 
                  step="5"
                  value={service.duration || ''} 
                  onChange={(e) => onServiceChange('duration', parseInt(e.target.value))}
                  placeholder="60"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Update Service" : "Add Service"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceFormDialog;
