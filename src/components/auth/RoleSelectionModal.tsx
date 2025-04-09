
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/context/auth/types";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import RoleSelectionCards from "./RoleSelectionCards";
import { useRoleSelection } from "./roles/useRoleSelection";

interface RoleSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

const RoleSelectionModal = ({ open, onOpenChange, userId }: RoleSelectionModalProps) => {
  const {
    selectedRole,
    setSelectedRole,
    isSubmitting,
    handleRoleSelection
  } = useRoleSelection(userId, onOpenChange);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select your role</DialogTitle>
          <DialogDescription>
            Choose how you'll use EmviApp. This helps us personalize your experience.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <RoleSelectionCards 
            selectedRole={selectedRole}
            onChange={setSelectedRole}
          />
        </div>
        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleRoleSelection}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoleSelectionModal;
