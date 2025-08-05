
import React from "react";
import { motion } from "framer-motion";
import { itemVariants } from "./FeatureCard";

export interface SimplePrincipleCardProps {
  icon: React.ReactNode;
  title: string;
}

const SimplePrincipleCard: React.FC<SimplePrincipleCardProps> = ({ icon, title }) => (
  <motion.div 
    variants={itemVariants} 
    className="group bg-white rounded-xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md hover:border-slate-300/80 transition-all duration-300 hover:-translate-y-1"
  >
    <div className="flex flex-col items-center text-center gap-4">
      <div className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="font-display font-semibold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors duration-300">
        {title}
      </h3>
    </div>
  </motion.div>
);

export default SimplePrincipleCard;
