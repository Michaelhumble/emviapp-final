import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, Star, Users, TrendingUp, Shield, Clock, Award } from 'lucide-react';

const PremiumSalonHero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({ salons: 3200, transactions: 847, listings: 156 });

  // Animate stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        salons: prev.salons + Math.floor(Math.random() * 3),
        transactions: prev.transactions + Math.floor(Math.random() * 2),
        listings: prev.listings + Math.floor(Math.random() * 1)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    { name: "Sarah M.", text: "Sold my salon in 3 weeks!", rating: 5, location: "Houston, TX" },
    { name: "David L.", text: "Found my dream salon here!", rating: 5, location: "Miami, FL" },
    { name: "Lisa K.", text: "Professional and fast process", rating: 5, location: "NYC, NY" }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {/* Luxury background with layers */}
      <div className="absolute inset-0">
        {/* Base image */}
        <img 
          src="/lovable-uploads/79cf9064-5740-4752-9ad6-9b7e9b4db31e.png" 
          alt="Premium salon interior" 
          className="w-full h-full object-cover"
        />
        
        {/* Luxury gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/40 to-black/50" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,_hsl(var(--premium-purple)_/_0.15),_hsl(var(--luxury-gold)_/_0.08),_hsl(var(--diamond-blue)_/_0.12))]" />
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 md:px-8">
        {/* Animated headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-4 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-yellow-200 bg-clip-text text-transparent animate-pulse">
              Where Beauty Dreams
            </span>
            <br />
            <span className="text-white drop-shadow-2xl">
              Become Reality
            </span>
          </h1>
        </motion.div>

        {/* Animated tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-white/90 text-xl md:text-2xl mb-8 max-w-3xl leading-relaxed font-light"
        >
          Verified listings, instant connections, powered by love and AI
        </motion.p>

        {/* Live stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mb-8 text-white/80"
        >
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <TrendingUp className="w-4 h-4" />
            <span className="font-medium">{stats.salons.toLocaleString()}+ Salons</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <Users className="w-4 h-4" />
            <span className="font-medium">{stats.transactions}+ Sold</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <Clock className="w-4 h-4" />
            <span className="font-medium">{stats.listings} Active</span>
          </div>
        </motion.div>

        {/* Premium CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <Link to="/sell-salon">
            <Button 
              size="lg" 
              className="group relative bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-semibold px-8 py-4 text-lg rounded-xl shadow-[var(--shadow-luxury)] hover:shadow-[var(--shadow-floating)] transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Plus className="w-6 h-6 mr-2" /> 
              <div className="flex flex-col items-start">
                <span>List Your Salon</span>
                <span className="text-xs text-purple-200 font-normal">It's free — get verified in 2 minutes</span>
              </div>
            </Button>
          </Link>
          
          <Link to="#listings">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white/40 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/60 px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Search className="w-6 h-6 mr-2" /> Browse Salons
            </Button>
          </Link>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button 
                size="lg" 
                variant="ghost"
                className="text-white hover:bg-white/20 px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105"
              >
                Why Sell on EmviApp?
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-playfair">Why Choose EmviApp?</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Verified Buyers Only</h3>
                    <p className="text-sm text-gray-600">Every buyer is pre-qualified and verified</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Premium Exposure</h3>
                    <p className="text-sm text-gray-600">Featured across our network of 100K+ professionals</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Fast Sales</h3>
                    <p className="text-sm text-gray-600">Average sale time: 3-4 weeks</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-yellow-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Expert Support</h3>
                    <p className="text-sm text-gray-600">Dedicated advisor throughout the process</p>
                  </div>
                </div>
              </div>
              <div className="text-center pt-4">
                <Link to="/sell-salon">
                  <Button 
                    className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-3"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Start Listing Now
                  </Button>
                </Link>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Premium search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="w-full max-w-xl mb-8"
        >
          <div className="relative">
            <Input
              type="text"
              placeholder="Search salons by location, price, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg bg-white/90 backdrop-blur-sm border-0 rounded-xl shadow-[var(--shadow-glass)] focus:ring-2 focus:ring-purple-400/50 focus:shadow-[var(--shadow-luxury)]"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-col items-center gap-4"
        >
          {/* Testimonial carousel */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-md">
            <div className="flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-white/90 text-sm mb-2">"{testimonials[currentTestimonial].text}"</p>
            <p className="text-white/70 text-xs">
              {testimonials[currentTestimonial].name} • {testimonials[currentTestimonial].location}
            </p>
          </div>

          {/* Recent activity */}
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Just sold: Premium Spa in Houston, TX!</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PremiumSalonHero;