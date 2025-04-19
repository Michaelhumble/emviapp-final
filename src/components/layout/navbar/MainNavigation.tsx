
import { Link } from "react-router-dom";

const MainNavigation = () => {
  return (
    <nav className="flex items-center gap-6">
      <Link 
        to="/salons" 
        className="text-sm font-medium text-gray-700 hover:text-primary"
      >
        Salons
      </Link>
      <Link 
        to="/artists" 
        className="text-sm font-medium text-gray-700 hover:text-primary"
      >
        Artists
      </Link>
      <Link 
        to="/jobs" 
        className="text-sm font-medium text-gray-700 hover:text-primary"
      >
        Jobs
      </Link>
      <Link 
        to="/pricing" 
        className="text-sm font-medium text-primary hover:text-primary/80"
      >
        Pricing
      </Link>
    </nav>
  );
};

export default MainNavigation;
