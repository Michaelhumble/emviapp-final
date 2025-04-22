
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ArtistDashboardLayoutProps {
  children: ReactNode;
}

const ArtistDashboardLayout = ({ children }: ArtistDashboardLayoutProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </motion.div>
  );
};

export default ArtistDashboardLayout;
