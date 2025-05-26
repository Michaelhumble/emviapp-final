
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  rating: number;
  plan: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "We found 3 new stylists in our first week on EmviApp—worth every penny!",
    author: "Sarah Chen",
    role: "Salon Owner",
    rating: 5,
    plan: "Premium"
  },
  {
    id: 2,
    quote: "Diamond Exclusive made our salon the talk of the town. Bookings doubled!",
    author: "Marcus Johnson",
    role: "Spa Director",
    rating: 5,
    plan: "Diamond"
  },
  {
    id: 3,
    quote: "The Gold plan brought us quality candidates immediately. Best investment we made.",
    author: "Lisa Rodriguez",
    role: "Beauty Manager",
    rating: 5,
    plan: "Gold"
  },
  {
    id: 4,
    quote: "Even the free plan helped us find great talent. Upgraded to Premium after one week!",
    author: "David Kim",
    role: "Salon Owner",
    rating: 5,
    plan: "Free → Premium"
  }
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="py-16 bg-gradient-to-r from-purple-50/50 to-pink-50/50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 font-playfair"
        >
          Loved by Salon Owners Everywhere
        </motion.h2>

        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 bg-white/80 backdrop-blur-md shadow-xl border-0">
                <div className="text-center space-y-6">
                  {/* Stars */}
                  <div className="flex justify-center gap-1">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-lg md:text-xl text-gray-700 italic leading-relaxed">
                    "{currentTestimonial.quote}"
                  </blockquote>
                  
                  {/* Author */}
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900">{currentTestimonial.author}</p>
                    <p className="text-sm text-gray-600">{currentTestimonial.role}</p>
                    <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {currentTestimonial.plan} Plan
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
