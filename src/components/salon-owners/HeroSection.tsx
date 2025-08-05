
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-[#FDFDFD] py-20 md:py-28">
      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold font-serif tracking-wide mb-6">Your Dream Team Is One Click Away.</h1>
          <p className="text-lg text-gray-600 mb-10 font-sans leading-relaxed">
            Post jobs, view top-rated artists, and fill empty chairs fast — powered by AI.
          </p>
          <a href="http://emviapp-final.lovable.app/auth/signup?redirect=%2F">
            <Button size="lg" className="font-medium px-8 py-6 text-base">
              Start Hiring
            </Button>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
