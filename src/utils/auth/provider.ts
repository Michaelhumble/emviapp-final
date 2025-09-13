export function detectProviderFromState(state?: string | null): 'google' | 'facebook' | null {
  if (!state) return null;
  
  try {
    // Parse the signed state
    const [payloadBase64] = state.split('.');
    if (!payloadBase64) return null;
    
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    
    return payload.provider || null;
  } catch (error) {
    console.warn('Failed to parse OAuth state for provider detection:', error);
    return null;
  }
}