
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import ArtistDashboardHeader from '@/components/dashboard/artist/ArtistDashboardHeader';
import RoleDashboardLayout from '@/components/dashboard/RoleDashboardLayout';
import ServiceList from '@/components/dashboard/artist/services/ServiceList';
import ArtistPortfolioGallery from '@/components/artist/portfolio/ArtistPortfolioGallery';
import { useAuth } from '@/context/auth';

const ArtistDashboard = () => {
  const { userProfile, loading } = useAuth();
  
  // Mock data - to be replaced with actual data
  const services = [
    { id: '1', name: 'Basic Manicure', price: 35, duration: 45 },
    { id: '2', name: 'Gel Polish', price: 45, duration: 60 },
    { id: '3', name: 'Full Set Acrylic', price: 70, duration: 90 },
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  // Sample handlers
  const handleEditService = (service: any) => console.log('Edit:', service);
  const handleDeleteService = (id: string) => console.log('Delete:', id);
  
  return (
    <RoleDashboardLayout>
      <Helmet>
        <title>Artist Dashboard | EmviApp</title>
      </Helmet>
      
      <motion.div 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <ArtistDashboardHeader profile={userProfile} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <h2 className="text-xl font-serif mb-4">My Services</h2>
            <ServiceList 
              services={services} 
              onEditService={handleEditService} 
              onDeleteService={handleDeleteService} 
            />
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ArtistPortfolioGallery />
        </motion.div>
      </motion.div>
    </RoleDashboardLayout>
  );
};

export default ArtistDashboard;
