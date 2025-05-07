
import { Link } from "react-router-dom";
import { NavigationItem } from "./types";

interface NavItemProps {
  item: NavigationItem;
}

export const NavItem = ({ item }: NavItemProps) => {
  // Use title or fall back to label if title isn't available
  const displayText = item.title || item.label;
  const { path, isPrimary } = item;
  
  return (
    <Link 
      to={path} 
      className={`text-sm font-medium font-playfair ${
        isPrimary 
          ? "text-primary hover:text-primary/80" 
          : "text-gray-700 hover:text-primary"
      }`}
    >
      {displayText}
    </Link>
  );
};
