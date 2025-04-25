
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const EmotionalClosingSection = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-purple-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-4">
            "You're not late. You're right on time."
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Whether you're brand new or 20 years deep — EmviApp was made for you.
            <br className="hidden md:block" />
            You focus on your craft. We'll carry the tech.
          </p>
          
          <div className={`flex flex-col ${isMobile ? 'space-y-3' : 'sm:flex-row'} items-center justify-center ${!isMobile && 'gap-4'}`}>
            <Link to="/auth/signup" className="w-full sm:w-auto">
              <Button size={isMobile ? "default" : "lg"} className="min-w-[200px] w-full sm:w-auto min-h-[44px]">
                Get Started Free
              </Button>
            </Link>
            <Link to="/artists" className="w-full sm:w-auto">
              <Button variant="outline" size={isMobile ? "default" : "lg"} className="min-w-[200px] w-full sm:w-auto min-h-[44px]">
                Just Keep Exploring
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmotionalClosingSection;
