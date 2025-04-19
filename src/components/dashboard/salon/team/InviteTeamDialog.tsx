
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Check } from "lucide-react";
import { useTeamInvites } from "./hooks/useTeamInvites";
import { toast } from "sonner";

interface InviteTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteTeamDialog({ open, onOpenChange }: InviteTeamDialogProps) {
  const { createInvite, isLoading } = useTeamInvites();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("artist");
  const [inviteMessage, setInviteMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const invite = await createInvite({
      phone_number: phoneNumber,
      role
    });

    if (invite && invite.invite_code) {
      const message = `Hey! Join our salon on EmviApp: https://emvi.app/invite/${invite.invite_code}`;
      setInviteMessage(message);
      toast.success("Invite created successfully!");
    }
  };

  const handleCopyMessage = async () => {
    if (inviteMessage) {
      await navigator.clipboard.writeText(inviteMessage);
      setCopied(true);
      toast.success("Message copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    setPhoneNumber("");
    setRole("artist");
    setInviteMessage(null);
    setCopied(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
          <DialogDescription>
            Create an invite link to share with your team member.
          </DialogDescription>
        </DialogHeader>

        {!inviteMessage ? (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 555-5555"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="artist">Artist</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="receptionist">Receptionist</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Invite"}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="space-y-4 py-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm">{inviteMessage}</p>
            </div>
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
              >
                Done
              </Button>
              <Button 
                type="button"
                onClick={handleCopyMessage}
                className="gap-2"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy Message"}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
