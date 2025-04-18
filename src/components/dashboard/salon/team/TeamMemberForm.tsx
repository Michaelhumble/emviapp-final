
import { useState, useEffect } from "react";
import { SalonTeamMember } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface TeamMemberFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<SalonTeamMember>) => Promise<void>;
  initialData: SalonTeamMember | null;
}

const TeamMemberForm = ({ open, onClose, onSubmit, initialData }: TeamMemberFormProps) => {
  const [formData, setFormData] = useState<Partial<SalonTeamMember>>({
    full_name: '',
    email: '',
    role: 'artist',
    specialty: '',
    status: 'active',
    commission_rate: 50, // Default commission rate
  });
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        full_name: initialData.full_name,
        email: initialData.email,
        role: initialData.role,
        specialty: initialData.specialty,
        status: initialData.status,
        commission_rate: initialData.commission_rate || 50,
      });
    } else {
      setFormData({
        full_name: '',
        email: '',
        role: 'artist',
        specialty: '',
        status: 'active',
        commission_rate: 50,
      });
    }
    setFormErrors({});
  }, [initialData, open]);

  const handleChange = (field: keyof Partial<SalonTeamMember>, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when field is edited
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.full_name?.trim()) {
      errors.full_name = 'Name is required';
    }
    
    if (!formData.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (formData.commission_rate !== undefined) {
      if (formData.commission_rate < 0 || formData.commission_rate > 100) {
        errors.commission_rate = 'Commission must be between 0-100%';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Failed to save team member:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
          <DialogDescription>
            {initialData 
              ? 'Update the team member details below.' 
              : 'Add a new team member to your salon.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
            <Input
              id="name"
              value={formData.full_name || ''}
              onChange={(e) => handleChange('full_name', e.target.value)}
              placeholder="John Doe"
              className={formErrors.full_name ? "border-red-500" : ""}
            />
            {formErrors.full_name && (
              <p className="text-red-500 text-xs">{formErrors.full_name}</p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="john@example.com"
              className={formErrors.email ? "border-red-500" : ""}
            />
            {formErrors.email && (
              <p className="text-red-500 text-xs">{formErrors.email}</p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="role">Role <span className="text-red-500">*</span></Label>
            <Select
              value={formData.role}
              onValueChange={(value) => handleChange('role', value)}
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="artist">Artist</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="receptionist">Receptionist</SelectItem>
                <SelectItem value="assistant">Assistant</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="commission">Commission Rate (%)</Label>
            <Input
              id="commission"
              type="number"
              min="0"
              max="100"
              value={formData.commission_rate || ''}
              onChange={(e) => handleChange('commission_rate', parseFloat(e.target.value))}
              placeholder="50"
              className={formErrors.commission_rate ? "border-red-500" : ""}
            />
            {formErrors.commission_rate && (
              <p className="text-red-500 text-xs">{formErrors.commission_rate}</p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="specialty">Specialty</Label>
            <Input
              id="specialty"
              value={formData.specialty || ''}
              onChange={(e) => handleChange('specialty', e.target.value)}
              placeholder="e.g., Nail Art, Pedicure, Manicure"
            />
          </div>
          
          {initialData && (
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: 'active' | 'inactive' | 'pending') => 
                  handleChange('status', value)
                }
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            disabled={loading}
          >
            {loading ? 'Saving...' : initialData ? 'Update' : 'Add Member'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TeamMemberForm;
