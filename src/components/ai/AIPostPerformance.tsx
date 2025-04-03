
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { BarChart3, Eye, MessageSquare, Star, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface AIPostPerformanceProps {
  className?: string;
  jobId?: string; // Optional job ID to show specific performance
  salonId?: string; // Optional salon ID to show specific performance
  isExpired?: boolean; // Whether the post is expired
}

const AIPostPerformance = ({ 
  className = "", 
  jobId,
  salonId,
  isExpired = false 
}: AIPostPerformanceProps) => {
  const { user, userRole } = useAuth();
  const [performanceData, setPerformanceData] = useState<{
    views: number;
    messages: number;
    rating: "Poor" | "Good" | "Great" | "Excellent";
  } | null>(null);

  useEffect(() => {
    if (!user || (userRole !== 'artist' && userRole !== 'salon' && userRole !== 'freelancer' && userRole !== 'vendor')) return;
    
    // In a real app, this would fetch actual analytics data from your backend
    // Here we're generating mock data for demonstration
    const generateMockData = () => {
      const views = Math.floor(Math.random() * 200) + 50;
      const messages = Math.floor(Math.random() * 10) + 1;
      
      let rating: "Poor" | "Good" | "Great" | "Excellent" = "Good";
      if (views > 200) rating = "Excellent";
      else if (views > 100) rating = "Great";
      else if (views < 70) rating = "Poor";
      
      return { views, messages, rating };
    };
    
    setPerformanceData(generateMockData());
  }, [user, userRole, jobId, salonId]);

  if (!user || !performanceData || (userRole !== 'artist' && userRole !== 'salon' && userRole !== 'freelancer' && userRole !== 'vendor')) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="border border-purple-100 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h3 className="font-medium text-sm">
              {isExpired ? "Post Performance Summary" : "Current Post Performance"}
            </h3>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 text-gray-700">
              <Eye className="h-4 w-4" />
              <span className="text-sm">{performanceData.views} views</span>
            </div>
            
            <div className="flex items-center gap-1 text-gray-700">
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm">{performanceData.messages} messages</span>
            </div>
            
            <div className="flex items-center gap-1 text-gray-700">
              <Star className="h-4 w-4 text-amber-400" />
              <span className="text-sm">
                {performanceData.rating === "Excellent" && "Excellent performance!"}
                {performanceData.rating === "Great" && "Great performance!"}
                {performanceData.rating === "Good" && "Good performance"}
                {performanceData.rating === "Poor" && "Needs improvement"}
              </span>
            </div>
          </div>
          
          {isExpired ? (
            <div className="text-xs text-gray-600 mt-2 p-2 bg-gray-50 rounded">
              <p>This post has expired. Want to repost and try a new headline?</p>
              <a 
                href={userRole === 'salon' ? "/post-job" : "/profile/artist/setup"}
                className="inline-flex items-center gap-1 text-primary mt-1 hover:underline"
              >
                Create new post <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          ) : (
            <div className="text-xs text-gray-600 mt-2">
              <p>
                {performanceData.rating === "Excellent" && "Your post is performing exceptionally well! Keep it up."}
                {performanceData.rating === "Great" && "Your post is getting great engagement. Nice work!"}
                {performanceData.rating === "Good" && "Your post is performing well. Consider adding more details."}
                {performanceData.rating === "Poor" && "Try updating your post title or adding more details."}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-primary/5 p-3 flex justify-between items-center">
          <p className="text-xs text-primary font-medium">
            AI-powered insights
          </p>
          {performanceData.rating !== "Excellent" && !isExpired && (
            <a 
              href={userRole === 'salon' ? "/post-job" : "/profile/artist/setup"} 
              className="text-xs text-primary hover:underline"
            >
              Improve post
            </a>
          )}
          {performanceData.rating === "Excellent" && !isExpired && (
            <span className="text-xs text-primary">Top performer ✨</span>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AIPostPerformance;
