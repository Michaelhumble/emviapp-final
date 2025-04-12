
import React from "react";
import { motion } from "framer-motion";
import { itemVariants } from "./FeatureCard";

export interface SimplePrincipleCardProps {
  icon: React.ReactNode;
  title: string;
}

const SimplePrincipleCard: React.FC<SimplePrincipleCardProps> = ({ icon, title }) => (
  <motion.div variants={itemVariants} className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
    <div className="text-primary">{icon}</div>
    <p className="font-medium text-sm">{title}</p>
  </motion.div>
);

export default SimplePrincipleCard;
