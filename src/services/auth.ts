
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getAppOrigin } from "@/utils/getAppOrigin";

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

// OAuth providers
export async function signInWithGoogle(redirectTo?: string) {
  try {
    const target = redirectTo || `${getAppOrigin()}/auth/redirect`;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: target }
    });
    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    console.error('Google sign-in error:', error);
    return { success: false, error };
  }
}


// export async function signInWithApple(redirectTo?: string) {
//   // Disabled per strict instruction: Do not integrate Apple Sign-In
//   // Keeping this stub commented for potential future reactivation.
//   // try {
//   //   const { data, error } = await supabase.auth.signInWithOAuth({
//   //     provider: 'apple',
//   //     options: { redirectTo }
//   //   });
//   //   if (error) throw error;
//   //   return { success: true, data };
//   // } catch (error: any) {
//   //   console.error('Apple sign-in error:', error);
//   //   return { success: false, error };
//   // }
// }

// Phone OTP
export async function signInWithPhone(phone: string) {
  try {
    const target = `${getAppOrigin()}/auth/redirect`;
    const { data, error } = await supabase.auth.signInWithOtp({
      phone,
      options: { channel: 'sms' }
    });
    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    console.error('Phone OTP send error:', error);
    return { success: false, error };
  }
}


export async function verifyPhoneOtp(phone: string, token: string) {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms'
    });
    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    console.error('Phone OTP verify error:', error);
    return { success: false, error };
  }
}
