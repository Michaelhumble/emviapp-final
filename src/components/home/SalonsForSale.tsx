import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { supabaseBypass } from '@/types/supabase-bypass';
import { SalonSale } from '@/types/salonSale';
import SalonSaleCard from '@/components/salons/SalonSaleCard';
import { Link } from 'react-router-dom';
import ValidatedLink from '@/components/common/ValidatedLink';
import { useAuth } from '@/context/auth';
import { Badge } from '@/components/ui/badge';
import { getDemoSalons } from '@/demo/seedOverlay';
import { showDemoBadges } from '@/demo/demoFlags';
import { analytics } from '@/lib/analytics';
import { isOverlayEnabled, setCounts, hasAnalyticsFired, markAnalyticsFired, debugLog } from '@/lib/demoOverlay';

// Use real salon listings data

export default function SalonsForSale() {
  const [loading, setLoading] = useState(true);
  const [salonSales, setSalonSales] = useState<SalonSale[] & { __demo?: true }[]>([] as any);
  const { isSignedIn } = useAuth();
  const fomoEnabled = (() => { try { const flag = (window as any)?.__env?.FOMO_LISTING_MODE; if (flag === false || flag === 'false') return false; if (flag === true || flag === 'true') return true; } catch {} return undefined; })();
  const effectiveSignedIn = fomoEnabled === false ? true : isSignedIn;
  const fired = useRef(false);

  // Fetch real salon sales from database
  useEffect(() => {
    const fetchSalonSales = async () => {
      try {
        const overlay = isOverlayEnabled();
        if (overlay) {
          const demo = getDemoSalons(6) as any;
          setSalonSales(demo);
          setLoading(false);
          setCounts({ salons: demo.length });
          const surface = 'salons_for_sale';
          if (!hasAnalyticsFired(surface)) {
            try { analytics.trackEvent?.({ action: 'demo_overlay_rendered', category: 'demo', label: surface, value: demo.length as any }); } catch {}
            markAnalyticsFired(surface);
            debugLog('Analytics fired:', surface, { count: demo.length });
          }
        }

        const cutoffIso = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

        let query = supabaseBypass
          .from('salon_sales')
          .select(`
            *,
            salon_sale_photos(
              id,
              photo_url,
              order_number
            )
          `)
          .eq('status', 'active');

        if (effectiveSignedIn) {
          // Signed-in: Active and recent
          query = query.order('created_at', { ascending: false }).limit(4);
        } else {
          // Public FOMO: stale proxy (older than 30 days)
          query = query.lte('created_at', cutoffIso).order('created_at', { ascending: false }).limit(6);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching salon sales:', error);
        }

        // Transform data to include photos in images array
        const transformedSales = (data || []).map((sale: any) => ({
          ...sale,
          images: sale.salon_sale_photos 
            ? sale.salon_sale_photos
                .sort((a: any, b: any) => (a.order_number || 0) - (b.order_number || 0))
                .map((photo: any) => photo.photo_url)
            : (sale.images || [])
        }));

        let finalSales: any[] = transformedSales;
        if (overlay && (error || transformedSales.length === 0)) {
          finalSales = getDemoSalons(6);
        }

        setSalonSales(finalSales as any);
        setCounts({ salons: finalSales.length });
      } catch (error) {
        console.error('Error loading salon sales:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalonSales();
  }, [isSignedIn]);

  // Demo overlay analytics (guarded)
  useEffect(() => {
    const surface = 'salons_for_sale';
    if (!hasAnalyticsFired(surface) && (salonSales as any[]).some((s: any) => s.__demo)) {
      markAnalyticsFired(surface);
      try { analytics.trackEvent?.({ action: 'demo_overlay_rendered', category: 'demo', label: surface, value: salonSales.length as any }); } catch {}
      debugLog('Analytics fired:', surface, { count: salonSales.length });
    }
  }, [salonSales]);

  return (
    <section className="py-12 bg-gray-50">
      <Container>
        <div className="text-center mb-10">
          <h2 className="font-playfair text-3xl font-bold mb-2">Tiệm Nail Cần Bán</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Browse our curated selection of nail salons for sale across the United States.
            Find your next business opportunity with EmviApp.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/salons">
              <Button variant="outline">View All Listings</Button>
            </Link>
            <ValidatedLink to="/salon-owners" listingId="salon-owners" listingType="page" fallbackRoute="/signup">
              <Button>List Your Salon</Button>
            </ValidatedLink>
          </div>
        </div>

        <Card className="border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-medium">Featured Salon Listings</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white rounded-lg border p-6 animate-pulse">
                    <div className="aspect-[4/3] bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : salonSales.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {salonSales.map((salon: any) => (
                  <div key={salon.id} className="space-y-2">
                    <SalonSaleCard
                      salon={salon}
                      onViewDetails={() => {}}
                    />
                    <div className="flex justify-end gap-2">
                      {!effectiveSignedIn && (
                        <Badge variant="secondary" className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-foreground/70">Recently sold</Badge>
                      )}
                      {showDemoBadges() && salon.__demo && (
                        <Badge variant="secondary" className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-foreground/70">Demo</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">No salon listings available at the moment.</p>
                <p className="text-gray-400 mt-2">Check back soon for new opportunities!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
