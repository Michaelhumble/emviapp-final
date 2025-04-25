
import { useAuth } from "@/context/auth";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock calendar data - days with appointments
const bookedDays = [
  new Date(2025, 3, 8),
  new Date(2025, 3, 12),
  new Date(2025, 3, 15),
  new Date(2025, 3, 22),
  new Date(2025, 3, 29)
];

const MiniCalendar = () => {
  const { userProfile } = useAuth();
  const isNewArtist = !userProfile?.profile_completion || userProfile.profile_completion < 20;

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const checkIsBooked = (day: Date) => {
    return bookedDays.some(bookedDay => isSameDay(day, bookedDay));
  };
  
  return (
    <div className="space-y-4">
      {isNewArtist ? (
        <div className="text-center py-6">
          <h3 className="text-lg font-medium text-gray-900">Ready to Start Booking</h3>
          <p className="text-sm text-gray-500 mt-2">
            Complete your profile to start accepting client appointments.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPreviousMonth}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-sm font-medium">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNextMonth}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="text-gray-500 text-xs font-medium p-1">
                {day}
              </div>
            ))}
            
            {days.map((day, dayIdx) => {
              const isBooked = checkIsBooked(day);
              const isSelected = isSameDay(day, selectedDate);
              const isCurrentMonth = isSameMonth(day, currentMonth);
              
              return (
                <motion.button
                  key={dayIdx}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDate(day)}
                  className={`
                    h-8 w-8 rounded-full flex items-center justify-center text-xs transition-colors
                    ${!isCurrentMonth ? "text-gray-300" : ""}
                    ${isSelected ? "bg-purple-600 text-white" : ""}
                    ${isBooked && !isSelected ? "bg-purple-100 text-purple-800" : ""}
                  `}
                >
                  {format(day, "d")}
                </motion.button>
              );
            })}
          </div>
          
          <div className="flex justify-between items-center text-xs pt-2">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-purple-600 mr-2"></div>
              <span className="text-gray-600">Selected</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-purple-100 mr-2"></div>
              <span className="text-gray-600">Booked</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MiniCalendar;
