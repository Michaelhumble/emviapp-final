
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import RoleSelectionList from "./roles/RoleSelectionList";
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
          <DialogTitle className="text-2xl font-serif">Welcome to EmviApp!</DialogTitle>
          <DialogDescription className="space-y-2">
            <p>Tell us how you'd like to use the platform so we can personalize your experience.</p>
            <p className="text-indigo-600 font-medium text-sm">Bạn làm gì trong ngành làm đẹp?</p>
          </DialogDescription>
        </DialogHeader>
        
        <RoleSelectionList 
          selectedRole={selectedRole} 
          onRoleSelect={setSelectedRole} 
        />
        
        <div className="flex justify-end">
          <Button 
            onClick={handleRoleSelection}
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Setting up...
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
