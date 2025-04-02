
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="bg-[#FDFDFD] py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-10" aria-hidden="true" />
        <img 
          src="https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80" 
          alt="" 
          className="w-full h-full object-cover scale-110 blur-md opacity-20"
          aria-hidden="true"
        />
      </div>
      
      <motion.div 
        className="container mx-auto px-4 relative z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold font-serif tracking-wide mb-6">Here's How We Help Everyone Win</h1>
          <p className="text-lg text-gray-600 mb-8 font-sans leading-relaxed">
            Behind the beauty — there's powerful AI, automation, and empathy guiding every experience.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
