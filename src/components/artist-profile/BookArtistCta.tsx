
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Star, ArrowRight } from "lucide-react";
import { useState } from "react";

interface BookArtistCtaProps {
  artistName: string;
  rating: number;
  onBookNow: () => void;
}

const BookArtistCta = ({ artistName, rating, onBookNow }: BookArtistCtaProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl overflow-hidden border border-purple-100 shadow-sm"
    >
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 px-6 py-5 border-b border-purple-200">
        <h3 className="text-lg font-medium text-purple-900">Book with {artistName}</h3>
        <div className="flex items-center mt-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="bg-white p-6">
        <div className="space-y-4 mb-5">
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900">Flexible Scheduling</h4>
              <p className="text-sm text-gray-500">Book appointments that work with your schedule</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900">Quick Response</h4>
              <p className="text-sm text-gray-500">Usually responds within 2 hours</p>
            </div>
          </div>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <Button 
            onClick={onBookNow}
            className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <span className="mr-2">Book Now</span>
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BookArtistCta;
