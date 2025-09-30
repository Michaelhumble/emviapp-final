import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const GOOGLE_INDEXING_API_ENDPOINT = 'https://indexing.googleapis.com/v3/urlNotifications:publish';
const BASE_URL = 'https://www.emvi.app';

interface City {
  id: string;
  city_name: string;
  state: string;
  state_code: string;
  slug: string;
  priority: number;
}

/**
 * Normalize a private key by converting literal \n to actual newlines
 * and stripping surrounding quotes/whitespace
 */
function normalizePrivateKey(key: string): string {
  // Trim and strip surrounding quotes if present
  let normalized = key.trim();
  if ((normalized.startsWith('"') && normalized.endsWith('"')) ||
      (normalized.startsWith("'") && normalized.endsWith("'"))) {
    normalized = normalized.slice(1, -1);
  }
  
  // Replace literal \n with actual newlines
  normalized = normalized.replace(/\\n/g, '\n');
  
  // Ensure it ends with a newline
  if (!normalized.endsWith('\n')) {
    normalized += '\n';
  }
  
  return normalized;
}

/**
 * Import a PKCS8 private key for JWT signing
 */
async function importPkcs8PrivateKey(pem: string): Promise<CryptoKey> {
  // Remove PEM header/footer and whitespace
  const pemContents = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\s/g, '');
  
  // Decode base64 to binary
  const binaryDer = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));
  
  // Import the key
  return await crypto.subtle.importKey(
    'pkcs8',
    binaryDer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );
}

/**
 * Create a JWT for Google service account authentication
 */
async function createJwt(clientEmail: string, privateKey: CryptoKey): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };
  
  const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const encodedPayload = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    privateKey,
    new TextEncoder().encode(signatureInput)
  );
  
  const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  
  return `${signatureInput}.${encodedSignature}`;
}

/**
 * Exchange JWT for an access token
 */
async function getAccessToken(clientEmail: string, privateKeyPem: string): Promise<string> {
  const privateKey = await importPkcs8PrivateKey(privateKeyPem);
  const jwt = await createJwt(clientEmail, privateKey);
  
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get access token: ${error}`);
  }
  
  const data = await response.json();
  return data.access_token;
}

/**
 * Submit a URL to Google Indexing API
 */
async function submitUrlToGoogle(url: string, accessToken: string, type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED'): Promise<any> {
  const response = await fetch(GOOGLE_INDEXING_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({ url, type })
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Google Indexing API error (${response.status}): ${error}`);
  }
  
  return await response.json();
}

Deno.serve(async (req) => {
  try {
    // Get Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Google OAuth credentials
    const googleClientEmail = Deno.env.get('GOOGLE_CLIENT_EMAIL');
    const googlePrivateKeyRaw = Deno.env.get('GOOGLE_PRIVATE_KEY');

    // Normalize the private key (handle literal \n, quotes, etc.)
    const googlePrivateKey = googlePrivateKeyRaw ? normalizePrivateKey(googlePrivateKeyRaw) : null;

    // Log credential status (masked)
    console.log('=== Credential Check ===');
    console.log(`GOOGLE_CLIENT_EMAIL present: ${!!googleClientEmail}`);
    if (googleClientEmail) {
      console.log(`Email (last 6): ...${googleClientEmail.slice(-6)}`);
    }
    console.log(`GOOGLE_PRIVATE_KEY present: ${!!googlePrivateKeyRaw}`);
    if (googlePrivateKeyRaw) {
      console.log(`Raw key length: ${googlePrivateKeyRaw.length} chars`);
    }
    if (googlePrivateKey) {
      console.log(`Normalized key length: ${googlePrivateKey.length} chars`);
      console.log(`Ends with newline: ${googlePrivateKey.endsWith('\n')}`);
      console.log(`Contains PEM header: ${googlePrivateKey.includes('BEGIN PRIVATE KEY')}`);
    }

    // Get access token if credentials are available
    let accessToken: string | null = null;
    if (googleClientEmail && googlePrivateKey) {
      try {
        console.log('🔑 Obtaining Google access token...');
        accessToken = await getAccessToken(googleClientEmail, googlePrivateKey);
        console.log('✅ Access token obtained successfully');
      } catch (tokenError) {
        console.error('❌ Failed to obtain access token:', tokenError);
        throw new Error(`OAuth failed: ${tokenError.message}`);
      }
    } else {
      console.warn('⚠️  Missing credentials - will skip Google Indexing API calls');
    }

    // Create indexing log
    const { data: logData } = await supabase
      .from('seo_indexing_logs')
      .insert({
        run_date: new Date().toISOString().split('T')[0],
        status: 'running'
      })
      .select()
      .single();

    const logId = logData?.id;

    // Get 40 cities to index
    const { data: cities, error: citiesError } = await supabase
      .rpc('get_cities_for_daily_indexing', { batch_size: 40 });

    if (citiesError) {
      console.error('Error fetching cities:', citiesError);
      throw citiesError;
    }

    console.log(`Processing ${cities?.length || 0} cities for SEO indexing`);

    const errors: any[] = [];
    const generatedUrls: string[] = [];
    let succeeded = 0;
    let failed = 0;

    // Process each city
    for (const city of (cities as City[]) || []) {
      try {
        // Generate URLs for this city
        const cityUrls = [
          `${BASE_URL}/jobs/${city.slug}`,
          `${BASE_URL}/nail-tech/${city.slug}`,
          `${BASE_URL}/hair-stylist/${city.slug}`,
          `${BASE_URL}/barber/${city.slug}`,
          `${BASE_URL}/salons/${city.slug}`
        ];

        // Store first 5 URLs for reporting
        if (generatedUrls.length < 5) {
          generatedUrls.push(...cityUrls.slice(0, 5 - generatedUrls.length));
        }

        // Submit to Google if access token available
        if (accessToken) {
          for (const url of cityUrls) {
            try {
              console.log(`📤 Indexing: ${url}`);
              const result = await submitUrlToGoogle(url, accessToken);
              console.log(`✅ Success: ${result.urlNotificationMetadata?.latestUpdate?.type || 'submitted'}`);
            } catch (urlError) {
              console.error(`❌ Failed to index ${url}:`, urlError.message);
              errors.push({
                city: city.city_name,
                url,
                error: urlError.message
              });
            }
          }
        } else {
          console.warn(`⚠️  Skipping Google API calls for ${city.city_name} (no access token)`);
        }

        // Update city indexing status
        await supabase
          .from('seo_cities')
          .update({
            last_indexed_at: new Date().toISOString(),
            indexing_status: 'indexed'
          })
          .eq('id', city.id);

        succeeded++;
      } catch (cityError) {
        console.error(`Error processing city ${city.city_name}:`, cityError);
        failed++;
        errors.push({
          city: city.city_name,
          error: cityError.message
        });
      }
    }

    console.log(`\n=== Summary ===`);
    console.log(`Cities processed: ${cities?.length || 0}`);
    console.log(`Succeeded: ${succeeded}`);
    console.log(`Failed: ${failed}`);
    console.log(`First 5 URLs generated:`, generatedUrls.slice(0, 5));

    // Update log
    await supabase
      .from('seo_indexing_logs')
      .update({
        cities_processed: (cities?.length || 0),
        cities_succeeded: succeeded,
        cities_failed: failed,
        errors: errors,
        completed_at: new Date().toISOString(),
        status: 'completed'
      })
      .eq('id', logId);

    return new Response(
      JSON.stringify({
        success: true,
        processed: cities?.length || 0,
        succeeded,
        failed,
        credentials: {
          googleClientEmail: !!googleClientEmail,
          googlePrivateKey: !!googlePrivateKey,
          emailMasked: googleClientEmail ? `...${googleClientEmail.slice(-6)}` : 'not set'
        },
        firstUrls: generatedUrls.slice(0, 5),
        errors: errors.length > 0 ? errors : undefined
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Daily SEO indexing error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
