
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, Heart } from 'lucide-react';

const ArtistTestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Linh Nguyen",
      avatar: "/lovable-uploads/f7ba1d82-2928-4e73-a61b-112e5aaf5b7e.png",
      rating: 5,
      text: "Absolutely stunning work! My nails have never looked this beautiful. The attention to detail is incredible and everyone keeps asking where I got them done!",
      service: "Gel Manicure & Art",
      date: "3 days ago"
    },
    {
      id: 2,
      name: "Hương Trần", 
      avatar: "/lovable-uploads/f3f2a5ae-65d9-4442-8842-1cb9e26cdb56.png",
      rating: 5,
      text: "Professional, friendly, and incredibly talented! I've been coming here for months and the quality is always exceptional. Highly recommend!",
      service: "Full Set Acrylics",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Mai Phạm",
      avatar: "/lovable-uploads/fc2a8931-d58f-47a3-81f2-6ae43cf431c5.png", 
      rating: 5,
      text: "Best nail artist in the city! Always exceeds my expectations with creative designs. My nails are works of art that last for weeks!",
      service: "French Ombré",
      date: "2 weeks ago"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl lg:text-3xl font-playfair font-bold text-gray-900 mb-2">Client Love 💕</h2>
        <p className="text-lg text-gray-600 font-inter">What your amazing clients are saying</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/50 shadow-xl overflow-hidden">
        <div className="relative h-80 lg:h-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 p-8"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 shadow-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-playfair font-semibold text-gray-900 text-lg">
                      {testimonials[currentIndex].name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonials[currentIndex].rating
                                ? 'text-yellow-500 fill-yellow-500'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 font-inter">
                        {testimonials[currentIndex].date}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 relative">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-gray-200 rotate-180" />
                  <p className="text-gray-700 font-inter leading-relaxed text-lg pl-6 pr-6">
                    {testimonials[currentIndex].text}
                  </p>
                  <Quote className="absolute -bottom-2 -right-2 h-8 w-8 text-gray-200" />
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/50 px-4 py-2 rounded-full">
                    <span className="text-sm text-purple-700 font-inter font-medium">
                      Service: {testimonials[currentIndex].service}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={prevTestimonial}
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors shadow-md hover:shadow-lg"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-600" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={nextTestimonial}
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors shadow-md hover:shadow-lg"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-600" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-3 p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200/50">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.3 }}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Share CTA */}
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-t border-rose-200/50 p-6 text-center">
          <p className="text-gray-700 font-inter mb-3">
            💖 <strong>Love from your clients!</strong> Share these amazing reviews to attract more bookings.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-inter font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <Heart className="h-4 w-4" />
            Share Reviews
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ArtistTestimonialCarousel;
