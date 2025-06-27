
import React from "react";
import { useAuth } from "@/context/auth";
import { useAuthModal } from "@/context/auth/AuthModalProvider";
import { useNavigate } from "react-router-dom";

interface AuthActionProps {
  children?: React.ReactNode;
  onAction?: () => Promise<boolean> | boolean;
  redirectPath?: string;
  authenticatedContent?: React.ReactNode;
  fallbackContent?: React.ReactNode;
  authMode?: 'signin' | 'signup';
  customTitle?: string;
  creditMessage?: string;
}

const AuthAction: React.FC<AuthActionProps> = ({ 
  children, 
  onAction,
  redirectPath,
  authenticatedContent,
  fallbackContent,
  authMode = 'signup',
  customTitle,
  creditMessage
}) => {
  const { isSignedIn } = useAuth();
  const { openModal } = useAuthModal();
  const navigate = useNavigate();

  const handleAction = async () => {
    if (isSignedIn) {
      if (onAction) {
        const result = await onAction();
        if (redirectPath && result) {
          navigate(redirectPath);
        }
      } else if (redirectPath) {
        navigate(redirectPath);
      }
    } else {
      openModal(authMode);
    }
  };

  // If authenticated content is provided and user is signed in, render that instead
  if (isSignedIn && authenticatedContent) {
    return <>{authenticatedContent}</>;
  }

  // If fallback content is provided and user is not signed in, render that with click handler
  if (!isSignedIn && fallbackContent) {
    return (
      <div onClick={handleAction} className="cursor-pointer">
        {fallbackContent}
      </div>
    );
  }

  return (
    <div onClick={handleAction} className="cursor-pointer">
      {children || null}
    </div>
  );
};

export default AuthAction;
