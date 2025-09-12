import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { getBaseUrl, isProductionLike } from '@/utils/getBaseUrl';
import { AUTH_CONFIG } from '@/utils/authConfig';

interface AuthConfigStatusProps {
  className?: string;
}

export function AuthConfigStatus({ className }: AuthConfigStatusProps) {
  const [configStatus, setConfigStatus] = useState<{
    hasSupabaseConfig: boolean;
    hasGoogleConfig: boolean;
    currentUrl: string;
    isProduction: boolean;
  } | null>(null);

  useEffect(() => {
    // Check configuration status
    const currentUrl = getBaseUrl();
    const isProduction = isProductionLike();
    
    // Supabase client is configured via code (not env), treat as present
    const hasSupabaseConfig = true;

    // Build-time flags actually read by the app
    const googleEnabledFlag = (import.meta.env as any)?.VITE_GOOGLE_ENABLED;
    const phoneEnabledFlag = (import.meta.env as any)?.VITE_PHONE_ENABLED;
    const skipEmailVerifyFlag = (import.meta.env as any)?.VITE_SKIP_EMAIL_VERIFICATION;

    // Frontend-safe Google vars (optional; real config is in Supabase dashboard)
    const googleClientId = (import.meta.env as any)?.VITE_GOOGLE_CLIENT_ID as string | undefined;
    const googleClientSecret = (import.meta.env as any)?.VITE_GOOGLE_CLIENT_SECRET as string | undefined;
    const hasGoogleConfig = Boolean(googleClientId);

    setConfigStatus({
      hasSupabaseConfig,
      hasGoogleConfig,
      currentUrl,
      isProduction
    });

    const mask = (v?: string) => (v ? `${String(v).slice(0, 8)}…` : 'missing');
    const computedCallback = `${currentUrl}/auth/callback`;

    // Print a single, clear config table (masked where appropriate)
    console.groupCollapsed('🔐 Auth Config Summary');
    console.table({
      SUPABASE_URL: { present: true, source: 'src/integrations/supabase/client.ts' },
      SUPABASE_ANON_KEY: { present: true, source: 'src/integrations/supabase/client.ts' },
      GOOGLE_CLIENT_ID: { present: Boolean(googleClientId), sample: mask(googleClientId) },
      GOOGLE_CLIENT_SECRET: { present: Boolean(googleClientSecret), sample: mask(googleClientSecret) },
      VITE_GOOGLE_ENABLED: { value: googleEnabledFlag ?? '(default true)' },
      VITE_PHONE_ENABLED: { value: phoneEnabledFlag ?? '(default false)' },
      VITE_SKIP_EMAIL_VERIFICATION: { value: skipEmailVerifyFlag ?? '(default true)' },
      Computed_Callback_URL: { value: computedCallback },
      Current_Origin: { value: currentUrl },
      Auth_Config_Google_Status: { value: AUTH_CONFIG.GOOGLE_ENABLED ? 'ENABLED' : 'DISABLED' },
    });
    console.groupEnd();
  }, []);

  if (!configStatus) return null;

  // Only show in development or when there are issues
  if (configStatus.isProduction && configStatus.hasSupabaseConfig) {
    return null;
  }

  return (
    <div className={className}>
      {!configStatus.hasSupabaseConfig && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Authentication configuration missing. Please check your environment variables.
          </AlertDescription>
        </Alert>
      )}
      
      {configStatus.hasSupabaseConfig && !configStatus.hasGoogleConfig && (
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Google OAuth not configured. Only email/password authentication available.
          </AlertDescription>
        </Alert>
      )}
      
      {configStatus.hasSupabaseConfig && configStatus.hasGoogleConfig && (
        <Alert className="mb-4 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Authentication fully configured and ready.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}