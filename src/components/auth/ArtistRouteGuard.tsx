
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

interface ArtistRouteGuardProps {
  children: React.ReactNode;
}

const ArtistRouteGuard = ({ children }: ArtistRouteGuardProps) => {
  const { userRole, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading) {
      if (!userRole) {
        toast.error("Please sign in to access your dashboard");
        navigate('/auth/signin');
        return;
      }
      
      if (userRole !== 'artist' && userRole !== 'nail technician/artist') {
        toast.error("You don't have access to the artist dashboard");
        navigate(`/dashboard/${userRole}`);
        return;
      }
    }
  }, [userRole, loading, navigate]);
  
  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="min-h-[70vh] flex items-center justify-center"
      >
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600 font-light">Verifying access...</p>
        </div>
      </motion.div>
    );
  }
  
  if (!userRole || (userRole !== 'artist' && userRole !== 'nail technician/artist')) {
    return null;
  }
  
  return <>{children}</>;
};

export default ArtistRouteGuard;
