
import { Salon } from "../../types/salon";
import { X, Calendar } from "lucide-react";
import { useState } from "react";

export interface BookingModalProps {
  salon: Salon;
  onClose: () => void;
}

const BookingModal = ({ salon, onClose }: BookingModalProps) => {
  const [isOpen, setIsOpen] = useState(true);
  
  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-700/50">
          <h3 className="text-xl font-medium text-white">{salon.name}</h3>
          <button 
            onClick={handleClose}
            className="rounded-full p-1 hover:bg-gray-700/50 transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h4 className="text-lg font-medium text-purple-300 mb-3">About {salon.name}</h4>
            <p className="text-gray-300">
              {salon.description || `Book your appointment at ${salon.name}, located at ${salon.address}.`}
            </p>
          </div>
          
          <div className="bg-gray-800/50 p-4 rounded-lg mb-6">
            <div className="flex items-center mb-2">
              <Calendar size={18} className="text-purple-400 mr-2" />
              <h4 className="text-white font-medium">Select a date & time</h4>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Choose when you'd like to visit {salon.name}
            </p>
            
            {/* Placeholder for date picker */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {['Today', 'Tomorrow', 'Wed, May 17'].map((date) => (
                <button 
                  key={date} 
                  className="py-2 px-3 border border-gray-600 rounded-md text-sm text-gray-300 hover:bg-purple-500/20 hover:border-purple-500/50 transition-colors"
                >
                  {date}
                </button>
              ))}
            </div>
            
            {/* Placeholder for time picker */}
            <div className="grid grid-cols-3 gap-2">
              {['10:00 AM', '12:30 PM', '3:00 PM', '4:30 PM', '6:00 PM', '7:30 PM'].map((time) => (
                <button 
                  key={time} 
                  className="py-2 px-3 border border-gray-600 rounded-md text-sm text-gray-300 hover:bg-purple-500/20 hover:border-purple-500/50 transition-colors"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
          
          <button
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg transition-colors font-medium"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
