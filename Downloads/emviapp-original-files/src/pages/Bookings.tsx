
import { useState } from "react";
import BookingsList from "../components/bookings/BookingsList";
import { useBookings } from "../hooks/useBookings";
import { useAuth } from "../context/AuthContext";
import { User } from "../types/user";
import { Calendar, SendHorizontal, MailCheck } from "lucide-react";

const Bookings = () => {
  const { bookings, loading, error, updateBookingStatus } = useBookings();
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState<"sent" | "received">("sent");
  
  // Filter bookings based on active tab
  const sentBookings = bookings.filter((booking) => booking.sender_id === user?.id);
  const receivedBookings = bookings.filter((booking) => booking.recipient_id === user?.id);
  
  const handleStatusChange = async (bookingId: string, status: "accepted" | "declined" | "completed") => {
    await updateBookingStatus(bookingId, status);
  };
  
  if (!user) return null;
  
  if (loading) {
    return (
      <div className="container mx-auto p-8 flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin w-12 h-12 rounded-full border-t-4 border-b-4 border-purple-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-red-200">
          <p className="font-medium">Error loading bookings:</p>
          <p className="mt-1 text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  // Create a simplified user object that conforms to the expected User type
  const currentUser: User = {
    id: user.id,
    email: user.email || "",
    full_name: user.user_metadata?.full_name || "",
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl animate-fade-in">
      <div className="flex items-center mb-8">
        <Calendar size={28} className="mr-3 text-purple-400" strokeWidth={1.5} />
        <h1 className="text-3xl font-medium bg-gradient-to-r from-purple-200 to-indigo-200 bg-clip-text text-transparent">
          My Bookings
        </h1>
      </div>
      
      <div className="bg-gradient-to-b from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-1.5 border border-gray-700/50 mb-6 flex shadow-xl">
        <button
          className={`flex-1 flex items-center justify-center px-4 py-3 rounded-xl transition-all ${
            activeTab === "sent" 
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/30" 
              : "text-gray-300 hover:text-gray-100 hover:bg-gray-700/30"
          }`}
          onClick={() => setActiveTab("sent")}
        >
          <SendHorizontal size={18} className="mr-2" />
          <span className="font-medium">Sent Requests</span>
        </button>
        <button
          className={`flex-1 flex items-center justify-center px-4 py-3 rounded-xl transition-all ${
            activeTab === "received" 
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/30" 
              : "text-gray-300 hover:text-gray-100 hover:bg-gray-700/30"
          }`}
          onClick={() => setActiveTab("received")}
        >
          <MailCheck size={18} className="mr-2" />
          <span className="font-medium">Received Requests</span>
        </button>
      </div>
      
      <div className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-xl animate-fade-in">
        {activeTab === "sent" ? (
          <BookingsList 
            bookings={sentBookings} 
            isReceived={false}
            currentUser={currentUser} 
            onStatusChange={handleStatusChange} 
          />
        ) : (
          <BookingsList 
            bookings={receivedBookings} 
            isReceived={true}
            currentUser={currentUser} 
            onStatusChange={handleStatusChange} 
          />
        )}
      </div>
    </div>
  );
};

export default Bookings;
