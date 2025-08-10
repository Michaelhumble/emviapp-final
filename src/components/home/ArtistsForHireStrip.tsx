import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { useOptimizedArtistsData } from "@/hooks/useOptimizedArtistsData";
import { ArtistForHireCard } from "@/components/artists/ArtistForHireCard";
import { useAuth } from "@/context/auth";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { track } from "@/lib/telemetry";
import { useTranslation } from "@/hooks/useTranslation";

const ArtistsForHireStrip = () => {
  const { isSignedIn } = useAuth();
  const { artists, loading } = useOptimizedArtistsData({ isSignedIn, limit: 6 });
const { isVietnamese } = useTranslation();
  const copy = {
    artistsStrip: {
      heading: { en: "Artists Available Now", vi: "Thợ Sẵn Sàng Ngay" },
      subcopy: {
        en: "Real profiles. Contact details are available to verified employers.",
        vi: "Hồ sơ thật. Thông tin liên hệ chỉ mở cho nhà tuyển dụng đã xác minh."
      },
      seeAll: { en: "See all artists", vi: "Xem tất cả thợ" }
    },
    buttons: {
      viewProfile: { en: "View Profile", vi: "Xem hồ sơ" },
      requestContact: { en: "Request Contact", vi: "Yêu cầu liên hệ" }
    },
    gating: {
      lockedLine: {
        en: "Contact details are available to verified employers.",
        vi: "Thông tin liên hệ chỉ mở cho nhà tuyển dụng đã xác minh."
      },
      signinPrompt: { en: "Sign in to request access.", vi: "Đăng nhập để yêu cầu quyền truy cập." }
    }
  } as const;
  const impressionSent = useRef(false);
  useEffect(() => {
    if (!impressionSent.current && artists && artists.length > 0) {
      track('artists_strip_impression', { count: Math.min(artists.length, 6) });
      impressionSent.current = true;
    }
  }, [artists]);

const items = artists ?? [];
  if (!items.length && !loading) return null;
  return (
    <section className="py-12 bg-background">
      <Container>
        <div className="text-center mb-10">
<h2 className="font-playfair text-3xl font-bold mb-2">
            {copy.artistsStrip.heading[isVietnamese ? 'vi' : 'en']}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            {copy.artistsStrip.subcopy[isVietnamese ? 'vi' : 'en']}
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/artists">
              <Button variant="outline">{copy.artistsStrip.seeAll[isVietnamese ? 'vi' : 'en']}</Button>
            </Link>
          </div>
        </div>

        <Card className="border-muted">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-medium">
              {isSignedIn ? "Currently Available" : "Recently Hired"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="bg-muted rounded-lg border p-6 animate-pulse h-[220px]" />
                ))}
              </div>
            ) : items.length > 0 ? (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.slice(0, 6).map((a) => (
                  <ArtistForHireCard
                    key={(a as any).user_id || (a as any).id}
                    artist={a as any}
                    variant="blueMinimal"
                    hidePhoto
                    contactGated
                    viewMode={isSignedIn ? "signedIn" : "public"}
                    theme="blue"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No artists available yet.
              </div>
            )}
          </CardContent>
        </Card>
      </Container>
    </section>
  );
};

export default ArtistsForHireStrip;
