
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { Salon, SalonFilters } from "../types/salon";

export const useSalonData = (filters?: SalonFilters) => {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [filteredSalons, setFilteredSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locations, setLocations] = useState<string[]>([]);
  const [salonTypes, setSalonTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        setLoading(true);
        let query = supabase.from("salons").select("*");

        if (filters?.searchTerm) {
          query = query.ilike("name", `%${filters.searchTerm}%`);
        }

        if (filters?.location && filters.location !== "all") {
          query = query.eq("city", filters.location);
        }

        if (filters?.salonType && filters.salonType !== "all") {
          query = query.eq("type", filters.salonType);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) {
          setError(fetchError.message);
        } else {
          setSalons(data || []);
        }
      } catch (err) {
        setError("Failed to fetch salons.");
        console.error("Error fetching salons:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, [filters]);

  useEffect(() => {
    // Apply open now filter in the client since it requires time manipulation
    if (filters?.openNow) {
      const now = new Date();
      const day = now.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
      const currentHour = now.getHours() * 100 + now.getMinutes();

      const filtered = salons.filter((salon) => {
        // Skip salons with undefined or string hours
        if (!salon.hours || typeof salon.hours === 'string') return false;
        
        const hourString = salon.hours[day as keyof typeof salon.hours] || "";
        if (!hourString) return false;
        
        const [open, close] = hourString.split(" - ").map((time) => {
          const [hour, minute] = time.split(":").map(Number);
          return hour * 100 + minute;
        });
        return currentHour >= open && currentHour <= close;
      });
      
      setFilteredSalons(filtered);
    } else {
      setFilteredSalons(salons);
    }
  }, [salons, filters?.openNow]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        // Fetch distinct cities
        const { data: locationsData, error: locationsError } = await supabase
          .from("salons")
          .select("city");
          
        if (locationsData) {
          // Extract unique cities
          const uniqueCities = Array.from(new Set(locationsData.map(l => l.city))).filter(Boolean);
          setLocations(uniqueCities);
        }

        // Fetch distinct salon types
        const { data: typesData, error: typesError } = await supabase
          .from("salons")
          .select("type");
          
        if (typesData) {
          // Extract unique types
          const uniqueTypes = Array.from(new Set(typesData.map(t => t.type))).filter(Boolean);
          setSalonTypes(uniqueTypes);
        }

        if (locationsError || typesError) {
          setError(
            locationsError?.message || typesError?.message || "Failed to fetch filters."
          );
        }
      } catch (err) {
        setError("Failed to fetch filters.");
        console.error("Error fetching filters:", err);
      }
    };

    fetchFilters();
  }, []);

  return {
    salons: filteredSalons.length > 0 ? filteredSalons : salons,
    loading,
    error,
    locations,
    salonTypes,
  };
};

export default useSalonData;
