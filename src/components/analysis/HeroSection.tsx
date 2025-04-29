
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="bg-[#FDFDFD] py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-10" aria-hidden="true" />
        <img 
          src="/lovable-uploads/a98d2b96-e38c-43a0-9abe-d846764a9e11.png" 
          alt="Luxury salon interior" 
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
                src="/lovable-uploads/2fba1cd5-b1ed-4030-b7e1-06517fbab43e.png" 
                alt="Premium nail salon interior"
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
                src="/lovable-uploads/f3f2a5ae-65d9-4442-8842-1cb9e26cdb56.png" 
                alt="Luxury salon with elegant styling chair"
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
