import React from 'react';
import { Button } from "@/components/ui/button";

interface AuthMethodToggleProps {
  onToggle: () => void;
  isEmailMode: boolean;
}

export const AuthMethodToggle: React.FC<AuthMethodToggleProps> = ({ onToggle, isEmailMode }) => {
  return (
    <div className="text-center">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onToggle}
        className="text-sm text-gray-600 hover:text-gray-800 underline-offset-2 hover:underline"
      >
        {isEmailMode ? "Other ways to sign in" : "Use email instead"}
      </Button>
    </div>
  );
};