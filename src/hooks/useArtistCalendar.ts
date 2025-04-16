
import { endOfWeek } from 'date-fns';
import { useCalendarNavigation } from './calendar/useCalendarNavigation';
import { useAppointments } from './calendar/useAppointments';
import { useBlockedTimes } from './calendar/useBlockedTimes';
import { useDialogState } from './calendar/useDialogState';

export const useArtistCalendar = () => {
  const { currentDate, weekDays, goToPreviousWeek, goToNextWeek, goToToday } = useCalendarNavigation();
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });

  const {
    appointments,
    isLoadingAppointments,
    saveAppointment,
    deleteAppointment
  } = useAppointments(weekDays[0], weekEnd);

  const {
    blockedTimes,
    isLoadingBlockedTimes,
    saveBlockedTime,
    deleteBlockedTime
  } = useBlockedTimes(weekDays[0], weekEnd);

  const dialogState = useDialogState();

  return {
    currentDate,
    weekDays,
    appointments,
    blockedTimes,
    isLoadingAppointments,
    isLoadingBlockedTimes,
    ...dialogState,
    goToPreviousWeek,
    goToNextWeek,
    goToToday,
    saveAppointment,
    saveBlockedTime,
    deleteAppointment,
    deleteBlockedTime
  };
};
