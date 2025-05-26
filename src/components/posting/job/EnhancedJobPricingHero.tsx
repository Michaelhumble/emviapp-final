
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Timer, Star, Users, TrendingUp, Zap, Crown, Shield } from 'lucide-react';

const EnhancedJobPricingHero = () => {
  const [timeLeft, setTimeLeft] = useState('47:23:12');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [diamondSpotsLeft] = useState(2); // 2 out of 3 total spots

  useEffect(() => {
    // Simulate countdown timer
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const endTime = now + (47 * 60 * 60 * 1000) + (23 * 60 * 1000) + (12 * 1000);
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
      text: "Got 23 applications in 2 days with Gold plan!",
      author: "Maria Santos",
      role: "Luxe Nails Studio Owner",
      location: "Beverly Hills, CA"
    },
    {
      text: "Found my star nail artist within 6 hours",
      author: "David Kim",
      role: "Elite Beauty Studio Manager",
      location: "Manhattan, NY"
    },
    {
      text: "Diamond plan changed everything - 340% more quality applicants",
      author: "Sarah Chen",
      role: "Bella Vista Spa Owner",
      location: "Austin, TX"
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
      {/* Main Headline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold font-playfair bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent leading-tight">
          Supercharge Your Salon's Success
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Join 10,000+ salon owners who found their dream team and transformed their business
        </p>
      </motion.div>

      {/* FOMO Stats Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-center items-center gap-6 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-full px-8 py-4 shadow-lg max-w-5xl mx-auto"
      >
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-cyan-600" />
          <span className="font-semibold text-cyan-800">{diamondSpotsLeft}/3 Diamond spots left</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-orange-600" />
          <span className="font-semibold text-orange-800">8 Gold spots left this week</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-red-600" />
          <span className="font-semibold text-red-800">Limited time: 50% off</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Timer className="h-5 w-5 text-purple-600" />
          <span className="font-mono font-bold text-purple-800">{timeLeft}</span>
        </div>
      </motion.div>

      {/* Success Stories Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative max-w-3xl mx-auto"
      >
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-xl p-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-semibold">
              SUCCESS STORY
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
            <p className="text-2xl font-semibold text-gray-900 mb-4 leading-relaxed">
              "{testimonials[currentTestimonial].text}"
            </p>
            <div className="space-y-1">
              <p className="font-bold text-lg text-gray-800">{testimonials[currentTestimonial].author}</p>
              <p className="text-gray-600 font-medium">{testimonials[currentTestimonial].role}</p>
              <p className="text-sm text-gray-500">{testimonials[currentTestimonial].location}</p>
            </div>
          </motion.div>
          
          {/* Testimonial indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentTestimonial ? 'bg-purple-500 w-8' : 'bg-gray-300'
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
          <Crown className="h-4 w-4 text-yellow-500" />
          <span>4.9/5 salon owner rating</span>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedJobPricingHero;
