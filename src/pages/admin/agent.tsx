"use client";
import React, { useEffect, useMemo, useState } from "react";
import { promptFactory, type PromptKind } from "@/agents/emviAgent";

const presets: { key: PromptKind; label: string }[] = [
  { key: "cleanup-signup-ui", label: "Clean /auth/signup UI" },
  { key: "cleanup-signin-ui", label: "Clean /auth/signin UI" },
  { key: "facebook-oauth-verify", label: "Facebook OAuth verify" },
  { key: "hubspot-baseline", label: "HubSpot baseline hooks" },
  { key: "hubspot-server-upsert", label: "HubSpot server upsert" },
  { key: "agent-self-check", label: "Agent self-audit page" },
];

export default function AgentConsole() {
  const [kind, setKind] = useState<PromptKind>("hubspot-server-upsert");
  const [prompt, setPrompt] = useState("");
  const [audit, setAudit] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generated = useMemo(() => promptFactory(kind), [kind]);
  useEffect(() => setPrompt(generated), [generated]);

  async function runAudit() {
    setLoading(true);
    try {
      const res = await fetch("/api/agent/audit");
      const j = await res.json();
      setAudit(j);
    } catch (error) {
      setAudit({ ok: false, error: "Failed to fetch audit" });
    } finally {
      setLoading(false);
    }
  }

  function copy() {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-bold text-foreground">EmviAgent Console</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Generate surgical prompts for Lovable and audit environment health
        </p>
      </div>

      <div className="grid gap-3">
        <label className="text-sm font-medium text-foreground">Preset Task</label>
        <select 
          value={kind} 
          onChange={(e) => setKind(e.target.value as PromptKind)} 
          className="border border-border rounded-lg p-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {presets.map(p => (
            <option key={p.key} value={p.key}>{p.label}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-foreground">Generated Prompt (read-only)</label>
        <textarea 
          className="w-full h-72 border border-border rounded-lg p-3 font-mono text-xs bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" 
          value={prompt} 
          readOnly 
        />
        <div className="flex gap-3">
          <button 
            onClick={copy} 
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {copied ? "✓ Copied!" : "Copy Prompt"}
          </button>
          <button 
            onClick={runAudit} 
            disabled={loading}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50"
          >
            {loading ? "Running..." : "Run Audit"}
          </button>
        </div>
      </div>

      {audit && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Audit Results</label>
          <pre className="bg-muted border border-border rounded-lg p-3 text-xs overflow-auto text-foreground">
            {JSON.stringify(audit, null, 2)}
          </pre>
        </div>
      )}

      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <h3 className="text-sm font-medium text-foreground mb-2">Usage Instructions</h3>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>1. Select a preset task from the dropdown</li>
          <li>2. Click "Copy Prompt" and paste into Lovable chat</li>
          <li>3. After Lovable completes the task, run "Run Audit" to verify</li>
          <li>4. This page is intentionally unlinked from navigation</li>
        </ul>
      </div>

      <p className="text-xs text-muted-foreground border-t border-border pt-4">
        🔒 This console only generates prompts and audits environments. No direct code modifications are made from this interface.
      </p>
    </main>
  );
}