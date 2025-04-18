
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
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        full_name: initialData.full_name,
        email: initialData.email,
        role: initialData.role,
        specialty: initialData.specialty,
        status: initialData.status,
      });
    } else {
      setFormData({
        full_name: '',
        email: '',
        role: 'artist',
        specialty: '',
        status: 'active',
      });
    }
  }, [initialData, open]);

  const handleChange = (field: keyof Partial<SalonTeamMember>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
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
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.full_name}
              onChange={(e) => handleChange('full_name', e.target.value)}
              placeholder="John Doe"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="john@example.com"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
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
            <Label htmlFor="specialty">Specialty</Label>
            <Input
              id="specialty"
              value={formData.specialty}
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
            disabled={loading || !formData.full_name || !formData.email}
          >
            {loading ? 'Saving...' : initialData ? 'Update' : 'Add Member'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TeamMemberForm;
