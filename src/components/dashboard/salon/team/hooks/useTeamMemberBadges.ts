
import { useQuery } from "@tanstack/react-query";
import { supabaseBypass } from "@/types/supabase-bypass";
import { toast } from "sonner";

export interface TeamMemberBadge {
  badge_type: string;
  earned_at: string;
  metadata: any;
}

export const useTeamMemberBadges = (memberId: string | undefined) => {
  return useQuery({
    queryKey: ['teamMemberBadges', memberId],
    queryFn: async (): Promise<TeamMemberBadge[]> => {
      if (!memberId) throw new Error('Member ID is required');

      const [badgesPromise, performancePromise, feedbackPromise] = await Promise.all([
        // Get existing badges
        supabaseBypass
          .from('team_member_badges')
          .select('*')
          .eq('member_id', memberId),
        
        // Check if top performer
        supabaseBypass.rpc('is_top_performer', { p_artist_id: memberId }),
        
        // Check if has great feedback
        supabaseBypass.rpc('has_great_feedback', { p_artist_id: memberId })
      ]);

      const [{ data: badges, error: badgesError }, 
            { data: isTopPerformer }, 
            { data: hasGreatFeedback }] = [badgesPromise, performancePromise, feedbackPromise];

      if (badgesError) throw badgesError;

      const existingBadges = badges || [];
      
      // Add dynamic badges based on current status
      if (isTopPerformer) {
        await supabaseBypass.rpc('award_team_badge', {
          p_member_id: memberId,
          p_badge_type: 'top_performer'
        });
      }

      if (hasGreatFeedback) {
        await supabaseBypass.rpc('award_team_badge', {
          p_member_id: memberId,
          p_badge_type: 'great_feedback'
        });
      }

      return existingBadges;
    },
    enabled: !!memberId
  });
};
