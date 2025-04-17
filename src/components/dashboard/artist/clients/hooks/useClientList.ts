
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/auth";
import { ClientData } from "../types";
import { toast } from "sonner";
import { UseClientListReturn } from "../types/clientTypes";
import { 
  fetchClientBookings, 
  fetchManualClients, 
  addClientToDatabase, 
  updateClientNotesInDatabase 
} from "../services/clientService";
import { 
  createClientFromBooking, 
  createManualClient 
} from "../utils/clientDataProcessor";

export const useClientList = (): UseClientListReturn => {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchClients = useCallback(async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      const bookings = await fetchClientBookings(user.id);
      const manualClients = await fetchManualClients(user.id);

      // Process bookings to group by client
      const clientMap = new Map<string, ClientData>();
      
      // Process bookings first
      if (bookings) {
        bookings.forEach(booking => {
          const clientId = booking.sender_id;
          const existingClient = clientMap.get(clientId);
          const servicePrice = booking.services?.price || 0;
          
          if (existingClient) {
            existingClient.visitCount += 1;
            existingClient.totalSpent += servicePrice;
            
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
            const newClient = createClientFromBooking(
              clientId,
              booking.metadata as any,
              booking,
              servicePrice
            );
            clientMap.set(clientId, newClient);
          }
        });
      }
      
      // Add manually created clients
      if (manualClients) {
        manualClients.forEach(client => {
          if (!clientMap.has(client.id)) {
            clientMap.set(client.id, createManualClient(client));
          } else {
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
      const newClient = await addClientToDatabase(user.id, clientData);
      if (newClient) {
        setClients(prev => [...prev, createManualClient(newClient)]);
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
      await updateClientNotesInDatabase(user.id, clientId, notes);
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
