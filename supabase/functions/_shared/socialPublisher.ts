// EmviApp Social Growth Engine — publishing adapter interface (Phase 1).
//
// Phase 1 ships ONLY this interface plus a null adapter. Nothing is published.
// Phase 2 will add a real provider adapter (recommended: Postiz, self-hostable,
// open source, single API for Facebook / Instagram / TikTok / LinkedIn) without
// changing any calling code.

export interface SocialPost {
  id: string;
  platform: "facebook" | "instagram" | "tiktok" | "linkedin" | "x" | "pinterest";
  language: "en" | "vi";
  caption: string;
  hashtags: string[];
  targetUrl?: string | null;
  scheduledAt?: string | null;
  mediaUrls?: string[];
}

export interface PublishResult {
  ok: boolean;
  externalPostId?: string;
  externalPostUrl?: string;
  error?: string;
}

export interface SocialPublisher {
  readonly name: string;
  isConfigured(): boolean;
  publish(post: SocialPost): Promise<PublishResult>;
  schedule(post: SocialPost, whenIso: string): Promise<PublishResult>;
}

/** Default adapter: never publishes, never fakes success. */
export const nullPublisher: SocialPublisher = {
  name: "none",
  isConfigured: () => false,
  publish: async () => ({
    ok: false,
    error: "No publishing provider connected. Phase 1 is approval-only.",
  }),
  schedule: async () => ({
    ok: false,
    error: "No publishing provider connected. Phase 1 is approval-only.",
  }),
};

export function getPublisher(): SocialPublisher {
  // Phase 2: return a configured provider adapter when its secret exists.
  return nullPublisher;
}
