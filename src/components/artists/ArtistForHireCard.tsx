import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PremiumContactGate from "@/components/common/PremiumContactGate";
import { Badge } from "@/components/ui/badge";
import { User2, MapPin } from "lucide-react";
import React from "react";

export interface ArtistForHireCardProps {
  name?: string | null;
  specialty?: string | null; // e.g., Nails, Hair, Lashes, Makeup, Massage, Skin
  location?: string | null;  // City, State
  headline?: string | null;  // "Available for Work", etc.
  available?: boolean;       // availability flag
  viewMode: "public" | "signedIn"; // affects status badge color/text
}

// Deterministic name generator for seed/profiles without names
function hashStringToNumber(input: string, max: number) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash) % max;
}

const FIRST_NAMES = [
  // Vietnamese
  "Minh", "Trang", "Linh", "Anh", "Huy", "Thao", "Phuong", "Quynh",
  // American
  "Emily", "Michael", "Jessica", "David", "Ashley", "Daniel",
  // Latin
  "Sofia", "Mateo", "Camila", "Sebastián", "Lucia",
  // European
  "Anna", "Luca", "Elena", "Noah", "Emma"
];

const LAST_NAMES = [
  // Vietnamese
  "Nguyen", "Tran", "Le", "Pham", "Vo",
  // American
  "Johnson", "Smith", "Williams", "Brown",
  // Latin
  "Garcia", "Martinez", "Rodriguez",
  // European
  "Silva", "Kovacs", "Rossi", "Müller"
];

function getDeterministicName(seed: string) {
  const fi = hashStringToNumber(seed + "f", FIRST_NAMES.length);
  const li = hashStringToNumber(seed + "l", LAST_NAMES.length);
  return `${FIRST_NAMES[fi]} ${LAST_NAMES[li]}`;
}

const StatusBadge: React.FC<{ available?: boolean; viewMode: "public" | "signedIn" }> = ({ available, viewMode }) => {
  const isAvailable = viewMode === "signedIn" && available;
  const label = viewMode === "signedIn" ? (isAvailable ? "Available" : "Unavailable") : "Unavailable";
  const cls = isAvailable
    ? "bg-green-600/90 text-white"
    : "bg-muted text-muted-foreground";
  return <Badge className={cls}>{label}</Badge>;
};

const ArtistForHireCard: React.FC<ArtistForHireCardProps & { seed?: string }> = ({
  name,
  specialty,
  location,
  headline,
  available,
  viewMode,
  seed = "seed"
}) => {
  const displayName = name && name.trim().length > 0 ? name : getDeterministicName(seed);

  return (
    <Card className="border-muted">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
          <User2 className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <CardTitle className="text-lg truncate">{displayName}</CardTitle>
          <div className="text-sm text-muted-foreground truncate">{specialty || "Beauty Professional"}</div>
        </div>
        <StatusBadge available={available} viewMode={viewMode} />
      </CardHeader>
      <CardContent className="space-y-3">
        {location && (
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="truncate">{location}</span>
          </div>
        )}
        {headline && (
          <p className="text-sm leading-relaxed text-foreground/80">{headline}</p>
        )}

        {/* Contact CTA gated behind PremiumContactGate */}
        <PremiumContactGate>
          <div className="mt-2 text-sm text-muted-foreground">
            Contact: ••• ••• ••••
          </div>
        </PremiumContactGate>
      </CardContent>
    </Card>
  );
};

export default ArtistForHireCard;
