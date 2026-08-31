import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { track } from '@/lib/telemetry';

interface ApplicantRow {
  id: string;
  applicant_id: string;
  status: string;
  created_at: string;
  cover_letter: string | null;
  phone: string | null;
}

interface PublicProfile {
  id: string;
  full_name: string | null;
  professional_name: string | null;
  avatar_url: string | null;
  specialty: string | null;
  location: string | null;
  years_experience: number | null;
  bio: string | null;
}

const JobApplicants: React.FC = () => {
  const { jobId } = useParams();
  const { user, isSignedIn } = useAuth();
  const [job, setJob] = useState<{ title: string; user_id: string } | null>(null);
  const [rows, setRows] = useState<ApplicantRow[]>([]);
  const [profiles, setProfiles] = useState<Record<string, PublicProfile>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!user?.id || !jobId) {
        setLoading(false);
        return;
      }

      const { data: jobData } = await (supabase as any)
        .from('jobs')
        .select('title, user_id')
        .eq('id', jobId)
        .maybeSingle();
      setJob(jobData || null);

      const { data, error } = await (supabase as any)
        .from('job_applications')
        .select('id, applicant_id, status, created_at, cover_letter, phone')
        .eq('job_id', jobId)
        .order('created_at', { ascending: false });

      if (error) console.error('[applicants]', error);
      const list = (data as ApplicantRow[]) || [];
      setRows(list);
      track('application_viewed_by_owner', { job_id: jobId, count: list.length });

      if (list.length) {
        const { data: profs } = await (supabase as any)
          .from('public_profiles')
          .select('id, full_name, professional_name, avatar_url, specialty, location, years_experience, bio')
          .in('id', list.map((r) => r.applicant_id));
        const map: Record<string, PublicProfile> = {};
        (profs || []).forEach((p: PublicProfile) => {
          map[p.id] = p;
        });
        setProfiles(map);
      }
      setLoading(false);
    };
    load();
  }, [user?.id, jobId]);

  const markReviewed = async (id: string) => {
    const { error } = await (supabase as any)
      .from('job_applications')
      .update({ status: 'reviewed', reviewed_at: new Date().toISOString() })
      .eq('id', id);
    if (!error) {
      setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status: 'reviewed' } : r)));
    }
  };

  const isOwner = !!job && job.user_id === user?.id;

  return (
    <Layout>
      <Helmet>
        <title>Applicants | EmviApp</title>
        <meta name="robots" content="noindex,follow" />
      </Helmet>
      <div className="container mx-auto py-8 px-4 max-w-3xl">
        <Link to="/my-jobs" className="text-sm text-primary underline">
          ← Back to my jobs
        </Link>
        <h1 className="text-3xl font-bold mt-3 mb-1">Applicants</h1>
        <p className="text-muted-foreground mb-6">{job?.title}</p>

        {!isSignedIn ? (
          <div className="text-center py-12">
            <a href={`/signin?redirect=${encodeURIComponent(`/my-jobs/${jobId}/applicants`)}`} className="text-primary underline">
              Sign in to view applicants
            </a>
          </div>
        ) : loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading…</div>
        ) : !isOwner ? (
          <div className="text-center py-12 text-muted-foreground">
            You don't have access to applicants for this job.
          </div>
        ) : rows.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No applications yet. Share your job link to get applicants faster.
          </div>
        ) : (
          <div className="space-y-4">
            {rows.map((r) => {
              const p = profiles[r.applicant_id];
              const name = p?.professional_name || p?.full_name || 'EmviApp member';
              return (
                <div key={r.id} className="bg-card p-5 rounded-lg border">
                  <div className="flex items-start gap-4">
                    {p?.avatar_url ? (
                      <img
                        src={p.avatar_url}
                        alt={`${name} profile photo`}
                        className="w-12 h-12 rounded-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-muted" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-semibold">{name}</h2>
                        <Badge variant="secondary" className="capitalize">
                          {r.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {[p?.specialty, p?.location].filter(Boolean).join(' · ')}
                        {p?.years_experience ? ` · ${p.years_experience} yrs experience` : ''}
                      </p>
                      {r.cover_letter && (
                        <p className="text-sm mt-3 whitespace-pre-line">{r.cover_letter}</p>
                      )}
                      {r.phone && (
                        <p className="text-sm mt-2">
                          Phone: <span className="font-medium">{r.phone}</span>
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        Applied {new Date(r.created_at).toLocaleDateString()}
                      </p>
                      <div className="mt-3 flex gap-3">
                        <Link to={`/u/${r.applicant_id}`} className="text-sm text-primary underline">
                          View profile
                        </Link>
                        {r.status === 'submitted' && (
                          <Button size="sm" variant="outline" onClick={() => markReviewed(r.id)}>
                            Mark reviewed
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default JobApplicants;
