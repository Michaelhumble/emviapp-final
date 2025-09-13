// Developer checklist - logs configuration reminders
export const logDeveloperChecklist = () => {
  if (typeof window === 'undefined') return;

  console.group('🔧 OAuth Configuration Checklist');
  console.log('1. Supabase → Authentication → Site URL = your production domain');
  console.log('2. Supabase → Authentication → Authorized Redirect URLs include https://<domain>/auth/callback');
  console.log('3. Google Console → Authorized redirect URIs include the same /auth/callback');
  console.log('4. Facebook Console → Valid OAuth Redirect URIs include the same /auth/callback');
  console.log('5. No localhost in production code or provider configs');
  console.log('6. Service Worker disabled on /auth/* routes');
  console.log('✅ OAuth redirectTo =', window.location.origin + '/auth/callback');
  console.groupEnd();
};

// Auto-run in development
if (process.env.NODE_ENV === 'development') {
  setTimeout(logDeveloperChecklist, 2000);
}