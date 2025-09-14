import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();

  const hubspotPresent =
    !!process.env.HUBSPOT_ACCESS_TOKEN ||
    !!process.env.HUBSPOT_REFRESH_TOKEN;

  const facebookEnabled =
    process.env.VITE_FACEBOOK_ENABLED === "true" ||
    process.env.NEXT_PUBLIC_FACEBOOK_ENABLED === "true";

  const facebookAppId =
    process.env.VITE_FACEBOOK_CLIENT_ID ||
    process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID;

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseAnon =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY;

  const manychatPresent = !!process.env.MANYCHAT_API_KEY;

  const report = {
    hubspot: { present: hubspotPresent },
    facebook: { enabled: facebookEnabled, appId: facebookAppId, ok: !!facebookAppId },
    supabase: { urlPresent: !!supabaseUrl, anonKeyPresent: !!supabaseAnon },
    manychat: { keyPresent: manychatPresent },
  };

  res.status(200).json({ ok: true, report });
}