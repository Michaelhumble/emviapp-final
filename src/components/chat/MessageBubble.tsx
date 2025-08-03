
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Check, ChevronRight } from "lucide-react";
import { BookingMatch } from "@/services/assistantService";
import { Link } from "react-router-dom";
import { MessageType, ActionSuggestion } from "./types";

interface MessageBubbleProps {
  message: MessageType;
  onBookingConfirm?: (match: BookingMatch) => void;
}

export function MessageBubble({ message, onBookingConfirm }: MessageBubbleProps) {
  
  // Function to render message content with clickable links
  const renderMessageWithLinks = (content: string) => {
    // URL pattern for detecting links
    const urlPattern = /(https?:\/\/[^\s]+|\/[^\s]*)/g;
    const parts = content.split(urlPattern);
    
    return parts.map((part, index) => {
      if (part.match(urlPattern)) {
        const isInternalLink = part.startsWith('/');
        if (isInternalLink) {
          return (
            <Link 
              key={index}
              to={part}
              className="inline-flex items-center gap-1 bg-primary/10 hover:bg-primary/20 text-primary font-medium px-2 py-1 rounded-md text-sm transition-colors duration-200 mx-1"
            >
              <ChevronRight className="h-3 w-3" />
              {getLinkLabel(part)}
            </Link>
          );
        } else {
          return (
            <a 
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-primary/10 hover:bg-primary/20 text-primary font-medium px-2 py-1 rounded-md text-sm transition-colors duration-200 mx-1"
            >
              <ChevronRight className="h-3 w-3" />
              Visit Link
            </a>
          );
        }
      }
      return part;
    });
  };

  // Function to get a friendly label for internal links
  const getLinkLabel = (path: string): string => {
    if (path.includes('/artists')) return 'Browse Artists';
    if (path.includes('/jobs')) return 'View Jobs';
    if (path.includes('/salon-sales')) return 'Salon Sales';
    if (path.includes('/blog')) return 'Read Blog';
    return 'Visit Page';
  };
  // Format timestamp to display time
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Format date for display
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    } catch (e) {
      return dateString;
    }
  };

  // Format time for display
  const formatTimeString = (timeString: string): string => {
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

  // Get icon component for action suggestion
  const getIconComponent = (iconName?: string) => {
    switch (iconName) {
      case 'calendar':
        return <Calendar className="h-4 w-4 mr-1.5" />;
      case 'briefcase':
        return <Clock className="h-4 w-4 mr-1.5" />;
      case 'store':
        return <User className="h-4 w-4 mr-1.5" />;
      case 'users':
        return <User className="h-4 w-4 mr-1.5" />;
      default:
        return <ChevronRight className="h-4 w-4 mr-1.5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "max-w-[80%] group",
        message.sender === "user" ? "ml-auto" : "mr-auto"
      )}
    >
      <div 
        className={cn(
          "rounded-2xl px-4 py-2.5",
          message.sender === "user" 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted text-foreground"
        )}
      >
        {message.isTyping ? (
          <div className="flex space-x-1 items-center py-1 px-1">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        ) : (
          <>
            <div className="text-sm whitespace-pre-wrap break-words">
              {message.sender === "assistant" ? renderMessageWithLinks(message.content) : message.content}
            </div>
            
            {/* Show booking options if available */}
            {message.bookingMatches && message.bookingMatches.length > 0 && (
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
                          {formatTimeString(match.time)}
                        </div>
                      </div>
                    </div>
                    {onBookingConfirm && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2 bg-primary/5 hover:bg-primary/10"
                        onClick={() => onBookingConfirm(match)}
                      >
                        <Check className="h-4 w-4 mr-1" /> Book with {match.name}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Show action suggestions if available */}
            {message.sender === "assistant" && message.actionSuggestions && message.actionSuggestions.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {message.actionSuggestions.map((action: ActionSuggestion) => (
                  <Link 
                    key={action.id} 
                    to={action.href}
                    className="no-underline"
                  >
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-sm font-medium"
                    >
                      {getIconComponent(action.icon)}
                      {action.label}
                    </Button>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <div 
        className={cn(
          "text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity",
          message.sender === "user" ? "text-right" : "text-left"
        )}
      >
        {formatTime(message.timestamp)}
      </div>
    </motion.div>
  );
}
