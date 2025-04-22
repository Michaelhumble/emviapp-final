
import { motion } from "framer-motion";
import { MessageSquare, Award, ThumbsUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PersonalMessageBannerProps {
  artistName?: string;
  message?: string;
}

const PersonalMessageBanner = ({ 
  artistName = "the artist", 
  message 
}: PersonalMessageBannerProps) => {
  // Default message if none is provided
  const defaultMessage = `Thank you for visiting my profile! I take pride in my work and strive to create unique, beautiful nail designs for every client. I look forward to working with you and bringing your nail visions to life!`;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 } 
    }
  };
  
  return (
    <Card className="overflow-hidden border border-purple-100 shadow-sm">
      <CardContent className="p-0">
        <motion.div 
          className="p-6 bg-gradient-to-r from-purple-50 to-pink-50"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-start">
            <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm flex-shrink-0">
              <MessageSquare className="h-6 w-6 text-purple-500" />
            </div>
            <div className="flex-1 min-w-0 sm:ml-4"> 
              <h3 className="text-lg font-medium text-gray-800 mb-2">A message from {artistName}</h3>
              <p className="text-gray-600 break-words">
                {message || defaultMessage}
              </p>
              <div className="flex flex-wrap items-center mt-4 text-sm text-gray-500">
                <div className="flex items-center mr-4 mb-2 sm:mb-0">
                  <Award className="h-4 w-4 mr-1 text-purple-500 flex-shrink-0" />
                  <span>Professional Service</span>
                </div>
                <div className="flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-1 text-purple-500 flex-shrink-0" />
                  <span>100% Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default PersonalMessageBanner;
