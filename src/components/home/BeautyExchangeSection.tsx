
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const BeautyExchangeSection = () => {
  return (
    <section className="py-24 bg-[#FCFAFF]">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Animated sparkle icon */}
          <motion.div
            className="absolute -top-2 -left-4 md:left-0 text-primary/80"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.3,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 2
            }}
          >
            <Sparkles size={28} className="text-[#9b87f5]" />
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#1A1A1A] font-playfair tracking-tight">
            The Beauty Industry Exchange
          </h2>
          <p className="text-lg text-gray-600 mb-10 font-inter leading-relaxed tracking-wide">
            Where Salons, Stylists & Opportunities Meet.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <Link to="/salons">
              <Button className="font-medium px-8 py-6 bg-primary hover:bg-primary/90 shadow-sm text-base transition-all duration-300" size="lg">
                Browse Beauty Listings
              </Button>
            </Link>
            <Link to="/create-listing">
              <Button variant="outline" className="font-medium px-8 py-6 border-gray-300 hover:bg-gray-50 text-base transition-all duration-300" size="lg">
                Post a Job or Salon for Sale
              </Button>
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {[
            {
              icon: "💼",
              title: "Find Your Next Position",
              description: "Browse job listings from top salons looking for talented professionals like you.",
              link: "/jobs",
              linkText: "View Job Listings"
            },
            {
              icon: "🏢",
              title: "Salon Opportunities",
              description: "Discover salons for sale, booth rentals, and partnership opportunities in your area.",
              link: "/salons",
              linkText: "Browse Salon Listings"
            },
            {
              icon: "👩‍💼",
              title: "Find Talented Artists",
              description: "Connect with skilled beauty professionals for your salon or business.",
              link: "/artists",
              linkText: "Browse Artists"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-md transition-all duration-500 group relative overflow-hidden"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              {/* Subtle background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-[#F6F6F7] opacity-50"></div>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-2xl">{item.icon}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 font-playfair text-[#1A1A1A]">{item.title}</h3>
              <p className="text-gray-600 mb-6 font-inter">
                {item.description}
              </p>
              <Link to={item.link} className="text-primary font-medium hover:underline inline-flex items-center transition-all">
                {item.linkText}
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BeautyExchangeSection;
