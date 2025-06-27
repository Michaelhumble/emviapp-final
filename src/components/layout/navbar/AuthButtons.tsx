
import React from "react";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/context/auth/AuthModalProvider";

const AuthButtons = () => {
  const { openModal } = useAuthModal();
  
  return (
    <>
      <Button 
        variant="ghost" 
        onClick={() => openModal('signin')}
      >
        Sign In
      </Button>
      <Button 
        onClick={() => openModal('signup')}
      >
        Sign Up
      </Button>
    </>
  );
};

export default AuthButtons;
