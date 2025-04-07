
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const MainNavigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  const navItems = [
    { path: '/jobs', label: 'Jobs' },
    { path: '/salons', label: 'Salons' },
    { path: '/sell-salon', label: 'Salon Sales' },
    { path: '/artists', label: 'Artists' },
  ];
  
  return (
    <nav className="hidden md:flex items-center space-x-1">
      {navItems.map(item => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "px-3 py-2 text-sm rounded-md transition-colors hover:text-primary hover:bg-muted",
            isActive(item.path) 
              ? "text-primary font-medium" 
              : "text-muted-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNavigation;
