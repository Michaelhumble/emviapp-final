
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Home, Search, MessageCircle, Heart, User } from "lucide-react";

const NAV_TABS = [
  {
    key: "home",
    label: "Home",
    route: "/",
    icon: Home,
  },
  {
    key: "search",
    label: "Search",
    route: "/search",
    icon: Search,
  },
  {
    key: "messages",
    label: "Messages",
    route: "/messages",
    icon: MessageCircle,
    notification: true,
  },
  {
    key: "bookings",
    label: "Bookings",
    route: "/bookings",
    icon: Heart,
  },
  {
    key: "profile",
    label: "Profile",
    route: "/profile",
    icon: User,
  },
];

function TabIcon({ Icon, isActive }: { Icon: any; isActive: boolean }) {
  return (
    <motion.div
      initial={{ scale: 0.92, opacity: 0.8, y: 10 }}
      animate={{
        scale: isActive ? 1.14 : 1,
        opacity: 1,
        y: isActive ? -4 : 0,
        filter: isActive
          ? "drop-shadow(0px 0px 7px #9b87f5cc)"
          : "drop-shadow(0px 2px 4px #b1a6d6cc)",
      }}
      exit={{ scale: 0.92, opacity: 0.7, y: 4 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
      }}
      className={cn(
        "flex items-center justify-center transition-all"
      )}
      style={{ minWidth: 30, minHeight: 30 }}
      aria-hidden="true"
    >
      <Icon
        strokeWidth={isActive ? 2.4 : 2}
        className={cn(
          "transition-all duration-200",
          isActive ? "text-emvi-accent scale-110" : "text-gray-500"
        )}
        size={28}
      />
    </motion.div>
  );
}

const SuperMobileBottomNavBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  // Simulated unread notification logic for demo
  const hasUnreadMessages = true;

  return (
    <motion.nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "md:hidden px-2 pb-safe-area",
        // Glassmorphism
        "backdrop-blur-xl bg-white/70 dark:bg-emvi-offwhite/70 border-t border-gray-200/60",
        "shadow-mobile-navbar nav-bottom-glow",
        "rounded-t-xl",
        "animate-fade-in"
      )}
      style={{
        fontFamily: "Inter, Playfair Display, serif",
        transition: "box-shadow 0.3s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: "0 8px 32px 0 #6556ac18, 0 1.5px 12px 0 #9b87f522",
        // Glassmorphism extra
        backdropFilter: "blur(22px)",
        WebkitBackdropFilter: "blur(22px)"
      }}
      role="navigation"
      aria-label="Bottom navigation"
    >
      <ul className="flex justify-between items-end h-16">
        {NAV_TABS.map(tab => {
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
                  "relative flex flex-col items-center w-full py-1.5 px-0 group transition-all duration-200 font-semibold min-w-[58px]",
                  active ? "text-emvi-accent font-bold" : "text-gray-500"
                )}
                style={{
                  fontFamily: "Inter, Playfair Display, serif",
                  letterSpacing: ".01em"
                }}
                onClick={() => {
                  if (!active) {
                    // Animate ripple quickly (visual feedback)
                    const el = document.activeElement as HTMLElement;
                    if (el && el.blur) el.blur();
                    navigate(tab.route);
                  }
                }}
                aria-label={tab.label}
              >
                <span className="relative flex items-center justify-center h-9 w-9 mb-[2px]">
                  <AnimatePresence mode="wait" initial={false}>
                    <TabIcon
                      Icon={tab.icon}
                      isActive={active}
                      key={active ? tab.key + "-active" : tab.key}
                    />
                  </AnimatePresence>
                  {/* Message notification bubble */}
                  {showDot && (
                    <motion.span
                      className="absolute top-[1px] right-[-3px] w-2.5 h-2.5 rounded-full border border-white bg-red-500 shadow"
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.7, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 420, damping: 16 }}
                      style={{
                        boxShadow: "0 1px 6px #f4433677"
                      }}
                    />
                  )}
                </span>
                <span
                  className={cn(
                    "block text-[.89rem] leading-none",
                    active
                      ? "text-emvi-accent"
                      : "text-gray-500 group-hover:text-gray-800"
                  )}
                  style={{
                    fontFamily: "Playfair Display, Inter, serif",
                    fontWeight: active ? 700 : 500,
                    letterSpacing: ".02em"
                  }}
                >
                  {tab.label}
                </span>
                {/* Animated active underline */}
                {active && (
                  <motion.span
                    layoutId="active-underline"
                    className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 h-[3.5px] w-7 rounded-xl bg-gradient-to-r from-emvi-accent via-[#cbdafe] to-emvi-accent shadow"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 28, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 440, damping: 25 }}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
};

export default SuperMobileBottomNavBar;
