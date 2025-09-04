import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json'
}

// Google Indexing API endpoint
const INDEXING_API_URL = 'https://indexing.googleapis.com/v3/urlNotifications:publish'
const SITEMAP_PING_URL = 'https://www.google.com/ping'

interface IndexingRequest {
  action: 'notify_job_upsert' | 'notify_job_remove' | 'ping_sitemaps'
  url?: string
  sitemaps?: string[]
}

interface GoogleIndexingPayload {
  url: string
  type: 'URL_UPDATED' | 'URL_DELETED'
}

// Generate JWT for Google API authentication
async function generateJWT(serviceAccountData: any): Promise<string> {
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  }

  const now = Math.floor(Date.now() / 1000)
  const payload = {
    iss: serviceAccountData.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600 // 1 hour
  }

  // Encode header and payload
  const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  const encodedPayload = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

  // Create signature
  const textToSign = `${encodedHeader}.${encodedPayload}`
  const privateKey = serviceAccountData.private_key

  // Import the private key
  const keyData = privateKey.replace(/-----BEGIN PRIVATE KEY-----/, '')
                            .replace(/-----END PRIVATE KEY-----/, '')
                            .replace(/\n/g, '')
  
  const binaryKey = Uint8Array.from(atob(keyData), c => c.charCodeAt(0))
  
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    binaryKey,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256'
    },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    new TextEncoder().encode(textToSign)
  )

  const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
                          .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

  return `${textToSign}.${encodedSignature}`
}

// Get access token from Google OAuth
async function getAccessToken(serviceAccountData: any): Promise<string> {
  const jwt = await generateJWT(serviceAccountData)
  
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to get access token: ${error}`)
  }

  const data = await response.json()
  return data.access_token
}

// Notify Google Indexing API about URL changes
async function notifyGoogle(url: string, type: 'URL_UPDATED' | 'URL_DELETED'): Promise<any> {
  console.log(`🔍 Notifying Google Indexing API: ${type} for ${url}`)
  
  const serviceAccountJson = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_JSON')
  if (!serviceAccountJson) {
    throw new Error('Google service account credentials not found')
  }

  const serviceAccountData = JSON.parse(serviceAccountJson)
  const accessToken = await getAccessToken(serviceAccountData)

  const payload: GoogleIndexingPayload = { url, type }
  
  const response = await fetch(INDEXING_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  const responseData = await response.json()
  
  if (!response.ok) {
    console.error('❌ Google Indexing API error:', responseData)
    throw new Error(`Google Indexing API failed: ${JSON.stringify(responseData)}`)
  }

  console.log('✅ Google Indexing API success:', responseData)
  return responseData
}

// Ping Google with sitemap updates
async function pingSitemaps(sitemaps: string[]): Promise<any[]> {
  console.log('📍 Pinging Google with sitemap updates:', sitemaps)
  
  const results = await Promise.allSettled(
    sitemaps.map(async (sitemapUrl) => {
      const pingUrl = `${SITEMAP_PING_URL}?sitemap=${encodeURIComponent(sitemapUrl)}`
      
      const response = await fetch(pingUrl, { method: 'GET' })
      
      return {
        sitemap: sitemapUrl,
        status: response.status,
        success: response.ok,
        response: response.ok ? 'OK' : await response.text()
      }
    })
  )

  const pingResults = results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value
    } else {
      return {
        sitemap: sitemaps[index],
        status: 500,
        success: false,
        error: result.reason?.message || 'Unknown error'
      }
    }
  })

  console.log('📍 Sitemap ping results:', pingResults)
  return pingResults
}

// Log indexing actions to database
async function logIndexingAction(
  action: string, 
  url: string | null, 
  success: boolean, 
  response: any,
  error?: string
) {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    await supabase.from('indexing_logs').insert({
      action,
      url,
      success,
      response: response ? JSON.stringify(response) : null,
      error,
      created_at: new Date().toISOString()
    })
  } catch (logError) {
    console.error('Failed to log indexing action:', logError)
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { action, url, sitemaps }: IndexingRequest = await req.json()
    
    console.log(`🚀 Google Indexing API request: ${action}`, { url, sitemaps })

    let result: any
    let logAction: string
    let logUrl: string | null = null

    switch (action) {
      case 'notify_job_upsert':
        if (!url) throw new Error('URL is required for job upsert notification')
        result = await notifyGoogle(url, 'URL_UPDATED')
        logAction = 'job_upsert'
        logUrl = url
        await logIndexingAction(logAction, logUrl, true, result)
        break

      case 'notify_job_remove':
        if (!url) throw new Error('URL is required for job removal notification')
        result = await notifyGoogle(url, 'URL_DELETED')
        logAction = 'job_remove'
        logUrl = url
        await logIndexingAction(logAction, logUrl, true, result)
        break

      case 'ping_sitemaps':
        const defaultSitemaps = sitemaps || [
          'https://www.emvi.app/sitemap.xml',
          'https://www.emvi.app/sitemaps/news.xml'
        ]
        result = await pingSitemaps(defaultSitemaps)
        logAction = 'sitemap_ping'
        await logIndexingAction(logAction, null, true, result)
        break

      default:
        throw new Error(`Unknown action: ${action}`)
    }

    return new Response(JSON.stringify({
      success: true,
      action,
      result
    }), {
      status: 200,
      headers: corsHeaders
    })

  } catch (error) {
    console.error('❌ Google Indexing API error:', error)
    
    // Log the error
    const errorAction = req.url.includes('notify_job_upsert') ? 'job_upsert' :
                       req.url.includes('notify_job_remove') ? 'job_remove' : 'unknown'
    
    await logIndexingAction(errorAction, null, false, null, error.message)

    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: corsHeaders
    })
  }
})