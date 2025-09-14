// src/agents/emviAgent.ts
// Lightweight agent: audits envs, generates Lovable prompts, and formats verify checklists.

export type AuditReport = {
  hubspot: { present: boolean; token?: string; ok?: boolean; message?: string };
  facebook: { enabled: boolean; appId?: string; ok?: boolean; message?: string };
  manychat: { keyPresent: boolean; ok?: boolean; message?: string };
  supabase: { urlPresent: boolean; anonKeyPresent: boolean };
};

export function redact(v?: string) {
  if (!v) return v;
  return v.length > 8 ? v.slice(0, 4) + "…" + v.slice(-4) : "•••";
}

export async function auditEnvs(): Promise<AuditReport> {
  // Only presence checks on server; never expose raw secrets.
  const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN ? "present" : undefined;
  const facebookEnabled = process.env.VITE_FACEBOOK_ENABLED === "true" || process.env.NEXT_PUBLIC_FACEBOOK_ENABLED === "true";
  const facebookAppId = process.env.VITE_FACEBOOK_CLIENT_ID || process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  const manychatKey = process.env.MANYCHAT_API_KEY ? "present" : undefined;

  return {
    hubspot: { present: !!hubspotToken, token: hubspotToken ? "present" : undefined },
    facebook: { enabled: !!facebookEnabled, appId: facebookAppId, ok: !!facebookAppId },
    manychat: { keyPresent: !!manychatKey },
    supabase: { urlPresent: !!supabaseUrl, anonKeyPresent: !!supabaseAnon },
  } as AuditReport;
}

// ---------- Prompt Factory ----------
// Produces strict, surgical prompts for Lovable based on a high-level goal.

export type PromptKind =
  | "cleanup-signup-ui"
  | "cleanup-signin-ui"
  | "facebook-oauth-verify"
  | "hubspot-baseline"
  | "hubspot-server-upsert"
  | "agent-self-check";

export function promptFactory(kind: PromptKind, extras?: Record<string, any>): string {
  const base = `# 🔒 STRICT INSTRUCTION\n- Do NOT touch Stripe, curated VN listings/featured cards, global layouts, Navbar.tsx, MobileMenu.tsx, or backend auth logic.\n- Work only within the specified files.\n- Keep diagnostics hidden in production.\n`;

  const blocks: Record<PromptKind, string> = {
    "cleanup-signup-ui": `${base}\n# 🛠️ TASK — Clean /auth/signup UI (minimal header + soft link)\n- Ensure page-local header with links Home/Jobs/Salons renders ONLY on /auth/signup.\n- Under the form, show: 'Not ready yet? Explore EmviApp →' → '/'.\n- Use <SocialAuthButtons variant="full" showDiagnostics={false} />.\n- No logic changes.\n# ✅ VERIFY\n- Header appears only on /auth/signup.\n- Google/Email/Facebook signup still works.`,

    "cleanup-signin-ui": `${base}\n# 🛠️ TASK — Clean /auth/signin\n- Remove AuthConfigStatus/diagnostic banners.\n- Place <SocialAuthButtons variant="compact" showDiagnostics={false} /> under the form after a divider.\n# ✅ VERIFY\n- No banners on /auth/signin; social buttons compact below form.`,

    "facebook-oauth-verify": `${base}\n# 🛠️ TASK — Facebook OAuth harden\n- Gate Facebook button by VITE_FACEBOOK_ENABLED==='true' and VITE_FACEBOOK_CLIENT_ID truthy.\n- No warnings in prod; hide if misconfigured.\n- Test outside iframe; no code changes to providers.\n# ✅ VERIFY\n- Button shows only when envs valid; flow completes.`,

    "hubspot-baseline": `${base}\n# 🛠️ TASK — HubSpot baseline hooks\n- Ensure captureUtms, identifyUser, trackSignupCompleted, trackSignInCompleted are exported from src/lib/analytics/hubspot.ts.\n- Call them in signup/signin success handlers.\n# ✅ VERIFY\n- Contact created/updated with UTMs and provider.`,

    "hubspot-server-upsert": `${base}\n# 🛠️ TASK — Server-side contact upsert API\n- Add POST /api/hubspot/contact-upsert (App Router or Pages Router).\n- Input: { email, role?, provider?, utms?, user_id? }\n- Use HUBSPOT_ACCESS_TOKEN to upsert Contact; optional Company on role=salon_owner.\n- Fire-and-forget call from auth success handlers; return 204 on success.\n# ✅ VERIFY\n- With HubSpot script blocked, signup/signin still create/update Contact.`,

    "agent-self-check": `${base}\n# 🛠️ TASK — Self audit page\n- Add /admin/agent console: textarea (goal) → generates one of the above prompts via a small mapping.\n- Buttons: 'Copy Prompt', 'Run Audit' (GET /api/agent/audit), 'Verify'.\n- No global nav edits; page is unlinked.\n# ✅ VERIFY\n- Visiting /admin/agent shows UI; GET /api/agent/audit returns JSON.`
  };

  return blocks[kind];
}