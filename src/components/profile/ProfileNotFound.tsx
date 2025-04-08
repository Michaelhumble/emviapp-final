
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, UserX, Users, Search } from "lucide-react";
import { motion } from "framer-motion";
import ErrorLayout from "@/components/layout/ErrorLayout";
import { logRouteAccess } from "@/utils/routeChecker";

const ProfileNotFound = () => {
  const location = useLocation();
  
  useEffect(() => {
    const currentPath = location.pathname;
    console.error(`Profile not found: ${currentPath}`);
    logRouteAccess(currentPath);
    document.title = "Profile Not Found | EmviApp";
  }, [location.pathname]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <ErrorLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="bg-blue-50 p-6 rounded-full inline-flex mb-6">
          <UserX className="h-16 w-16 text-blue-400" />
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-4xl font-bold mb-4">
          Profile Not Found
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-8">
          The user profile you're looking for doesn't exist or has been removed.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link to="/jobs">
            <Button size="lg" className="flex items-center bg-blue-500 hover:bg-blue-600">
              <Users className="mr-2 h-4 w-4" />
              Browse Profiles
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" size="lg" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Return to Homepage
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </ErrorLayout>
  );
};

export default ProfileNotFound;
