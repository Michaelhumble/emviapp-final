
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, TrendingUp, Users, Award, Crown, Timer, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UltraPremiumHero = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "I went from $30K to $180K in 18 months. This community saved my career.",
      name: "Sarah Chen",
      role: "Nail Artist → Studio Owner",
      location: "Los Angeles, CA",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?q=80&w=500",
      earnings: "+500% income"
    },
    {
      quote: "Booked solid for 6 months straight. I had to stop taking new clients.",
      name: "Maria Rodriguez",
      role: "Lash Artist",
      location: "Miami, FL", 
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500",
      earnings: "6-month waitlist"
    },
    {
      quote: "From bedroom business to Manhattan salon. Dreams do come true here.",
      name: "Ashley Thompson",
      role: "Hair Stylist",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=500",
      earnings: "Own salon"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Main Content */}
          <div className="text-white">
            {/* FOMO Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-6 py-3 mb-8"
            >
              <Crown className="h-5 w-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">
                <Timer className="inline h-4 w-4 mr-1" />
                2,847 joined this week
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-playfair"
            >
              The Most
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}Exclusive{" "}
              </span>
              Beauty Community
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed"
            >
              Where 47,000+ beauty professionals turn side hustles into 
              <span className="text-yellow-400 font-bold"> million-dollar empires</span>
            </motion.p>

            {/* Live Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              {[
                { icon: Users, value: '47.2K', label: 'Members', color: 'text-blue-400' },
                { icon: TrendingUp, value: '$2.8M', label: 'Earned Monthly', color: 'text-green-400' },
                { icon: Star, value: '4.9★', label: 'Rating', color: 'text-yellow-400' },
                { icon: Zap, value: '24/7', label: 'Support', color: 'text-purple-400' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className={`h-6 w-6 ${stat.color} mx-auto mb-2`} />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 text-white px-10 py-4 text-lg font-bold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <Sparkles className="mr-2 h-6 w-6" />
                Join Elite Community
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-10 py-4 text-lg font-semibold transition-all duration-300"
              >
                Watch Success Stories
              </Button>
            </motion.div>
          </div>

          {/* Right Side - Rotating Testimonials */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl"
              >
                <div className="flex items-start gap-4 mb-6">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-400"
                  />
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      {testimonials[currentTestimonial].name}
                    </h3>
                    <p className="text-purple-200">{testimonials[currentTestimonial].role}</p>
                    <p className="text-sm text-gray-300">{testimonials[currentTestimonial].location}</p>
                  </div>
                  <div className="ml-auto bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {testimonials[currentTestimonial].earnings}
                  </div>
                </div>
                
                <blockquote className="text-white text-xl leading-relaxed italic">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                
                <div className="flex mt-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-purple-400' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UltraPremiumHero;
