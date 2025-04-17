
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
    appointmentsError,
    isSavingAppointment,
    isDeletingAppointment,
    saveAppointment,
    deleteAppointment
  } = useAppointments(weekDays[0], weekEnd);

  const {
    blockedTimes,
    isLoadingBlockedTimes,
    blockedTimesError,
    isSavingBlockedTime,
    isDeletingBlockedTime,
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
    appointmentsError,
    isLoadingBlockedTimes,
    blockedTimesError,
    isSavingAppointment,
    isDeletingAppointment,
    isSavingBlockedTime,
    isDeletingBlockedTime,
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
