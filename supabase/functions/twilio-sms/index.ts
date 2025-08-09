import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import twilio from "npm:twilio@4.22.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-twilio-signature",
};

function escapeXml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

serve(async (req: Request): Promise<Response> => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  }

  const token = Deno.env.get("TWILIO_AUTH_TOKEN");
  if (!token) {
    return new Response("Server misconfigured", { status: 500, headers: corsHeaders });
  }

  // Twilio signature validation
  const signature = req.headers.get("x-twilio-signature") || "";
  const url = req.url; // Twilio signs the exact URL configured in console

  const form = await req.formData();
  const params: Record<string, string> = {};
  for (const [key, value] of form.entries()) {
    params[key] = String(value);
  }

  const valid = twilio.validateRequest(token, signature, url, params);
  if (!valid) {
    return new Response("Invalid signature", { status: 403, headers: corsHeaders });
  }

  const body = (params["Body"] || "").trim();
  const upper = body.toUpperCase();

  let reply = "Thanks for your message.";
  if (upper === "STOP") {
    reply = "You’ve been unsubscribed. Reply START to resubscribe.";
  } else if (upper === "HELP") {
    reply = "EmviApp: For help, visit https://www.emvi.app/privacy or reply STOP to unsubscribe.";
  }

  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escapeXml(reply)}</Message></Response>`;

  return new Response(twiml, {
    status: 200,
    headers: {
      "Content-Type": "text/xml",
      ...corsHeaders,
    },
  });
});

// Notes:
// - Configure Twilio Console → A message comes in → POST to the deployed function URL
//   e.g., https://<project-ref>.functions.supabase.co/twilio-sms
// - Ensure TWILIO_AUTH_TOKEN is set via Supabase secrets before enabling.
