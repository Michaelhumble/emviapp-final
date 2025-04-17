
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import { ClientData } from "../types";
import { UseClientListReturn } from "../types/clientTypes";
import { createManualClient } from "../utils/clientDataProcessor";

export const useClientList = (): UseClientListReturn => {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchClients = useCallback(async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      const { data: artistClients, error } = await supabase
        .from('artist_clients')
        .select('*')
        .eq('artist_id', user.id);

      if (error) throw error;

      // Convert artist_clients to ClientData format
      const processedClients = artistClients.map(client => ({
        id: client.id,
        name: client.name,
        phone: client.phone || '',
        notes: client.notes || '',
        visitCount: 0, // We'll need to track this separately
        totalSpent: 0, // We'll need to track this separately
        bookingHistory: [], // We'll need to fetch this separately
        isManualEntry: true
      }));

      setClients(processedClients);
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

      // Add the new client to the list
      const newClient = createManualClient(data);
      setClients(prev => [...prev, newClient]);
      
      toast.success('Client added successfully');
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

      // Update the notes in the local state
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
