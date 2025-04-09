
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/context/auth";
import { getPersonalizedGreeting } from "@/utils/navigation";

const CustomerWelcomeBanner = () => {
  const { userProfile, userRole } = useAuth();
  const userName = userProfile?.full_name?.split(' ')[0] || 'Beauty Enthusiast';
  
  return (
    <motion.div 
      className="relative mb-8 overflow-hidden rounded-xl shadow-sm"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 opacity-90"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_50%,rgba(255,255,255,0.15),transparent_60%)]"></div>
      <motion.div 
        className="absolute -right-10 -bottom-16 w-48 h-48 rounded-full bg-white/10 backdrop-blur-md"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5] 
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      <div className="relative p-6 md:p-8 z-10">
        <h1 className="text-2xl md:text-3xl font-serif text-white mb-2">
          {getPersonalizedGreeting(userName, userRole)}
        </h1>
        <p className="text-white/90 max-w-lg">
          Explore new services, discover trending styles, and book your next beauty experience.
        </p>
        <motion.div 
          className="mt-4 inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Sparkles className="h-3.5 w-3.5 mr-2 text-amber-200" />
          <span>Personalized recommendations ready for you</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CustomerWelcomeBanner;
