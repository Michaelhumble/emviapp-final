
import { useState, useRef, useEffect } from "react";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useAuth();
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  // Initial greeting on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          content: "👋 Hi there! I'm Little Sunshine, your personal assistant. I can help you book appointments, find salons, or answer any questions about our services. What can I help you with today?",
          sender: "assistant",
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom when messages change or when chat opens
  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle window resize to maintain scroll position
  useEffect(() => {
    const handleResize = () => scrollToBottom();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ensure scroll to bottom when keyboard appears on mobile
  useEffect(() => {
    if (isMobile) {
      const handleVisibilityChange = () => {
        if (!document.hidden) {
          setTimeout(scrollToBottom, 300);
        }
      };
      
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('resize', handleVisibilityChange);
      
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('resize', handleVisibilityChange);
      };
    }
  }, [isMobile]);

  // Watch for booking matches
  useEffect(() => {
    if (matches && matches.length > 0) {
      // Add booking options to chat
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.isBookingOptions) {
        // Update the last message if it was already booking options
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Check if user is logged in for booking requests
    if (!user && input.toLowerCase().includes("book")) {
      toast.error("You need to be logged in to book appointments");
      setMessages(prev => [
        ...prev,
        {
          id: `user-${Date.now()}`,
          content: input,
          sender: "user",
          timestamp: new Date()
        },
        {
          id: `assistant-${Date.now()}`,
          content: "You need to be logged in to book appointments. Please sign in and try again.",
          sender: "assistant",
          timestamp: new Date()
        }
      ]);
      setInput("");
      return;
    }
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Add typing indicator 
    const typingId = `assistant-typing-${Date.now()}`;
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
      // Get response from assistant
      const response = await generateResponse(input);
      
      // Remove typing indicator and add actual response
      setMessages(prev => [
        ...prev.filter(m => m.id !== typingId),
        {
          id: `assistant-${Date.now()}`,
          content: response,
          sender: "assistant",
          timestamp: new Date(),
          isBookingOptions: response.includes("available option") || response.includes("found") && matches.length > 0,
          bookingMatches: matches
        }
      ]);
    } catch (error) {
      // Remove typing indicator and show error
      setMessages(prev => [
        ...prev.filter(m => m.id !== typingId),
        {
          id: `assistant-error-${Date.now()}`,
          content: "Sorry, I couldn't process your request right now.",
          sender: "assistant",
          timestamp: new Date()
        }
      ]);
      toast.error("Sorry, I couldn't process your request right now.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBookingConfirmation = async (index: number) => {
    if (index >= 0 && index < matches.length) {
      const selected = matches[index];
      
      // Show booking confirmation message
      setMessages(prev => [
        ...prev,
        {
          id: `user-${Date.now()}`,
          content: `I'd like to book with ${selected.name}`,
          sender: "user",
          timestamp: new Date()
        }
      ]);
      
      // Show typing indicator
      const typingId = `assistant-typing-${Date.now()}`;
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
      
      // Create the booking
      const success = await createBooking(selected, user?.id);
      
      // Update the message
      setMessages(prev => [
        ...prev.filter(m => m.id !== typingId),
        {
          id: `assistant-${Date.now()}`,
          content: success 
            ? `🎉 Great! I've sent a booking request to ${selected.name} for ${selected.service} on ${formatDate(selected.date)} at ${formatTime(selected.time)}. They'll confirm shortly. You can check the status in your bookings page.`
            : "I'm sorry, there was an issue creating your booking. Please try again or contact support if the problem persists.",
          sender: "assistant",
          timestamp: new Date()
        }
      ]);
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

  const renderMessages = () => {
    return messages.map((message) => (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "mb-4 max-w-[85%] rounded-2xl p-4",
          message.sender === "user" 
            ? "ml-auto bg-primary text-primary-foreground" 
            : "mr-auto bg-muted"
        )}
      >
        {message.isTyping ? (
          <div className="flex items-center space-x-1">
            <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        ) : (
          message.content
        )}
        
        {/* Show booking options if available */}
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
        >
          <Button 
            className="fixed bottom-4 right-4 rounded-full h-14 w-14 shadow-lg z-40 bg-primary hover:bg-primary/90"
            size="icon"
          >
            <Sparkles className="h-6 w-6" />
          </Button>
        </motion.div>
      </DrawerTrigger>
      <DrawerContent className="fixed inset-x-0 bottom-0 max-h-[85vh] rounded-t-xl focus:outline-none pb-safe-area">
        <div className="h-full flex flex-col max-h-[85vh]">
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
          
          <ScrollArea className="flex-1 px-4 overflow-y-auto">
            <div className="space-y-4 py-4">
              {renderMessages()}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t mt-auto bg-background">
            <div className="flex gap-2">
              <Textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Little Sunshine..."
                className="min-h-[52px] resize-none"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage} 
                size="icon" 
                className="h-[52px] w-[52px]"
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
        >
          <Button 
            className="fixed bottom-4 right-4 rounded-full h-14 w-14 shadow-lg z-40 bg-primary hover:bg-primary/90"
            size="icon"
          >
            <Sparkles className="h-6 w-6" />
          </Button>
        </motion.div>
      </SheetTrigger>
      <SheetContent className="w-[380px] sm:w-[440px] p-0 border-l-purple-100 flex flex-col h-[85vh] fixed bottom-0 right-0 rounded-tl-2xl rounded-bl-2xl rounded-tr-none rounded-br-none">
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
          
          <ScrollArea className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4 py-4">
              {renderMessages()}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="border-t p-4 mt-auto bg-background">
            <div className="flex gap-2">
              <Textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Little Sunshine..."
                className="min-h-[52px] resize-none"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage} 
                size="icon" 
                className="h-[52px] w-[52px]"
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
