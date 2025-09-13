interface SignupCompletedData {
  userId?: string;
  email?: string;
  role?: string;
  method?: 'google' | 'facebook' | 'email';
  locale?: string;
  utm?: Record<string, string>;
}

export function trackSignupCompleted(data: SignupCompletedData) {
  try {
    // Track signup completion event
    if (typeof window !== 'undefined' && window._hsq) {
      window._hsq.push(['track', 'signup_completed', {
        user_id: data.userId,
        email: data.email,
        role: data.role,
        method: data.method,
        locale: data.locale,
        ...data.utm
      }]);
    }
  } catch (error) {
    console.warn('Failed to track signup completion:', error);
  }
}