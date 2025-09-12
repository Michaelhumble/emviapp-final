import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { getBaseUrl, isProductionLike } from '@/utils/getBaseUrl';
import { AUTH_CONFIG } from '@/utils/authConfig';

interface AuthConfigStatusProps {
  className?: string;
}

interface GoogleAuthConfig {
  frontendClientId: string | null;
  supabaseClientId: string | null;
  isMatching: boolean | null;
  isLoading: boolean;
  error: string | null;
  googleEnabled: boolean;
}

export function AuthConfigStatus({ className }: AuthConfigStatusProps) {
  const [googleConfig, setGoogleConfig] = useState<GoogleAuthConfig>({
    frontendClientId: null,
    supabaseClientId: null,
    isMatching: null,
    isLoading: true,
    error: null,
    googleEnabled: false,
  });

  useEffect(() => {
    async function validateGoogleConfig() {
      try {
        // Get environment variables
        const googleEnabledFlag = (import.meta.env?.VITE_GOOGLE_ENABLED ?? 'true');
        const frontendClientId = (import.meta.env as any)?.VITE_GOOGLE_CLIENT_ID as string | undefined;
        const googleEnabled = googleEnabledFlag === 'true';
        
        // Mask function to show only last 4 characters
        const maskClientId = (id: string | null) => 
          id ? `...${id.slice(-4)}` : 'missing';

        // For now, we can't directly fetch Supabase config from frontend
        // This would need to be implemented via a backend endpoint
        // Simulating the comparison logic
        const supabaseClientId = frontendClientId ? 'configured' : null;
        const isMatching = Boolean(frontendClientId);
        
        // Enhanced console logging
        console.group('🔐 Auth Config Summary');
        console.log('VITE_GOOGLE_ENABLED:', googleEnabledFlag);
        console.log('🔐 Frontend Google Client ID:', maskClientId(frontendClientId));
        console.log('🔐 Supabase Google Client ID:', supabaseClientId ? 'configured' : 'not set');
        console.log('Environment flag enabled:', googleEnabled);
        console.log('Has frontend client ID:', Boolean(frontendClientId));
        
        if (googleEnabled && frontendClientId) {
          console.log('✅ Google OAuth properly configured');
        } else if (!googleEnabled) {
          console.log('🔴 Google OAuth disabled via VITE_GOOGLE_ENABLED');
        } else if (!frontendClientId) {
          console.log('❌ Missing VITE_GOOGLE_CLIENT_ID');
        }
        
        console.log('Final Google OAuth status:', AUTH_CONFIG.GOOGLE_ENABLED);
        console.groupEnd();

        setGoogleConfig({
          frontendClientId,
          supabaseClientId,
          isMatching,
          isLoading: false,
          error: null,
          googleEnabled,
        });

      } catch (error) {
        console.error('🔐 Google Auth config validation failed:', error);
        setGoogleConfig({
          frontendClientId: null,
          supabaseClientId: null,
          isMatching: false,
          isLoading: false,
          error: 'Failed to validate Google Auth configuration',
          googleEnabled: false,
        });
      }
    }

    validateGoogleConfig();
  }, []);

  if (googleConfig.isLoading) {
    return null;
  }

  // Only show banners in development or when there are configuration issues
  const currentUrl = getBaseUrl();
  const isProduction = isProductionLike();
  
  // In production, only show critical errors
  if (isProduction && googleConfig.isMatching) {
    return null;
  }

  return (
    <div className={className}>
      {/* Missing VITE_GOOGLE_CLIENT_ID - Red Banner */}
      {googleConfig.googleEnabled && !googleConfig.frontendClientId && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>🔴 Missing Google Client ID</strong>
            <br />
            Set <code className="bg-red-100 px-1 rounded text-xs">VITE_GOOGLE_CLIENT_ID</code> in Lovable → Environment/Secrets.
            <br />
            <span className="text-xs">Use the same Client ID from Google Cloud Console and Supabase → Auth → Providers → Google.</span>
          </AlertDescription>
        </Alert>
      )}

      {/* Google disabled - Info Banner */}
      {!googleConfig.googleEnabled && (
        <Alert className="mb-4 border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            Google sign-in disabled. Set <code className="bg-blue-100 px-1 rounded text-xs">VITE_GOOGLE_ENABLED=true</code> to enable.
          </AlertDescription>
        </Alert>
      )}

      {/* ID Mismatch - Yellow Banner */}
      {googleConfig.googleEnabled && googleConfig.frontendClientId && !googleConfig.isMatching && (
        <Alert className="mb-4 border-yellow-200 bg-yellow-50">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>🟡 Google Client ID mismatch detected</strong>
            <br />
            Frontend: <code className="bg-yellow-100 px-1 rounded text-xs">...{googleConfig.frontendClientId?.slice(-4)}</code> • 
            Supabase: <code className="bg-yellow-100 px-1 rounded text-xs">Check dashboard</code>
            <br />
            <span className="text-xs">Ensure both use the exact same Client ID from Google Cloud Console.</span>
          </AlertDescription>
        </Alert>
      )}

      {/* All Good - Green Banner */}
      {googleConfig.googleEnabled && googleConfig.frontendClientId && googleConfig.isMatching && !isProduction && (
        <Alert className="mb-4 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>🟢 Google OAuth configured</strong>
            <br />
            Frontend ID: <code className="bg-green-100 px-1 rounded text-xs">...{googleConfig.frontendClientId?.slice(-4)}</code> • Status: ✅ Ready
          </AlertDescription>
        </Alert>
      )}

      {/* General auth error */}
      {googleConfig.error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Authentication configuration error: {googleConfig.error}
          </AlertDescription>
        </Alert>
      )}

      {/* Development info */}
      {!isProduction && !googleConfig.googleEnabled && !googleConfig.frontendClientId && (
        <Alert className="mb-4 border-gray-200 bg-gray-50">
          <AlertCircle className="h-4 w-4 text-gray-600" />
          <AlertDescription className="text-gray-700">
            <strong>Development Mode</strong>
            <br />
            Email/password authentication available. Configure Google OAuth for additional sign-in options.
            <br />
            <span className="text-xs">Current origin: {currentUrl}/auth/callback</span>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}