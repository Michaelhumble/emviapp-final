
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CalendarDays, Clock, User } from "lucide-react";
import { motion } from "framer-motion";

interface BookingCardProps {
  booking: {
    id: string;
    date_requested: string;
    time_requested: string;
    status: string;
    sender_id: string;
    services?: {
      title?: string;
    };
  };
  clientName?: string;
  compact?: boolean;
}

export const BookingCard = ({ booking, clientName = "Client", compact = false }: BookingCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'accepted':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'cancelled':
      case 'declined':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center p-3 rounded-lg bg-white shadow-sm border border-gray-100 hover:border-primary/20 transition-colors group ${
        compact ? 'p-2' : 'p-4'
      }`}
    >
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <h4 className="font-medium">{clientName}</h4>
          </div>
          <Badge 
            variant="outline" 
            className={`${getStatusColor(booking.status)}`}
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
        </div>
        
        <div className="mt-2 space-y-1">
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
            {format(new Date(booking.date_requested), 'MMM d, yyyy')}
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            {booking.time_requested}
          </div>
          
          {booking.services?.title && (
            <div className="text-sm font-medium text-primary">
              {booking.services.title}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BookingCard;
