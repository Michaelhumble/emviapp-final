
import React from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { signOut } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/30 backdrop-blur">
      <aside className="relative w-[85vw] max-w-[400px] h-full bg-white rounded-l-3xl flex flex-col items-center justify-center p-6 shadow-2xl">
        <div className="flex flex-col items-center space-y-6">
          <Logo size="large" />
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            Customer Mobile Menu — Under Construction
          </h2>
          <Button 
            onClick={signOut} 
            className="bg-red-500 text-white font-bold shadow rounded-xl hover:bg-red-600"
          >
            <LogOut className="w-5 h-5 mr-2" /> Sign Out
          </Button>
        </div>
      </aside>
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};

export default MobileMenu;
