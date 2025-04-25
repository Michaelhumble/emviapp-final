
import { Link } from "react-router-dom";
import { NavigationItem } from "../navbar/types";
import { motion } from "framer-motion";

interface NavItemProps {
  item: NavigationItem;
}

export const NavItem = ({ item }: NavItemProps) => {
  const { path, label, isPrimary, highlight } = item;
  
  if (highlight) {
    return (
      <Link 
        to={path} 
        className="relative group"
      >
        <motion.span 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-sm font-medium overflow-hidden"
        >
          {/* Subtle animation effect */}
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200 animate-pulse"></span>
          <span className="z-10">🚀 {label}</span>
          {/* VIP indicator */}
          <span className="ml-1.5 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] bg-white/20 text-white rounded-sm font-bold tracking-wide">
            VIP
          </span>
        </motion.span>
      </Link>
    );
  }
  
  return (
    <Link 
      to={path} 
      className={`text-sm font-medium ${
        isPrimary 
          ? "text-primary hover:text-primary/80" 
          : "text-gray-700 hover:text-primary"
      }`}
    >
      {label}
    </Link>
  );
};
