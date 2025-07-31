import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";

interface UseArticleSaveReturn {
  isSaved: boolean;
  loading: boolean;
  toggleSave: () => Promise<boolean>;
}

export const useArticleSave = (articleSlug: string, articleTitle: string, articleUrl: string): UseArticleSaveReturn => {
  const { user, isSignedIn } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if article is saved on mount
  useEffect(() => {
    if (!isSignedIn || !articleSlug) return;

    const checkSaved = async () => {
      try {
        const { data, error } = await supabase
          .from("saved_articles")
          .select("*")
          .eq("user_id", user?.id)
          .eq("article_slug", articleSlug)
          .maybeSingle();
        
        if (error) throw error;
        setIsSaved(!!data);
      } catch (error) {
        console.log("No saved article found");
      }
    };
    
    checkSaved();
  }, [isSignedIn, articleSlug, user?.id]);

  const toggleSave = async (): Promise<boolean> => {
    if (!isSignedIn || !articleSlug) {
      toast.error("Please sign in to save articles");
      return false;
    }

    try {
      setLoading(true);
      
      if (isSaved) {
        // Remove saved article
        const { error } = await supabase
          .from("saved_articles")
          .delete()
          .eq("user_id", user?.id)
          .eq("article_slug", articleSlug);
          
        if (error) throw error;
        
        setIsSaved(false);
        toast.success("Article removed from saved list");
      } else {
        // Save article
        const { error } = await supabase
          .from("saved_articles")
          .insert({
            user_id: user?.id,
            article_slug: articleSlug,
            article_title: articleTitle,
            article_url: articleUrl
          });
          
        if (error) throw error;
        
        setIsSaved(true);
        toast.success("Article saved to your reading list");
      }
      
      return true;
    } catch (error) {
      console.error("Error toggling save:", error);
      toast.error("Failed to update saved articles");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    isSaved,
    loading,
    toggleSave
  };
};