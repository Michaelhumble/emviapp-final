
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getPreferredLanguage, hasLanguagePreference, setPreferredLanguage } from "@/utils/languagePreference";

// Key for storing the dialog visibility state
const LANGUAGE_PREFERENCE_SHOWN_KEY = 'emviapp_language_preference_shown';

const LanguagePreference = () => {
  const { user, userProfile } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only show preference dialog if:
    // 1. User is logged in
    // 2. User doesn't have a language preference in their profile
    // 3. User hasn't set a preference in localStorage
    // 4. The dialog hasn't been shown in this session
    const hasShownDialog = sessionStorage.getItem(LANGUAGE_PREFERENCE_SHOWN_KEY) === 'true';
    const hasUserLanguagePreference = userProfile?.preferred_language;
    
    if (user && !hasUserLanguagePreference && !hasLanguagePreference() && !hasShownDialog) {
      // Wait a bit to not overwhelm new users with too many modals at once
      const timer = setTimeout(() => {
        setOpen(true);
        // Mark as shown for this session
        sessionStorage.setItem(LANGUAGE_PREFERENCE_SHOWN_KEY, 'true');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [user, userProfile]);

  const setLanguage = async (language: string) => {
    if (!user) return;
    
    setLoading(true);
    
    // Save to localStorage immediately for a responsive experience
    setPreferredLanguage(language);
    
    try {
      const { error } = await supabase
        .from('users')  // Use 'users' table instead of 'profiles'
        .update({ preferred_language: language })
        .eq('id', user.id);

      if (error) throw error;

      toast.success(`Language preference set to ${language === 'en' ? 'English' : 'Tiếng Việt'}`);
    } catch (error) {
      console.error("Error updating language preference:", error);
      toast.error("Failed to update language preference");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Choose Your Preferred Language</DialogTitle>
          <DialogDescription className="pt-2">
            Chọn ngôn ngữ ưa thích của bạn
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 py-4">
          <Button 
            variant="outline" 
            size="lg" 
            className="h-16 justify-start text-lg"
            onClick={() => setLanguage('en')}
            disabled={loading}
          >
            <span className="mr-2">🇺🇸</span> English
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="h-16 justify-start text-lg"
            onClick={() => setLanguage('vi')}
            disabled={loading}
          >
            <span className="mr-2">🇻🇳</span> Tiếng Việt
          </Button>
        </div>
        
        <DialogFooter>
          <p className="text-sm text-muted-foreground">
            You can change this anytime in your profile settings
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LanguagePreference;
