
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UserRole } from "@/context/auth/types";
import { useAuth } from "@/context/auth";
import { navigateToRoleDashboard } from "@/utils/navigation";
import { useNavigate } from "react-router-dom";
import RoleSelectionCards from "./RoleSelectionCards";

interface RoleSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

const RoleSelectionModal = ({ open, onOpenChange, userId }: RoleSelectionModalProps) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateUserRole } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!selectedRole) {
      toast.error("Please select a role");
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("UNIFIED ROLE: Setting role in auth metadata only:", selectedRole);
      
      // REFACTOR: Only update auth metadata - removed database and localStorage updates
      // Single source of truth: Supabase auth metadata
      await updateUserRole(selectedRole);
      
      toast.success("Role selected successfully!");
      onOpenChange(false);
      
      // Navigate to appropriate dashboard
      setTimeout(() => {
        navigateToRoleDashboard(navigate, selectedRole);
      }, 500);
      
    } catch (error) {
      console.error("Error setting user role:", error);
      toast.error("Failed to set role. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Choose Your Role
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <RoleSelectionCards
            selectedRole={selectedRole}
            onRoleSelect={setSelectedRole}
          />
          
          <div className="flex justify-center">
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8"
            >
              {isSubmitting ? "Setting up..." : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoleSelectionModal;
