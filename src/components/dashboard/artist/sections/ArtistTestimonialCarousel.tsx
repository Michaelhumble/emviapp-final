
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const ArtistTestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Emma Johnson",
      avatar: "/lovable-uploads/f7ba1d82-2928-4e73-a61b-112e5aaf5b7e.png",
      rating: 5,
      text: "Absolutely amazing work! My nails have never looked better. The attention to detail is incredible.",
      service: "Gel Manicure",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Lisa Chen", 
      avatar: "/lovable-uploads/f3f2a5ae-65d9-4442-8842-1cb9e26cdb56.png",
      rating: 5,
      text: "Professional, friendly, and very talented. I've received so many compliments on my nails!",
      service: "Nail Art",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Sarah Davis",
      avatar: "/lovable-uploads/fc2a8931-d58f-47a3-81f2-6ae43cf431c5.png", 
      rating: 5,
      text: "Best nail artist in the city! Always exceeds my expectations. Highly recommended!",
      service: "Full Set",
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
        <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Client Love</h2>
        <p className="text-gray-600 font-inter">What your clients are saying</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="relative h-64 lg:h-48">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 p-6"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-playfair font-semibold text-gray-900">
                      {testimonials[currentIndex].name}
                    </h3>
                    <div className="flex items-center gap-2">
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
                  <Quote className="absolute top-0 left-0 h-6 w-6 text-gray-200 -translate-x-1 -translate-y-1" />
                  <p className="text-gray-700 font-inter leading-relaxed pl-4">
                    {testimonials[currentIndex].text}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500 font-inter">
                    Service: {testimonials[currentIndex].service}
                  </span>
                  
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={prevTestimonial}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4 text-gray-600" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={nextTestimonial}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <ChevronRight className="h-4 w-4 text-gray-600" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 p-4 bg-gray-50">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-purple-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistTestimonialCarousel;
