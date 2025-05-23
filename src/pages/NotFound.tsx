
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, Home, HelpCircle, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import ErrorLayout from "@/components/layout/ErrorLayout";
import { logRouteAccess, getRouteName } from "@/utils/routeChecker";
import { useTranslation } from "@/hooks/useTranslation";

const NotFound = () => {
  const location = useLocation();
  const [attemptedPath, setAttemptedPath] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { t } = useTranslation();
  
  useEffect(() => {
    // Capture the path that was attempted
    const currentPath = location.pathname;
    setAttemptedPath(currentPath);
    
    // Log the 404 error
    console.error(
      "404 Error: User attempted to access non-existent route:",
      currentPath
    );
    logRouteAccess(currentPath);
    
    document.title = t({
      english: "Page Not Found | EmviApp",
      vietnamese: "Không tìm thấy trang | EmviApp"
    });
    
    // Generate suggestions based on the path
    generateSuggestions(currentPath);
  }, [location.pathname]);
  
  const generateSuggestions = (path: string) => {
    const suggestions: string[] = [];
    
    // Default suggestions
    if (path.includes('/profile')) {
      suggestions.push('/profile');
      suggestions.push('/dashboard');
    } else if (path.includes('/salon')) {
      suggestions.push('/salons');
      suggestions.push('/dashboard/salon');
    } else if (path.includes('/job')) {
      suggestions.push('/jobs');
      suggestions.push('/dashboard/artist');
    } else if (path.includes('/message')) {
      suggestions.push('/messages');
      suggestions.push('/dashboard');
    } else {
      suggestions.push('/');
      suggestions.push('/dashboard');
      suggestions.push('/jobs');
      suggestions.push('/salons');
    }
    
    setSuggestions(suggestions);
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
        className="max-w-md w-full"
      >
        <motion.div variants={itemVariants} className="bg-red-50 p-6 rounded-full inline-flex mb-6">
          <AlertTriangle className="h-16 w-16 text-red-500" />
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-4xl font-bold mb-4">
          {t({
            english: "Page Not Found",
            vietnamese: "Không Tìm Thấy Trang"
          })}
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-2">
          {t({
            english: "The page you're looking for doesn't exist or has been moved.",
            vietnamese: "Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển."
          })}
        </motion.p>
        
        {attemptedPath && (
          <motion.p variants={itemVariants} className="text-sm text-red-500 mb-8">
            {t({
              english: "Attempted path:",
              vietnamese: "Đường dẫn đã thử:"
            })} {attemptedPath}
          </motion.p>
        )}
        
        <motion.div variants={itemVariants} className="my-8">
          <Alert className="bg-blue-50 border-blue-100">
            <HelpCircle className="h-4 w-4 text-blue-500" />
            <AlertTitle>
              {t({
                english: "Looking for something?",
                vietnamese: "Bạn đang tìm kiếm điều gì đó?"
              })}
            </AlertTitle>
            <AlertDescription>
              {t({
                english: "Here are some pages you might be interested in:",
                vietnamese: "Dưới đây là một số trang có thể bạn quan tâm:"
              })}
              <div className="mt-3 flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <Link to={suggestion} key={index}>
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                      {getRouteName(suggestion)}
                    </Button>
                  </Link>
                ))}
              </div>
            </AlertDescription>
          </Alert>
        </motion.div>
        
        <motion.div 
          variants={itemVariants} 
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <Link to="/">
            <Button size="lg" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              {t({
                english: "Return to Home",
                vietnamese: "Quay Về Trang Chủ"
              })}
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="lg" 
            className="flex items-center"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t({
              english: "Go Back",
              vietnamese: "Quay Lại"
            })}
          </Button>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="mt-8 text-sm text-gray-400"
        >
          {t({
            english: "If you believe this is an error, please contact support.",
            vietnamese: "Nếu bạn tin rằng đây là lỗi, vui lòng liên hệ hỗ trợ."
          })}
        </motion.div>
      </motion.div>
    </ErrorLayout>
  );
};

export default NotFound;
