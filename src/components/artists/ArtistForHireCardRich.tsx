import PremiumContactGate from "@/components/common/PremiumContactGate";
import React from "react";

export interface ArtistForHireRichItem {
  id?: string;
  user_id?: string;
  headline?: string; specialties?: string; location?: string;
  available_for_work?: boolean; avatar_url?: string; years_experience?: number; bio?: string;
}

export default function ArtistForHireCardRich({ a }:{ a:ArtistForHireRichItem }) {
  const chips = (a.specialties||"").split(",").map(s=>s.trim()).filter(Boolean).slice(0,4);
  return (
    <div className="rounded-xl border p-4 flex flex-col">
      <div className="aspect-[16/10] overflow-hidden rounded-lg mb-3">
        <img
          src={a.avatar_url || "/images/placeholder-artist.jpg"}
          onError={(e)=>{ (e.currentTarget as HTMLImageElement).src="/images/placeholder-artist.jpg"; }}
          loading="lazy" decoding="async" alt={`Artist profile photo – ${a.headline||"Artist"}`}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between mb-1">
        <div className="font-medium">{a.headline || "Artist available"}</div>
        <span className={`text-xs px-2 py-0.5 rounded-full ${a.available_for_work?"bg-emerald-100 text-emerald-700":"bg-zinc-100 text-zinc-700"}`}>
          {a.available_for_work ? "Available" : "Not Available"}
        </span>
      </div>
      <div className="text-sm text-muted-foreground mb-2">
        {(a.location||"")}{a.years_experience?` • ${a.years_experience} yrs`:null}
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {chips.map((c)=>(
          <span key={c} className="text-xs bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-full">{c}</span>
        ))}
      </div>
      <div className="mt-auto flex gap-2">
        <a href={`/artists/${a.id || a.user_id}`} className="text-sm underline">View Profile</a>
        <PremiumContactGate>
          <button className="text-sm underline">Contact</button>
        </PremiumContactGate>
      </div>
    </div>
  );
}
