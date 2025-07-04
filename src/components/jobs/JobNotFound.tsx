
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Home, Search, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import ErrorLayout from "@/components/layout/ErrorLayout";

const JobNotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const currentPath = location.pathname;
    console.error(`Job not found: ${currentPath}`);
    document.title = "Job Not Found | EmviApp";
  }, [location.pathname]);

  const goBack = () => {
    navigate(-1);
  };

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
        className="text-center"
      >
        <motion.div variants={itemVariants} className="bg-blue-50 p-6 rounded-full inline-flex mb-6">
          <Briefcase className="h-16 w-16 text-blue-400" />
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-4xl font-bold mb-4">
          Job Not Found
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-8">
          We couldn't find the job you're looking for. It may have been removed or the URL might be incorrect.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button variant="outline" size="lg" className="flex items-center" onClick={goBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          
          <Link to="/jobs">
            <Button size="lg" className="flex items-center bg-blue-500 hover:bg-blue-600">
              <Search className="mr-2 h-4 w-4" />
              Browse Jobs
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

export default JobNotFound;
