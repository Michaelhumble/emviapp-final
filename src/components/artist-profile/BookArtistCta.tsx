
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Star } from 'lucide-react';

interface BookArtistCtaProps {
  artistName: string;
  rating: number;
  onBookNow: () => void;
}

const BookArtistCta: React.FC<BookArtistCtaProps> = ({ artistName, rating, onBookNow }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
      whileHover={{ scale: 1.03 }}
      className="transition-all duration-200"
    >
      <Card className="border-0 shadow-lg overflow-hidden bg-white/95 backdrop-blur-sm">
        <CardContent className="p-5">
          <div className="flex flex-col items-center text-center mb-4">
            <h3 className="font-semibold text-lg mb-1">Book with {artistName}</h3>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              <span className="text-sm font-medium">{rating}</span>
              <span className="text-xs text-gray-500">(42 reviews)</span>
            </div>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md"
            onClick={onBookNow}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Book Now
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BookArtistCta;
