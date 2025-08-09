import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { supabase } from '@/integrations/supabase/client';
import { Job } from '@/types/job';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Helmet } from 'react-helmet';
import WhatYouMissedSection from '@/components/jobs/WhatYouMissedSection';

// Inline JSON-LD helper
function generateJobPostingJsonLd(job: Job, isExpired: boolean) {
  const base: any = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description || '',
    datePosted: job.created_at,
    employmentType: job.compensation_type || undefined,
    jobLocation: job.location ? { '@type': 'Place', address: job.location } : undefined,
  };

  if (isExpired) {
    // validThrough must be in the past; fallback to created_at + 30 days if missing
    const validThrough = job.expires_at || new Date(new Date(job.created_at || Date.now()).getTime() + 30*24*60*60*1000).toISOString();
    base.validThrough = validThrough;
    // Omit applyAction when expired
  } else {
    base.hiringOrganization = job.company ? { '@type': 'Organization', name: job.company } : undefined;
  }

  return JSON.stringify(base);
}

const JobDetailDynamicPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await (supabase as any)
          .from('jobs')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        if (error) throw error;
        if (!data) {
          setJob(null);
        } else {
          const j: Job = {
            id: data.id,
            title: data.title,
            description: data.description,
            company: data.title,
            location: data.location,
            compensation_details: data.compensation_details,
            salary_range: data.compensation_details,
            specialties: [],
            category: data.category,
            status: data.status,
            pricing_tier: data.pricing_tier || 'free',
            created_at: data.created_at,
            updated_at: data.updated_at,
            user_id: data.user_id,
            expires_at: data.expires_at,
            contact_info: typeof data.contact_info === 'object' ? (data.contact_info as any) : {},
          };
          setJob(j);
        }
      } catch (e: any) {
        console.error('Error fetching job by id:', e);
        setError('Unable to load this job');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const { isActive, isExpired } = useMemo(() => {
    if (!job) return { isActive: false, isExpired: false };
    const now = new Date();
    const createdAt = job.created_at ? new Date(job.created_at) : new Date(0);
    const expiresAt = job.expires_at ? new Date(job.expires_at as any) : null;
    const activeWindow = new Date(createdAt.getTime() + 30 * 24 * 60 * 60 * 1000);
    const active = job.status === 'active' && ((expiresAt && expiresAt > now) || (!expiresAt && activeWindow > now));
    return { isActive: active, isExpired: !active };
  }, [job]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading job…</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-muted-foreground">This job could not be found.</p>
        <Button className="mt-4" onClick={() => navigate('/jobs')}>Back to Jobs</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>{job.title} | EmviApp</title>
        <meta name="description" content={job.description?.slice(0, 150) || 'Job opportunity on EmviApp'} />
        <script type="application/ld+json">{generateJobPostingJsonLd(job, isExpired)}</script>
      </Helmet>

      {isExpired && (
        <div className="mb-6 rounded-lg border bg-muted/30 p-4">
          <h2 className="text-lg font-semibold">This job is no longer accepting applications.</h2>
          <p className="text-sm text-muted-foreground mt-1">Recently filled. Sign in to see open roles or post a job to hire faster.</p>
          <div className="mt-3 flex gap-2">
            <Button onClick={() => navigate('/auth/signin?redirect=/jobs')}>Sign in to see open roles</Button>
            <Button variant="outline" onClick={() => navigate('/post-job')}>Post a job</Button>
          </div>
        </div>
      )}

      <div className="bg-card border rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{job.title}</h1>
            {job.location && <p className="text-muted-foreground mt-1">{job.location}</p>}
          </div>
          {isExpired && <Badge variant="destructive">Expired</Badge>}
        </div>

        {job.description && <p className="mt-4 whitespace-pre-line">{job.description}</p>}

        <div className="mt-6 flex gap-2">
          <Button disabled={isExpired}>Apply</Button>
          <Button variant="outline" disabled={isExpired}>Contact</Button>
        </div>
      </div>

      {isExpired && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Recently filled</h3>
          <WhatYouMissedSection title="Recently filled" maxJobs={4} />
        </div>
      )}
    </div>
  );
};

export default JobDetailDynamicPage;
