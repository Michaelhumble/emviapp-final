
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { supabaseBypass } from "@/types/supabase-bypass";

export function useFreelancerEarningsStats() {
  const { user } = useAuth();
  const [totalBookings, setTotalBookings] = useState(0);
  const [estimatedEarnings, setEstimatedEarnings] = useState(0);
  const [newClients, setNewClients] = useState(0);
  const [totalServices, setTotalServices] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use mock data for MVP - no real backend integration needed
    setLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      // Mock data based on a successful freelancer
      setTotalBookings(12);
      setEstimatedEarnings(1840);
      setNewClients(8);
      setTotalServices(4);
      setLoading(false);
    }, 800);
  }, [user?.id]);
  
  return {
    totalBookings,
    estimatedEarnings,
    newClients,
    totalServices,
    loading
  };
}
