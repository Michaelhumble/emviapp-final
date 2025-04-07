
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
          <h1 className="text-3xl md:text-5xl font-bold font-serif tracking-wide mb-6">Be Seen. Be Hired. Be Celebrated.</h1>
          <p className="text-lg text-gray-600 mb-10 font-sans leading-relaxed">
            Your profile works while you rest. EmviApp promotes your talent with AI.
          </p>
          <Link to="/auth/signup">
            <Button size="lg" className="font-medium px-8 py-6 text-base">
              Claim My Artist Profile
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
