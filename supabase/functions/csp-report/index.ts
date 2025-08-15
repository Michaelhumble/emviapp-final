import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Access-Control-Allow-Headers': 'content-type',
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Log CSP violation report for monitoring
    if (req.method === 'POST') {
      const report = await req.json();
      console.log('CSP Violation Report:', JSON.stringify(report, null, 2));
    }
    
    // Return 204 No Content as per CSP spec
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Error processing CSP report:', error);
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }
};

serve(handler);