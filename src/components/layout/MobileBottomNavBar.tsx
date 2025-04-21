
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { AnimatePresence, motion } from "framer-motion";

// Use lucide icons for clean, scalable SVGs (matching user's provided icon set)
import { Home, Search, MessageCircle, Heart, User } from "lucide-react";

const navTabs = [
  {
    key: "home",
    label: "Home",
    route: "/",
    icon: (active: boolean) => (
      <Home strokeWidth={active ? 2.3 : 2} className={cn(
        "transition-all", active ? "text-emvi-accent scale-110" : "text-gray-500"
      )} size={26} />
    ),
  },
  {
    key: "search",
    label: "Search",
    route: "/search",
    icon: (active: boolean) => (
      <Search strokeWidth={active ? 2.3 : 2} className={cn(
        "transition-all", active ? "text-emvi-accent scale-110" : "text-gray-500"
      )} size={26} />
    ),
  },
  {
    key: "messages",
    label: "Messages",
    route: "/messages",
    icon: (active: boolean) => (
      <MessageCircle strokeWidth={active ? 2.3 : 2} className={cn(
        "transition-all", active ? "text-emvi-accent scale-110" : "text-gray-500"
      )} size={26}/>
    ),
    notification: true, // unread state simulation
  },
  {
    key: "bookings",
    label: "Bookings",
    route: "/bookings",
    icon: (active: boolean) => (
      <Heart strokeWidth={active ? 2.3 : 2} className={cn(
        "transition-all", active ? "text-emvi-accent scale-110" : "text-gray-500"
      )} size={26} />
    ),
  },
  {
    key: "profile",
    label: "Profile",
    route: "/profile",
    icon: (active: boolean) => (
      <User strokeWidth={active ? 2.3 : 2} className={cn(
        "transition-all", active ? "text-emvi-accent scale-110" : "text-gray-500"
      )} size={26} />
    ),
  },
];

function BounceFadeIcon({ isActive, icon, tabKey }: { isActive: boolean, icon: (active: boolean) => JSX.Element, tabKey: string }) {
  return (
    <motion.div
      key={tabKey + (isActive ? "-active" : "-inactive")}
      initial={{ scale: 0.95, opacity: 0.7, y: 6 }}
      animate={{
        scale: isActive ? 1.14 : 1,
        opacity: 1,
        y: isActive ? -3 : 0
      }}
      exit={{ scale: 0.94, opacity: 0.65, y: 3 }}
      transition={{
        type: "spring",
        stiffness: 380,
        damping: 17
      }}
      className={cn(
        "flex items-center justify-center transition-all duration-200"
      )}
      style={{ minWidth: 26, minHeight: 26 }}
      aria-hidden="true"
    >
      {icon(isActive)}
    </motion.div>
  );
}

const MobileBottomNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Only show bar on mobile screens
  if (!isMobile) return null;

  // Tab activation logic: exact match for '/', substring for others
  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  // Simulate unread messages (make dynamic later if needed)
  const hasUnreadMessages = true;

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "md:hidden bg-emvi-offwhite border-t border-gray-200",
        "shadow-mobile-navbar",
        "backdrop-blur-md",
        "rounded-t-xl px-2 pb-safe-area animate-fade-in nav-bottom-glow"
      )}
      style={{
        fontFamily: "Inter, sans-serif",
        transition: "box-shadow 0.2s cubic-bezier(0.4,0,0.2,1)",
        // Smooth sticky feel on mobile
      }}
      role="navigation"
      aria-label="Bottom navigation"
    >
      <ul className="flex justify-between items-end h-16">
        {navTabs.map((tab) => {
          const active = isActive(tab.route);
          const showDot = tab.key === "messages" && hasUnreadMessages;
          return (
            <li
              key={tab.key}
              className="flex-1 flex justify-center"
              aria-current={active ? "page" : undefined}
            >
              <button
                type="button"
                tabIndex={active ? -1 : 0}
                className={cn(
                  "relative flex flex-col items-center w-full py-1.5 px-0 group transition-all duration-150 font-semibold min-w-[60px]",
                  active ? "text-emvi-accent font-bold" : "text-gray-500"
                )}
                onClick={() => {
                  if (!active) navigate(tab.route);
                }}
                aria-label={tab.label}
                style={{
                  outline: "none",
                  WebkitTapHighlightColor: "transparent"
                }}
              >
                <span className="relative flex items-center justify-center h-8 w-8 mb-[2px]">
                  <AnimatePresence mode="wait" initial={false}>
                    <BounceFadeIcon
                      key={active ? tab.key + "-active" : tab.key}
                      isActive={active}
                      icon={tab.icon}
                      tabKey={tab.key}
                    />
                  </AnimatePresence>
                  {/* Notification Dot for Messages */}
                  {showDot && (
                    <span className="absolute top-[2px] right-[-2px] w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-emvi-offwhite animate-pulse shadow-sm"></span>
                  )}
                </span>
                <span
                  className={cn(
                    "block text-[.88rem]",
                    active ? "text-emvi-accent" : "text-gray-500"
                  )}
                  style={{
                    fontFamily: "Playfair Display, serif",
                    letterSpacing: "0.02em",
                    fontWeight: active ? 700 : 500,
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

