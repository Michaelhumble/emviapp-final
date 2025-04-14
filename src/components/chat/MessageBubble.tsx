
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MessageType, ActionSuggestion } from "./ChatSystem";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Check, ChevronRight, Star, MapPin, DollarSign, Tag } from "lucide-react";
import { BookingMatch } from "@/services/assistantService";
import { Link } from "react-router-dom";
import { ActionTile } from "@/utils/aiResponseProcessor";
import { Badge } from "@/components/ui/badge";

interface MessageBubbleProps {
  message: MessageType;
  onBookingConfirm?: (match: BookingMatch) => void;
}

export function MessageBubble({ message, onBookingConfirm }: MessageBubbleProps) {
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

  // Render action tiles based on their type
  const renderActionTile = (tile: ActionTile) => {
    switch (tile.type) {
      case 'artist':
        return (
          <div key={tile.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm mb-2">
            <div className="flex items-start p-3">
              <div className="flex-shrink-0 mr-3">
                {tile.image ? (
                  <img 
                    src={tile.image} 
                    alt={tile.title} 
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{tile.title}</h4>
                  {tile.rating && (
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs ml-1">{tile.rating}</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-600">{tile.subtitle}</p>
                {tile.location && (
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <MapPin className="h-3 w-3 mr-0.5" />
                    <span>{tile.location}</span>
                  </div>
                )}
              </div>
            </div>
            <Link to={tile.href} className="block">
              <Button 
                variant="ghost" 
                className="w-full border-t border-gray-100 rounded-none py-2 h-8 text-sm hover:bg-primary/5"
              >
                {tile.actionLabel}
              </Button>
            </Link>
          </div>
        );
      
      case 'booth':
        return (
          <div key={tile.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm mb-2">
            <div className="p-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">{tile.title}</h4>
              </div>
              <p className="text-xs text-gray-600">{tile.subtitle}</p>
              {tile.location && (
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <MapPin className="h-3 w-3 mr-0.5" />
                  <span>{tile.location}</span>
                </div>
              )}
              <div className="flex items-center justify-between mt-2">
                {tile.price && (
                  <div className="flex items-center text-sm font-medium">
                    <DollarSign className="h-3.5 w-3.5 text-green-600" />
                    <span>{tile.price}</span>
                  </div>
                )}
                <div className="flex">
                  {tile.features && tile.features.map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs mr-1 bg-gray-50">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <Link to={tile.href} className="block">
              <Button 
                variant="ghost" 
                className="w-full border-t border-gray-100 rounded-none py-2 h-8 text-sm hover:bg-primary/5"
              >
                {tile.actionLabel}
              </Button>
            </Link>
          </div>
        );
      
      case 'salon':
        return (
          <div key={tile.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm mb-2">
            <div className="p-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">{tile.title}</h4>
              </div>
              <p className="text-xs text-gray-600">{tile.subtitle}</p>
              {tile.location && (
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <MapPin className="h-3 w-3 mr-0.5" />
                  <span>{tile.location}</span>
                </div>
              )}
              <div className="flex items-center justify-between mt-2">
                {tile.price && (
                  <div className="flex items-center text-sm font-medium">
                    <DollarSign className="h-3.5 w-3.5 text-green-600" />
                    <span>{tile.price}</span>
                  </div>
                )}
                <div className="flex flex-wrap">
                  {tile.features && tile.features.map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs mr-1 mt-1 bg-gray-50">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <Link to={tile.href} className="block">
              <Button 
                variant="ghost" 
                className="w-full border-t border-gray-100 rounded-none py-2 h-8 text-sm hover:bg-primary/5"
              >
                {tile.actionLabel}
              </Button>
            </Link>
          </div>
        );
      
      case 'job':
        return (
          <div key={tile.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm mb-2">
            <div className="p-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">{tile.title}</h4>
              </div>
              <p className="text-xs text-gray-600">{tile.subtitle}</p>
              {tile.location && (
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <MapPin className="h-3 w-3 mr-0.5" />
                  <span>{tile.location}</span>
                </div>
              )}
              <div className="flex items-center justify-between mt-2">
                {tile.price && (
                  <div className="flex items-center text-sm font-medium">
                    <DollarSign className="h-3.5 w-3.5 text-green-600" />
                    <span>{tile.price}</span>
                  </div>
                )}
                <div className="flex flex-wrap">
                  {tile.features && tile.features.map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs mr-1 mt-1 bg-gray-50">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <Link to={tile.href} className="block">
              <Button 
                variant="ghost" 
                className="w-full border-t border-gray-100 rounded-none py-2 h-8 text-sm hover:bg-primary/5"
              >
                {tile.actionLabel}
              </Button>
            </Link>
          </div>
        );
      
      default:
        return null;
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
            <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
            
            {/* Show action tiles if available */}
            {message.actionTiles && message.actionTiles.length > 0 && (
              <div className="mt-3 space-y-0.5">
                {message.actionTiles.map(tile => renderActionTile(tile))}
              </div>
            )}
            
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
                      variant="outline" 
                      size="sm" 
                      className="bg-background hover:bg-background/90 border-primary/20"
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
