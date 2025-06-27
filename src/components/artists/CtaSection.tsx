
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/context/auth/AuthModalProvider";

const CtaSection = () => {
  const { openModal } = useAuthModal();

  return (
    <section className="bg-primary/5 py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">Join EmviApp — the Platform Made for Artists</h2>
          <p className="text-lg text-gray-600 mb-8">
            Take control of your career, connect with clients who value your work, and become part of a supportive community of beauty professionals.
          </p>
          <Button 
            size="lg" 
            className="font-medium px-8 py-6 text-base hover:scale-105 transition-transform"
            onClick={() => openModal('signup')}
          >
            Get Started Today
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
