
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, MessageSquareX, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import ErrorLayout from "@/components/layout/ErrorLayout";
import { logRouteAccess } from "@/utils/routeChecker";

const MessageNotFound = () => {
  const location = useLocation();
  
  useEffect(() => {
    const currentPath = location.pathname;
    console.error(`Message not found: ${currentPath}`);
    logRouteAccess(currentPath);
    document.title = "Message Not Found | EmviApp";
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
        <motion.div variants={itemVariants} className="bg-purple-50 p-6 rounded-full inline-flex mb-6">
          <MessageSquareX className="h-16 w-16 text-purple-400" />
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-4xl font-bold mb-4">
          Message Not Found
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-8">
          The message or conversation you're looking for doesn't exist or has been deleted.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link to="/messages">
            <Button size="lg" className="flex items-center bg-purple-500 hover:bg-purple-600">
              <MessageSquare className="mr-2 h-4 w-4" />
              Go to Messages
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

export default MessageNotFound;
