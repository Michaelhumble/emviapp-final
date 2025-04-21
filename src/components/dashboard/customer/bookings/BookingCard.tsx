
import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, X, ArrowRight } from "lucide-react";
import { CustomerBooking } from "./types";

interface BookingCardProps {
  booking: CustomerBooking;
  // Update the type to include "progress"
  type: "upcoming" | "progress" | "past" | "canceled";
  onView?: (id: string) => void;
  onReschedule?: (id: string) => void;
  onCancel?: (id: string) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  type,
  onView,
  onReschedule,
  onCancel,
}) => {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Date TBD";
    try {
      return format(new Date(dateStr), "EEEE, MMMM do");
    } catch (e) {
      return dateStr;
    }
  };

  const getStatusBadge = () => {
    if (booking.status === "completed") {
      return (
        <div className="flex items-center text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-700">
          <CheckCircle className="w-3 h-3 mr-1" /> Completed
        </div>
      );
    }
    if (booking.status === "confirmed") {
      return (
        <div className="flex items-center text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
          <CheckCircle className="w-3 h-3 mr-1" /> Confirmed
        </div>
      );
    }
    if (booking.status === "cancelled") {
      return (
        <div className="flex items-center text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">
          <X className="w-3 h-3 mr-1" /> Canceled
        </div>
      );
    }
    if (booking.status === "pending") {
      return (
        <div className="flex items-center text-xs font-medium px-2 py-1 rounded-full bg-amber-100 text-amber-700">
          <Clock className="w-3 h-3 mr-1" /> Pending
        </div>
      );
    }
    return null;
  };

  const getRandomMotivationalQuote = () => {
    const quotes = [
      "Self-care isn't selfish. It's essential.",
      "Invest in your well-being today.",
      "Beauty begins with self-care.",
      "Take time for yourself. You deserve it.",
      "Every appointment is a step toward self-love."
    ];
    
    // Use stable selection based on booking ID so it doesn't change on re-renders
    const hash = booking.id.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return quotes[Math.abs(hash) % quotes.length];
  };

  const hasArtist = booking.artist && booking.artist.full_name;

  return (
    <div className="w-full p-4 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center mb-1.5">
            {hasArtist && (
              <div className="relative mr-2 flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden">
                  {booking.artist.avatar_url ? (
                    <img 
                      src={booking.artist.avatar_url} 
                      alt={booking.artist.full_name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-medium text-purple-800">
                      {booking.artist.full_name?.charAt(0).toUpperCase() || "A"}
                    </span>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-100 rounded-full flex items-center justify-center border border-white">
                  <CheckCircle className="w-2.5 h-2.5 text-green-600" />
                </div>
              </div>
            )}
            <div className="flex flex-col justify-center min-w-0">
              <h3 className="font-medium text-lg text-gray-900 truncate">
                {booking.service?.title || "Service"}
              </h3>
              {hasArtist && (
                <p className="text-gray-600 text-sm truncate">with {booking.artist.full_name}</p>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {getStatusBadge()}
            
            <div className="text-sm text-gray-600 flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-gray-500" />
              {formatDate(booking.date_requested)}
              {booking.time_requested && (
                <span className="ml-1">at {booking.time_requested}</span>
              )}
            </div>
            
            {booking.service?.price && (
              <div className="text-sm font-medium text-gray-700">
                ${booking.service.price}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-1 sm:mt-0">
          {onView && (
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full border-purple-200 text-purple-700 hover:bg-purple-50"
              onClick={() => onView(booking.id)}
            >
              Details
            </Button>
          )}
          
          {/* For "progress" type, treat it like "upcoming" for cancellation options */}
          {(type === "upcoming" || type === "progress") && onCancel && (
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full border-gray-200 text-gray-700 hover:bg-gray-50"
              onClick={() => onCancel(booking.id)}
            >
              Cancel
            </Button>
          )}
          
          {((type === "past" && onReschedule) || (type === "canceled" && onReschedule)) && (
            <Button 
              size="sm" 
              className="rounded-full bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => onReschedule && onReschedule(booking.id)}
            >
              Rebook
            </Button>
          )}
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-500 italic">
          {getRandomMotivationalQuote()}
        </p>
      </div>
    </div>
  );
};

export default BookingCard;
