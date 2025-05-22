
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { AnimatePresence, motion } from "framer-motion";
import { mainNavigationItems } from '@/components/layout/navbar/config/navigationItems';
import { useTranslation } from "@/hooks/useTranslation";

const MobileBottomNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  // Only show bar on mobile screens
  if (!isMobile) return null;

  // Get the main navigation items we want to show in the bottom bar
  // Filter to just the most important items to avoid overcrowding
  const navItems = mainNavigationItems
    .filter(item => ["/", "/artists", "/jobs", "/salons"].includes(item.path))
    .slice(0, 4); // Limit to 4 items for the bottom bar

  // Tab activation logic: exact match for '/', substring for others
  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  function BounceFadeIcon({ isActive, icon: Icon, tabKey }: { isActive: boolean, icon: any, tabKey: string }) {
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
        <Icon 
          strokeWidth={isActive ? 2.3 : 2} 
          className={cn("transition-all", isActive ? "text-emvi-accent scale-110" : "text-gray-500")} 
          size={26} 
        />
      </motion.div>
    );
  }

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
      }}
      role="navigation"
      aria-label="Bottom navigation"
    >
      <ul className="flex justify-between items-end h-16">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <li
              key={item.path}
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
                  if (!active) navigate(item.path);
                }}
                aria-label={t({
                  english: item.title,
                  vietnamese: item.vietnameseTitle || item.title
                })}
                style={{
                  outline: "none",
                  WebkitTapHighlightColor: "transparent"
                }}
              >
                <span className="relative flex items-center justify-center h-8 w-8 mb-[2px]">
                  <AnimatePresence mode="wait" initial={false}>
                    <BounceFadeIcon
                      key={active ? item.path + "-active" : item.path}
                      isActive={active}
                      icon={item.icon}
                      tabKey={item.path}
                    />
                  </AnimatePresence>
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
                  {t({
                    english: item.title,
                    vietnamese: item.vietnameseTitle || item.title
                  })}
                </span>
              </button>
            </li>
          );
        })}
        
        {/* Add the hamburger menu button to the bottom navbar */}
        <li className="flex-1 flex justify-center">
          <MobileMenuBottomButton />
        </li>
      </ul>
    </nav>
  );
};

// Component for the hamburger menu in the bottom nav bar
const MobileMenuBottomButton = () => {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="relative flex flex-col items-center w-full py-1.5 px-0 group transition-all duration-150 font-semibold min-w-[60px] text-gray-500"
          aria-label="Menu"
          style={{
            outline: "none",
            WebkitTapHighlightColor: "transparent"
          }}
        >
          <span className="relative flex items-center justify-center h-8 w-8 mb-[2px]">
            <Menu 
              strokeWidth={2} 
              className="text-gray-500" 
              size={26} 
            />
          </span>
          <span
            className="block text-[.88rem] text-gray-500"
            style={{
              fontFamily: "Playfair Display, serif",
              letterSpacing: "0.02em",
              fontWeight: 500,
            }}
          >
            {t({
              english: 'Menu',
              vietnamese: 'Menu'
            })}
          </span>
        </button>
      </SheetTrigger>
      
      // ... SheetContent will be added here
    </Sheet>
  );
};

// Import needed components 
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React from "react";

export default MobileBottomNavBar;
