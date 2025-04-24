
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

interface ArtistRouteGuardProps {
  children: React.ReactNode;
}

const ArtistRouteGuard = ({ children }: ArtistRouteGuardProps) => {
  const { userRole, loading, user } = useAuth();
  const navigate = useNavigate();
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  
  // Add timeout to prevent infinite loading
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading) {
        setLoadingTimeout(true);
      }
    }, 8000); // 8 second timeout

    return () => clearTimeout(timeoutId);
  }, [loading]);
  
  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast.error("Please sign in to access your dashboard");
        navigate('/auth/signin');
        return;
      }
      
      if (userRole !== 'artist' && userRole !== 'nail technician/artist') {
        toast.error("You don't have access to the artist dashboard");
        navigate(`/dashboard/${userRole || ''}`);
        return;
      }
    }
  }, [userRole, loading, navigate, user]);
  
  if (loading && !loadingTimeout) {
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
  
  if (loadingTimeout) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="min-h-[70vh] flex items-center justify-center"
      >
        <div className="bg-white rounded-lg shadow-sm p-6 max-w-md w-full text-center">
          <h2 className="text-xl font-serif mb-3">Loading Timeout</h2>
          <p className="text-gray-600 mb-4">
            It's taking longer than expected to verify your access. This could be due to connection issues.
          </p>
          <div className="space-x-3">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Refresh Page
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </motion.div>
    );
  }
  
  if (!user || (userRole !== 'artist' && userRole !== 'nail technician/artist')) {
    return null;
  }
  
  return <>{children}</>;
};

export default ArtistRouteGuard;
