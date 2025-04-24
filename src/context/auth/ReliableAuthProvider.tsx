
import React, { createContext, useContext } from 'react';
import { useAuthSession, AuthState } from '@/hooks/useAuthSession';
import { Alert } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

const AuthContext = createContext<AuthState | undefined>(undefined);

export function ReliableAuthProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const authState = useAuthSession();

  // Show loading state during initial auth check
  if (authState.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Show error state if auth system fails
  if (authState.isError) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <p>Authentication system error. Please refresh the page or try again later.</p>
          {authState.error && (
            <p className="text-sm mt-2">{authState.error.message}</p>
          )}
        </Alert>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
}

export const useReliableAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useReliableAuth must be used within a ReliableAuthProvider');
  }
  return context;
};
