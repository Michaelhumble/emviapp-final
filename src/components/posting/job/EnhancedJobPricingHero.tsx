
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Timer, Star, Users, TrendingUp, Zap, Crown, Shield, Sparkles } from 'lucide-react';

const EnhancedJobPricingHero = () => {
  const [timeLeft, setTimeLeft] = useState('23:45:12');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [statsCounter, setStatsCounter] = useState({ applications: 0, hires: 0, savings: 0 });

  useEffect(() => {
    // Animate counters
    const animateCounters = () => {
      const targets = { applications: 2847, hires: 1203, savings: 89 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setStatsCounter({
          applications: Math.floor(targets.applications * progress),
          hires: Math.floor(targets.hires * progress),
          savings: Math.floor(targets.savings * progress)
        });
        
        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);
    };
    
    setTimeout(animateCounters, 1000);
  }, []);

  useEffect(() => {
    // Countdown timer
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
      text: "Got 47 qualified applications in 24 hours!",
      author: "Maria Santos",
      role: "Owner, Luxe Nails Studio",
      location: "Beverly Hills, CA",
      avatar: "💅"
    },
    {
      text: "Found my dream nail artist in 3 hours",
      author: "David Kim",
      role: "Manager, Elite Beauty Lounge", 
      location: "Manhattan, NY",
      avatar: "🎨"
    },
    {
      text: "Best ROI investment for my salon growth",
      author: "Sarah Williams",
      role: "CEO, Bella Vista Spa Chain",
      location: "Miami, FL", 
      avatar: "🏆"
    },
    {
      text: "Saved $3,000 on recruitment fees!",
      author: "Jessica Chen",
      role: "Owner, Modern Nails & Spa",
      location: "Seattle, WA",
      avatar: "💰"
    }
  ];

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(testimonialInterval);
  }, []);

  const floatingElements = [
    { icon: "💅", delay: 0, x: 20, y: 30 },
    { icon: "✨", delay: 0.5, x: -30, y: 20 },
    { icon: "🎨", delay: 1, x: 40, y: -20 },
    { icon: "💄", delay: 1.5, x: -20, y: -30 },
    { icon: "👑", delay: 2, x: 30, y: 40 }
  ];

  return (
    <div className="relative text-center space-y-12 mb-20 overflow-hidden">
      {/* Floating Background Elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl opacity-10 pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 0.1, 
            scale: 1,
            x: [0, element.x, 0],
            y: [0, element.y, 0]
          }}
          transition={{ 
            duration: 6,
            delay: element.delay,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{ 
            left: `${20 + index * 20}%`, 
            top: `${10 + index * 15}%` 
          }}
        >
          {element.icon}
        </motion.div>
      ))}

      {/* Main Headline with Premium Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
        className="space-y-6"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold font-playfair bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent leading-tight">
            Find Your
            <motion.span
              className="block text-transparent bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Dream Team
            </motion.span>
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-2xl md:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
        >
          Join <span className="font-bold text-purple-600">{statsCounter.applications.toLocaleString()}+</span> salon owners who found their perfect artists and transformed their business
        </motion.p>
      </motion.div>

      {/* Premium Stats Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
      >
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Users className="h-8 w-8 text-green-600" />
            <span className="text-3xl font-bold text-green-800">{statsCounter.applications.toLocaleString()}</span>
          </div>
          <p className="text-green-700 font-semibold">Quality Applications</p>
          <p className="text-sm text-green-600">This month alone</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Crown className="h-8 w-8 text-blue-600" />
            <span className="text-3xl font-bold text-blue-800">{statsCounter.hires.toLocaleString()}</span>
          </div>
          <p className="text-blue-700 font-semibold">Successful Hires</p>
          <p className="text-sm text-blue-600">Perfect matches made</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <span className="text-3xl font-bold text-purple-800">{statsCounter.savings}%</span>
          </div>
          <p className="text-purple-700 font-semibold">Average Savings</p>
          <p className="text-sm text-purple-600">vs traditional recruiting</p>
        </motion.div>
      </motion.div>

      {/* Enhanced FOMO Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative"
      >
        <div className="flex flex-wrap justify-center items-center gap-6 bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 border-2 border-orange-200 rounded-full px-8 py-4 shadow-xl max-w-5xl mx-auto backdrop-blur-sm">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2"
          >
            <Users className="h-6 w-6 text-orange-600" />
            <span className="font-bold text-orange-800">Only 12 Diamond spots left this year</span>
          </motion.div>
          
          <div className="h-6 w-px bg-orange-300" />
          
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center gap-2"
          >
            <Zap className="h-6 w-6 text-red-600" />
            <span className="font-bold text-red-800">Early bird: 40% OFF expires soon</span>
          </motion.div>
          
          <div className="h-6 w-px bg-orange-300" />
          
          <div className="flex items-center gap-2">
            <Timer className="h-6 w-6 text-purple-600" />
            <span className="font-mono font-bold text-purple-800 text-lg">{timeLeft}</span>
          </div>
        </div>
      </motion.div>

      {/* Premium Success Stories Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative max-w-4xl mx-auto"
      >
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl border border-gray-200 shadow-2xl p-8 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50 opacity-50" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-4 py-2">
                <Shield className="h-4 w-4 mr-2" />
                Verified Success Story
              </Badge>
              <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
            </div>
            
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4"
            >
              <div className="text-6xl mb-4">
                {testimonials[currentTestimonial].avatar}
              </div>
              <blockquote className="text-2xl font-semibold text-gray-900 mb-4">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              <div className="space-y-2">
                <div className="font-bold text-lg text-gray-800">
                  {testimonials[currentTestimonial].author}
                </div>
                <div className="text-purple-600 font-medium">
                  {testimonials[currentTestimonial].role}
                </div>
                <div className="text-sm text-gray-500">
                  📍 {testimonials[currentTestimonial].location}
                </div>
              </div>
            </motion.div>
            
            {/* Testimonial Indicators */}
            <div className="flex justify-center gap-3 mt-6">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-purple-500 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Social Proof */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="space-y-6"
      >
        <div className="flex justify-center gap-8 flex-wrap text-sm text-gray-600">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm"
          >
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span><strong>400%</strong> avg. application increase</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm"
          >
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <span><strong>4.9/5</strong> salon owner rating</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm"
          >
            <Shield className="h-5 w-5 text-blue-500" />
            <span><strong>24/7</strong> premium support</span>
          </motion.div>
        </div>

        {/* Trust Logos */}
        <div className="flex justify-center items-center gap-8 opacity-60">
          <div className="text-2xl font-bold text-gray-400">As seen in:</div>
          <div className="flex gap-6 text-gray-400 font-semibold">
            <span>Beauty Weekly</span>
            <span>•</span>
            <span>Salon Today</span>
            <span>•</span>
            <span>Nail Pro Magazine</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedJobPricingHero;
