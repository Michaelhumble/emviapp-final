
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import EmviLogo from "@/components/branding/EmviLogo";
import MainNavigation from "./navbar/MainNavigation";
import { UserMenu } from "./navbar/UserMenu";
import AuthButtons from "./navbar/AuthButtons";
import MobileMenu from "./navbar/MobileMenu";
import LanguageToggle from "@/components/layout/LanguageToggle";
import { NotificationIcon } from "@/components/notifications/NotificationIcon";
import { useNotificationContext } from "@/context/notification";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NotificationList } from "@/components/notifications/NotificationList";
import { NotificationHeader } from "@/components/notifications/NotificationHeader";
import { NotificationDrawer } from "@/components/notifications/NotificationDrawer";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { notifications, unreadCount, fetchNotifications, markAsRead, markAllAsRead } = useNotificationContext();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  
  // Determine if we're on an explore page
  const isExplorePage = 
    location.pathname.includes('/artists') || 
    location.pathname.includes('/salons') || 
    location.pathname.includes('/jobs') || 
    location.pathname.includes('/salon-marketplace') || 
    location.pathname.includes('/freelancers') ||
    location.pathname.includes('/explore');
  
  // Determine if we're on a profile setup page
  const isProfileSetupPage = 
    location.pathname.includes('/profile/') && 
    location.pathname.includes('/setup');

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    toast.success("You've been signed out successfully");
  };

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    
    if (notification.link) {
      navigate(notification.link);
    }
    
    setNotificationsOpen(false);
  };

  // For smaller screens, use drawer
  const handleNotificationBellClick = () => {
    if (window.innerWidth < 768) {
      setNotificationDrawerOpen(true);
    } else {
      setNotificationsOpen(!notificationsOpen);
    }
    fetchNotifications();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between mx-auto h-16 px-4">
        <Link to="/" className="flex items-center">
          <EmviLogo size="small" />
        </Link>

        {/* Main navigation (hidden on mobile) */}
        <div className="hidden md:block">
          <MainNavigation />
        </div>

        {/* Auth buttons or user menu with language toggle */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Language toggle always visible */}
          <LanguageToggle minimal={true} className="mr-1" />
          
          {/* Notifications icon (only for logged in users) */}
          {user && (
            <>
              {/* Desktop dropdown */}
              <div className="hidden md:block">
                <Popover open={notificationsOpen} onOpenChange={(open) => {
                  setNotificationsOpen(open);
                  if (open) fetchNotifications();
                }}>
                  <PopoverTrigger asChild>
                    <div>
                      <NotificationIcon 
                        unreadCount={unreadCount}
                        onClick={handleNotificationBellClick}
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="end">
                    <NotificationHeader 
                      unreadCount={unreadCount}
                      onMarkAllAsRead={markAllAsRead}
                      variant="icon"
                    />
                    <NotificationList 
                      notifications={notifications}
                      onNotificationClick={handleNotificationClick}
                      variant="icon"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Mobile touchpoint */}
              <div className="md:hidden">
                <NotificationIcon 
                  unreadCount={unreadCount}
                  onClick={handleNotificationBellClick}
                />
              </div>
              
              {/* Mobile notification drawer */}
              <NotificationDrawer 
                open={notificationDrawerOpen} 
                onOpenChange={setNotificationDrawerOpen} 
              />
            </>
          )}
          
          {/* Auth buttons or user menu (hidden on mobile) */}
          <div className="hidden md:block">
            {user ? (
              <UserMenu />
            ) : (
              <AuthButtons />
            )}
          </div>
          
          {/* Mobile menu button */}
          <MobileMenu 
            user={user}
            handleSignOut={handleSignOut}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
