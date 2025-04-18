
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendInvite: (data: any) => Promise<void>;
}

const InviteMemberModal = ({ 
  isOpen, 
  onClose, 
  onSendInvite 
}: InviteMemberModalProps) => {
  const [memberData, setMemberData] = useState({
    full_name: '',
    email: '',
    role: 'artist'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setMemberData({ ...memberData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await onSendInvite(memberData);
      setMemberData({ full_name: '', email: '', role: 'artist' });
      onClose();
    } catch (err) {
      console.error('Error sending invite:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
          <DialogDescription>
            Add a new team member to your salon.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              autoComplete="name"
              value={memberData.full_name}
              onChange={(e) => handleInputChange('full_name', e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={memberData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Select 
              value={memberData.role}
              onValueChange={(value) => handleInputChange('role', value)}
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!memberData.full_name || !memberData.email || isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Invite'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMemberModal;
