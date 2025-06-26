
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import RoleSelectionCards from "./RoleSelectionCards";
import { UserRole } from "@/context/auth/types";

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRoleSelect: (role: UserRole) => void;
  userId?: string;
}

export const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({
  isOpen,
  onClose,
  onRoleSelect,
  userId
}) => {
  return (
    <>
      <div style={{ 
        backgroundColor: '#E0FFFF', 
        color: '#008B8B', 
        padding: '8px', 
        marginBottom: '10px', 
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: '4px',
        border: '2px solid #00CED1'
      }}>
        🔷 ROLE MODAL: src/components/auth/RoleSelectionModal.tsx
      </div>
      
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Choose Your Role
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <RoleSelectionCards
              selectedRole="customer"
              onRoleSelect={(role) => {
                onRoleSelect(role);
                onClose();
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RoleSelectionModal;
