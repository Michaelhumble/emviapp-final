
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SignOutButton from "./SignOutButton";
import { Home, Scissors, Briefcase, Calendar, ShoppingCart, User, Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import EmviLogo from "./EmviLogo";

const Navbar = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const isAuthenticated = !!user;
  const isAdmin = user?.email === "michaelnguyen510@gmail.com";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  const getNavLinkClass = (path: string) => {
    return `flex items-center transition-all px-4 py-2.5 rounded-xl ${
      isActive(path) 
        ? "text-white font-medium bg-white/10 shadow-inner" 
        : "text-white/80 hover:text-white hover:bg-white/5"
    }`;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 px-6 py-4 flex justify-between items-center shadow-xl border-b border-white/5 transition-all">
      <div className="text-2xl font-bold tracking-wide">
        <Link to="/" className="flex items-center">
          <EmviLogo />
        </Link>
      </div>
      
      {/* Mobile menu button */}
      <button 
        className="md:hidden flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
        onClick={toggleMobileMenu}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {mobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
      </button>
      
      {/* Desktop navigation */}
      {loading ? (
        <div className="hidden md:flex animate-pulse space-x-4">
          <div className="h-5 w-12 bg-white/10 rounded-full"></div>
          <div className="h-5 w-12 bg-white/10 rounded-full"></div>
        </div>
      ) : (
        <div className="hidden md:flex space-x-2 items-center">
          {isAuthenticated ? (
            <>
              <Link to="/" className={getNavLinkClass("/")}>
                <Home size={18} className="mr-2 opacity-80" strokeWidth={1.5} />
                <span>Home</span>
              </Link>
              <Link to="/salons" className={getNavLinkClass("/salons")}>
                <Scissors size={18} className="mr-2 opacity-80" strokeWidth={1.5} />
                <span>Salons</span>
              </Link>
              <Link to="/jobs" className={getNavLinkClass("/jobs")}>
                <Briefcase size={18} className="mr-2 opacity-80" strokeWidth={1.5} />
                <span>Jobs</span>
              </Link>
              <Link to="/bookings" className={getNavLinkClass("/bookings")}>
                <Calendar size={18} className="mr-2 opacity-80" strokeWidth={1.5} />
                <span>Bookings</span>
              </Link>
              <Link to="/store" className={getNavLinkClass("/store")}>
                <ShoppingCart size={18} className="mr-2 opacity-80" strokeWidth={1.5} />
                <span>Credits</span>
              </Link>
              <Link to="/profile" className={getNavLinkClass("/profile")}>
                <User size={18} className="mr-2 opacity-80" strokeWidth={1.5} />
                <span>Profile</span>
              </Link>
              {isAdmin && (
                <Link to="/admin" className={`${getNavLinkClass("/admin")} text-amber-300 hover:text-amber-200`}>
                  <Shield size={18} className="mr-2 opacity-80" strokeWidth={1.5} />
                  <span>Admin</span>
                </Link>
              )}
              <div>
                <SignOutButton />
              </div>
            </>
          ) : (
            <>
              <Link to="/signin" className="px-4 py-2.5 hover:text-gray-300 transition-colors">
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-5 py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
      
      {/* Mobile navigation overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-lg z-40 flex flex-col pt-20 px-4 animate-fade-in">
          <div className="flex flex-col space-y-2">
            {isAuthenticated ? (
              <>
                <Link to="/" onClick={toggleMobileMenu} className={`py-3 px-4 rounded-xl ${isActive("/") ? "bg-purple-800/30 text-white" : "text-white/80"}`}>
                  <div className="flex items-center">
                    <Home size={20} className="mr-3" strokeWidth={1.5} />
                    <span className="text-lg">Home</span>
                  </div>
                </Link>
                <Link to="/salons" onClick={toggleMobileMenu} className={`py-3 px-4 rounded-xl ${isActive("/salons") ? "bg-purple-800/30 text-white" : "text-white/80"}`}>
                  <div className="flex items-center">
                    <Scissors size={20} className="mr-3" strokeWidth={1.5} />
                    <span className="text-lg">Salons</span>
                  </div>
                </Link>
                <Link to="/jobs" onClick={toggleMobileMenu} className={`py-3 px-4 rounded-xl ${isActive("/jobs") ? "bg-purple-800/30 text-white" : "text-white/80"}`}>
                  <div className="flex items-center">
                    <Briefcase size={20} className="mr-3" strokeWidth={1.5} />
                    <span className="text-lg">Jobs</span>
                  </div>
                </Link>
                <Link to="/bookings" onClick={toggleMobileMenu} className={`py-3 px-4 rounded-xl ${isActive("/bookings") ? "bg-purple-800/30 text-white" : "text-white/80"}`}>
                  <div className="flex items-center">
                    <Calendar size={20} className="mr-3" strokeWidth={1.5} />
                    <span className="text-lg">Bookings</span>
                  </div>
                </Link>
                <Link to="/store" onClick={toggleMobileMenu} className={`py-3 px-4 rounded-xl ${isActive("/store") ? "bg-purple-800/30 text-white" : "text-white/80"}`}>
                  <div className="flex items-center">
                    <ShoppingCart size={20} className="mr-3" strokeWidth={1.5} />
                    <span className="text-lg">Store</span>
                  </div>
                </Link>
                <Link to="/profile" onClick={toggleMobileMenu} className={`py-3 px-4 rounded-xl ${isActive("/profile") ? "bg-purple-800/30 text-white" : "text-white/80"}`}>
                  <div className="flex items-center">
                    <User size={20} className="mr-3" strokeWidth={1.5} />
                    <span className="text-lg">Profile</span>
                  </div>
                </Link>
                {isAdmin && (
                  <Link to="/admin" onClick={toggleMobileMenu} className={`py-3 px-4 rounded-xl text-amber-300 ${isActive("/admin") ? "bg-amber-900/30" : ""}`}>
                    <div className="flex items-center">
                      <Shield size={20} className="mr-3" strokeWidth={1.5} />
                      <span className="text-lg">Admin</span>
                    </div>
                  </Link>
                )}
                <div className="pt-4 mt-4 border-t border-white/10">
                  <div onClick={toggleMobileMenu}>
                    <SignOutButton />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-3 py-4">
                <Link 
                  to="/signin" 
                  onClick={toggleMobileMenu}
                  className="w-full py-3 text-center text-white bg-white/5 rounded-xl border border-white/10 transition-all duration-300 hover:bg-white/10"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  onClick={toggleMobileMenu}
                  className="w-full py-3 text-center text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
