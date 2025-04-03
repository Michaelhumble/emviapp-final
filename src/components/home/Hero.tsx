
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const Hero = () => {
  return (
    <div className="relative bg-[#FDFDFD] pt-20 pb-24 overflow-hidden">
      {/* Blurred background image overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10" aria-hidden="true" />
        <img 
          src="https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80" 
          alt="" 
          className="w-full h-full object-cover scale-110 blur-md opacity-40"
          aria-hidden="true"
        />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-6 bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs font-medium rounded-full border-white/20 text-gray-800">
              Revolutionizing Beauty Hiring
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight mb-6 text-gray-900 drop-shadow-sm"
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
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            AI-powered. Built with love. Funded by those who care.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Link to="/jobs">
              <Button 
                size="lg" 
                className="font-medium px-8 py-6 text-lg bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
              >
                Explore Jobs & Salons
              </Button>
            </Link>
            <Link to="/posting">
              <Button 
                size="lg" 
                variant="outline" 
                className="font-medium px-8 py-6 text-lg border-gray-300 hover:bg-gray-100/80"
              >
                Post a Job or Salon Listing
              </Button>
            </Link>
          </motion.div>
          
          <motion.div 
            className="mt-24 w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <motion.div 
                className="absolute -top-10 -left-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
                animate={{ 
                  x: [0, 30, -20, 0],
                  y: [0, -50, 20, 0],
                  scale: [1, 1.1, 0.9, 1]
                }}
                transition={{ 
                  duration: 15,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div 
                className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                animate={{ 
                  x: [0, -30, 20, 0],
                  y: [0, 50, -20, 0],
                  scale: [1, 0.9, 1.1, 1]
                }}
                transition={{ 
                  duration: 18,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div 
                className="absolute top-20 right-20 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                animate={{ 
                  x: [0, 20, -30, 0],
                  y: [0, -20, 50, 0],
                  scale: [1, 1.1, 0.9, 1]
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80" 
                alt="Beauty professional at work" 
                className="relative max-h-[500px] w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
