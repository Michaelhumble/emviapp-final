import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronLeft, ChevronRight, Star, Quote, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const testimonials = [
  {
    id: 1,
    quote: "EmviApp completely changed how I find talent. My salon is now fully staffed with incredible artists!",
    author: "Sarah Johnson",
    role: "Owner, Polished Nail Spa",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
    rating: 5,
    location: "New York, NY"
  },
  {
    id: 2,
    quote: "As a salon owner, I've found the best talent through EmviApp. The platform streamlines everything.",
    author: "David Chen",
    role: "Director, Elite Beauty Bar",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
    rating: 5,
    location: "Los Angeles, CA"
  },
  {
    id: 3,
    quote: "The quality of applicants we get through EmviApp is outstanding. It's saved us so much time and money.",
    author: "Michelle Rodriguez",
    role: "Manager, Luxe Nail Lounge",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
    rating: 5,
    location: "Miami, FL"
  },
  {
    id: 4,
    quote: "I landed my dream job within a week of joining EmviApp. The opportunities are endless here!",
    author: "Jessica Kim",
    role: "Nail Artist",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
    rating: 5,
    location: "Chicago, IL"
  },
  {
    id: 5,
    quote: "EmviApp connects me with high-end salons that value my skills. My income has increased 40% since joining.",
    author: "Marcus Thompson",
    role: "Senior Barber",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
    rating: 5,
    location: "Atlanta, GA"
  }
];

const CompactTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];
  const visibleCount = isExpanded ? testimonials.length : 1;

  return (
    <section className="py-12 bg-gradient-to-br from-purple-50/30 to-pink-50/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Loved by Beauty Professionals
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of salon owners and beauty professionals who are growing their careers with EmviApp
          </p>
        </motion.div>

        {/* Compact Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          {!isExpanded ? (
            // Compact View - Single Testimonial
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-purple-100 relative"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-purple-200" />
              
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <Avatar className="w-16 h-16 md:w-20 md:h-20 border-4 border-purple-100">
                    <AvatarImage src={currentTestimonial.avatar} alt={currentTestimonial.author} />
                    <AvatarFallback className="bg-purple-100 text-purple-600 text-xl font-semibold">
                      {currentTestimonial.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-700 text-lg leading-relaxed mb-4">
                    "{currentTestimonial.quote}"
                  </blockquote>
                  
                  <div>
                    <div className="font-semibold text-gray-900">{currentTestimonial.author}</div>
                    <div className="text-purple-600 font-medium">{currentTestimonial.role}</div>
                    <div className="text-sm text-gray-500">{currentTestimonial.location}</div>
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex ? 'bg-purple-600 w-8' : 'bg-purple-200'
                      }`}
                    />
                  ))}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevTestimonial}
                    className="w-10 h-10 p-0 rounded-full border-purple-200 hover:bg-purple-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextTestimonial}
                    className="w-10 h-10 p-0 rounded-full border-purple-200 hover:bg-purple-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            // Expanded View - All Testimonials Grid
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md border border-purple-100"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                      <AvatarFallback className="bg-purple-100 text-purple-600 text-sm">
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-sm text-gray-900">{testimonial.author}</div>
                      <div className="text-xs text-purple-600">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          {/* Expand/Collapse Toggle */}
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-6 py-3 rounded-full border-purple-200 text-purple-600 hover:bg-purple-50 transition-all duration-300"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-2" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-2" />
                  See All {testimonials.length} Reviews
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompactTestimonials;