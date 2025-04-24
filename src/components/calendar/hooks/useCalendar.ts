
import { useState, useCallback, useEffect, useMemo } from "react";
import { addDays, startOfWeek, subWeeks, addWeeks, endOfWeek } from "date-fns";

interface UseCalendarOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  onDateChange?: (startDate: Date, endDate: Date) => void;
}

export const useCalendar = (options?: UseCalendarOptions) => {
  const { weekStartsOn = 1, onDateChange } = options || {};
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Calculate the week days based on the current date
  const weekDays = useMemo(() => {
    const start = startOfWeek(currentDate, { weekStartsOn });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [currentDate, weekStartsOn]);
  
  // Calculate the start and end dates of the current week
  const weekStart = weekDays[0];
  const weekEnd = weekDays[6];
  
  // Navigation functions
  const goToPreviousWeek = useCallback(() => {
    setCurrentDate(prevDate => subWeeks(prevDate, 1));
  }, []);
  
  const goToNextWeek = useCallback(() => {
    setCurrentDate(prevDate => addWeeks(prevDate, 1));
  }, []);
  
  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);
  
  const goToDate = useCallback((date: Date) => {
    setCurrentDate(date);
  }, []);
  
  // Notify parent component when the date range changes
  useEffect(() => {
    if (onDateChange) {
      onDateChange(weekStart, weekEnd);
    }
  }, [weekStart, weekEnd, onDateChange]);
  
  return {
    currentDate,
    weekDays,
    weekStart,
    weekEnd,
    goToPreviousWeek,
    goToNextWeek,
    goToToday,
    goToDate
  };
};
