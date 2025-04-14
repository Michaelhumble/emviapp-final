
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { checkIfUserIsInvited } from "@/services/auth";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requiresAuth?: boolean;
  blurContent?: boolean;
}

const AuthGuard = ({ 
  children, 
  fallback, 
  requiresAuth = true,
  blurContent = false
}: AuthGuardProps) => {
  const { user, loading, isSignedIn } = useAuth();
  const [isInvited, setIsInvited] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkInvitation() {
      if (user) {
        const invited = await checkIfUserIsInvited(user.id);
        setIsInvited(invited);
      }
      setChecking(false);
    }

    if (!loading) {
      checkInvitation();
    }
  }, [user, loading]);

  // If not requiring auth and just using as a conditional wrapper
  if (!requiresAuth) {
    // If user is signed in, show the children
    if (isSignedIn) {
      return <>{children}</>;
    }
    // If fallback is provided, show that instead
    if (fallback) {
      return <>{fallback}</>;
    }
    // Default behavior is to show nothing
    return null;
  }

  // While loading auth state or checking invitation, show nothing
  if (loading || checking) {
    return <div>Loading...</div>;
  }

  // Not logged in, redirect to sign-in
  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }

  // User is logged in but not invited
  if (isInvited === false) {
    return <Navigate to="/early-access" replace />;
  }

  // User is logged in and invited
  return <>{children}</>;
};

export default AuthGuard;
