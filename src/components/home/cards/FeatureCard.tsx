
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

// Animation variants
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, className }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className={className}
  >
    <Card className="h-full backdrop-blur-sm bg-white/90 border border-gray-100 shadow hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="p-3 rounded-full bg-primary/10 mb-4">
          {icon}
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

export default FeatureCard;
