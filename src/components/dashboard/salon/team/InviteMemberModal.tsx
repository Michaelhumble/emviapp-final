
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendInvite: (data: any) => Promise<void>;
}

const InviteMemberModal = ({ isOpen, onClose, onSendInvite }: InviteMemberModalProps) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    role: "artist",
    specialty: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.full_name) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onSendInvite(formData);
      setFormData({
        full_name: "",
        email: "",
        role: "artist",
        specialty: ""
      });
      onClose();
    } catch (error) {
      console.error("Error sending invite:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => handleSelectChange("role", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="artist">Artist</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="receptionist">Receptionist</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="specialty">Specialty (Optional)</Label>
            <Input
              id="specialty"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              placeholder="e.g. Nail Art, Hair Coloring"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || !formData.email || !formData.full_name}>
            {isSubmitting ? "Sending..." : "Send Invite"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMemberModal;
