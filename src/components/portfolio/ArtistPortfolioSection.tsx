
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PortfolioGallery from "./PortfolioGallery";
import { Image } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ArtistPortfolioSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-sm overflow-hidden">
        <CardHeader className={`bg-gradient-to-r from-purple-50 to-pink-50 pb-2 ${isMobile ? 'px-4 py-3' : ''}`}>
          <div className="flex items-center">
            <Image className="h-5 w-5 text-purple-500 mr-2" />
            <CardTitle className="text-xl font-serif">My Portfolio</CardTitle>
          </div>
          <CardDescription>
            Showcase your best work to attract and impress clients
          </CardDescription>
        </CardHeader>
        <CardContent className={isMobile ? 'p-4' : 'p-6'}>
          <PortfolioGallery />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArtistPortfolioSection;
