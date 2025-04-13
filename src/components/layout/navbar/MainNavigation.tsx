
import React from "react";
import { Link, useLocation } from "react-router-dom";

const MainNavigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const linkClasses = "px-3 py-2 transition-colors hover:text-primary";
  const activeLinkClasses = "text-primary font-medium";

  return (
    <nav className="flex items-center space-x-1">
      <Link 
        to="/artists" 
        className={`${linkClasses} ${isActive('/artists') ? activeLinkClasses : ''}`}
      >
        Artists
      </Link>
      <Link 
        to="/salons" 
        className={`${linkClasses} ${isActive('/salons') ? activeLinkClasses : ''}`}
      >
        Salons
      </Link>
      <Link 
        to="/jobs" 
        className={`${linkClasses} ${isActive('/jobs') ? activeLinkClasses : ''}`}
      >
        Jobs
      </Link>
      <Link 
        to="/booths" 
        className={`${linkClasses} ${isActive('/booths') ? activeLinkClasses : ''}`}
      >
        Booths
      </Link>
    </nav>
  );
};

export default MainNavigation;
