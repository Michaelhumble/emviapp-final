
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { ClientData, ArtistClientRow } from "../types";
import { toast } from "sonner";

export const useClientList = () => {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchClients = useCallback(async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      // First, get all bookings for this artist
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('*, services(title, price)')
        .eq('recipient_id', user.id);

      if (bookingsError) throw bookingsError;

      // Next, get manually added clients
      const { data: manualClients, error: manualClientsError } = await supabase
        .from('artist_clients')
        .select('*')
        .eq('artist_id', user.id);

      if (manualClientsError) throw manualClientsError;

      // Process bookings to group by client
      const clientMap = new Map<string, ClientData>();
      
      // Process bookings first
      if (bookings) {
        bookings.forEach(booking => {
          const clientId = booking.sender_id;
          const existingClient = clientMap.get(clientId);
          
          // Calculate price from service if available
          const servicePrice = booking.services?.price || 0;
          
          if (existingClient) {
            // Update existing client record
            existingClient.visitCount = (existingClient.visitCount || 0) + 1;
            existingClient.totalSpent = (existingClient.totalSpent || 0) + servicePrice;
            
            if (booking.date_requested) {
              const bookingDate = new Date(booking.date_requested);
              if (!existingClient.lastVisit || bookingDate > new Date(existingClient.lastVisit)) {
                existingClient.lastVisit = booking.date_requested;
              }
            }
            
            existingClient.bookingHistory.push({
              id: booking.id,
              date: booking.date_requested,
              service: booking.services?.title || 'Unnamed service',
              price: servicePrice,
              status: booking.status
            });
            
            clientMap.set(clientId, existingClient);
          } else {
            // Get customer name from the booking metadata
            const metadata = booking.metadata as Record<string, any>;
            const clientName = metadata?.client_name || metadata?.customer_name || 'Unknown Client';
            const clientPhone = metadata?.phone || metadata?.client_phone || '';
            
            clientMap.set(clientId, {
              id: clientId,
              name: clientName,
              phone: clientPhone,
              notes: '',
              visitCount: 1,
              lastVisit: booking.date_requested,
              totalSpent: servicePrice,
              bookingHistory: [{
                id: booking.id,
                date: booking.date_requested,
                service: booking.services?.title || 'Unnamed service',
                price: servicePrice,
                status: booking.status
              }],
              isManualEntry: false
            });
          }
        });
      }
      
      // Add manually created clients
      if (manualClients) {
        (manualClients as ArtistClientRow[]).forEach(client => {
          if (!clientMap.has(client.id)) {
            clientMap.set(client.id, {
              id: client.id,
              name: client.name,
              phone: client.phone || '',
              notes: client.notes || '',
              visitCount: 0,
              totalSpent: 0,
              bookingHistory: [],
              isManualEntry: true
            });
          } else {
            // If this client also has bookings, update the notes
            const existingClient = clientMap.get(client.id)!;
            existingClient.notes = client.notes || existingClient.notes;
            clientMap.set(client.id, existingClient);
          }
        });
      }
      
      setClients(Array.from(clientMap.values()));
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('Failed to load clients');
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  const addClient = async (clientData: { name: string; phone: string; notes: string }) => {
    if (!user?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('artist_clients')
        .insert({
          artist_id: user.id,
          name: clientData.name,
          phone: clientData.phone,
          notes: clientData.notes
        })
        .select()
        .single();
      
      if (error) throw error;
      
      if (data) {
        setClients(prev => [...prev, {
          id: data.id,
          name: data.name,
          phone: data.phone || '',
          notes: data.notes || '',
          visitCount: 0,
          totalSpent: 0,
          bookingHistory: [],
          isManualEntry: true
        }]);
        
        toast.success('Client added successfully');
      }
    } catch (error) {
      console.error('Error adding client:', error);
      toast.error('Failed to add client');
    }
  };

  const updateClientNotes = async (clientId: string, notes: string) => {
    if (!user?.id) return;
    
    try {
      const { error } = await supabase
        .from('artist_clients')
        .update({ notes })
        .eq('id', clientId)
        .eq('artist_id', user.id);
        
      if (error) throw error;
      
      setClients(prev => 
        prev.map(client => 
          client.id === clientId 
            ? { ...client, notes } 
            : client
        )
      );
      
      toast.success('Notes saved');
    } catch (error) {
      console.error('Error updating client notes:', error);
      toast.error('Failed to save notes');
    }
  };

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return {
    clients,
    isLoading,
    addClient,
    updateClientNotes,
    refetchClients: fetchClients
  };
};
