
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-[#FDFDFD] pt-24 pb-28 overflow-hidden">
      {/* Decorative background elements - blurred gradient */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-md z-10" aria-hidden="true" />
        <img 
          src="https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80" 
          alt="" 
          className="w-full h-full object-cover scale-110 blur-md opacity-30"
          aria-hidden="true"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#FAF0E6]/70 via-[#FFF5EE]/60 to-[#F8E1DE]/70 mix-blend-overlay"
          aria-hidden="true"
        />
      </div>

      {/* Floating particles animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-white/20 backdrop-blur-sm"
            initial={{ 
              x: Math.random() * 100 + (i % 2 === 0 ? -50 : 50), 
              y: Math.random() * 100 + 600,
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.5 + 0.3
            }}
            animate={{ 
              y: Math.random() * -600 - 100,
              x: Math.random() * 50 * (i % 2 === 0 ? -1 : 1) + (i * 30),
            }}
            transition={{ 
              duration: Math.random() * 15 + 15, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Badge variant="outline" className="mb-6 bg-white/20 backdrop-blur-md px-4 py-1.5 text-xs font-medium rounded-full border-white/20 text-gray-800">
              Revolutionizing Beauty Hiring
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight mb-6 text-gray-900 drop-shadow-sm tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            The Future of Hiring for the Beauty Industry
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl font-sans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            AI-powered. Built with love. Funded by those who care.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link to="/auth/signup">
              <Button 
                size="lg" 
                className="font-medium px-8 py-6 text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              >
                Join The Movement
              </Button>
            </Link>
            <Link to="/jobs">
              <Button 
                size="lg" 
                variant="outline" 
                className="font-medium px-8 py-6 text-lg border-gray-300 bg-white/80 backdrop-blur-sm hover:bg-gray-100/80 transition-all duration-300"
              >
                Explore Jobs & Salons
              </Button>
            </Link>
          </motion.div>
          
          <motion.div 
            className="mt-24 w-full relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <div className="absolute -top-10 -left-10 w-52 h-52 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
            <div className="absolute top-0 right-0 w-52 h-52 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-52 h-52 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
            
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80" 
                alt="Beauty professional at work" 
                className="relative max-h-[500px] w-full object-cover"
              />
              
              <motion.div 
                className="absolute bottom-0 left-0 w-full p-6 z-20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.7 }}
              >
                <Badge className="bg-white/20 backdrop-blur-md text-white border-white/10 mb-3">
                  Premium Experience
                </Badge>
                <h3 className="text-white text-xl md:text-2xl font-serif mb-1">Hiring, Hustling, and Selling—Smarter, Easier, and Together.</h3>
                <p className="text-white/80 text-sm md:text-base">Join thousands of professionals and businesses</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <motion.div 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-xs mb-2">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
