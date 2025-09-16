import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function OAuthCallback() {
  const nav = useNavigate();
  const [msg, setMsg] = useState("Completing sign-in…");

  useEffect(() => {
    const finish = async () => {
      try {
        const url = new URL(window.location.href);
        const next = url.searchParams.get("next") || "/";
        const code = url.searchParams.get("code");
        const error_desc = url.searchParams.get("error_description");
        
        if (error_desc) throw new Error(decodeURIComponent(error_desc));

        // PKCE flow: if we have ?code=, exchange for a session
        if (code) {
          // Works with supabase-js v2 for PKCE OAuth
          const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href);
          if (error) throw error;
          if (!data?.session) throw new Error("No session returned");
        } else {
          // Non-PKCE fallback (hash flow)
          const { data, error } = await supabase.auth.getSession();
          if (error) throw error;
          if (!data?.session) throw new Error("No session available");
        }

        // Clean the URL (remove code, etc.) and go home or `next`
        window.history.replaceState({}, "", next);
        nav(next, { replace: true });
      } catch (e: any) {
        setMsg(`Sign-in error: ${e?.message || e}`);
        toast.error(`Sign-in failed: ${e?.message || e}`);
        // small delay then back to signin
        setTimeout(() => nav("/auth/signin", { replace: true }), 1500);
      }
    };
    finish();
  }, [nav]);

  return (
    <main className="mx-auto max-w-md px-4 py-16 text-center">
      <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full mx-auto mb-4"></div>
      <h1 className="text-xl font-semibold">{msg}</h1>
      <p className="mt-2 text-sm text-muted-foreground">Please wait…</p>
    </main>
  );
}