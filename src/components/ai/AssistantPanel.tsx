import { useState, useRef, useEffect, useCallback } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, Send, X, Calendar, Clock, Check, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useAssistant } from "@/hooks/useAssistant";
import { motion, AnimatePresence } from "framer-motion";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/context/auth";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  isBookingOptions?: boolean;
  bookingMatches?: any[];
  isTyping?: boolean;
}

export const AssistantPanel = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { generateResponse, isLoading, matches, createBooking } = useAssistant();
  const { user } = useAuth();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const isTypingRef = useRef(false);
  const inputValueRef = useRef("");
  const scrollingRef = useRef(false);
  const pendingScrollRef = useRef(false);
  const isOpenRef = useRef(isOpen);
  const messageQueueRef = useRef<Message[]>([]);
  
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);
  
  useEffect(() => {
    inputValueRef.current = input;
  }, [input]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        content: "👋 Hi there! I'm Little Sunshine, your personal assistant. I can help you book appointments, find salons, or answer any questions about our services. What can I help you with today?",
        sender: "assistant",
        timestamp: new Date()
      };
      
      setTimeout(() => {
        setMessages([welcomeMessage]);
      }, 100);
    }
  }, [isOpen, messages.length]);

  const scrollToBottom = useCallback((force = false) => {
    if (scrollingRef.current && !force) {
      pendingScrollRef.current = true;
      return;
    }
    
    scrollingRef.current = true;
    pendingScrollRef.current = false;
    
    requestAnimationFrame(() => {
      if (messagesEndRef.current && isOpenRef.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end"
        });
      }
      
      setTimeout(() => {
        scrollingRef.current = false;
        
        if (pendingScrollRef.current) {
          scrollToBottom(true);
        }
      }, 300);
    });
  }, []);

  useEffect(() => {
    if (isOpen && messages.length > 0) {
      requestAnimationFrame(() => {
        const hasNewMessage = messageQueueRef.current.length > 0;
        if (!isTypingRef.current || hasNewMessage) {
          scrollToBottom(hasNewMessage);
        } else {
          pendingScrollRef.current = true;
        }
        
        messageQueueRef.current = [];
      });
    }
  }, [messages, isOpen, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !isMobile) {
      requestAnimationFrame(() => {
        if (inputRef.current && !isTypingRef.current) {
          inputRef.current.focus();
        }
      });
    }
  }, [isOpen, isMobile]);

  useEffect(() => {
    const handleFocus = () => {
      isTypingRef.current = true;
    };
    
    const handleBlur = () => {
      isTypingRef.current = false;
      
      if (pendingScrollRef.current) {
        scrollToBottom(true);
      }
    };
    
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('focus', handleFocus, { passive: true });
      inputElement.addEventListener('blur', handleBlur, { passive: true });
    }
    
    return () => {
      if (inputElement) {
        inputElement.removeEventListener('focus', handleFocus);
        inputElement.removeEventListener('blur', handleBlur);
      }
    };
  }, [scrollToBottom]);

  useEffect(() => {
    if (isMobile && isOpen) {
      const handleVisualViewportResize = () => {
        if (document.activeElement !== inputRef.current) {
          requestAnimationFrame(() => {
            if (messagesEndRef.current && !isTypingRef.current) {
              messagesEndRef.current.scrollIntoView({
                block: "end",
                behavior: "auto"
              });
            }
          });
        }
      };
      
      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleVisualViewportResize, { passive: true });
        window.visualViewport.addEventListener('scroll', handleVisualViewportResize, { passive: true });
      }
      
      return () => {
        if (window.visualViewport) {
          window.visualViewport.removeEventListener('resize', handleVisualViewportResize);
          window.visualViewport.removeEventListener('scroll', handleVisualViewportResize);
        }
      };
    }
  }, [isMobile, isOpen]);

  useEffect(() => {
    if (matches && matches.length > 0 && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.isBookingOptions) {
        setMessages(prev => [
          ...prev.slice(0, -1),
          {
            ...lastMessage,
            bookingMatches: matches
          }
        ]);
      }
    }
  }, [matches, messages]);

  const handleSendMessage = async () => {
    const messageToSend = inputValueRef.current.trim();
    if (!messageToSend) return;
    
    setInput("");
    inputValueRef.current = "";
    
    if (!user && messageToSend.toLowerCase().includes("book")) {
      toast.error("You need to be logged in to book appointments");
      
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        content: messageToSend,
        sender: "user",
        timestamp: new Date()
      };
      
      const errorMsg: Message = {
        id: `assistant-${Date.now()}`,
        content: "You need to be logged in to book appointments. Please sign in and try again.",
        sender: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMsg, errorMsg]);
      messageQueueRef.current = [userMsg, errorMsg];
      
      requestAnimationFrame(() => scrollToBottom(true));
      return;
    }
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: messageToSend,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    messageQueueRef.current = [userMessage];
    
    const typingId = `assistant-typing-${Date.now()}`;
    const typingMessage: Message = {
      id: typingId,
      content: "",
      sender: "assistant",
      timestamp: new Date(),
      isTyping: true
    };
    
    setMessages(prev => [...prev, typingMessage]);
    messageQueueRef.current = [userMessage, typingMessage];
    
    requestAnimationFrame(() => scrollToBottom(true));
    
    try {
      const response = await generateResponse(messageToSend);
      
      const responseMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: response,
        sender: "assistant",
        timestamp: new Date(),
        isBookingOptions: response.includes("available option") || (response.includes("found") && matches.length > 0),
        bookingMatches: matches
      };
      
      setMessages(prev => [
        ...prev.filter(m => m.id !== typingId),
        responseMessage
      ]);
      
      messageQueueRef.current = [responseMessage];
      
      if (!isMobile) {
        setTimeout(() => {
          if (inputRef.current && isOpenRef.current) {
            inputRef.current.focus();
          }
        }, 100);
      }
      
      requestAnimationFrame(() => scrollToBottom(true));
    } catch (error) {
      const errorMessage: Message = {
        id: `assistant-error-${Date.now()}`,
        content: "Sorry, I couldn't process your request right now.",
        sender: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [
        ...prev.filter(m => m.id !== typingId),
        errorMessage
      ]);
      
      messageQueueRef.current = [errorMessage];
      toast.error("Sorry, I couldn't process your request right now.");
      
      requestAnimationFrame(() => scrollToBottom(true));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    inputValueRef.current = value;
  };

  const handleBookingConfirmation = async (index: number) => {
    if (index >= 0 && matches && index < matches.length) {
      const selected = matches[index];
      
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        content: `I'd like to book with ${selected.name}`,
        sender: "user",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMsg]);
      messageQueueRef.current = [userMsg];
      
      const typingId = `assistant-typing-${Date.now()}`;
      const typingMsg: Message = {
        id: typingId,
        content: "",
        sender: "assistant",
        timestamp: new Date(),
        isTyping: true
      };
      
      setMessages(prev => [...prev, typingMsg]);
      messageQueueRef.current = [userMsg, typingMsg];
      
      scrollToBottom(true);
      
      const success = await createBooking(selected);
      
      const responseContent = success 
        ? `🎉 Great! I've sent a booking request to ${selected.name} for ${selected.service} on ${formatDate(selected.date)} at ${formatTime(selected.time)}. They'll confirm shortly. You can check the status in your bookings page.`
        : "I'm sorry, there was an issue creating your booking. Please try again or contact support if the problem persists.";
      
      const responseMsg: Message = {
        id: `assistant-${Date.now()}`,
        content: responseContent,
        sender: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [
        ...prev.filter(m => m.id !== typingId),
        responseMsg
      ]);
      
      messageQueueRef.current = [responseMsg];
      
      scrollToBottom(true);
    }
  };

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

  const TypingIndicator = () => (
    <div className="flex items-center space-x-1 py-1">
      <div className="typing-indicator-dot"></div>
      <div className="typing-indicator-dot"></div>
      <div className="typing-indicator-dot"></div>
    </div>
  );

  const renderMessages = () => {
    return messages.map((message) => (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "mb-4 max-w-[85%] rounded-2xl p-4",
          message.sender === "user" 
            ? "ml-auto bg-primary text-primary-foreground" 
            : "mr-auto bg-muted"
        )}
      >
        {message.isTyping ? (
          <TypingIndicator />
        ) : (
          message.content
        )}
        
        {message.isBookingOptions && message.bookingMatches && message.bookingMatches.length > 0 && (
          <div className="mt-3 space-y-2">
            {message.bookingMatches.map((match, index) => (
              <div key={`booking-${index}`} className="bg-background rounded-lg p-3 shadow-sm">
                <div className="flex items-start gap-3">
                  {match.avatar ? (
                    <img src={match.avatar} alt={match.name} className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{match.name}</p>
                    <p className="text-sm text-muted-foreground">{match.service}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" /> 
                      {formatDate(match.date)}
                      <Clock className="h-3 w-3 ml-2" /> 
                      {formatTime(match.time)}
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-2 bg-primary/5 hover:bg-primary/10"
                  onClick={() => handleBookingConfirmation(index)}
                >
                  <Check className="h-4 w-4 mr-1" /> Confirm This Booking
                </Button>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    ));
  };

  const MobileDrawer = () => (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 right-4 z-40"
        >
          <Button 
            className="rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90"
            size="icon"
          >
            <Sparkles className="h-6 w-6" />
          </Button>
        </motion.div>
      </DrawerTrigger>
      <DrawerContent className="fixed inset-x-0 bottom-0 max-h-[70dvh] rounded-t-xl focus:outline-none mobile-chat-panel">
        <div className="h-full flex flex-col max-h-[70dvh]">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Little Sunshine</h3>
                <p className="text-xs text-muted-foreground">Your AI Assistant — here to help!</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div 
            ref={scrollAreaRef}
            className="flex-1 px-4 overflow-y-auto chat-container"
          >
            <div className="space-y-4 py-4 w-full max-w-[95%] mx-auto">
              {renderMessages()}
              <div ref={messagesEndRef} style={{ height: '1px', width: '100%' }} />
            </div>
          </div>
          
          <div 
            className="p-4 border-t mt-auto bg-background mobile-safe-bottom chat-input-container"
            style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
          >
            <div className="flex gap-2">
              <Textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask Little Sunshine..."
                className="min-h-[52px] resize-none"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage} 
                size="icon" 
                className="h-[52px] w-[52px] flex-shrink-0"
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );

  const DesktopSheet = () => (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
          className="fixed bottom-4 right-4 z-40"
        >
          <Button 
            className="rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90"
            size="icon"
          >
            <Sparkles className="h-6 w-6" />
          </Button>
        </motion.div>
      </SheetTrigger>
      <SheetContent className="w-[380px] sm:w-[440px] p-0 border-l-purple-100 flex flex-col h-[85vh] fixed bottom-0 right-0 rounded-tl-2xl rounded-bl-2xl rounded-tr-none rounded-br-none overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="border-b p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Little Sunshine</h3>
                <p className="text-xs text-muted-foreground">Your AI Assistant — here to help!</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div 
            ref={scrollAreaRef}
            className="flex-1 p-4 overflow-y-auto chat-container"
          >
            <div className="space-y-4 py-4">
              {renderMessages()}
              <div ref={messagesEndRef} style={{ height: '1px', width: '100%' }} />
            </div>
          </div>
          
          <div className="border-t p-4 mt-auto bg-background chat-input-container">
            <div className="flex gap-2">
              <Textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask Little Sunshine..."
                className="min-h-[52px] resize-none"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage} 
                size="icon" 
                className="h-[52px] w-[52px] flex-shrink-0"
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <AnimatePresence>
      {isMobile ? <MobileDrawer /> : <DesktopSheet />}
    </AnimatePresence>
  );
};

export default AssistantPanel;
