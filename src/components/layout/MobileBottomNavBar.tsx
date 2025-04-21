
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Search, MessageSquare, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";

// If you have unread state in context, replace this with the actual check.
const hasUnreadMessages = true; // Mock - TODO: wire up actual unread logic if available

const navTabs = [
  {
    label: "Home",
    icon: Home,
    path: "/",
  },
  {
    label: "Search",
    icon: Search,
    path: "/explore/artists",
  },
  {
    label: "Messages",
    icon: MessageSquare,
    path: "/messages",
    notificationDot: hasUnreadMessages,
  },
  {
    label: "Bookings",
    icon: Heart,
    path: "/my-bookings",
  },
  {
    label: "Profile",
    icon: User,
    path: "/profile",
  },
];

const MobileBottomNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Early exit (sr-only when not on mobile)
  if (!isMobile) return null;

  const matches = (tabPath: string) => {
    if (tabPath === "/") return location.pathname === "/";
    return location.pathname.startsWith(tabPath);
  };

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 md:hidden",
        "bg-emvi-offwhite border-t border-gray-200",
        "shadow-[0_2px_24px_0_rgba(155,135,245,0.09)]",
        "backdrop-blur-sm",
        "rounded-t-xl",
        "px-2 pb-safe-area"
      )}
      style={{
        fontFamily: "Inter, sans-serif",
        transition: "box-shadow 0.2s cubic-bezier(0.4,0,0.2,1)"
      }}
      role="navigation"
      aria-label="Bottom navigation"
    >
      <ul className="flex justify-between items-end h-16">
        {navTabs.map((tab, idx) => {
          const active = matches(tab.path);
          const Icon = tab.icon;
          const showDot = !!tab.notificationDot;
          return (
            <li
              key={tab.path}
              className="flex-1 flex justify-center"
              aria-current={active ? "page" : undefined}
            >
              <button
                type="button"
                tabIndex={0}
                className={cn(
                  "relative flex flex-col items-center w-full py-2 px-0 focus:outline-none group transition-all duration-200",
                  active ? "font-bold text-emvi-accent" : "text-gray-500"
                )}
                onClick={() => {
                  if (!active) navigate(tab.path);
                }}
                aria-label={tab.label}
              >
                <span className="relative flex items-center justify-center h-7 w-7">
                  <AnimatePresence>
                    {active ? (
                      <motion.span
                        key="active"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1.15, opacity: 1 }}
                        exit={{ scale: 0.98, opacity: 0.7 }}
                        transition={{ type: "spring", stiffness: 360, damping: 14 }}
                        className="text-[1.55rem] text-emvi-accent"
                      >
                        <Icon />
                      </motion.span>
                    ) : (
                      <span className="text-[1.4rem]">
                        <Icon />
                      </span>
                    )}
                  </AnimatePresence>
                  {/* Notification Dot for Messages only */}
                  {tab.label === "Messages" && showDot && (
                    <span className="absolute top-1 right-0 inline-block w-2.5 h-2.5 bg-primary rounded-full border-2 border-emvi-offwhite animate-pulse"></span>
                  )}
                </span>
                <span
                  className={cn(
                    "block text-xs mt-0.5",
                    active ? "text-emvi-accent" : "text-gray-500"
                  )}
                  style={{
                    fontFamily: "Playfair Display, serif"
                  }}
                >
                  {tab.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileBottomNavBar;
