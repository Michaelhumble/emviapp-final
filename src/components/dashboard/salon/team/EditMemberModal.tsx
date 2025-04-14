
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TeamMember } from "./types";

interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: TeamMember) => Promise<void>;
  member: TeamMember | null;
}

const EditMemberModal = ({ isOpen, onClose, onSave, member }: EditMemberModalProps) => {
  const [editedMember, setEditedMember] = useState<TeamMember | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update local state when member prop changes
  useEffect(() => {
    if (member) {
      setEditedMember({ ...member });
    }
  }, [member]);

  if (!editedMember) return null;

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await onSave(editedMember);
      onClose();
    } catch (err) {
      console.error("Failed to update team member:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Team Member</DialogTitle>
          <DialogDescription>
            Update team member information and settings.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Full Name</Label>
            <Input
              id="edit-name"
              value={editedMember.full_name}
              onChange={(e) =>
                setEditedMember({ ...editedMember, full_name: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-email">Email Address</Label>
            <Input
              id="edit-email"
              type="email"
              value={editedMember.email}
              onChange={(e) =>
                setEditedMember({ ...editedMember, email: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-role">Role</Label>
            <Select
              value={editedMember.role}
              onValueChange={(value) =>
                setEditedMember({ ...editedMember, role: value })
              }
            >
              <SelectTrigger id="edit-role">
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
            <Label htmlFor="edit-commission">Commission Rate (%)</Label>
            <Input
              id="edit-commission"
              type="number"
              min="0"
              max="100"
              value={editedMember.commission_rate || ""}
              onChange={(e) =>
                setEditedMember({
                  ...editedMember,
                  commission_rate: e.target.value ? Number(e.target.value) : undefined,
                })
              }
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
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditMemberModal;
