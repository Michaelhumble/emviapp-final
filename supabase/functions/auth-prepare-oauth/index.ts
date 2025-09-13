import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  role?: string;
  provider: 'google' | 'facebook';
}

interface SignedPayload {
  role?: string;
  provider: 'google' | 'facebook';
  ts: number;
  nonce: string;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { role, provider } = await req.json() as RequestBody;
    
    if (!provider || !['google', 'facebook'].includes(provider)) {
      return Response.json(
        { error: 'Invalid or missing provider. Must be "google" or "facebook".' },
        { status: 400, headers: corsHeaders }
      );
    }

    const OAUTH_STATE_SECRET = Deno.env.get('OAUTH_STATE_SECRET');
    if (!OAUTH_STATE_SECRET) {
      console.error('OAUTH_STATE_SECRET not configured');
      return Response.json(
        { error: 'OAuth state signing not configured' },
        { status: 500, headers: corsHeaders }
      );
    }

    // Create signed payload
    const payload: SignedPayload = {
      role: role || undefined,
      provider,
      ts: Date.now(),
      nonce: crypto.randomUUID()
    };

    // Sign the payload with HMAC-SHA256
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(OAUTH_STATE_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const payloadString = JSON.stringify(payload);
    const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payloadString));
    const signatureHex = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    const signedState = `${btoa(payloadString)}.${signatureHex}`;

    console.log('OAuth state prepared:', { provider, role, nonce: payload.nonce });

    return Response.json(
      { state: signedState },
      { headers: corsHeaders }
    );

  } catch (error) {
    console.error('Error preparing OAuth state:', error);
    return Response.json(
      { error: 'Failed to prepare OAuth state' },
      { status: 500, headers: corsHeaders }
    );
  }
});