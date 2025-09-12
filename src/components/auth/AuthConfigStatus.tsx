import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { getBaseUrl, isProductionLike } from '@/utils/getBaseUrl';

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
    
    // Simple checks for configuration presence
    const hasSupabaseConfig = Boolean(
      (import.meta as any)?.env?.VITE_SUPABASE_URL &&
      (import.meta as any)?.env?.VITE_SUPABASE_ANON_KEY
    );
    
    const hasGoogleConfig = Boolean(
      (import.meta as any)?.env?.VITE_GOOGLE_CLIENT_ID
    );

    setConfigStatus({
      hasSupabaseConfig,
      hasGoogleConfig,
      currentUrl,
      isProduction
    });

    // Log auth configuration status (development only)
    if (!isProduction) {
      console.info('🔐 Auth Configuration Status:', {
        'Supabase configured': hasSupabaseConfig,
        'Google OAuth configured': hasGoogleConfig,
        'Current URL': currentUrl,
        'Production-like': isProduction
      });
    }
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