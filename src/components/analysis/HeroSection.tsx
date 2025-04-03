
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="bg-[#FDFDFD] py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-10" aria-hidden="true" />
        <img 
          src="/lovable-uploads/63331551-d921-46f4-98dc-8404b611ddd3.png" 
          alt="Hair stylist working with client" 
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 mb-10">
            <motion.div 
              className="relative rounded-xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <img 
                src="/lovable-uploads/749e5584-caa4-4229-84a2-93589c7455c2.png" 
                alt="Professional nail technician at work"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-medium text-sm">Nail Artists</p>
                <p className="text-xs opacity-80">Professional artistry</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative rounded-xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <img 
                src="/lovable-uploads/70c8662a-4525-4854-a529-62616b5b6c81.png" 
                alt="Beauty professional with client"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-medium text-sm">Beauty Artists</p>
                <p className="text-xs opacity-80">Creating beauty with precision</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
