
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
import { processAiResponse } from "@/utils/aiResponseProcessor";
import { getDefaultActions } from "@/utils/chatUtils";

export type ActionSuggestion = {
  id: string;
  label: string;
  icon?: string;
  href: string;
};

export type MessageType = {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  isTyping?: boolean;
  bookingMatches?: BookingMatch[];
  actionSuggestions?: ActionSuggestion[];
};

export function ChatSystem() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const { user } = useAuth();
  const { isLoading, generateResponse, matches, createBooking } = useAssistant();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isInputFocusedRef = useRef(false);
  
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: MessageType = {
        id: `assistant-${Date.now()}`,
        content: "👋 Hi there! I'm Little Sunshine, your personal assistant. How can I help you today?",
        sender: "assistant",
        timestamp: new Date(),
        actionSuggestions: getDefaultActions()
      };
      
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const scrollToBottom = useCallback((smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "end"
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isOpen, scrollToBottom]);
  
  useEffect(() => {
    if (!isOpen) return;
    
    const handleVisualViewportResize = () => {
      setTimeout(() => {
        if (isInputFocusedRef.current) {
          scrollToBottom(false);
        }
      }, 50);
    };
    
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
  
  const handleInputFocus = () => {
    isInputFocusedRef.current = true;
  };
  
  const handleInputBlur = () => {
    isInputFocusedRef.current = false;
  };
  
  useEffect(() => {
    if (isOpen && !isMobile && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, isMobile]);

  const handleBookingConfirmation = async (bookingMatch: BookingMatch) => {
    if (!user) {
      toast.error("You need to be logged in to book an appointment");
      return;
    }
    
    const userMessage: MessageType = {
      id: `user-confirmation-${Date.now()}`,
      content: `I'd like to book with ${bookingMatch.name} for ${bookingMatch.service}`,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
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
    
    const success = await createBooking(bookingMatch, user.id);
    
    if (success) {
      setMessages(prev => [
        ...prev.filter(m => m.id !== typingId),
        {
          id: `assistant-${Date.now()}`,
          content: `Great! I've sent a booking request to ${bookingMatch.name} for ${bookingMatch.service} on ${formatDate(bookingMatch.date)} at ${formatTime(bookingMatch.time)}. They'll confirm shortly, and you can check the status in your bookings page.`,
          sender: "assistant",
          timestamp: new Date(),
          actionSuggestions: [
            { id: "bookings", label: "View My Bookings", icon: "calendar", href: "/dashboard/bookings" }
          ]
        }
      ]);
    } else {
      setMessages(prev => [
        ...prev.filter(m => m.id !== typingId),
        {
          id: `assistant-${Date.now()}`,
          content: "I'm sorry, there was an issue creating your booking. Please try again or contact support if the problem persists.",
          sender: "assistant",
          timestamp: new Date(),
          actionSuggestions: [
            { id: "support", label: "Contact Support", icon: "help-circle", href: "/support" }
          ]
        }
      ]);
    }
  };

  const handleSendMessage = useCallback(async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;
    
    const userMessage: MessageType = {
      id: `user-${Date.now()}`,
      content: trimmedInput,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    
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
      // Log the message for future improvements
      console.log("Chat log - User:", trimmedInput);
      
      // Process the user message and generate a response
      const response = await generateResponse(trimmedInput);
      
      // Process the response to add action suggestions based on content
      const { message, suggestedActions } = processAiResponse(response);
      
      setMessages(prev => [
        ...prev.filter(m => m.id !== typingId),
        {
          id: `assistant-${Date.now()}`,
          content: message,
          sender: "assistant",
          timestamp: new Date(),
          bookingMatches: matches.length > 0 ? matches : undefined,
          actionSuggestions: suggestedActions
        }
      ]);
      
      console.log("Chat log - AI:", message);
      
      if (message !== response) {
        console.log("Original response:", response);
      }
    } catch (error) {
      console.error("Error getting response:", error);
      
      setMessages(prev => [
        ...prev.filter(m => m.id !== typingId),
        {
          id: `assistant-error-${Date.now()}`,
          content: "Sorry, I had trouble processing your request. Please try again in a moment.",
          sender: "assistant",
          timestamp: new Date(),
          actionSuggestions: [
            { id: "support", label: "Contact Support", icon: "help-circle", href: "/support" }
          ]
        }
      ]);
    }
  }, [inputValue, isLoading, generateResponse, matches]);

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
      <ChatToggleButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      
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
            <ChatHeader onClose={() => setIsOpen(false)} />
            
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
                
                <div ref={messagesEndRef} style={{ height: 1 }} />
              </div>
            </div>
            
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
