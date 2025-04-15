
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';

interface ServiceFormData {
  title: string;
  description: string;
  price: number;
  duration_minutes: number;
  is_visible: boolean;
}

interface ServiceFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  service: Partial<ServiceFormData>;
  onServiceChange: (field: keyof ServiceFormData, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isEditing: boolean;
  isSaving?: boolean;
}

const ServiceFormDialog: React.FC<ServiceFormDialogProps> = ({
  isOpen,
  onClose,
  service,
  onServiceChange,
  onSubmit,
  isEditing,
  isSaving = false
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Service' : 'Add New Service'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Service Name*</Label>
              <Input 
                id="title" 
                value={service.title || ''} 
                onChange={(e) => onServiceChange('title', e.target.value)}
                placeholder="e.g. Full Set Acrylic" 
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                value={service.description || ''} 
                onChange={(e) => onServiceChange('description', e.target.value)}
                placeholder="Describe what's included in this service"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)*</Label>
                <Input 
                  id="price" 
                  type="number" 
                  min="0" 
                  step="0.01"
                  value={service.price || ''} 
                  onChange={(e) => onServiceChange('price', parseFloat(e.target.value))}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration (minutes)*</Label>
                <Input 
                  id="duration" 
                  type="number" 
                  min="5" 
                  step="5"
                  value={service.duration_minutes || ''} 
                  onChange={(e) => onServiceChange('duration_minutes', parseInt(e.target.value))}
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="is_visible" 
                checked={service.is_visible !== false} // Default to true
                onCheckedChange={(checked) => onServiceChange('is_visible', checked)}
              />
              <Label htmlFor="is_visible">Visible to clients</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? 'Updating...' : 'Saving...'}
                </>
              ) : (
                isEditing ? 'Update Service' : 'Save Service'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceFormDialog;
