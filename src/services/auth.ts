
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getAuthCallbackUrl } from "@/utils/getBaseUrl";
import { AUTH_CONFIG } from "@/utils/authConfig";

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
        emailRedirectTo: getAuthCallbackUrl('/auth/callback'),
        // Skip email confirmation for @emvi.app emails or if globally disabled
        ...(isEmviEmail || AUTH_CONFIG.SKIP_EMAIL_VERIFICATION ? { skipEmailConfirmation: true } : {})
      }
    });

    if (error) throw error;
    
    const skipVerification = isEmviEmail || AUTH_CONFIG.SKIP_EMAIL_VERIFICATION;
    if (skipVerification) {
      toast.success("Your account has been created and is ready to use!");
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
    const target = redirectTo || getAuthCallbackUrl('/auth/callback');
    console.group('🔧 [GOOGLE AUTH] Starting OAuth Flow');
    console.log('Redirect target:', target);
    console.log('Current origin:', window.location.origin);
    console.log('Auth callbacks →', target);
    console.groupEnd();
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { 
        redirectTo: target,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });
    
    if (error) {
      console.error('❌ [GOOGLE AUTH] Supabase OAuth error:', error);
      
      // More specific error handling for Google OAuth
      if (error.message?.includes('oauth')) {
        throw new Error('Google OAuth is not properly configured in Supabase. Please check your Google client credentials in the Supabase dashboard.');
      }
      if (error.message?.includes('redirect')) {
        throw new Error('OAuth redirect URL is not authorized. Please check your Google OAuth redirect URLs in the Supabase dashboard.');
      }
      if (error.message?.includes('unauthorized')) {
        throw new Error('Google OAuth client is not authorized. Please verify your Google Cloud Console configuration.');
      }
      throw error;
    }
    
    console.log('✅ [GOOGLE AUTH] OAuth initiated successfully');
    return { success: true, data };
  } catch (error: any) {
    console.error('❌ [GOOGLE AUTH] Complete error details:', error);
    // Return structured error for better UI handling
    return { 
      success: false, 
      error: {
        ...error,
        userMessage: error.userMessage || error.message || 'Google sign-in failed. Please try again or use email sign-in.'
      }
    };
  }
}

// Facebook OAuth
export async function signInWithFacebook(redirectTo?: string) {
  try {
    const target = redirectTo || getAuthCallbackUrl('/auth/callback');
    console.group('🔧 [FACEBOOK AUTH] Starting OAuth Flow');
    console.log('Redirect target:', target);
    console.log('Current origin:', window.location.origin);
    console.log('Auth callbacks →', target);
    console.groupEnd();
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: { 
        redirectTo: target,
        queryParams: {
          scope: 'email'
        }
      }
    });
    
    if (error) {
      console.error('❌ [FACEBOOK AUTH] Supabase OAuth error:', error);
      
      // More specific error handling for Facebook OAuth
      if (error.message?.includes('oauth')) {
        throw new Error('Facebook OAuth is not properly configured in Supabase. Please check your Facebook app credentials in the Supabase dashboard.');
      }
      if (error.message?.includes('redirect')) {
        throw new Error('OAuth redirect URL is not authorized. Please check your Facebook OAuth redirect URLs in the Supabase dashboard.');
      }
      if (error.message?.includes('unauthorized')) {
        throw new Error('Facebook OAuth client is not authorized. Please verify your Facebook Developer Console configuration.');
      }
      throw error;
    }
    
    console.log('✅ [FACEBOOK AUTH] OAuth initiated successfully');
    return { success: true, data };
  } catch (error: any) {
    console.error('❌ [FACEBOOK AUTH] Complete error details:', error);
    // Return structured error for better UI handling
    return { 
      success: false, 
      error: {
        ...error,
        userMessage: error.userMessage || error.message || 'Facebook sign-in failed. Please try again or use email sign-in.'
      }
    };
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
    const target = getAuthCallbackUrl('/auth/callback');
    console.info('📱 [PHONE AUTH] Starting SMS OTP flow with redirect:', target);
    
    const { data, error } = await supabase.auth.signInWithOtp({
      phone,
      options: ({ channel: 'sms', redirectTo: target } as any)
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
