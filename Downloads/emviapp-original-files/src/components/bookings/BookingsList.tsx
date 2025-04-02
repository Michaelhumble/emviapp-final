
import React from "react";
import { Booking } from "../../types/booking";
import { User } from "../../types/user";
import { Calendar, Clock, MessageSquare, CheckCircle, XCircle, Award } from "lucide-react";

export interface BookingsListProps {
  bookings: Booking[];
  currentUser: User;
  isReceived: boolean;
  onStatusChange: (bookingId: string, status: "accepted" | "declined" | "completed") => Promise<void>;
}

const BookingsList: React.FC<BookingsListProps> = ({ 
  bookings, 
  currentUser, 
  isReceived, 
  onStatusChange 
}) => {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-8 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800/80 rounded-full mb-4">
          <Calendar size={32} className="text-purple-400" />
        </div>
        <h3 className="text-xl font-medium text-gray-300 mb-2">No bookings found</h3>
        <p className="text-gray-400">
          {isReceived 
            ? "You haven't received any booking requests yet." 
            : "You haven't sent any booking requests yet."}
        </p>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm">Pending</span>;
      case 'accepted':
        return <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm">Accepted</span>;
      case 'declined':
        return <span className="px-3 py-1 bg-rose-500/20 text-rose-300 rounded-full text-sm">Declined</span>;
      case 'completed':
        return <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Completed</span>;
      default:
        return <span className="px-3 py-1 bg-gray-500/20 text-gray-300 rounded-full text-sm">{status}</span>;
    }
  };

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div 
          key={booking.id} 
          className={`bg-gradient-to-b from-gray-800/60 to-gray-900/60 border rounded-xl p-6 shadow-lg transition-all hover:shadow-purple-900/10 ${
            booking.status === 'pending' 
              ? 'border-amber-500/20' 
              : booking.status === 'accepted'
                ? 'border-emerald-500/20'
                : booking.status === 'declined'
                  ? 'border-rose-500/20'
                  : 'border-white/10'
          }`}
        >
          <div className="md:flex justify-between items-start">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center mb-3">
                <h3 className="font-medium text-lg text-white mr-3">
                  {isReceived ? 'From:' : 'To:'} {booking.sender_id === currentUser.id ? booking.recipient_name : booking.sender_name}
                </h3>
                {getStatusBadge(booking.status)}
              </div>
              
              <div className="flex flex-wrap gap-4 text-gray-300">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1.5 text-purple-400" />
                  {booking.date_requested}
                </div>
                
                <div className="flex items-center">
                  <Clock size={16} className="mr-1.5 text-purple-400" />
                  {booking.time_requested}
                </div>
              </div>
              
              {booking.note && (
                <div className="mt-4 bg-gray-800/40 border border-white/5 rounded-lg p-3">
                  <div className="flex items-center mb-1 text-gray-400 text-sm">
                    <MessageSquare size={14} className="mr-1.5" />
                    Note:
                  </div>
                  <p className="text-gray-300">{booking.note}</p>
                </div>
              )}
            </div>
            
            {isReceived && booking.status === 'pending' && (
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => onStatusChange(booking.id, "accepted")}
                  className="flex items-center bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-4 py-2 rounded-xl shadow-lg shadow-emerald-900/20 transition-all hover:shadow-emerald-900/30"
                >
                  <CheckCircle size={16} className="mr-2" />
                  Accept
                </button>
                <button 
                  onClick={() => onStatusChange(booking.id, "declined")}
                  className="flex items-center bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white px-4 py-2 rounded-xl shadow-lg shadow-rose-900/20 transition-all hover:shadow-rose-900/30"
                >
                  <XCircle size={16} className="mr-2" />
                  Decline
                </button>
              </div>
            )}
            
            {isReceived && booking.status === 'accepted' && (
              <button 
                onClick={() => onStatusChange(booking.id, "completed")}
                className="flex items-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-4 py-2 rounded-xl shadow-lg shadow-blue-900/20 transition-all hover:shadow-blue-900/30"
              >
                <Award size={16} className="mr-2" />
                Mark Completed
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingsList;
