
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, RefreshCw } from "lucide-react";

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendInvite: (email: string, name: string, role: string) => Promise<void>;
}

const InviteMemberModal = ({ isOpen, onClose, onSendInvite }: InviteMemberModalProps) => {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState("artist");
  const [isSending, setIsSending] = useState(false);

  const handleSendInvite = async () => {
    setIsSending(true);
    try {
      await onSendInvite(inviteEmail, inviteName, inviteRole);
      // Reset form
      setInviteEmail("");
      setInviteName("");
      setInviteRole("artist");
      onClose();
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite New Team Member</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="inviteName">Full Name</Label>
            <Input
              id="inviteName"
              placeholder="e.g., Jane Smith"
              value={inviteName}
              onChange={(e) => setInviteName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="inviteEmail">Email Address</Label>
            <Input
              id="inviteEmail"
              type="email"
              placeholder="e.g., jane@example.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="inviteRole">Role</Label>
            <Select value={inviteRole} onValueChange={setInviteRole}>
              <SelectTrigger id="inviteRole">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="artist">Hair Artist</SelectItem>
                <SelectItem value="nail technician/artist">Nail Technician</SelectItem>
                <SelectItem value="renter">Booth Renter</SelectItem>
                <SelectItem value="stylist">Stylist</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button 
            onClick={handleSendInvite} 
            disabled={isSending || !inviteEmail || !inviteName}
          >
            {isSending ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />}
            Send Invitation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMemberModal;
