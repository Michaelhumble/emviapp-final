
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { MessageBubble } from "./MessageBubble";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatToggleButton } from "./ChatToggleButton";
import { Sparkles } from "lucide-react";

export type MessageType = {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  isTyping?: boolean;
};

export function ChatSystem() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Refs for DOM elements and tracking
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Track if user is currently focused on input
  const isInputFocusedRef = useRef(false);
  
  // Initialize with welcome message when first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: MessageType = {
        id: `assistant-${Date.now()}`,
        content: "👋 Hi there! I'm Little Sunshine, your personal assistant. How can I help you today?",
        sender: "assistant",
        timestamp: new Date()
      };
      
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom when new messages arrive or chat opens
  const scrollToBottom = useCallback((smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "end"
      });
    }
  }, []);

  // Effect for scrolling to bottom on new messages
  useEffect(() => {
    if (isOpen && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isOpen, scrollToBottom]);
  
  // Handle resize events, particularly for mobile keyboard
  useEffect(() => {
    if (!isOpen) return;
    
    const handleVisualViewportResize = () => {
      // Use a short timeout to let the keyboard fully appear
      setTimeout(() => {
        if (isInputFocusedRef.current) {
          scrollToBottom(false);
        }
      }, 50);
    };
    
    // Use visualViewport if available (better for mobile keyboard detection)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleVisualViewportResize);
      window.visualViewport.addEventListener('scroll', handleVisualViewportResize);
    } else {
      window.addEventListener('resize', handleVisualViewportResize);
    }
    
    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleVisualViewportResize);
        window.visualViewport.removeEventListener('scroll', handleVisualViewportResize);
      } else {
        window.removeEventListener('resize', handleVisualViewportResize);
      }
    };
  }, [isOpen, scrollToBottom]);
  
  // Track input focus state
  const handleInputFocus = () => {
    isInputFocusedRef.current = true;
  };
  
  const handleInputBlur = () => {
    isInputFocusedRef.current = false;
  };
  
  // Focus input when opening chat on desktop
  useEffect(() => {
    if (isOpen && !isMobile && inputRef.current) {
      // Short delay to ensure DOM is ready
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, isMobile]);

  // Handle sending a message
  const handleSendMessage = useCallback(() => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;
    
    // Add user message
    const userMessage: MessageType = {
      id: `user-${Date.now()}`,
      content: trimmedInput,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate AI response (replace with actual API call later)
    setTimeout(() => {
      const assistantMessage: MessageType = {
        id: `assistant-${Date.now()}`,
        content: getSimulatedResponse(trimmedInput),
        sender: "assistant", 
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  }, [inputValue]);

  return (
    <>
      {/* Toggle button - fixed at bottom right */}
      <ChatToggleButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      
      {/* Main chat container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatContainerRef}
            className={`fixed z-50 flex flex-col overflow-hidden rounded-t-xl shadow-xl
              ${isMobile ? 
                "bottom-0 left-0 right-0 max-h-[80vh]" : 
                "bottom-4 right-4 w-[380px] h-[520px] rounded-xl"
              }`}
            initial={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1 }}
            exit={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Chat header */}
            <ChatHeader onClose={() => setIsOpen(false)} />
            
            {/* Messages container */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 bg-background"
              style={{ 
                overscrollBehavior: "contain",
                WebkitOverflowScrolling: "touch"
              }}
            >
              <div className="space-y-4">
                {messages.map((message) => (
                  <MessageBubble 
                    key={message.id}
                    message={message} 
                  />
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <MessageBubble 
                    message={{
                      id: "typing",
                      content: "",
                      sender: "assistant",
                      timestamp: new Date(),
                      isTyping: true
                    }}
                  />
                )}
                
                {/* Invisible element for scrolling */}
                <div ref={messagesEndRef} style={{ height: 1 }} />
              </div>
            </div>
            
            {/* Input area */}
            <ChatInput 
              ref={inputRef}
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSendMessage}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Helper function to generate sample responses (replace with real API later)
function getSimulatedResponse(input: string): string {
  const responses = [
    "I'd be happy to help with that!",
    "Let me look into that for you.",
    "That's a great question. Here's what I think...",
    "I'm here to assist with anything you need.",
    "Could you provide a bit more information about that?",
    "I understand what you're asking. Let me explain...",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}
