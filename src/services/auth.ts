
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Check if the user is invited
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("invited")
      .eq("id", data.user.id)
      .single();

    if (userError) throw userError;

    // If not invited, sign them out and redirect to early access
    if (!userData.invited) {
      await supabase.auth.signOut();
      toast.error("Your account needs approval. Please join the waitlist.");
      return { success: false, error: "not_invited", user: null };
    }

    return { success: true, user: data.user };
  } catch (error: any) {
    console.error("Sign in error:", error);
    return { success: false, error, user: null };
  }
}

export async function checkIfUserIsInvited(userId: string) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("invited")
      .eq("id", userId)
      .single();
    
    if (error) throw error;
    
    return data.invited === true;
  } catch (error) {
    console.error("Error checking if user is invited:", error);
    return false;
  }
}

export async function signUpWithEmail(email: string, password: string, userData: any) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });

    if (error) throw error;
    
    // By default, new users are not invited
    if (data.user) {
      const { error: updateError } = await supabase
        .from("users")
        .update({ invited: false })
        .eq("id", data.user.id);
      
      if (updateError) {
        console.error("Error setting invited status:", updateError);
      }
      
      toast.info("Your account has been created but needs approval. Please check your email for further instructions.");
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
