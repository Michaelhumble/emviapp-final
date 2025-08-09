import React, { useState, useEffect } from 'react';
import { Job } from '@/types/job';
import { supabaseBypass } from '@/types/supabase-bypass';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, DollarSign, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { track } from '@/lib/telemetry';
import { getDemoJobs } from '@/demo/seedOverlay';
import { showDemoBadges } from '@/demo/demoFlags';
import { analytics } from '@/lib/analytics';
import { isOverlayEnabled, hasAnalyticsFired, markAnalyticsFired, setCounts, debugLog } from '@/lib/demoOverlay';
interface WhatYouMissedSectionProps {
  title?: string;
  maxJobs?: number;
}

const WhatYouMissedSection = ({ 
  title = "What You Missed", 
  maxJobs = 6 
}: WhatYouMissedSectionProps) => {
  const [expiredJobs, setExpiredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExpiredJobs();
    const overlay = isOverlayEnabled();
    if (overlay) {
      const demo = getDemoJobs({ mode: 'expired', limit: Math.min(maxJobs, 12) });
      setExpiredJobs(demo);
      setCounts({ expiredJobs: demo.length });
      const surface = 'what_you_missed';
      if (!hasAnalyticsFired(surface)) {
        try { analytics.trackEvent?.({ action: 'demo_overlay_rendered', category: 'demo', label: surface, value: demo.length as any }); } catch {}
        markAnalyticsFired(surface);
        debugLog('Analytics fired:', surface, { count: demo.length });
      }
    }
  }, []);

  const fetchExpiredJobs = async () => {
    setLoading(true);
    try {
      const nowISO = new Date().toISOString();
      const thirtyDaysAgoISO = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

      const { data: jobsData, error } = await (supabaseBypass as any)
        .from('jobs')
        .select('*')
        .eq('status' as any, 'active')
        .or(`expires_at.lte.${nowISO},and(expires_at.is.null,created_at.lte.${thirtyDaysAgoISO})`)
        .order('expires_at' as any, { ascending: false })
        .order('created_at' as any, { ascending: false })
        .limit(maxJobs);

      let transformedJobs: Job[] = [];
      if (!error && jobsData) {
        transformedJobs = jobsData.map((job: any) => ({
          id: job.id,
          title: job.title || 'Job Title',
          company: job.title || 'Company Name',
          location: job.location || '',
          created_at: job.created_at || new Date().toISOString(),
          description: job.description || '',
          compensation_type: job.compensation_type || '',
          compensation_details: job.compensation_details || '',
          contact_info: typeof job.contact_info === 'object' && job.contact_info ? (job.contact_info as any) : {},
          user_id: job.user_id || '',
          status: job.status || 'active',
          expires_at: job.expires_at || '',
          requirements: job.requirements || '',
          pricing_tier: job.pricing_tier || 'free',
          category: job.category || 'Other'
        }));
      }

      const overlay = isOverlayEnabled();
      if (overlay && (error || transformedJobs.length === 0)) {
        transformedJobs = getDemoJobs({ mode: 'expired', limit: Math.min(maxJobs, 12) });
        const surface = 'what_you_missed';
        if (!hasAnalyticsFired(surface)) {
          try { analytics.trackEvent?.({ action: 'demo_overlay_rendered', category: 'demo', label: surface, value: transformedJobs.length as any }); } catch {}
          markAnalyticsFired(surface);
          debugLog('Analytics fired:', surface, { count: transformedJobs.length });
        }
      }

      setExpiredJobs(transformedJobs);
      if (isPreview()) setCounts({ expiredJobs: transformedJobs.length });
    } catch (error) {
      console.error('Error fetching expired jobs:', error);
      if (isOverlayEnabled()) {
        const transformedJobs = getDemoJobs({ mode: 'expired', limit: Math.min(maxJobs, 12) });
        setExpiredJobs(transformedJobs);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  if (expiredJobs.length === 0) {
    return (
      <section className="mb-8">
        <div className="text-center text-sm text-muted-foreground">
          No recently filled roles yet.
        </div>
      </section>
    );
  }

  const getTimeAgoText = (expiresAt: string) => {
    const expiredDate = new Date(expiresAt);
    const now = new Date();
    const diffMs = now.getTime() - expiredDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Expired today';
    if (diffDays === 1) return 'Expired yesterday';
    if (diffDays < 7) return `Expired ${diffDays} days ago`;
    if (diffDays < 30) return `Expired ${Math.floor(diffDays / 7)} weeks ago`;
    return `Expired ${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <TrendingDown className="w-6 h-6 text-gray-500" />
          <h2 className="text-2xl font-playfair font-bold text-gray-600">{title}</h2>
        </div>
        <p className="text-gray-500 font-inter">
          Recent opportunities that are no longer available — don't miss the next ones!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {expiredJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full opacity-60 border border-gray-200 bg-gray-50/50 relative overflow-hidden" onClick={() => track('jobs_recently_filled_card_click', { job_id: job.id, source: 'recently_filled' })}>
              {/* Expired Overlay */}
              <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
                <Badge variant="destructive" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  Expired
                </Badge>
                {showDemoBadges() && (job as any).__demo && (
                  <Badge variant="secondary" className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-foreground/70">Demo</Badge>
                )}
              </div>

              <CardContent className="p-5">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-playfair font-bold text-gray-700 line-clamp-2">
                      {job.title}
                    </h3>
                    <div className="flex items-center text-gray-500 text-sm font-inter mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {job.location || 'Location not specified'}
                    </div>
                  </div>

                  {job.compensation_details && (
                    <div className="bg-gray-100 rounded-lg p-2">
                      <div className="flex items-center text-gray-600 font-inter text-sm">
                        <DollarSign className="w-3 h-3 mr-1" />
                        {job.compensation_details}
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-gray-500 font-inter">
                    {getTimeAgoText(job.expires_at)}
                  </div>

                  {job.description && (
                    <p className="text-sm text-gray-600 font-inter line-clamp-2">
                      {job.description}
                    </p>
                  )}
                </div>
              </CardContent>

              {/* Grayscale overlay */}
              <div className="absolute inset-0 bg-gray-300/20 pointer-events-none"></div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-gray-500 font-inter italic">
          💡 Stay ahead of the competition — create a job alert to never miss opportunities like these again!
        </p>
      </div>
    </motion.section>
  );
};

export default WhatYouMissedSection;