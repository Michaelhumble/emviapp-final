
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ArtistDashboardContent from './components/ArtistDashboardContent';
import { useArtistData } from './context/ArtistDataContext';

const ArtistDashboard = () => {
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const { loading } = useArtistData();

  // Add timeout to prevent infinite loading
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading) {
        setLoadingTimeout(true);
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timeoutId);
  }, [loading]);

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {loading && !loadingTimeout ? (
        <div className="max-w-5xl mx-auto py-8">
          <div className="space-y-6">
            <div className="h-48 bg-gray-100 animate-pulse rounded-xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>
              <div className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>
              <div className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>
            </div>
          </div>
        </div>
      ) : loadingTimeout ? (
        <div className="max-w-5xl mx-auto py-8 text-center">
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-md mx-auto">
            <h2 className="text-xl font-serif mb-3">Dashboard Loading Issue</h2>
            <p className="text-gray-600 mb-4">
              It's taking longer than expected to load your dashboard. This could be due to connection issues.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      ) : (
        <ArtistDashboardContent />
      )}
    </motion.div>
  );
};

export default ArtistDashboard;
