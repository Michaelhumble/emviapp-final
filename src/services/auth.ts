
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { success: true, user: data.user };
  } catch (error: any) {
    console.error("Sign in error:", error);
    return { success: false, error, user: null };
  }
}

export async function signUpWithEmail(email: string, password: string, userData: any) {
  try {
    const isEmviEmail = email.endsWith('@emvi.app');
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: `${window.location.origin}/`,
        // Skip email confirmation for @emvi.app emails
        ...(isEmviEmail ? { skipEmailConfirmation: true } : {})
      }
    });

    if (error) throw error;
    
    if (isEmviEmail) {
      toast.success("Your @emvi.app account has been created and is ready to use!");
    } else {
      toast.info("Your account has been created! Please check your email for verification instructions.");
    }

    return { success: true, user: data.user };
  } catch (error: any) {
    console.error("Sign up error:", error);
    return { success: false, error, user: null };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Sign out error:", error);
    return { success: false, error };
  }
}
