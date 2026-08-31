// EmviApp Social Growth Engine — Phase 1 generator.
// Admin-only. Creates DRAFTS from real EmviApp data. Never publishes anything.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SITE = "https://www.emvi.app";
const DAILY_DRAFT_CAP = 40;
const MODEL = "google/gemini-2.5-flash";

type Platform = "facebook" | "instagram" | "tiktok" | "linkedin";

interface Opportunity {
  content_type: string;
  source_type: string;
  source_id?: string | null;
  source_url?: string | null;
  path: string;
  campaign: string;
  language: "en" | "vi";
  platform: Platform;
  cta: string;
  facts: Record<string, unknown>;
  dedupe_key: string;
}

function utm(path: string, platform: string, campaign: string, content: string) {
  const url = new URL(path, SITE);
  url.searchParams.set("utm_source", platform);
  url.searchParams.set("utm_medium", "social");
  url.searchParams.set("utm_campaign", campaign);
  url.searchParams.set("utm_content", content);
  return url.toString();
}

// ---------------------------------------------------------------- fact check
const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const PHONE_RE = /(\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;
const MONEY_RE = /\$\s?\d/;
const FORBIDDEN_WORDS = [
  "buy", "upgrade", "subscribe", "premium", "guaranteed", "guarantee",
  "testimonial", "success story", "thousands of", "hundreds of", "millions",
  "#1", "best in the country",
];

function factCheck(text: string, facts: Record<string, unknown>) {
  const notes: string[] = [];
  const lower = text.toLowerCase();
  if (EMAIL_RE.test(text)) notes.push("Contains an email address (PII).");
  if (PHONE_RE.test(text)) notes.push("Contains a phone-like number (PII).");
  if (MONEY_RE.test(text) && !facts.compensation) {
    notes.push("Mentions money but no verified compensation on the source.");
  }
  for (const w of FORBIDDEN_WORDS) {
    if (lower.includes(w)) notes.push(`Uses disallowed/unverifiable phrasing: "${w}".`);
  }
  const urls = text.match(/https?:\/\/[^\s)]+/g) || [];
  for (const u of urls) {
    if (!u.startsWith(SITE)) notes.push(`Links off-site: ${u}`);
  }
  return notes;
}

// ------------------------------------------------------------------ prompts
const PLATFORM_BRIEF: Record<Platform, string> = {
  facebook:
    "Facebook: warm, local, community-oriented. 2-4 short sentences. Useful, not salesy. 0-3 hashtags.",
  instagram:
    "Instagram: punchy 1-line hook, then a short caption (max 3 lines). 5-8 relevant hashtags. Include a visual concept in creative_brief.",
  tiktok:
    "TikTok: a scroll-stopping hook plus a 15-25 second video script outline in creative_brief. Short caption. 3-5 hashtags.",
  linkedin:
    "LinkedIn: professional, employer/salon-owner angle. 3-5 sentences, no emoji spam, 0-3 hashtags.",
};

function buildPrompt(op: Opportunity, url: string) {
  const langLine =
    op.language === "vi"
      ? "Write in NATURAL Vietnamese for Vietnamese-speaking beauty professionals in the US. Do NOT translate word for word from English; write it the way a Vietnamese nail-salon community member would actually say it."
      : "Write in clear, plain English.";
  return `You are the social content writer for EmviApp, a FREE beauty-industry hiring marketplace (nail techs, hair stylists, barbers, lash techs and salon owners).

${langLine}

Platform brief -> ${PLATFORM_BRIEF[op.platform]}

Content type: ${op.content_type}
Required call to action text: "${op.cta}"
Destination link (use EXACTLY this URL, unchanged, once): ${url}

VERIFIED FACTS you may use (nothing else is true, do not add anything):
${JSON.stringify(op.facts, null, 2)}

HARD RULES:
- Never invent salaries, job counts, user counts, statistics, applicant numbers, testimonials, success stories or hiring urgency.
- Never include any email address, phone number or street address.
- Never use the words buy, upgrade, subscribe, premium.
- Everything is free; say so plainly where relevant.
- Only link to the URL given above.

Return STRICT JSON only, no markdown fence:
{"headline": string, "caption": string, "hashtags": string[], "creative_brief": string}`;
}

async function generate(op: Opportunity, url: string, apiKey: string) {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "user", content: buildPrompt(op, url) }],
      temperature: 0.8,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`AI gateway ${res.status}: ${body.slice(0, 300)}`);
  }
  const json = await res.json();
  const raw: string = json?.choices?.[0]?.message?.content ?? "";
  const cleaned = raw.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start < 0 || end < 0) throw new Error("AI returned non-JSON content");
  const parsed = JSON.parse(cleaned.slice(start, end + 1));
  return {
    headline: String(parsed.headline ?? "").slice(0, 200),
    caption: String(parsed.caption ?? "").slice(0, 2000),
    hashtags: Array.isArray(parsed.hashtags)
      ? parsed.hashtags.slice(0, 10).map((h: unknown) => String(h).replace(/^#*/, "#"))
      : [],
    creative_brief: String(parsed.creative_brief ?? "").slice(0, 1000),
  };
}

// ------------------------------------------------------------ opportunities
function evergreenOpportunities(today: string): Opportunity[] {
  const salonFacts = {
    product: "EmviApp lets salon owners post a job for free",
    audience: "salon owners hiring nail techs, hair stylists, barbers, lash techs",
    price: "free",
  };
  const workerFacts = {
    product: "EmviApp lets beauty professionals browse jobs and apply free",
    audience: "nail technicians, hair stylists, barbers, lash technicians",
    price: "free",
  };
  const valuationFacts = {
    product: "EmviApp has a free salon valuation estimator at /salon-worth",
    note: "It produces an ESTIMATE only, not an appraisal",
  };
  const mk = (
    o: Omit<Opportunity, "dedupe_key"> & { key: string },
  ): Opportunity => ({ ...o, dedupe_key: `${o.key}:${today}` });

  return [
    mk({
      key: "owner-post-free-fb",
      content_type: "salon_owner",
      source_type: "evergreen",
      path: "/post-job",
      campaign: "salon_owner_free_post",
      language: "en",
      platform: "facebook",
      cta: "Post a Job — Free",
      facts: salonFacts,
    }),
    mk({
      key: "owner-post-free-li",
      content_type: "salon_owner",
      source_type: "evergreen",
      path: "/post-job",
      campaign: "salon_owner_free_post",
      language: "en",
      platform: "linkedin",
      cta: "Post a Job — Free",
      facts: salonFacts,
    }),
    mk({
      key: "career-ig",
      content_type: "career_education",
      source_type: "evergreen",
      path: "/jobs",
      campaign: "worker_career",
      language: "en",
      platform: "instagram",
      cta: "Find Beauty Jobs — Free",
      facts: workerFacts,
    }),
    mk({
      key: "career-tt",
      content_type: "career_education",
      source_type: "evergreen",
      path: "/jobs",
      campaign: "worker_career",
      language: "en",
      platform: "tiktok",
      cta: "Apply Free",
      facts: workerFacts,
    }),
    mk({
      key: "vi-worker-fb",
      content_type: "vietnamese_hiring",
      source_type: "evergreen",
      path: "/jobs",
      campaign: "vi_worker",
      language: "vi",
      platform: "facebook",
      cta: "Find Beauty Jobs — Free",
      facts: workerFacts,
    }),
    mk({
      key: "vi-owner-tt",
      content_type: "vietnamese_hiring",
      source_type: "evergreen",
      path: "/post-job",
      campaign: "vi_salon_owner",
      language: "vi",
      platform: "tiktok",
      cta: "Post a Job — Free",
      facts: salonFacts,
    }),
    mk({
      key: "valuation-li",
      content_type: "valuation",
      source_type: "evergreen",
      path: "/salon-worth",
      campaign: "salon_valuation",
      language: "en",
      platform: "linkedin",
      cta: "See What Your Salon May Be Worth",
      facts: valuationFacts,
    }),
  ];
}

function jobOpportunities(jobs: any[], today: string): Opportunity[] {
  const out: Opportunity[] = [];
  const platforms: Platform[] = ["facebook", "instagram", "linkedin"];
  jobs.slice(0, 3).forEach((job, i) => {
    const facts: Record<string, unknown> = {
      title: job.title,
      city: job.location,
      specialty: job.category,
      status: "active and not expired",
    };
    if (job.compensation_details) facts.compensation = job.compensation_details;
    out.push({
      content_type: "job",
      source_type: "job",
      source_id: job.id,
      source_url: `${SITE}/jobs/${job.id}`,
      path: `/jobs/${job.id}`,
      campaign: "real_job",
      language: "en",
      platform: platforms[i % platforms.length],
      cta: "Apply Free",
      facts,
      dedupe_key: `job:${job.id}:${platforms[i % platforms.length]}:${today}`,
    });
  });
  return out;
}

// ------------------------------------------------------------------ handler
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) return json({ error: "LOVABLE_API_KEY not configured" }, 500);

    // --- admin auth gate -----------------------------------------------
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace("Bearer ", "").trim();
    if (!token) return json({ error: "Unauthorized" }, 401);

    const admin = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    });
    const { data: userData, error: userErr } = await admin.auth.getUser(token);
    if (userErr || !userData?.user) return json({ error: "Unauthorized" }, 401);

    const { data: isAdmin } = await admin.rpc("has_role", {
      _user_id: userData.user.id,
      _role: "admin",
    });
    if (!isAdmin) return json({ error: "Forbidden: admin only" }, 403);

    // --- daily cost cap --------------------------------------------------
    const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
    const { count: recent } = await admin
      .from("social_content_queue")
      .select("id", { count: "exact", head: true })
      .gte("created_at", since);
    if ((recent ?? 0) >= DAILY_DRAFT_CAP) {
      return json({ error: `Daily draft cap reached (${DAILY_DRAFT_CAP} in 24h).` }, 429);
    }

    // --- real, eligible job discovery -----------------------------------
    const nowIso = new Date().toISOString();
    const cutoff = new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString();
    const { data: allActive } = await admin
      .from("jobs")
      .select("id,title,location,category,compensation_details,created_at,expires_at,seed_tag,status")
      .eq("status", "active")
      .is("seed_tag", null)
      .order("created_at", { ascending: false })
      .limit(50);

    const eligibleJobs = (allActive ?? []).filter((j: any) =>
      j.expires_at ? j.expires_at > nowIso : j.created_at > cutoff
    );

    const today = nowIso.slice(0, 10);
    const opportunities = [
      ...jobOpportunities(eligibleJobs, today),
      ...evergreenOpportunities(today),
    ].slice(0, Math.max(0, DAILY_DRAFT_CAP - (recent ?? 0)));

    const created: any[] = [];
    const skipped: string[] = [];

    for (const op of opportunities) {
      const { data: dupe } = await admin
        .from("social_content_queue")
        .select("id")
        .eq("dedupe_key", op.dedupe_key)
        .maybeSingle();
      if (dupe) {
        skipped.push(`${op.dedupe_key} (already generated)`);
        continue;
      }

      const targetUrl = utm(op.path, op.platform, op.campaign, op.content_type);
      let draft;
      try {
        draft = await generate(op, targetUrl, apiKey);
      } catch (e) {
        skipped.push(`${op.dedupe_key} (ai error: ${(e as Error).message})`);
        continue;
      }

      const notes = factCheck(
        `${draft.headline}\n${draft.caption}\n${draft.hashtags.join(" ")}`,
        op.facts,
      );

      const { data: row, error: insErr } = await admin
        .from("social_content_queue")
        .insert({
          content_type: op.content_type,
          source_type: op.source_type,
          source_id: op.source_id ?? null,
          source_url: op.source_url ?? null,
          platform: op.platform,
          language: op.language,
          headline: draft.headline,
          caption: draft.caption,
          hashtags: draft.hashtags,
          cta: op.cta,
          creative_brief: draft.creative_brief,
          target_url: targetUrl,
          status: "draft",
          fact_check_status: notes.length ? "needs_review" : "passed",
          fact_check_notes: notes.length ? notes.join(" | ") : null,
          dedupe_key: op.dedupe_key,
        })
        .select()
        .single();

      if (insErr) skipped.push(`${op.dedupe_key} (${insErr.message})`);
      else created.push(row);
    }

    return json({
      ok: true,
      eligible_real_jobs: eligibleJobs.length,
      active_jobs_scanned: (allActive ?? []).length,
      note: eligibleJobs.length === 0
        ? "No real, active, non-expired, non-seed jobs available. No job promotions were generated; evergreen content only."
        : undefined,
      created_count: created.length,
      created,
      skipped,
    });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});
