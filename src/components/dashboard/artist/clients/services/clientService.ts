
import { supabaseBypass } from "@/types/supabase-bypass";
import { toast } from "sonner";
import { ArtistClientRow, ClientData, BookingHistoryItem } from "../types";
import { ClientBookingMetadata } from "../types/clientTypes";

export const fetchClientBookings = async (userId: string) => {
  const { data: bookings, error: bookingsError } = await supabaseBypass
    .from('bookings')
    .select('*, services(title, price)')
    .eq('recipient_id', userId);

  if (bookingsError) throw bookingsError;
  return bookings;
};

export const fetchManualClients = async (userId: string) => {
  const { data: manualClients, error: manualClientsError } = await supabaseBypass
    .from('artist_clients')
    .select('*')
    .eq('artist_id', userId);

  if (manualClientsError) throw manualClientsError;
  return manualClients as any[];
};

export const addClientToDatabase = async (
  artistId: string,
  clientData: { name: string; phone: string; notes: string }
) => {
  const { data, error } = await supabaseBypass
    .from('artist_clients')
    .insert({
      artist_id: artistId,
      name: clientData.name,
      phone: clientData.phone,
      notes: clientData.notes
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateClientNotesInDatabase = async (
  artistId: string,
  clientId: string,
  notes: string
) => {
  const { error } = await supabaseBypass
    .from('artist_clients')
    .update({ notes })
    .eq('id', clientId)
    .eq('artist_id', artistId);

  if (error) throw error;
};
