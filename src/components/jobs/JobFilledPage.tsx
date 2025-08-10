import React, { useEffect, useMemo, useState } from 'react';
import { Job } from '@/types/job';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { RELATED_JOBS_COUNT, SITE_BASE_URL } from '@/config/seo';

interface JobFilledPageProps {
  job: Job;
}

const JobFilledPage: React.FC<JobFilledPageProps> = ({ job }) => {
  const [related, setRelated] = useState<Job[]>([]);
  const city = useMemo(() => (job.location || '').split(',')[0]?.trim() || '', [job.location]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('id, title, location, category, created_at, status')
          .eq('status', 'active')
          .limit(RELATED_JOBS_COUNT)
          .order('created_at', { ascending: false })
          .or(`category.eq.${job.category},location.ilike.%${city}%`);
        if (error) throw error;
        setRelated(data || []);
      } catch (e) {
        console.warn('Related jobs fetch failed', e);
      }
    };
    fetchRelated();
  }, [job.category, city]);

  return (
    <section className="container mx-auto py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-semibold">This job has been filled</h1>
        <p className="mt-3 opacity-80">
          Great news for them—great news for you. Here are similar openings in {city || job.location || 'your area'}.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {related.map((r) => (
          <Card key={r.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <a href={`${SITE_BASE_URL}/jobs/${r.id}`} className="block">
                <h3 className="font-medium line-clamp-2">{r.title}</h3>
                <p className="mt-2 text-sm opacity-70">{r.location || 'United States'}</p>
                <div className="mt-4">
                  <Button variant="secondary" size="sm">View</Button>
                </div>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default JobFilledPage;
