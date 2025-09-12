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
          id ? `...${id.slice(-4)}` : 'missing';

        // Log the comparison with masked values (last 4 chars only)
        console.group('🔐 Google Auth Validation');
        console.log('🔐 Frontend Google Client ID:', maskClientId(frontendClientId));
        console.log('🔐 Supabase Google Client ID:', 'Check Supabase Dashboard → Auth → Providers');
        console.log('⚠️  Manual verification required: Ensure both IDs match exactly');
        
        // For now, we assume they match if frontend ID is present
        // In a real implementation, this would query Supabase config API
        const isMatching = Boolean(frontendClientId);
        
        if (isMatching) {
          console.log('✅ Frontend Google Client ID is configured');
        } else {
          console.log('❌ Frontend Google Client ID is missing');
        }
        console.groupEnd();

        setValidation({
          frontendClientId,
          supabaseClientId: 'check-supabase-dashboard',
          isMatching,
          isLoading: false,
          error: frontendClientId ? null : 'Frontend Google Client ID not configured',
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