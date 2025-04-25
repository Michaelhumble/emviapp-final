
import { Link } from "react-router-dom";
import { NavigationItem } from "../navbar/types";
import { motion } from "framer-motion";

interface NavItemProps {
  item: NavigationItem;
}

export const NavItem = ({ item }: NavItemProps) => {
  const { path, title, isPrimary } = item;
  
  return (
    <Link 
      to={path} 
      className={`text-sm font-medium font-playfair ${
        isPrimary 
          ? "text-primary hover:text-primary/80" 
          : "text-gray-700 hover:text-primary"
      }`}
    >
      {title}
    </Link>
  );
};
