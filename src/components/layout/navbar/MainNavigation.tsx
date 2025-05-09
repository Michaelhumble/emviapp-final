
import { mainNavigation } from "../navbar/config/navigationItems";
import { NavItem } from "./NavItem";
import { Link } from "react-router-dom";

const MainNavigation = () => {
  return (
    <nav className="flex items-center gap-6">
      <Link 
        to="/" 
        className="text-sm font-medium font-playfair text-gray-700 hover:text-primary"
      >
        Home
      </Link>
      {mainNavigation.map((item) => (
        <NavItem key={item.path} item={item} />
      ))}
    </nav>
  );
};

export default MainNavigation;
