import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase with service role for database operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  { auth: { persistSession: false } }
);

// HMAC verification for slug integrity
async function verifyHMAC(slug: string, signature: string): Promise<boolean> {
  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(Deno.env.get('AFFILIATE_HMAC_SECRET') || 'default-secret'),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    
    const signatureBytes = new Uint8Array(signature.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []);
    const dataBytes = new TextEncoder().encode(slug);
    
    return await crypto.subtle.verify("HMAC", key, signatureBytes, dataBytes);
  } catch {
    return false;
  }
}

// Get IP address from request headers
function getClientIP(req: Request): string {
  return req.headers.get('cf-connecting-ip') ||
         req.headers.get('x-forwarded-for')?.split(',')[0] ||
         req.headers.get('x-real-ip') ||
         'unknown';
}

// Create attribution cookie value with HMAC
async function createAttributionCookie(affiliateId: string): Promise<string> {
  const timestamp = Date.now();
  const data = `${affiliateId}|${timestamp}`;
  
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(Deno.env.get('AFFILIATE_HMAC_SECRET') || 'default-secret'),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  const signatureHex = Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  return `${data}|${signatureHex}`;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const slug = url.pathname.split('/').pop();
    
    if (!slug) {
      return new Response('Missing slug', { status: 400, headers: corsHeaders });
    }

    console.log(`[LINK SHORTENER] Processing slug: ${slug}`);

    // Find the link and affiliate info
    const { data: linkData, error: linkError } = await supabase
      .from('affiliate_links')
      .select(`
        id,
        destination_url,
        affiliate_id,
        hmac_signature,
        affiliate_partners!inner (
          id,
          slug,
          status
        )
      `)
      .eq('slug', slug)
      .single();

    if (linkError || !linkData) {
      console.error('[LINK SHORTENER] Link not found:', linkError);
      return new Response('Link not found', { status: 404, headers: corsHeaders });
    }

    // Verify affiliate is approved
    if ((linkData as any).affiliate_partners.status !== 'approved') {
      console.error('[LINK SHORTENER] Affiliate not approved');
      return new Response('Link inactive', { status: 404, headers: corsHeaders });
    }

    // Verify HMAC signature
    const isValidSignature = await verifyHMAC(slug, (linkData as any).hmac_signature);
    if (!isValidSignature) {
      console.error('[LINK SHORTENER] Invalid HMAC signature');
      return new Response('Invalid link', { status: 400, headers: corsHeaders });
    }

// Get request details for tracking
    const clientIP = getClientIP(req);
    const userAgent = req.headers.get('user-agent') || 'unknown';
    const referrer = req.headers.get('referer') || null;

    // Rate limiting: Check clicks from this IP in the last hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count: recentClicks } = await supabase
      .from('affiliate_clicks')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', clientIP)
      .gte('created_at', oneHourAgo);

    // Check for duplicate clicks (same IP+UA+slug within 5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { count: duplicateClicks } = await supabase
      .from('affiliate_clicks')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', clientIP)
      .eq('user_agent', userAgent)
      .eq('link_id', linkData.id)
      .gte('created_at', fiveMinutesAgo);

    // Check for self-referral (if user is authenticated)
    const authHeader = req.headers.get('Authorization');
    let isBlocked = false;
    if (authHeader) {
      try {
        const { data: { user } } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
        if (user && user.id === (linkData as any).affiliate_partners.user_id) {
          console.warn(`[LINK SHORTENER] Self-referral blocked for user: ${user.id}`);
          isBlocked = true;
        }
      } catch (error) {
        // Ignore auth errors, continue with tracking
      }
    }

    const shouldSuppressLogging = (recentClicks && recentClicks > 100) || 
                                  (duplicateClicks && duplicateClicks > 0) || 
                                  isBlocked;

    if (shouldSuppressLogging) {
      console.warn(`[LINK SHORTENER] Click suppressed - IP: ${clientIP}, Reason: ${
        recentClicks && recentClicks > 100 ? 'rate_limit' : 
        duplicateClicks && duplicateClicks > 0 ? 'duplicate' : 'self_referral'
      }`);
    }

    // Log the click event (async, don't block redirect) - only if not suppressed
    let clickPromise = Promise.resolve();
    let updatePromise = Promise.resolve();
    
    if (!shouldSuppressLogging) {
      clickPromise = supabase.from('affiliate_clicks').insert({
        affiliate_id: (linkData as any).affiliate_id,
        link_id: (linkData as any).id,
        ip_address: clientIP,
        user_agent: userAgent,
        referrer: referrer,
        country_code: req.headers.get('cf-ipcountry') || null
      }).then(({ error }) => {
        if (error) console.error('[LINK SHORTENER] Click logging error:', error);
      });

      // Update click count (async)
      updatePromise = supabase
        .from('affiliate_links')
        .update({ clicks_count: (linkData as any).clicks_count + 1 })
        .eq('id', (linkData as any).id)
        .then(({ error }) => {
          if (error) console.error('[LINK SHORTENER] Click count update error:', error);
        });
    }

    // Create attribution cookie
    const attributionCookie = await createAttributionCookie((linkData as any).affiliate_id);
    
    // Perform async operations without blocking
    Promise.all([clickPromise, updatePromise]);

    // Add UTM parameters to destination URL if not present
    const destinationUrl = new URL((linkData as any).destination_url);
    if (!destinationUrl.searchParams.has('utm_source')) {
      destinationUrl.searchParams.set('utm_source', 'affiliate');
    }
    if (!destinationUrl.searchParams.has('utm_medium')) {
      destinationUrl.searchParams.set('utm_medium', 'referral');
    }
    if (!destinationUrl.searchParams.has('utm_campaign')) {
      destinationUrl.searchParams.set('utm_campaign', (linkData as any).affiliate_partners.slug);
    }
    if (!destinationUrl.searchParams.has('utm_content') && (linkData as any).title) {
      destinationUrl.searchParams.set('utm_content', (linkData as any).title);
    }

    // Fire GA4 tracking event
    if (typeof globalThis.gtag === 'function' && !shouldSuppressLogging) {
      globalThis.gtag('event', 'affiliate_click', {
        affiliate_id: (linkData as any).affiliate_id,
        link_slug: slug,
        destination: destinationUrl.toString()
      });
    }

    console.log(`[LINK SHORTENER] Redirecting to: ${destinationUrl.toString()}`);

    // Set attribution cookie and redirect (90-day cookie)
    const response = new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': destinationUrl.toString(),
        'Set-Cookie': `af_attr=${attributionCookie}; HttpOnly; Secure; SameSite=Lax; Max-Age=7776000; Domain=.emvi.app; Path=/`,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });

    return response;

  } catch (error) {
    console.error('[LINK SHORTENER] Unexpected error:', error);
    return new Response('Internal server error', { status: 500, headers: corsHeaders });
  }
});