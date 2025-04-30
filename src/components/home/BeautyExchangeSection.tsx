
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const BeautyExchangeSection = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Animated shimmer background effect */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(135deg, transparent 0%, #9B5DE5 50%, transparent 100%)`,
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-20 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Animated sparkle icon */}
          <motion.div
            className="absolute -top-2 -left-4 md:left-0 text-[#9B5DE5]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.9 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.3,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 2
            }}
          >
            <Sparkles size={32} className="text-[#9B5DE5]" />
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#1A1A1A] font-playfair tracking-wide">
            The Beauty Industry Exchange
          </h2>
          <p className="text-lg md:text-xl text-[#555] mb-12 font-inter font-medium tracking-wide">
            Where Beauty Deals Are Made Daily
          </p>
          
          <div className="flex flex-wrap gap-5 justify-center mb-20">
            <Link to="/salons">
              <Button 
                className="font-medium px-8 py-6 bg-black hover:bg-black/90 text-white shadow-none text-base transition-all duration-300 rounded-xl" 
                size="lg"
              >
                Browse Beauty Listings
              </Button>
            </Link>
            <Link to="/create-listing">
              <Button 
                variant="outline" 
                className="font-medium px-8 py-6 border-[#EFEFEF] hover:border-[#9B5DE5] hover:text-[#9B5DE5] text-base transition-all duration-300 shadow-none rounded-xl bg-transparent" 
                size="lg"
              >
                Post a Job or Salon for Sale
              </Button>
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
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
              icon: "briefcase",
              title: "Find Your Next Position",
              description: "Browse job listings from top salons looking for talented professionals like you.",
              link: "/jobs",
              linkText: "View Job Listings"
            },
            {
              icon: "building",
              title: "Salon Opportunities",
              description: "Discover salons for sale, booth rentals, and partnership opportunities in your area.",
              link: "/salons",
              linkText: "Browse Salon Listings"
            },
            {
              icon: "users",
              title: "Find Talented Artists",
              description: "Connect with skilled beauty professionals for your salon or business.",
              link: "/artists",
              linkText: "Browse Artists"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-10 rounded-3xl border border-[#EFEFEF] text-center transition-all duration-500 group relative overflow-hidden"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              whileHover={{
                y: -5,
                boxShadow: '0 0 0 1px rgba(155, 93, 229, 0.15), 0 0 0 4px rgba(155, 93, 229, 0.05)',
                transition: { duration: 0.2 }
              }}
            >
              {/* SVG Icon */}
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                <svg 
                  className="w-8 h-8 text-[#9B5DE5]" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {item.icon === "briefcase" && (
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M21 13.5A1.5 1.5 0 0019.5 12H4.5A1.5 1.5 0 003 13.5m18 0v6a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 19.5v-6m18 0V9a1.5 1.5 0 00-1.5-1.5H4.5A1.5 1.5 0 003 9v4.5m0-9V6a1.5 1.5 0 011.5-1.5h13.5a1.5 1.5 0 011.5 1.5v1.5m-15 0h6v-1.5a1.5 1.5 0 00-1.5-1.5h-3a1.5 1.5 0 00-1.5 1.5V6z" 
                    />
                  )}
                  {item.icon === "building" && (
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  )}
                  {item.icon === "users" && (
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" 
                    />
                  )}
                </svg>
              </div>
              
              <h3 className="text-xl font-semibold mb-4 font-playfair text-[#1A1A1A]">{item.title}</h3>
              <p className="text-[#555] mb-8 font-inter leading-relaxed">
                {item.description}
              </p>
              <Link to={item.link} className="text-[#9B5DE5] font-medium hover:text-[#7b4dba] inline-flex items-center transition-all group-hover:translate-x-1">
                {item.linkText}
                <svg className="w-4 h-4 ml-2 transition-transform ease-in-out duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
