import React from "react";
import PremiumContactGate from "@/components/common/PremiumContactGate";
import { Badge } from "@/components/ui/badge";
import { MapPin, ShieldCheck } from "lucide-react";
import { ArtistListItem } from "@/hooks/useOptimizedArtistsData";

interface Props {
  artist: ArtistListItem;
}

export default function ArtistProfile({ artist }: Props) {
  const chips = (artist.specialties || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 8);

  return (
    <article className="max-w-5xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        <div className="flex gap-4 items-start">
          <div className="h-24 w-24 rounded-full overflow-hidden border">
            <img
              src={artist.avatar_url || "/images/placeholder-artist.jpg"}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/images/placeholder-artist.jpg";
              }}
              loading="lazy"
              decoding="async"
              alt={`Artist avatar – ${artist.headline || "Artist"}`}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{artist.headline || "Beauty Professional"}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-muted-foreground">
              {artist.location && (
                <span className="inline-flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {artist.location}
                </span>
              )}
              {artist.years_experience != null && (
                <span className="text-sm">{artist.years_experience} yrs</span>
              )}
              <Badge className={artist.available_for_work ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-700"}>
                {artist.available_for_work ? "Available for work" : "Not available"}
              </Badge>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200/50 rounded-lg p-3">
          <div className="text-sm font-medium text-gray-800">Contact Information Available</div>
        </div>
      </header>

      {/* Skills */}
      {chips.length > 0 && (
        <section className="mt-6">
          <h2 className="text-lg font-medium mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {chips.map((c) => (
              <span key={c} className="text-xs bg-zinc-100 text-zinc-700 px-2 py-1 rounded-full">
                {c}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Bio */}
      {artist.bio && (
        <section className="mt-6">
          <h2 className="text-lg font-medium mb-2">About</h2>
          <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">{artist.bio}</p>
        </section>
      )}

      {/* Credentials (optional placeholder if fields exist in future) */}
      <section className="mt-6">
        <h2 className="text-lg font-medium mb-2">Credentials</h2>
        <div className="text-sm text-muted-foreground">Add education and certifications</div>
      </section>

      {/* Gallery (optional if implemented later) */}
      {/* Intentionally omitted: portfolio_urls column not present in schema */}
    </article>
  );
}
