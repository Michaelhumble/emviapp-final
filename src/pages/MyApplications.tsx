import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';

interface ApplicationRow {
  id: string;
  job_id: string;
  status: string;
  created_at: string;
  cover_letter: string | null;
  jobs?: { title: string | null; location: string | null; category: string | null } | null;
}

const MyApplications: React.FC = () => {
  const { user, isSignedIn } = useAuth();
  const [rows, setRows] = useState<ApplicationRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      const { data, error } = await (supabase as any)
        .from('job_applications')
        .select('id, job_id, status, created_at, cover_letter, jobs(title, location, category)')
        .eq('applicant_id', user.id)
        .order('created_at', { ascending: false });
      if (error) console.error('[my-applications]', error);
      setRows((data as ApplicationRow[]) || []);
      setLoading(false);
    };
    load();
  }, [user?.id]);

  return (
    <Layout>
      <Helmet>
        <title>My Applications | EmviApp</title>
        <meta name="robots" content="noindex,follow" />
      </Helmet>
      <div className="container mx-auto py-8 px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">My Applications</h1>

        {!isSignedIn ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Sign in to see the jobs you applied to.</p>
            <a href="/signin?redirect=%2Fmy-applications" className="text-primary underline">
              Sign in
            </a>
          </div>
        ) : loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading…</div>
        ) : rows.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">You haven't applied to any jobs yet.</p>
            <Link to="/jobs" className="text-primary underline">
              Browse jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {rows.map((r) => (
              <div key={r.id} className="bg-card p-5 rounded-lg border">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h2 className="text-lg font-semibold">{r.jobs?.title || 'Job'}</h2>
                    <p className="text-sm text-muted-foreground">{r.jobs?.location}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Applied {new Date(r.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="capitalize">
                      {r.status}
                    </Badge>
                    <Link to={`/jobs/${r.job_id}`} className="text-primary underline text-sm">
                      View job
                    </Link>
                  </div>
                </div>
                {r.cover_letter && (
                  <p className="text-sm text-muted-foreground mt-3 whitespace-pre-line">
                    {r.cover_letter}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyApplications;
