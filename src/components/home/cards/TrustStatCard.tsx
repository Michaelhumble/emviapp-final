
import React from "react";
import { motion } from "framer-motion";
import { itemVariants } from "./FeatureCard";

export interface TrustStatCardProps {
  icon: React.ReactNode;
  stat: string;
  description: string;
}

const TrustStatCard: React.FC<TrustStatCardProps> = ({ icon, stat, description }) => (
  <motion.div
    variants={itemVariants}
    className="flex flex-col items-center text-center p-4"
  >
    <div className="p-2 rounded-full bg-primary/5 mb-2">
      {icon}
    </div>
    <p className="font-semibold text-xl mb-1">{stat}</p>
    <p className="text-gray-600 text-sm">{description}</p>
  </motion.div>
);

export default TrustStatCard;
