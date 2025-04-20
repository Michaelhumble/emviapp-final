
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format, parseISO } from "date-fns";
import { Calendar, Clock, CheckCircle, XCircle, ChevronRight } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface Booking {
  id: string;
  date_requested: string;
  time_requested: string;
  status: string;
  note?: string;
  sender: {
    id: string;
    full_name: string;
    avatar_url: string;
  };
  service: {
    id: string;
    title: string;
    price: number;
  };
}

interface BookingItemProps {
  booking: Booking;
  onMarkComplete: () => void;
  onCancel: () => void;
}

const BookingItem = ({ booking, onMarkComplete, onCancel }: BookingItemProps) => {
  const navigate = useNavigate();
  
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      return format(parseISO(dateStr), "MMM d, yyyy");
    } catch (error) {
      return dateStr;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "accepted": return "bg-green-100 text-green-800 hover:bg-green-200";
      case "completed": return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "cancelled": return "bg-red-100 text-red-800 hover:bg-red-200";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };
  
  const handleView = () => {
    navigate(`/bookings/${booking.id}`);
  };
  
  return (
    <Card className="hover:shadow-md transition-shadow border-muted">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={booking.sender?.avatar_url || ''} alt={booking.sender?.full_name || 'Client'} />
                <AvatarFallback>
                  {booking.sender?.full_name?.substring(0, 2).toUpperCase() || 'CL'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{booking.sender?.full_name || 'Client'}</h3>
                <p className="text-sm text-muted-foreground">
                  {booking.service?.title || 'Service'}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <Badge className={getStatusColor(booking.status)}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
              {booking.service?.price > 0 && (
                <span className="text-sm font-medium mt-1">${booking.service.price}</span>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              {formatDate(booking.date_requested)}
            </div>
            {booking.time_requested && (
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" />
                {booking.time_requested}
              </div>
            )}
          </div>
          
          {booking.note && (
            <div className="text-sm text-muted-foreground bg-muted/30 p-2 rounded">
              <span className="font-medium">Note:</span> {booking.note}
            </div>
          )}
          
          <div className="flex justify-between items-center pt-1">
            {booking.status === "pending" && (
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkComplete();
                  }}
                >
                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                  Accept
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCancel();
                  }}
                >
                  <XCircle className="h-3.5 w-3.5 mr-1" />
                  Decline
                </Button>
              </div>
            )}
            
            {booking.status === "accepted" && (
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkComplete();
                }}
              >
                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                Mark Complete
              </Button>
            )}
            
            {(booking.status === "completed" || booking.status === "cancelled") && (
              <span className="text-sm text-muted-foreground">
                {booking.status === "completed" ? "Completed" : "Cancelled"}
              </span>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleView}>
                  View Details
                </DropdownMenuItem>
                {booking.status !== "cancelled" && (
                  <DropdownMenuItem 
                    className="text-red-600"
                    onClick={onCancel}
                  >
                    Cancel Booking
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
