
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInvitedStatus } from "@/hooks/useInvitedStatus";
import { useAuth } from "@/context/auth";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface InviteGuardProps {
  children: React.ReactNode;
}

const InviteGuard: React.FC<InviteGuardProps> = ({ children }) => {
  const { isInvited, loading: inviteLoading } = useInvitedStatus();
  const { isSignedIn, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only check invited status after both auth and invite status are loaded
    if (!authLoading && !inviteLoading) {
      // If user is signed in but not invited
      if (isSignedIn && isInvited === false) {
        toast.error("Your account doesn't have access to the beta yet.");
        navigate("/early-access");
      }
    }
  }, [isSignedIn, isInvited, authLoading, inviteLoading, navigate]);

  // Show loading state
  if (authLoading || inviteLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-12">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-gray-600">Verifying access...</p>
      </div>
    );
  }

  // If not signed in, let auth flow handle it normally
  // If signed in and invited, show children
  return <>{children}</>;
};

export default InviteGuard;
