
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReliableAuth } from '@/context/auth/ReliableAuthProvider';
import { Loader2 } from 'lucide-react';

interface ReliableAuthGuardProps {
  children: React.ReactNode;
  fallbackUrl?: string;
}

export const ReliableAuthGuard = ({ 
  children, 
  fallbackUrl = '/auth/signin'
}: ReliableAuthGuardProps) => {
  const { isLoading, user } = useReliableAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate(fallbackUrl);
    }
  }, [isLoading, user, navigate, fallbackUrl]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};
