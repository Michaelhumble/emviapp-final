
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Heart, Share2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmotionalPowerSection = () => {
  const testimonials = [
    {
      quote: "I made my first $2,000 gig from a Community post!",
      author: "Maria Gonzalez",
      role: "Freelance MUA",
      avatar: "💄",
      location: "Los Angeles"
    },
    {
      quote: "This is the only beauty group where I feel safe and inspired to share my art.",
      author: "David Chen",
      role: "Hair Artist",
      avatar: "✂️",
      location: "New York"
    },
    {
      quote: "The support here changed my entire business mindset.",
      author: "Priya Patel",
      role: "Salon Owner",
      avatar: "👩‍💼",
      location: "Chicago"
    }
  ];

  const activeCities = [
    "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
    "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville",
    "Fort Worth", "Columbus", "Charlotte", "San Francisco", "Indianapolis", "Seattle"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
            Why We're Different
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real people who found their tribe and transformed their careers
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
            >
              {/* Background gradient */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -translate-y-12 translate-x-12 opacity-50"></div>
              
              {/* Quote */}
              <div className="relative z-10">
                <div className="text-4xl text-purple-600 mb-4">"</div>
                <p className="text-lg font-medium text-gray-900 mb-6 leading-relaxed">
                  {testimonial.quote}
                </p>
                
                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-purple-600 font-medium">{testimonial.role}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="h-3 w-3" />
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Member Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mb-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              You're Never Alone—EmviApp Is Everywhere
            </h3>
            <p className="text-gray-600">Active members in major cities right now</p>
          </div>

          {/* City Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {activeCities.slice(0, 12).map((city, index) => (
              <motion.div
                key={city}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                {city}
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
              <Users className="h-5 w-5" />
              <span>Active in 150+ cities worldwide</span>
            </div>
          </div>
        </motion.div>

        {/* Share Your Story CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <Heart className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-3xl font-playfair font-bold mb-4">
              Ready to Share Your Story?
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of beauty professionals who found their voice, their community, and their success
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share Your Story
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold"
              >
                Join the Community
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmotionalPowerSection;
