
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, RefreshCw, BadgeDollarSign } from "lucide-react";

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendInvite: (email: string, name: string, role: string, commissionRate: string) => Promise<void>;
}

const InviteMemberModal = ({ isOpen, onClose, onSendInvite }: InviteMemberModalProps) => {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState("artist");
  const [commissionRate, setCommissionRate] = useState("60");
  const [isSending, setIsSending] = useState(false);

  const handleSendInvite = async () => {
    setIsSending(true);
    try {
      await onSendInvite(inviteEmail, inviteName, inviteRole, commissionRate);
      // Reset form
      setInviteEmail("");
      setInviteName("");
      setInviteRole("artist");
      setCommissionRate("60");
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
          
          <div className="space-y-2">
            <Label htmlFor="commissionRate" className="flex items-center">
              <BadgeDollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
              Commission Rate (%)
            </Label>
            <Input
              id="commissionRate"
              type="number"
              min="0"
              max="100"
              placeholder="60"
              value={commissionRate}
              onChange={(e) => setCommissionRate(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Percentage of service revenue the team member will receive
            </p>
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
