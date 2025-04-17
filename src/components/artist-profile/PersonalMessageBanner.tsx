
import { motion } from "framer-motion";
import { MessageSquare, Award, ThumbsUp } from "lucide-react";

interface PersonalMessageBannerProps {
  artistName?: string;
}

const PersonalMessageBanner = ({ artistName }: PersonalMessageBannerProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-xl overflow-hidden border border-purple-100 shadow-sm bg-gradient-to-r from-purple-50 to-pink-50"
    >
      <div className="p-6">
        <div className="flex items-start">
          <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-white mr-4 shadow-sm flex-shrink-0">
            <MessageSquare className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">A message from {artistName || "the artist"}</h3>
            <p className="text-gray-600">
              Thank you for visiting my profile! I take pride in my work and strive to create unique, beautiful nail designs for every client. I look forward to working with you and bringing your nail visions to life!
            </p>
            <div className="flex items-center mt-4 text-sm text-gray-500">
              <div className="flex items-center mr-4">
                <Award className="h-4 w-4 mr-1 text-purple-500" />
                <span>Professional Service</span>
              </div>
              <div className="flex items-center">
                <ThumbsUp className="h-4 w-4 mr-1 text-purple-500" />
                <span>100% Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PersonalMessageBanner;
