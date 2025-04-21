
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { AnimatePresence, motion } from "framer-motion";

// --- Emoji icon component with animation ---
const emojiIcons = {
  home: { emoji: "🏠", label: "home" },
  search: { emoji: "🔍", label: "search" },
  messages: { emoji: "💬", label: "messages" },
  bookings: { emoji: "❤️", label: "bookings" },
  profile: { emoji: "👤", label: "profile" },
};

function AnimatedEmoji({ emoji, label, active }: { emoji: string, label: string, active: boolean }) {
  return (
    <motion.span
      role="img"
      aria-label={label}
      className={cn("emoji", active ? "emoji-pop" : "")}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: active ? 1.15 : 1, opacity: 1 }}
      exit={{ scale: 0.94, opacity: 0.7 }}
      transition={{ type: "spring", stiffness: 340, damping: 17 }}
      style={{
        display: "inline-block"
      }}
    >
      {emoji}
    </motion.span>
  );
}

// --- Nav Tab Data ---
const navTabs = [
  {
    key: "home",
    label: "Home",
    route: "/",
    icon: emojiIcons.home,
  },
  {
    key: "search",
    label: "Search",
    route: "/search",
    icon: emojiIcons.search,
  },
  {
    key: "messages",
    label: "Messages",
    route: "/messages",
    icon: emojiIcons.messages,
    notification: true, // set this true if unread
  },
  {
    key: "bookings",
    label: "Bookings",
    route: "/bookings",
    icon: emojiIcons.bookings,
  },
  {
    key: "profile",
    label: "Profile",
    route: "/profile",
    icon: emojiIcons.profile,
  },
];

const MobileBottomNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Only show bar on mobile
  if (!isMobile) return null;

  // Tab activation logic: exact for /, substring for others
  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  // Simulate unread messages (if available, make this dynamic)
  const hasUnreadMessages = true;

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 md:hidden",
        "bg-emvi-offwhite border-t border-gray-200",
        "shadow-[0_2px_14px_0_rgba(155,135,245,0.10)]",
        "backdrop-blur-sm",
        "rounded-t-xl",
        "px-2 pb-safe-area",
        "animate-fade-in"
      )}
      style={{
        fontFamily: "Inter, sans-serif",
        transition: "box-shadow 0.2s cubic-bezier(0.4,0,0.2,1)"
      }}
      role="navigation"
      aria-label="Bottom navigation"
    >
      <ul className="flex justify-between items-end h-16">
        {navTabs.map((tab) => {
          const active = isActive(tab.route);
          const { icon } = tab;
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
                  "relative flex flex-col items-center w-full py-2 px-0 group transition-all duration-200 font-semibold",
                  active ? "text-emvi-accent font-bold" : "text-gray-500"
                )}
                onClick={() => {
                  if (!active) navigate(tab.route);
                }}
                aria-label={tab.label}
                style={{
                  outline: "none"
                }}
              >
                <span className="relative flex items-center justify-center h-7 w-7 mb-1">
                  <AnimatePresence mode="wait" initial={false}>
                    <AnimatedEmoji
                      key={active ? tab.key + "-active" : tab.key}
                      emoji={icon.emoji}
                      label={icon.label}
                      active={active}
                    />
                  </AnimatePresence>
                  {/* Notification Dot for Messages */}
                  {showDot && (
                    <span className="absolute top-[2px] right-[-3px] w-2.5 h-2.5 bg-primary rounded-full border-2 border-emvi-offwhite animate-pulse"></span>
                  )}
                </span>
                <span
                  className={cn(
                    "block text-[.9rem]",
                    active ? "text-emvi-accent" : "text-gray-500"
                  )}
                  style={{
                    fontFamily: "Playfair Display, serif",
                    letterSpacing: 0.2,
                    fontSize: "0.92rem",
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

