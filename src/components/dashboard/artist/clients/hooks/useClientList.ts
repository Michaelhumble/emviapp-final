
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
      // Get manual clients first
      const { data: artistClients, error: clientsError } = await supabase
        .from('artist_clients')
        .select('*')
        .eq('artist_id', user.id);

      if (clientsError) throw clientsError;

      // Get completed bookings to calculate totals
      const { data: bookings, error: bookingsError } = await supabase
        .from('completed_bookings')
        .select('*, booking_id')
        .eq('artist_id', user.id);

      if (bookingsError) throw bookingsError;

      // Get booking details for customer info
      const bookingIds = bookings?.map(b => b.booking_id) || [];
      const { data: bookingDetails, error: bookingDetailsError } = await supabase
        .from('bookings')
        .select('id, sender_id, service_id')
        .in('id', bookingIds);

      if (bookingDetailsError) throw bookingDetailsError;

      // Get customer names
      const customerIds = [...new Set(bookingDetails?.map(b => b.sender_id) || [])];
      const { data: customers, error: customersError } = await supabase
        .from('users')
        .select('id, full_name')
        .in('id', customerIds);

      if (customersError) throw customersError;

      // Create lookup maps
      const customerMap = new Map(customers?.map(c => [c.id, c.full_name]) || []);
      const bookingMap = new Map();
      
      // Group bookings by customer
      bookings?.forEach(booking => {
        const bookingDetail = bookingDetails?.find(bd => bd.id === booking.booking_id);
        if (!bookingDetail) return;
        
        const customerId = bookingDetail.sender_id;
        if (!bookingMap.has(customerId)) {
          bookingMap.set(customerId, {
            totalSpent: 0,
            visitCount: 0,
            lastVisit: null,
            bookingHistory: []
          });
        }
        
        const customerData = bookingMap.get(customerId);
        customerData.totalSpent += Number(booking.service_price) || 0;
        customerData.visitCount += 1;
        customerData.lastVisit = !customerData.lastVisit || new Date(booking.completed_at) > new Date(customerData.lastVisit) 
          ? booking.completed_at 
          : customerData.lastVisit;
        customerData.bookingHistory.push({
          id: booking.id,
          date: booking.completed_at,
          price: booking.service_price,
          status: booking.paid ? 'completed' : 'pending'
        });
      });

      // Combine manual clients and booking data
      const processedClients = artistClients.map(client => ({
        id: client.id,
        name: client.name,
        phone: client.phone || '',
        notes: client.notes || '',
        visitCount: 0,
        totalSpent: 0,
        lastVisit: null,
        bookingHistory: [],
        isManualEntry: true
      }));

      // Add customers from bookings who aren't manual clients
      bookingMap.forEach((data, customerId) => {
        const customerName = customerMap.get(customerId);
        if (!customerName) return;
        
        const existingClient = processedClients.find(c => c.name === customerName);
        if (existingClient) {
          existingClient.totalSpent = data.totalSpent;
          existingClient.visitCount = data.visitCount;
          existingClient.lastVisit = data.lastVisit;
          existingClient.bookingHistory = data.bookingHistory;
          existingClient.isManualEntry = false;
        } else {
          processedClients.push({
            id: customerId,
            name: customerName,
            phone: '',
            notes: '',
            totalSpent: data.totalSpent,
            visitCount: data.visitCount,
            lastVisit: data.lastVisit,
            bookingHistory: data.bookingHistory,
            isManualEntry: false
          });
        }
      });

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
