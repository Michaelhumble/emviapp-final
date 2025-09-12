import { useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { ENV, mask, logEnvStatus } from '@/config/env';

interface AuthConfigStatusProps {
  className?: string;
}

export function AuthConfigStatus({ className }: AuthConfigStatusProps) {
  const { GOOGLE_ENABLED, GOOGLE_CLIENT_ID } = ENV;

  useEffect(() => {
    // Log environment status on component mount
    logEnvStatus();
  }, []);

  return (
    <div className={className}>
      {/* Missing VITE_GOOGLE_CLIENT_ID - Red Banner */}
      {GOOGLE_ENABLED && !GOOGLE_CLIENT_ID && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>🔴 Missing Google Client ID</strong>
            <br />
            Set <code className="bg-red-100 px-1 rounded text-xs">VITE_GOOGLE_CLIENT_ID</code> in <code>.env.local</code>.
            <br />
            <span className="text-xs">Use the same Client ID from Google Cloud Console and Supabase → Auth → Providers → Google.</span>
          </AlertDescription>
        </Alert>
      )}

      {/* Google disabled - Info Banner */}
      {!GOOGLE_ENABLED && (
        <Alert className="mb-4 border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            Google sign-in disabled. Set <code className="bg-blue-100 px-1 rounded text-xs">VITE_GOOGLE_ENABLED=true</code> in <code>.env.local</code>.
          </AlertDescription>
        </Alert>
      )}

      {/* All Good - Green Banner (development only) */}
      {GOOGLE_ENABLED && GOOGLE_CLIENT_ID && (
        <Alert className="mb-4 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>🟢 Google OAuth configured</strong>
            <br />
            Frontend ID: <code className="bg-green-100 px-1 rounded text-xs">{mask(GOOGLE_CLIENT_ID)}</code> • Status: ✅ Ready
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}