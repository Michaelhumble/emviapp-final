
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star, Quote, MessageSquare, User } from 'lucide-react';

// Sample testimonial data - would come from API in a real app
const testimonials = [
  {
    id: 1,
    name: 'Jessica Smith',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    rating: 5,
    date: '2 months ago',
    comment: 'Absolutely love what they did with my hair! So professional and attentive to detail. Will definitely be coming back!',
  },
  {
    id: 2,
    name: 'Michael Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 4,
    date: '3 weeks ago',
    comment: 'Great service and friendly atmosphere. The style was exactly what I wanted.',
  },
  {
    id: 3,
    name: 'Amanda Wilson',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    rating: 5,
    date: '1 month ago',
    comment: 'I've been to many stylists before, but this experience was truly exceptional. Highly recommend!',
  }
];

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex text-amber-400">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star 
          key={star} 
          className={`h-4 w-4 ${star <= rating ? 'fill-amber-400' : 'text-gray-200'}`} 
        />
      ))}
    </div>
  );
};

const ClientTestimonials = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-serif font-semibold flex items-center">
          <MessageSquare className="mr-2 h-5 w-5 text-purple-500" />
          Client Testimonials
        </h2>
        <span className="text-sm text-purple-600 font-medium">{testimonials.length} reviews</span>
      </div>
      
      <motion.div 
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {testimonials.map((testimonial) => (
          <motion.div key={testimonial.id} variants={itemVariants}>
            <Card className="overflow-hidden border-gray-100 hover:shadow-sm transition-shadow">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3 border border-gray-100">
                        {testimonial.avatar ? (
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        ) : (
                          <AvatarFallback>
                            <User className="h-5 w-5 text-gray-400" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-gray-900">{testimonial.name}</h3>
                        <p className="text-xs text-gray-500">{testimonial.date}</p>
                      </div>
                    </div>
                    <RatingStars rating={testimonial.rating} />
                  </div>
                  
                  <div className="relative pl-6 text-gray-600">
                    <Quote className="absolute left-0 top-0 h-4 w-4 text-purple-300 -translate-y-1" />
                    <p className="text-sm">{testimonial.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="text-center mt-6">
        <motion.button
          className="text-sm text-purple-600 font-medium hover:text-purple-800 hover:underline transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          See all {testimonials.length} reviews
        </motion.button>
      </div>
    </div>
  );
};

export default ClientTestimonials;
