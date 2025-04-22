
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Quote, MessageCircle } from "lucide-react";

interface PersonalMessageBannerProps {
  artistName?: string;
  customMessage?: string;
  message?: string; // Added for backward compatibility
}

const PersonalMessageBanner = ({ 
  artistName = "Artist", 
  customMessage,
  message
}: PersonalMessageBannerProps) => {
  // Use customMessage or message, falling back to a default if neither is provided
  const displayMessage = customMessage || message || `Thank you for viewing my profile! I'm passionate about delivering exceptional service and creating beautiful work that makes my clients feel confident and happy. I look forward to working with you soon!`;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden shadow-sm border-0 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="p-6 relative">
          <Quote className="absolute top-4 left-4 h-12 w-12 text-purple-200 opacity-50" />
          
          <div className="pl-4 relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <MessageCircle className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="font-medium text-lg">A Message From {artistName}</h3>
            </div>
            
            <p className="text-gray-600 italic">
              "{displayMessage}"
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PersonalMessageBanner;
