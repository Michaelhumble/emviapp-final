
import { useState, useCallback } from 'react';
import { addDays, startOfWeek, endOfWeek, subWeeks, addWeeks } from 'date-fns';

export const useCalendarNavigation = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Get week days starting from Monday (weekStartsOn: 1)
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  const goToPreviousWeek = useCallback(() => {
    setCurrentDate(prevDate => subWeeks(prevDate, 1));
  }, []);
  
  const goToNextWeek = useCallback(() => {
    setCurrentDate(prevDate => addWeeks(prevDate, 1));
  }, []);
  
  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);
  
  return {
    currentDate,
    weekDays,
    goToPreviousWeek,
    goToNextWeek,
    goToToday
  };
};
