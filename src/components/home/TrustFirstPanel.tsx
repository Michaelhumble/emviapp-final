
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import WhyTrustSection from "./sections/WhyTrustSection";
import PricingDialog from "./dialogs/PricingDialog";

const TrustFirstPanel: React.FC = () => {
  const [showStickyButton, setShowStickyButton] = useState(false);
  
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sectionPosition = document.getElementById('what-you-can-do')?.offsetTop || 0;
      setShowStickyButton(scrollY > sectionPosition + 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <WhyTrustSection />

      {/* Sticky button for mobile */}
      {showStickyButton && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 w-auto max-w-[95%]"
        >
          <div className="flex gap-4 bg-white/95 backdrop-blur-md shadow-xl p-3 rounded-full border border-gray-100">
            <PricingDialog />
          </div>
        </motion.div>
      )}
    </>
  );
};

export default TrustFirstPanel;
