
import { useState } from 'react';
import { addDays, startOfWeek } from 'date-fns';

export const useCalendarNavigation = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday as first day
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const goToPreviousWeek = () => {
    setCurrentDate(prevDate => addDays(prevDate, -7));
  };
  
  const goToNextWeek = () => {
    setCurrentDate(prevDate => addDays(prevDate, 7));
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return {
    currentDate,
    weekDays,
    goToPreviousWeek,
    goToNextWeek,
    goToToday
  };
};
