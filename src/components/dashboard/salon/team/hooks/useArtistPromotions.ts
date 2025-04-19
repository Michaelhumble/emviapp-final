
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PromotionStats {
  totalBookings: number;
  currentLevel: string;
  nextLevel: string | null;
  bookingsUntilNextLevel: number | null;
  progress: number;
}

export const getLevelInfo = (bookingsCount: number) => {
  if (bookingsCount >= 60) return { level: "Elite", next: null, required: null };
  if (bookingsCount >= 30) return { level: "Senior", next: "Elite", required: 60 };
  if (bookingsCount >= 10) return { level: "Pro", next: "Senior", required: 30 };
  return { level: "Junior", next: "Pro", required: 10 };
};

export const useArtistPromotions = (artistId: string | undefined) => {
  return useQuery({
    queryKey: ['artistPromotions', artistId],
    queryFn: async (): Promise<PromotionStats> => {
      if (!artistId) throw new Error('Artist ID is required');

      const { data: bookings, error } = await supabase
        .from('bookings')
        .select('id')
        .eq('recipient_id', artistId)
        .eq('status', 'completed');

      if (error) throw error;

      const totalBookings = bookings?.length || 0;
      const { level, next, required } = getLevelInfo(totalBookings);

      return {
        totalBookings,
        currentLevel: level,
        nextLevel: next,
        bookingsUntilNextLevel: required ? required - totalBookings : null,
        progress: required ? (totalBookings / required) * 100 : 100
      };
    },
    enabled: !!artistId
  });
};
