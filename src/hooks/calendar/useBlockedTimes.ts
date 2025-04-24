
import { useState } from 'react';
import { toast } from 'sonner';
import { useDialogState } from './useDialogState';
import type { BlockedTime } from './useDialogState';

export const useBlockedTimes = (startDate: Date, endDate: Date) => {
  const [blockedTimes, setBlockedTimes] = useState<BlockedTime[]>([]);
  const [isLoadingBlockedTimes, setIsLoadingBlockedTimes] = useState(false);
  const [blockedTimesError, setBlockedTimesError] = useState<string | null>(null);
  const [isSavingBlockedTime, setIsSavingBlockedTime] = useState(false);
  const [isDeletingBlockedTime, setIsDeletingBlockedTime] = useState(false);

  const saveBlockedTime = async (blockedTimeData: Partial<BlockedTime>): Promise<void> => {
    setIsSavingBlockedTime(true);
    
    try {
      // Mock API call - in a real app, you'd save to your backend
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (blockedTimeData.id) {
        // Update existing blocked time
        setBlockedTimes(prev => 
          prev.map(bt => bt.id === blockedTimeData.id ? { ...bt, ...blockedTimeData } as BlockedTime : bt)
        );
        toast.success("Time block updated");
      } else {
        // Create new blocked time
        const newBlockedTime = {
          id: `blocked_${Date.now()}`,
          ...blockedTimeData,
          start_time: blockedTimeData.start_time || new Date().toISOString(),
          end_time: blockedTimeData.end_time || new Date().toISOString()
        } as BlockedTime;
        
        setBlockedTimes(prev => [...prev, newBlockedTime]);
        toast.success("Time blocked successfully");
      }
    } catch (error) {
      console.error("Error saving blocked time:", error);
      setBlockedTimesError("Failed to save blocked time");
      toast.error("Failed to block time");
    } finally {
      setIsSavingBlockedTime(false);
    }
  };

  const deleteBlockedTime = async (id: string): Promise<void> => {
    setIsDeletingBlockedTime(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setBlockedTimes(prev => prev.filter(bt => bt.id !== id));
      toast.success("Time block removed");
    } catch (error) {
      console.error("Error deleting blocked time:", error);
      setBlockedTimesError("Failed to delete blocked time");
      toast.error("Failed to remove time block");
    } finally {
      setIsDeletingBlockedTime(false);
    }
  };

  return {
    blockedTimes,
    isLoadingBlockedTimes,
    blockedTimesError,
    isSavingBlockedTime,
    isDeletingBlockedTime,
    saveBlockedTime,
    deleteBlockedTime
  };
};
