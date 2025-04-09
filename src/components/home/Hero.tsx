
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

const Hero = () => {
  const isMobile = useIsMobile();

  return (
    <section className="h-screen w-full flex items-center justify-center overflow-hidden relative">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700/30 to-pink-500/20 animate-pulse-glow"></div>
        <div className="absolute inset-0 bg-[url('/lovable-uploads/b8dd2904-7dc6-412d-89be-c962ca4ae5f8.png')] bg-cover bg-center opacity-25 mix-blend-overlay"></div>
      </div>
      
      {/* Lighter blur glass overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md z-10"></div>

      {/* Content container */}
      <motion.div 
        className="relative z-20 container mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1 
          className="font-playfair font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          The Beauty Industry's Missing Piece — We Just Built It.
        </motion.h1>
        
        <motion.p 
          className="text-white/95 text-lg md:text-xl mb-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          Hair, Nails, Makeup, Tattoos, Brows, Barbers, Booth Rentals — All in One Powerful App. Finally.
        </motion.p>
        
        <motion.p 
          className="text-pink-200 italic text-base md:text-lg mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          Chúng tôi nói tiếng Việt — EmviApp là ngôi nhà mới cho cộng đồng làm đẹp của bạn.
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col md:flex-row gap-4 mt-8 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          <Link to="/auth/signup">
            <Button 
              size={isMobile ? "default" : "lg"} 
              className="w-full md:w-auto font-medium px-8 py-6 text-lg bg-pink-500 hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-500/25 text-white rounded-xl transition-all duration-300"
            >
              Join The Movement
            </Button>
          </Link>
          
          <Link to="/jobs">
            <Button 
              size={isMobile ? "default" : "lg"} 
              variant="outline" 
              className="w-full md:w-auto font-medium px-8 py-6 text-lg text-white border-white hover:bg-white hover:text-black transition-all duration-300 rounded-xl"
            >
              Find My Next Opportunity
            </Button>
          </Link>
        </motion.div>
      </motion.div>
      
      {/* Subtle animated particle effect with reduced opacity */}
      <div aria-hidden="true" className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-500/5 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-2/3 right-1/3 w-40 h-40 bg-purple-500/5 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-36 h-36 bg-blue-500/5 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
    </section>
  );
};

export default Hero;
