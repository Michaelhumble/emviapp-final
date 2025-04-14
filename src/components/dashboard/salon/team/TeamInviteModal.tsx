
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSalon } from "@/context/salon";

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendInvite: (email: string, name: string, role: string, commissionRate: string) => Promise<void>;
}

const TeamInviteModal = ({ isOpen, onClose, onSendInvite }: InviteMemberModalProps) => {
  const { currentSalon } = useSalon();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("stylist");
  const [commissionRate, setCommissionRate] = useState("60");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    if (!name.trim()) {
      toast.error("Please enter the team member's name");
      return;
    }
    
    if (!currentSalon?.id) {
      toast.error("No salon selected");
      return;
    }
    
    try {
      setIsSubmitting(true);
      await onSendInvite(email, name, role, commissionRate);
      
      // Reset form
      setEmail("");
      setName("");
      setRole("stylist");
      setCommissionRate("60");
      
      onClose();
    } catch (err) {
      console.error("Failed to send invite:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
          <DialogDescription>
            Send an invitation to a new team member to join your salon.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter team member's name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stylist">Hair Stylist</SelectItem>
                <SelectItem value="artist">Hair Artist</SelectItem>
                <SelectItem value="nail technician/artist">Nail Technician</SelectItem>
                <SelectItem value="renter">Booth Renter</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="commission">Commission Rate (%)</Label>
            <Input
              id="commission"
              type="number"
              min="0"
              max="100"
              placeholder="60"
              value={commissionRate}
              onChange={(e) => setCommissionRate(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              The percentage of service revenue the team member will receive
            </p>
          </div>
        </div>
        
        <DialogFooter className="flex space-x-2 sm:justify-end">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Invitation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TeamInviteModal;
