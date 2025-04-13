
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { MessageBubble } from "./MessageBubble";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatToggleButton } from "./ChatToggleButton";
import { useAssistant } from "@/hooks/useAssistant";
import { BookingMatch } from "@/services/assistantService";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

export type MessageType = {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  isTyping?: boolean;
  bookingMatches?: BookingMatch[];
};

export function ChatSystem() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const { user } = useAuth();
  const { isLoading, generateResponse, matches, createBooking } = useAssistant();
  
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

  // Handle booking confirmation
  const handleBookingConfirmation = async (bookingMatch: BookingMatch) => {
    if (!user) {
      toast.error("You need to be logged in to book an appointment");
      return;
    }
    
    // Add user confirmation message
    const userMessage: MessageType = {
      id: `user-confirmation-${Date.now()}`,
      content: `I'd like to book with ${bookingMatch.name} for ${bookingMatch.service}`,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Add typing indicator
    const typingId = `typing-${Date.now()}`;
    setMessages(prev => [
      ...prev,
      {
        id: typingId,
        content: "",
        sender: "assistant",
        timestamp: new Date(),
        isTyping: true
      }
    ]);
    
    // Create booking and get result
    const success = await createBooking(bookingMatch, user.id);
    
    // Remove typing indicator and add response
    if (success) {
      setMessages(prev => [
        ...prev.filter(m => m.id !== typingId),
        {
          id: `assistant-${Date.now()}`,
          content: `Great! I've sent a booking request to ${bookingMatch.name} for ${bookingMatch.service} on ${formatDate(bookingMatch.date)} at ${formatTime(bookingMatch.time)}. They'll confirm shortly, and you can check the status in your bookings page.`,
          sender: "assistant",
          timestamp: new Date()
        }
      ]);
    } else {
      setMessages(prev => [
        ...prev.filter(m => m.id !== typingId),
        {
          id: `assistant-${Date.now()}`,
          content: "I'm sorry, there was an issue creating your booking. Please try again or contact support if the problem persists.",
          sender: "assistant",
          timestamp: new Date()
        }
      ]);
    }
  };

  // Handle sending a message
  const handleSendMessage = useCallback(async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;
    
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
    const typingId = `typing-${Date.now()}`;
    setMessages(prev => [
      ...prev,
      {
        id: typingId,
        content: "",
        sender: "assistant",
        timestamp: new Date(),
        isTyping: true
      }
    ]);
    
    try {
      // Get AI response
      const response = await generateResponse(trimmedInput);
      
      // Remove typing indicator and add response with any booking matches
      setMessages(prev => [
        ...prev.filter(m => m.id !== typingId),
        {
          id: `assistant-${Date.now()}`,
          content: response,
          sender: "assistant",
          timestamp: new Date(),
          bookingMatches: matches.length > 0 ? matches : undefined
        }
      ]);
      
      // Log conversation for admin review
      logConversation(userMessage.content, response);
      
    } catch (error) {
      console.error("Error getting response:", error);
      
      // Remove typing indicator and add error message
      setMessages(prev => [
        ...prev.filter(m => m.id !== typingId),
        {
          id: `assistant-error-${Date.now()}`,
          content: "Sorry, I had trouble processing your request. Please try again in a moment.",
          sender: "assistant",
          timestamp: new Date()
        }
      ]);
    }
  }, [inputValue, isLoading, generateResponse, matches]);

  // Helper function to log conversations
  const logConversation = async (userMessage: string, aiResponse: string) => {
    try {
      await supabase.from('chat_logs').insert({
        user_id: user?.id || null,
        user_message: userMessage,
        ai_response: aiResponse,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error logging conversation:", error);
    }
  };

  // Helper functions to format date and time
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    } catch (e) {
      return dateString;
    }
  };

  const formatTime = (timeString: string): string => {
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const period = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${period}`;
    } catch (e) {
      return timeString;
    }
  };

  return (
    <>
      {/* Toggle button - fixed at bottom right */}
      <ChatToggleButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      
      {/* Main chat container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatContainerRef}
            className={`fixed z-50 flex flex-col bg-background overflow-hidden shadow-xl chat-window
              ${isMobile ? 
                "bottom-0 left-0 right-0 h-[75vh] rounded-t-xl" : 
                "bottom-4 right-4 w-[380px] h-[520px] rounded-xl"
              }`}
            initial={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1 }}
            exit={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{ 
              willChange: 'transform',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden'
            }}
          >
            {/* Chat header */}
            <ChatHeader onClose={() => setIsOpen(false)} />
            
            {/* Messages container */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 chat-messages"
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
                    onBookingConfirm={handleBookingConfirmation}
                  />
                ))}
                
                {/* Invisible element for scrolling */}
                <div ref={messagesEndRef} style={{ height: 1 }} />
              </div>
            </div>
            
            {/* Input area */}
            <div className={`p-3 border-t bg-background chat-input ${isMobile ? 'safe-area-bottom' : ''}`}>
              <ChatInput 
                ref={inputRef}
                value={inputValue}
                onChange={setInputValue}
                onSend={handleSendMessage}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                isLoading={isLoading}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
