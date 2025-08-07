import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { useKeyboardVisible } from '@/utils/mobileLayoutManager';
import { MOBILE_LAYOUT } from '@/utils/mobileLayoutManager';

interface MobileChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
  isMobile: boolean;
}

export const MobileChatInput: React.FC<MobileChatInputProps> = ({
  inputMessage,
  setInputMessage,
  onSendMessage,
  isLoading,
  isMobile
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isKeyboardVisible = useKeyboardVisible();

  // Auto-focus when keyboard opens
  useEffect(() => {
    if (isKeyboardVisible && textareaRef.current) {
      // Scroll to show input when keyboard opens
      textareaRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isKeyboardVisible]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  if (!isMobile) {
    // Desktop input (original design)
    return (
      <div className="p-6 border-t border-gray-100">
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
            placeholder="Ask Little Sunshine anything..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm bg-white"
            disabled={isLoading}
            style={{
              minHeight: MOBILE_LAYOUT.TOUCH_TARGETS.MIN_SIZE + 'px'
            }}
          />
          <motion.button
            onClick={onSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl px-4 py-3 hover:from-orange-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg touch-manipulation"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              minWidth: MOBILE_LAYOUT.TOUCH_TARGETS.MIN_SIZE + 'px',
              minHeight: MOBILE_LAYOUT.TOUCH_TARGETS.MIN_SIZE + 'px'
            }}
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    );
  }

  // Mobile input with keyboard-aware positioning
  return (
    <motion.div
      className="fixed left-0 right-0 z-[60] bg-white border-t border-gray-100"
      style={{
        bottom: isKeyboardVisible ? '0px' : `${MOBILE_LAYOUT.SAFE_AREAS.BOTTOM_SAFE_AREA}px`,
        paddingBottom: isKeyboardVisible ? 'env(safe-area-inset-bottom)' : '0px',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
      }}
      animate={{
        y: 0,
      }}
      initial={{
        y: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-white/80 backdrop-blur-md" />
      
      {/* Input container */}
      <div className="relative z-10 p-4">
        <div className="flex items-end space-x-3">
          {/* Textarea with auto-resize */}
          <div className="flex-1">
            <TextareaAutosize
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask Little Sunshine anything..."
              disabled={isLoading}
              maxRows={4}
              minRows={1}
              className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-300 text-base bg-white/90 backdrop-blur-sm transition-all duration-200 resize-none"
              style={{
                fontSize: '16px', // Prevents zoom on iOS
                lineHeight: '1.4',
                boxShadow: `
                  0 4px 12px rgba(0, 0, 0, 0.05),
                  inset 0 1px 0 rgba(255, 255, 255, 0.9),
                  0 0 0 1px rgba(255, 255, 255, 0.1)
                `,
              }}
            />
          </div>

          {/* Send button */}
          <motion.button
            onClick={onSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-2xl shadow-lg touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              width: `${MOBILE_LAYOUT.TOUCH_TARGETS.COMFORTABLE_SIZE}px`,
              height: `${MOBILE_LAYOUT.TOUCH_TARGETS.COMFORTABLE_SIZE}px`,
              minWidth: `${MOBILE_LAYOUT.TOUCH_TARGETS.COMFORTABLE_SIZE}px`,
              minHeight: `${MOBILE_LAYOUT.TOUCH_TARGETS.COMFORTABLE_SIZE}px`,
              boxShadow: `
                0 6px 20px rgba(251, 146, 60, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                0 0 0 1px rgba(255, 255, 255, 0.1)
              `,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            aria-label="Send message"
          >
            <Send className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Typing indicator */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-3 flex items-center text-sm text-orange-600"
            >
              <motion.div
                className="flex space-x-1"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-75" />
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-150" />
              </motion.div>
              <span className="ml-3 font-medium">Sunshine is thinking...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};