import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface Service {
  id: string;
  title: string;
  description?: string | null;
  price: number;
  duration_minutes: number;
  is_visible: boolean;
}

interface ServiceFormDialogProps {
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
                value={service.title || ''} 
                onChange={(e) => onServiceChange('title', e.target.value)}
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
                  placeholder="45.00"
                  value={service.price || ''} 
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const parsedValue = inputValue === '' ? 0 : parseFloat(inputValue);
                    onServiceChange('price', parsedValue);
                  }}
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
                  value={service.duration_minutes || ''} 
                  onChange={(e) => {
                    const value = e.target.value === '' ? null : parseInt(e.target.value);
                    onServiceChange('duration_minutes', value);
                  }}
                  placeholder="60"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <textarea 
                id="description" 
                value={service.description || ''} 
                onChange={(e) => onServiceChange('description', e.target.value)}
                placeholder="Brief description of what's included in this service"
                className="w-full p-2 border rounded min-h-[80px]"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="is_visible" 
                checked={service.is_visible !== false} 
                onCheckedChange={(checked) => onServiceChange('is_visible', checked)} 
              />
              <Label htmlFor="is_visible">Visible to clients</Label>
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
