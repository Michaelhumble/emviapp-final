
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';
import { UpsellService } from '@/hooks/useServiceUpsells';
import { useNotificationContext } from '@/context/notification';

interface BookingState {
  id: string | null;
  serviceId: string | null;
  providerId: string | null;
  date: Date | null;
  time: string | null;
  additionalServices: UpsellService[];
  notes: string;
  status: 'draft' | 'pending' | 'accepted' | 'completed' | 'cancelled';
  totalValue: number;
}

interface BookingContextType {
  bookingState: BookingState;
  setServiceId: (id: string | null) => void;
  setProviderId: (id: string | null) => void;
  setDate: (date: Date | null) => void;
  setTime: (time: string | null) => void;
  setNotes: (notes: string) => void;
  addAdditionalService: (service: UpsellService) => void;
  removeAdditionalService: (serviceId: string) => void;
  saveBookingDraft: () => Promise<string | null>;
  submitBooking: () => Promise<boolean>;
  resetBooking: () => void;
  loadBookingDraft: (bookingId: string) => Promise<boolean>;
  isLoading: boolean;
}

const defaultBookingState: BookingState = {
  id: null,
  serviceId: null,
  providerId: null,
  date: null,
  time: null,
  additionalServices: [],
  notes: '',
  status: 'draft',
  totalValue: 0,
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { sendNotification } = useNotificationContext();
  const [bookingState, setBookingState] = useState<BookingState>({ ...defaultBookingState });
  const [isLoading, setIsLoading] = useState(false);
  
  // Calculate total value whenever relevant fields change
  useEffect(() => {
    const calculateTotal = async () => {
      let total = 0;
      
      // Add main service price
      if (bookingState.serviceId) {
        try {
          const { data, error } = await supabase
            .from('services')
            .select('price')
            .eq('id', bookingState.serviceId)
            .single();
          
          if (error) throw error;
          if (data) total += Number(data.price);
        } catch (err) {
          console.error('Error fetching service price:', err);
        }
      }
      
      // Add additional services
      bookingState.additionalServices.forEach(service => {
        total += Number(service.price);
      });
      
      setBookingState(prev => ({ ...prev, totalValue: total }));
    };
    
    calculateTotal();
  }, [bookingState.serviceId, bookingState.additionalServices]);
  
  // Set service ID
  const setServiceId = (id: string | null) => {
    setBookingState(prev => ({ ...prev, serviceId: id }));
  };
  
  // Set provider ID
  const setProviderId = (id: string | null) => {
    setBookingState(prev => ({ ...prev, providerId: id }));
  };
  
  // Set date
  const setDate = (date: Date | null) => {
    setBookingState(prev => ({ ...prev, date }));
  };
  
  // Set time
  const setTime = (time: string | null) => {
    setBookingState(prev => ({ ...prev, time }));
  };
  
  // Set notes
  const setNotes = (notes: string) => {
    setBookingState(prev => ({ ...prev, notes }));
  };
  
  // Add additional service
  const addAdditionalService = (service: UpsellService) => {
    setBookingState(prev => {
      // Check if service is already added
      if (prev.additionalServices.some(s => s.id === service.id)) {
        return prev;
      }
      
      return {
        ...prev,
        additionalServices: [...prev.additionalServices, service]
      };
    });
    
    toast.success(`Added ${service.title} to your booking`);
  };
  
  // Remove additional service
  const removeAdditionalService = (serviceId: string) => {
    setBookingState(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.filter(s => s.id !== serviceId)
    }));
  };
  
  // Save booking as draft
  const saveBookingDraft = async (): Promise<string | null> => {
    if (!user) {
      toast.error('You must be logged in to save a booking');
      return null;
    }
    
    if (!bookingState.serviceId || !bookingState.providerId) {
      return null;
    }
    
    setIsLoading(true);
    
    try {
      const bookingData = {
        sender_id: user.id,
        recipient_id: bookingState.providerId,
        service_id: bookingState.serviceId,
        date_requested: bookingState.date ? bookingState.date.toISOString().split('T')[0] : null,
        time_requested: bookingState.time,
        note: bookingState.notes,
        status: 'draft',
        last_activity: new Date().toISOString(),
        metadata: {
          additional_services: bookingState.additionalServices.map(s => s.id),
          total_value: bookingState.totalValue
        }
      };
      
      let response;
      
      if (bookingState.id) {
        // Update existing draft
        response = await supabase
          .from('bookings')
          .update(bookingData)
          .eq('id', bookingState.id)
          .eq('sender_id', user.id)
          .select()
          .single();
      } else {
        // Create new draft
        response = await supabase
          .from('bookings')
          .insert(bookingData)
          .select()
          .single();
      }
      
      if (response.error) throw response.error;
      
      setBookingState(prev => ({ ...prev, id: response.data.id }));
      return response.data.id;
    } catch (err: any) {
      console.error('Error saving booking draft:', err);
      toast.error('Failed to save booking draft');
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load booking draft
  const loadBookingDraft = async (bookingId: string): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id, 
          service_id, 
          recipient_id, 
          date_requested, 
          time_requested, 
          note, 
          status, 
          metadata
        `)
        .eq('id', bookingId)
        .eq('sender_id', user.id)
        .single();
      
      if (error) throw error;
      
      if (!data) {
        toast.error('Booking draft not found');
        return false;
      }
      
      // Fetch additional services
      const additionalServiceIds = data.metadata?.additional_services || [];
      let additionalServices: UpsellService[] = [];
      
      if (additionalServiceIds.length > 0) {
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('id, title, price, description, duration_minutes, image_url')
          .in('id', additionalServiceIds);
        
        if (!servicesError && servicesData) {
          additionalServices = servicesData;
        }
      }
      
      setBookingState({
        id: data.id,
        serviceId: data.service_id,
        providerId: data.recipient_id,
        date: data.date_requested ? new Date(data.date_requested) : null,
        time: data.time_requested,
        additionalServices,
        notes: data.note || '',
        status: data.status as any,
        totalValue: data.metadata?.total_value || 0
      });
      
      return true;
    } catch (err) {
      console.error('Error loading booking draft:', err);
      toast.error('Failed to load booking draft');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Submit booking
  const submitBooking = async (): Promise<boolean> => {
    if (!user) {
      toast.error('You must be logged in to submit a booking');
      return false;
    }
    
    if (!bookingState.serviceId || !bookingState.providerId || !bookingState.date || !bookingState.time) {
      toast.error('Please fill out all required fields');
      return false;
    }
    
    setIsLoading(true);
    
    try {
      const bookingData = {
        status: 'pending',
        last_activity: new Date().toISOString()
      };
      
      let response;
      
      if (bookingState.id) {
        // Update existing draft to pending
        response = await supabase
          .from('bookings')
          .update(bookingData)
          .eq('id', bookingState.id)
          .eq('sender_id', user.id)
          .select()
          .single();
      } else {
        // Should have saved as draft first
        throw new Error('No booking draft found');
      }
      
      if (response.error) throw response.error;
      
      // Create a notification about the booking
      await sendNotification({
        type: 'booking_created',
        message: 'Your booking has been submitted and is awaiting confirmation.',
        link: '/dashboard/bookings',
        details: { booking_id: bookingState.id }
      });
      
      toast.success('Booking submitted successfully!');
      resetBooking();
      return true;
    } catch (err: any) {
      console.error('Error submitting booking:', err);
      toast.error('Failed to submit booking');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Reset booking state
  const resetBooking = () => {
    setBookingState({ ...defaultBookingState });
  };
  
  const value = {
    bookingState,
    setServiceId,
    setProviderId,
    setDate,
    setTime,
    setNotes,
    addAdditionalService,
    removeAdditionalService,
    saveBookingDraft,
    submitBooking,
    resetBooking,
    loadBookingDraft,
    isLoading
  };
  
  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};
