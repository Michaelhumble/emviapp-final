
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, TrendingUp, Heart, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuccessStory {
  id: string;
  name: string;
  role: string;
  location: string;
  image: string;
  beforeImage: string;
  afterImage: string;
  story: string;
  achievement: string;
  metrics: {
    revenue?: string;
    clients?: string;
    growth?: string;
    rating?: number;
  };
  tags: string[];
}

const SuccessStoriesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const stories: SuccessStory[] = [
    {
      id: '1',
      name: 'Maria Rodriguez',
      role: 'Nail Artist',
      location: 'Miami, FL',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b332c11c?q=80&w=400&auto=format&fit=crop',
      beforeImage: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=400&auto=format&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=400&auto=format&fit=crop',
      story: "Started with $200 and a dream. Through EmviApp's community, I learned advanced techniques, built my client base, and now run the most booked nail studio in Miami!",
      achievement: "From bedroom to 6-figure studio",
      metrics: {
        revenue: "$180K/year",
        clients: "500+",
        growth: "890%",
        rating: 4.9
      },
      tags: ['Business Growth', 'Nail Art', 'Success Story']
    },
    {
      id: '2',
      name: 'Ashley Chen',
      role: 'Makeup Artist',
      location: 'Los Angeles, CA',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
      beforeImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=400&auto=format&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=400&auto=format&fit=crop',
      story: "Discovered my signature style through community feedback. Now I'm the go-to MUA for A-list celebrities and fashion weeks. The connections here changed everything!",
      achievement: "Celebrity MUA in 18 months",
      metrics: {
        revenue: "$350K/year",
        clients: "200+",
        growth: "1200%",
        rating: 5.0
      },
      tags: ['Celebrity', 'Makeup', 'Fashion']
    },
    {
      id: '3',
      name: 'Isabella Santos',
      role: 'Hair Colorist',
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop',
      beforeImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=400&auto=format&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=400&auto=format&fit=crop',
      story: "My color transformations went viral after sharing in the Hair Colorists Elite group. Built a waitlist of 300+ clients and opened my own salon!",
      achievement: "Viral colorist with own salon",
      metrics: {
        revenue: "$220K/year",
        clients: "300+",
        growth: "650%",
        rating: 4.8
      },
      tags: ['Hair Color', 'Viral Success', 'Salon Owner']
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, stories.length]);

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const currentStory = stories[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-yellow-400/20 to-pink-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Dreams Turned Into
            <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              {" "}Reality
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-purple-100 max-w-3xl mx-auto"
          >
            Real stories from real people who transformed their passion into thriving careers
          </motion.p>
        </div>

        {/* Main Carousel */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 lg:p-12 border border-white/20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Story Content */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={currentStory.image}
                      alt={currentStory.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-yellow-400"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-white">{currentStory.name}</h3>
                      <p className="text-purple-200">{currentStory.role} • {currentStory.location}</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-400 to-pink-400 text-black px-6 py-3 rounded-2xl inline-block font-bold text-lg">
                    {currentStory.achievement}
                  </div>

                  <blockquote className="text-lg text-white leading-relaxed italic">
                    "{currentStory.story}"
                  </blockquote>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    {currentStory.metrics.revenue && (
                      <div className="bg-white/10 rounded-2xl p-4 text-center">
                        <DollarSign className="h-6 w-6 text-green-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{currentStory.metrics.revenue}</div>
                        <div className="text-sm text-purple-200">Annual Revenue</div>
                      </div>
                    )}
                    {currentStory.metrics.clients && (
                      <div className="bg-white/10 rounded-2xl p-4 text-center">
                        <Heart className="h-6 w-6 text-pink-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{currentStory.metrics.clients}</div>
                        <div className="text-sm text-purple-200">Happy Clients</div>
                      </div>
                    )}
                    {currentStory.metrics.growth && (
                      <div className="bg-white/10 rounded-2xl p-4 text-center">
                        <TrendingUp className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{currentStory.metrics.growth}</div>
                        <div className="text-sm text-purple-200">Growth Rate</div>
                      </div>
                    )}
                    {currentStory.metrics.rating && (
                      <div className="bg-white/10 rounded-2xl p-4 text-center">
                        <Star className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{currentStory.metrics.rating}</div>
                        <div className="text-sm text-purple-200">Rating</div>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {currentStory.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-white/20 text-white rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Before/After Images */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-purple-200 mb-2 font-medium">Before</p>
                      <img
                        src={currentStory.beforeImage}
                        alt="Before"
                        className="w-full h-48 object-cover rounded-2xl shadow-lg"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-purple-200 mb-2 font-medium">After</p>
                      <img
                        src={currentStory.afterImage}
                        alt="After"
                        className="w-full h-48 object-cover rounded-2xl shadow-lg"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-black font-bold py-4"
                    onClick={() => {
                      // Handle "Start My Journey" click
                    }}
                  >
                    Start My Success Story
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevStory}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex ? 'bg-yellow-400' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextStory}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Auto-play toggle */}
          <div className="text-center mt-6">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-purple-200 hover:text-white text-sm"
            >
              {isAutoPlaying ? 'Pause' : 'Play'} Auto-rotation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesCarousel;
