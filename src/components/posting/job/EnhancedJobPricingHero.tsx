
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Timer, Star, Users, TrendingUp, Zap, Crown, Shield, Diamond } from 'lucide-react';

const EnhancedJobPricingHero = () => {
  const [timeLeft, setTimeLeft] = useState('23:45:12');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    // Simulate countdown timer
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const endTime = now + (23 * 60 * 60 * 1000) + (45 * 60 * 1000) + (12 * 1000);
      const distance = endTime - now;
      
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      text: "Got 23 applications in 2 days!",
      author: "Maria S., Luxe Nails Studio",
      role: "Salon Owner"
    },
    {
      text: "Found my star nail artist within hours",
      author: "David K., Elite Beauty",
      role: "Studio Manager"
    },
    {
      text: "Best investment for my salon growth",
      author: "Sarah L., Bella Vista Spa",
      role: "Owner"
    }
  ];

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(testimonialInterval);
  }, []);

  return (
    <div className="text-center space-y-8 mb-16">
      {/* Main Headline - Reduced size */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-4"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent leading-tight">
          Find Your Dream Team
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Join 2,847+ salon owners who found their perfect artists and transformed their business
        </p>
      </motion.div>

      {/* FOMO Stats Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-center items-center gap-6 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-full px-8 py-4 shadow-lg max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-orange-600" />
          <span className="font-semibold text-orange-800">Only 12 Diamond spots left this year</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-red-600" />
          <span className="font-semibold text-red-800">Early bird: 40% OFF expires soon</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Timer className="h-5 w-5 text-purple-600" />
          <span className="font-mono font-bold text-purple-800">{timeLeft}</span>
        </div>
      </motion.div>

      {/* Real Performance Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
      >
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-green-800 mb-1">2,847</div>
          <div className="text-green-700 font-medium">Quality Applications</div>
          <div className="text-sm text-green-600">This month alone</div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Crown className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-blue-800 mb-1">1,203</div>
          <div className="text-blue-700 font-medium">Successful Hires</div>
          <div className="text-sm text-blue-600">Perfect matches made</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-purple-800 mb-1">89%</div>
          <div className="text-purple-700 font-medium">Average Savings</div>
          <div className="text-sm text-purple-600">vs traditional recruiting</div>
        </div>
      </motion.div>

      {/* Success Stories Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative max-w-2xl mx-auto"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl p-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Shield className="h-3 w-3 mr-1" />
              Verified Success Story
            </Badge>
          </div>
          
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
            <p className="text-xl font-semibold text-gray-900 mb-3">
              "Saved $3,000 on recruitment fees!"
            </p>
            <div className="text-gray-600">
              <p className="font-medium">Jessica Chen</p>
              <p className="text-sm">Nail Artist Pro Studio</p>
            </div>
          </motion.div>
          
          {/* Testimonial indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentTestimonial ? 'bg-purple-500 w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Additional Social Proof */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex justify-center gap-8 text-sm text-gray-500"
      >
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-green-500" />
          <span>400% avg. application increase</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-yellow-500" />
          <span>4.9/5 salon owner rating</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-blue-500" />
          <span>24/7 premium support</span>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedJobPricingHero;
