
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FinalFounderCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50/50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            We didn't build EmviApp to compete.<br />
            We built it to complete the picture.
          </h2>
          
          <p className="text-lg text-gray-700 italic mb-8">
            "We're here to make sure no artist, no owner, and no dream gets left behind — no matter what language you speak, or where you started."
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/jobs">
              <Button variant="outline" size="lg" className="w-full">
                Explore Jobs
              </Button>
            </Link>
            <Link to="/artists">
              <Button variant="outline" size="lg" className="w-full">
                Join as Artist
              </Button>
            </Link>
            <Link to="/salons">
              <Button variant="outline" size="lg" className="w-full">
                List My Salon
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full"
              onClick={() => {
                localStorage.setItem('emvi_language_preference', 'vi');
                window.dispatchEvent(new CustomEvent('languageChanged', { 
                  detail: { language: 'vi' } 
                }));
                window.scrollTo(0, 0);
              }}
            >
              Tiếng Việt Version
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalFounderCTA;
