
import { useSalonsData, defaultFilters } from "../useSalonsData";
import type { SalonFilters } from "@/components/salons/types";

// Re-export the main hook
export { useSalonsData, defaultFilters };

// Re-export the SalonFilters type compatible with the SalonFilter component
export type { SalonFilters };
