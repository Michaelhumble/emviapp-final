
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

export const useExpirationCheck = (userId: string | null) => {
  const { toast } = useToast();

  useEffect(() => {
    if (!userId) return;
    
    const checkExpiringPosts = async () => {
      try {
        // Query posts that are about to expire (within 5 days)
        const { data: expiringPosts, error } = await supabase
          .from('post_status_view')
          .select('id, title, post_type, expires_at')
          .eq('user_id', userId)
          .eq('is_expiring_soon', true)
          .eq('status', 'active');
        
        if (error) {
          throw error;
        }
        
        // Show a toast for each expiring post
        expiringPosts?.forEach(post => {
          const expirationDate = new Date(post.expires_at);
          
          toast({
            title: "Post expiring soon",
            description: `Your ${post.post_type} post "${post.title}" will expire on ${format(expirationDate, "MMMM d, yyyy")}. Renew it to keep it active.`,
            // Remove duration property as it's not part of the ToastProps interface
          });
        });
        
      } catch (error) {
        console.error("Error checking for expiring posts:", error);
      }
    };
    
    // Check for expiring posts when the component mounts
    checkExpiringPosts();
    
    // Check for expiring posts every hour
    const intervalId = setInterval(checkExpiringPosts, 60 * 60 * 1000); // 1 hour in milliseconds
    
    return () => clearInterval(intervalId);
  }, [userId, toast]);
};
