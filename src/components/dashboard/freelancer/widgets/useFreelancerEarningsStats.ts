
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";

export function useFreelancerEarningsStats() {
  const { user } = useAuth();
  const [totalBookings, setTotalBookings] = useState(0);
  const [estimatedEarnings, setEstimatedEarnings] = useState(0);
  const [newClients, setNewClients] = useState(0);
  const [totalServices, setTotalServices] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      if (!user?.id) return;
      
      setLoading(true);
      try {
        // Get current month boundaries
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();
        
        // Fetch all bookings for this freelancer
        const { data: bookingsData, error: bookingsError } = await supabase
          .from("bookings")
          .select(`
            id, created_at, date_requested, status,
            service:service_id(price)
          `)
          .eq("recipient_id", user.id)
          .gte("created_at", startOfMonth)
          .lte("created_at", endOfMonth);
          
        if (bookingsError) throw bookingsError;
        
        // Fetch all unique client IDs from bookings
        const { data: clientsData, error: clientsError } = await supabase
          .from("bookings")
          .select("sender_id")
          .eq("recipient_id", user.id)
          .gte("created_at", startOfMonth)
          .lte("created_at", endOfMonth);
          
        if (clientsError) throw clientsError;
        
        // Fetch total services offered
        const { data: servicesData, error: servicesError } = await supabase
          .from("services")
          .select("id")
          .eq("user_id", user.id);
          
        if (servicesError) throw servicesError;
        
        // Calculate metrics
        const bookingCount = bookingsData?.length || 0;
        
        // Calculate earnings (sum of service prices for completed bookings)
        let earnings = 0;
        bookingsData?.forEach(booking => {
          if (booking.service && booking.service.price) {
            earnings += Number(booking.service.price);
          }
        });
        
        // Count unique clients
        const uniqueClients = new Set();
        clientsData?.forEach(client => {
          if (client.sender_id) {
            uniqueClients.add(client.sender_id);
          }
        });
        
        // Set state with calculated metrics
        setTotalBookings(bookingCount);
        setEstimatedEarnings(Math.round(earnings));
        setNewClients(uniqueClients.size);
        setTotalServices(servicesData?.length || 0);
      } catch (error) {
        console.error("Error fetching freelancer stats:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchStats();
  }, [user?.id]);
  
  return {
    totalBookings,
    estimatedEarnings,
    newClients,
    totalServices,
    loading
  };
}
