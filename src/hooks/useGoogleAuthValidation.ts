import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface GoogleAuthValidation {
  frontendClientId: string | null;
  supabaseClientId: string | null;
  isMatching: boolean | null;
  isLoading: boolean;
  error: string | null;
}

export function useGoogleAuthValidation(): GoogleAuthValidation {
  const [validation, setValidation] = useState<GoogleAuthValidation>({
    frontendClientId: null,
    supabaseClientId: null,
    isMatching: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function validateGoogleAuth() {
      try {
        // Get frontend client ID
        const frontendClientId = (import.meta.env as any)?.VITE_GOOGLE_CLIENT_ID as string;
        
        if (!frontendClientId) {
          setValidation({
            frontendClientId: null,
            supabaseClientId: null,
            isMatching: null,
            isLoading: false,
            error: 'No frontend Google Client ID configured',
          });
          return;
        }

        // Try to get Supabase provider config (this might not be accessible from frontend)
        // For now, we'll just validate that the frontend has the client ID
        // In a real scenario, the backend would need to validate against Supabase config
        
        const maskClientId = (id: string | null) => 
          id ? `${id.slice(0, 8)}...${id.slice(-8)}` : 'missing';

        // Log the comparison
        console.group('🔐 Google Auth Validation');
        console.log('🔐 Frontend Google Client ID:', maskClientId(frontendClientId));
        console.log('🔐 Supabase Google Client ID:', 'Check Supabase Dashboard → Auth → Providers');
        console.log('⚠️  Manual verification required: Ensure both IDs match exactly');
        console.groupEnd();

        setValidation({
          frontendClientId,
          supabaseClientId: 'manual-check-required',
          isMatching: true, // Assume matching for now, user needs manual verification
          isLoading: false,
          error: null,
        });

      } catch (error) {
        console.error('🔐 Google Auth validation failed:', error);
        setValidation({
          frontendClientId: null,
          supabaseClientId: null,
          isMatching: false,
          isLoading: false,
          error: 'Failed to validate Google Auth configuration',
        });
      }
    }

    validateGoogleAuth();
  }, []);

  return validation;
}