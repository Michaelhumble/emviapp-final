
import { Link } from "react-router-dom";
import { NavigationItem } from "../navbar/types";

interface NavItemProps {
  item: NavigationItem;
}

export const NavItem = ({ item }: NavItemProps) => {
  const { path, label, isPrimary } = item;
  
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
