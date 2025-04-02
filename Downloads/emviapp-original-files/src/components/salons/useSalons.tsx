
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

interface Salon {
  id: string;
  name: string;
  location: string;
  owner_name: string;
  contact: string;
  services?: string[];
  badges?: string[];
}

interface FilterState {
  location: string;
  service: string;
  verified: boolean;
  keyword: string;
}

export const useSalons = (filters: FilterState) => {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        setLoading(true);
        
        let query = supabase
          .from("salons")
          .select("*");
        
        if (filters.location) {
          query = query.ilike("location", `%${filters.location}%`);
        }
        
        if (filters.service) {
          query = query.contains("services", [filters.service]);
        }
        
        if (filters.verified) {
          query = query.contains("badges", ["verified"]);
        }
        
        if (filters.keyword) {
          query = query.or(`name.ilike.%${filters.keyword}%,owner_name.ilike.%${filters.keyword}%`);
        }
        
        query = query.order("name");
        
        const { data, error } = await query;
          
        if (error) {
          throw error;
        }
        
        setSalons(data || []);
      } catch (err) {
        console.error("Error fetching salons:", err);
        setError("Failed to load salons. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, [filters]);

  return { salons, loading, error };
};

export default useSalons;
