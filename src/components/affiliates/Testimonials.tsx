import React from 'react';
import { motion } from 'framer-motion';
import { flags } from '@/utils/featureFlags';

// Updated testimonials with the required quotes
const testimonials = [
  {
    id: 1,
    quote: "The EmviApp affiliate program is transparent and profitable. Monthly payouts are predictable.",
    author: "Maria Chen",
    title: "Salon Owner",
    avatar: "data:image/svg+xml,%3csvg width='64' height='64' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3clinearGradient id='a' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%2338bdf8'/%3e%3cstop offset='100%25' stop-color='%230284c7'/%3e%3c/linearGradient%3e%3c/defs%3e%3ccircle cx='32' cy='32' r='32' fill='url(%23a)'/%3e%3ccircle cx='32' cy='26' r='8' fill='white' opacity='0.9'/%3e%3cellipse cx='32' cy='45' rx='12' ry='8' fill='white' opacity='0.9'/%3e%3c/svg%3e",
    rating: 5
  },
  {
    id: 2,
    quote: "Tracking just works, and commissions are always on time.",
    author: "James Rodriguez",
    title: "Beauty Influencer",
    avatar: "data:image/svg+xml,%3csvg width='64' height='64' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3clinearGradient id='b' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%2310b981'/%3e%3cstop offset='100%25' stop-color='%23059669'/%3e%3c/linearGradient%3e%3c/defs%3e%3ccircle cx='32' cy='32' r='32' fill='url(%23b)'/%3e%3ccircle cx='32' cy='26' r='8' fill='white' opacity='0.9'/%3e%3cellipse cx='32' cy='45' rx='12' ry='8' fill='white' opacity='0.9'/%3e%3c/svg%3e",
    rating: 5
  },
  {
    id: 3,
    quote: "It's the easiest way I've ever added income to my salon business.",
    author: "Sarah Kim", 
    title: "Content Creator",
    avatar: "data:image/svg+xml,%3csvg width='64' height='64' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3clinearGradient id='c' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%238b5cf6'/%3e%3cstop offset='100%25' stop-color='%237c3aed'/%3e%3c/linearGradient%3e%3c/defs%3e%3ccircle cx='32' cy='32' r='32' fill='url(%23c)'/%3e%3ccircle cx='32' cy='26' r='8' fill='white' opacity='0.9'/%3e%3cellipse cx='32' cy='45' rx='12' ry='8' fill='white' opacity='0.9'/%3e%3c/svg%3e",
    rating: 5
  },
  {
    id: 4,
    quote: "Best affiliate program in the beauty space. Setup was incredibly simple.",
    author: "Alex Thompson",
    title: "Marketing Director",
    avatar: "data:image/svg+xml,%3csvg width='64' height='64' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3clinearGradient id='d' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%23f59e0b'/%3e%3cstop offset='100%25' stop-color='%23d97706'/%3e%3c/linearGradient%3e%3c/defs%3e%3ccircle cx='32' cy='32' r='32' fill='url(%23d)'/%3e%3ccircle cx='32' cy='26' r='8' fill='white' opacity='0.9'/%3e%3cellipse cx='32' cy='45' rx='12' ry='8' fill='white' opacity='0.9'/%3e%3c/svg%3e",
    rating: 5
  }
];

const Testimonials = () => {
  // Only render if luxury features are enabled
  if (!flags.AFFILIATE_LUX_ENABLE) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  return (
    <section className="section-premium bg-gradient-to-b from-background to-muted/5">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-hero-secondary mb-4">
            Trusted by Beauty Professionals
          </h2>
          <p className="text-body-premium text-muted-foreground max-w-2xl mx-auto">
            Real feedback from creators and salon owners who've grown their income with our affiliate program
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              variants={itemVariants}
              className="relative"
            >
              <div className="rounded-2xl border bg-white/70 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                {/* Quote */}
                <blockquote className="text-foreground mb-6 italic text-body-premium leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                {/* Rating stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg 
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                {/* Author */}
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={`${testimonial.author} avatar`}
                    className="w-12 h-12 rounded-full"
                    width="48"
                    height="48"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      {testimonial.author}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {testimonial.title}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Trust indicators */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="inline-flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>500+ Active Affiliates</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>$1M+ Paid Out</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>99.9% Uptime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;