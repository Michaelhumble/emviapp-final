
import { mainNavigationItems } from "../navbar/config/navigationItems";
import { NavItem } from "./NavItem";

const MainNavigation = () => {
  return (
    <nav className="flex items-center gap-6">
      {mainNavigationItems.map((item) => (
        <NavItem key={item.path} item={item} />
      ))}
    </nav>
  );
};

export default MainNavigation;
