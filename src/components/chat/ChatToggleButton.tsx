
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChatToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function ChatToggleButton({ isOpen, onClick }: ChatToggleButtonProps) {
  const isMobile = useIsMobile();

  // Don't show the toggle button if the chat is already open on mobile
  if (isOpen && isMobile) return null;

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 25,
          }}
          className="fixed bottom-4 right-4 z-[1000]"
          style={{
            ...(isMobile && { bottom: '80px' }) // Adjust position for mobile to stay above nav bar
          }}
        >
          <Button
            onClick={onClick}
            className={`${isMobile ? 'h-14 w-14' : 'h-12 w-12'} rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90`}
            aria-label="Chat with Little Sunshine AI"
          >
            <Sparkles size={isMobile ? 24 : 20} />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
