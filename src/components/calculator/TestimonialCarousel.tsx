import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    text: "We priced fairly and sold in 10 days.",
    name: "Jenny N.",
    role: "Salon Owner"
  },
  {
    text: "Helped me compare two salons fast.",
    name: "Minh P.",
    role: "Buyer"
  },
  {
    text: "Clear upgrade tips boosted my value.",
    name: "Anna L.",
    role: "Seller"
  }
];

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);
  
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);
  
  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);
  
  return (
    <div 
      className="max-w-3xl mx-auto my-16 px-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        What Salon Owners Say
      </h3>
      
      <div className="relative bg-white rounded-2xl shadow-xl border-2 border-purple-100 p-8 md:p-10">
        <Quote className="w-12 h-12 text-purple-400 mb-4" />
        
        {/* Testimonial Content */}
        <div className="min-h-[120px] flex flex-col justify-between">
          <p className="text-xl md:text-2xl font-medium text-foreground mb-6 leading-relaxed animate-fade-in">
            "{testimonials[currentIndex].text}"
          </p>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-lg">{testimonials[currentIndex].name}</div>
              <div className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="rounded-full hover:bg-purple-50"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="rounded-full hover:bg-purple-50"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
