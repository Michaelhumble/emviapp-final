
import { BookingHistoryItem, ClientData } from "../types";

export interface ClientOperations {
  addClient: (clientData: Omit<ClientData, 'id' | 'totalSpent' | 'visitCount' | 'lastVisit' | 'bookingHistory'>) => Promise<void>;
  updateClientNotes: (clientId: string, notes: string) => Promise<void>;
}

export interface UseClientListReturn extends ClientOperations {
  clients: ClientData[];
  isLoading: boolean;
  refetchClients: () => Promise<void>;
}

export interface ClientBookingMetadata {
  client_name?: string;
  customer_name?: string;
  phone?: string;
  client_phone?: string;
}
