
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { differenceInWeeks } from 'date-fns';

export const useRebookingReminder = () => {
  const { user } = useAuth();
  const [shouldShowReminder, setShouldShowReminder] = useState(false);
  const [artistName, setArtistName] = useState('');
  const [artistId, setArtistId] = useState('');
  const [lastBookingDate, setLastBookingDate] = useState<Date>(new Date());
  
  useEffect(() => {
    if (!user) return;
    
    const checkForRebookingOpportunity = async () => {
      try {
        // Get the user's last completed booking
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            id,
            recipient_id,
            created_at
          `)
          .eq('sender_id', user.id)
          .eq('status', 'completed')
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (error || !data || data.length === 0) return;
        
        const bookingDate = new Date(data[0].created_at);
        const weeksAgo = differenceInWeeks(new Date(), bookingDate);
        
        // If booking was 3+ weeks ago, show reminder
        if (weeksAgo >= 3) {
          setLastBookingDate(bookingDate);
          setArtistId(data[0].recipient_id);
          
          // Get artist name in a separate query
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('full_name')
            .eq('id', data[0].recipient_id)
            .single();
          
          if (!userError && userData) {
            setArtistName(userData.full_name);
          } else {
            setArtistName('your artist');
          }
          
          setShouldShowReminder(true);
        }
      } catch (err) {
        // No relevant bookings, or error occurred
        console.log('No relevant bookings found for rebooking reminder');
      }
    };
    
    // Check on first load
    checkForRebookingOpportunity();
    
    // Check daily (convert to milliseconds)
    const interval = setInterval(checkForRebookingOpportunity, 24 * 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [user]);
  
  const dismissReminder = () => {
    setShouldShowReminder(false);
  };
  
  return { 
    shouldShowReminder, 
    artistName, 
    artistId, 
    lastBookingDate,
    dismissReminder 
  };
};
