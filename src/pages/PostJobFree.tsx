import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { track } from '@/lib/telemetry';
import {
  JobDraft,
  emptyJobDraft,
  loadJobDraft,
  saveJobDraft,
  clearJobDraft,
} from '@/lib/jobs/jobDraft';

const CATEGORIES = [
  'Nail Tech',
  'Hair Stylist',
  'Barber',
  'Lash Tech',
  'Esthetician',
  'Makeup Artist',
  'Massage',
  'Tattoo',
  'Receptionist',
  'Other',
];

const EMPLOYMENT_TYPES = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Booth rent / Contract' },
  { value: 'flexible', label: 'Flexible' },
];

const PostJobFree: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isSignedIn, loading: authLoading } = useAuth();

  const [draft, setDraft] = useState<JobDraft>(() => loadJobDraft() ?? emptyJobDraft);
  const [publishing, setPublishing] = useState(false);
  const [needsAccount, setNeedsAccount] = useState(false);
  const [published, setPublished] = useState<{ id: string; title: string } | null>(null);
  const [startedTracked, setStartedTracked] = useState(false);

  // Prefill category from /post-job/nails
  useEffect(() => {
    if (location.pathname.includes('/nails') && !draft.category) {
      setDraft((d) => ({ ...d, category: 'Nail Tech' }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Persist the draft as it is typed (client-side only).
  useEffect(() => {
    if (published) return;
    saveJobDraft(draft);
  }, [draft, published]);

  const update = (key: keyof JobDraft, value: string) => {
    if (!startedTracked) {
      track('job_post_started', { authed: !!isSignedIn });
      setStartedTracked(true);
    }
    setDraft((d) => ({ ...d, [key]: value }));
  };

  const missing = useMemo(() => {
    const m: string[] = [];
    if (!draft.title.trim()) m.push('Job title');
    if (!draft.category) m.push('Specialty');
    if (!draft.salonName.trim()) m.push('Salon name');
    if (!draft.location.trim()) m.push('City / location');
    if (draft.description.trim().length < 20) m.push('Job description (at least 20 characters)');
    return m;
  }, [draft]);

  const publish = async () => {
    if (missing.length) {
      toast.error(`Please add: ${missing.join(', ')}`);
      return;
    }
    track('job_post_completed', { authed: !!isSignedIn });

    if (!isSignedIn || !user) {
      saveJobDraft(draft);
      setNeedsAccount(true);
      return;
    }

    setPublishing(true);
    try {
      const { data, error } = await supabase
        .from('jobs')
        .insert({
          title: draft.title.trim(),
          category: draft.category,
          location: draft.location.trim(),
          description: draft.description.trim(),
          vietnamese_description: draft.vietnameseDescription.trim() || null,
          compensation_type: 'negotiable',
          compensation_details: draft.compensationDetails.trim() || null,
          user_id: user.id,
          contact_info: {
            owner_name: draft.contactName.trim() || null,
            phone: draft.contactPhone.trim() || null,
            email: draft.contactEmail.trim() || null,
            salon_name: draft.salonName.trim(),
          },
          metadata: {
            salon_name: draft.salonName.trim(),
            employment_type: draft.employmentType,
          },
        })
        .select('id, title')
        .single();

      if (error) throw error;

      track('free_job_published', { job_id: data.id });
      clearJobDraft();
      setPublished({ id: data.id, title: data.title });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Failed to publish job', err);
      toast.error(err?.message || 'Could not publish your job. Please try again.');
    } finally {
      setPublishing(false);
    }
  };

  // When the visitor comes back signed in, keep them on their draft.
  useEffect(() => {
    if (isSignedIn) setNeedsAccount(false);
  }, [isSignedIn]);

  const authHref = (path: string) =>
    `${path}?redirect=${encodeURIComponent(location.pathname)}`;

  if (published) {
    return (
      <Layout>
        <Helmet>
          <title>Your job is live | EmviApp</title>
          <meta name="robots" content="noindex,follow" />
        </Helmet>
        <div className="container max-w-2xl mx-auto py-16 px-4">
          <Card className="text-center">
            <CardContent className="p-10 space-y-6">
              <CheckCircle2 className="h-14 w-14 text-emerald-500 mx-auto" />
              <div>
                <h1 className="text-3xl font-semibold mb-2">Your job is live!</h1>
                <p className="text-muted-foreground">{published.title}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={() => navigate(`/jobs/${published.id}`)}>View job</Button>
                <Button variant="outline" onClick={() => navigate('/my-jobs')}>
                  Manage my jobs
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setPublished(null);
                    setDraft(emptyJobDraft);
                    clearJobDraft();
                  }}
                >
                  Post another job
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Post a Job — Free | EmviApp</title>
        <meta
          name="description"
          content="Post a beauty industry job for free on EmviApp. No payment, no credit card — reach nail techs, hair stylists, barbers and estheticians."
        />
      </Helmet>

      <div className="container max-w-2xl mx-auto py-10 px-4">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-3">
            <Sparkles className="h-4 w-4" /> Free during our growth stage
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-2">Post a Job — Free</h1>
          <p className="text-muted-foreground">
            Takes about two minutes. No payment, no credit card. You only need an account when
            you publish.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Job details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Position / job title *</Label>
              <Input
                id="title"
                value={draft.title}
                onChange={(e) => update('title', e.target.value)}
                placeholder="Nail Technician"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Specialty *</Label>
                <Select value={draft.category} onValueChange={(v) => update('category', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Schedule</Label>
                <Select
                  value={draft.employmentType}
                  onValueChange={(v) => update('employmentType', v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {EMPLOYMENT_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="salon">Salon / business name *</Label>
                <Input
                  id="salon"
                  value={draft.salonName}
                  onChange={(e) => update('salonName', e.target.value)}
                  placeholder="Magic Nails"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">City / location *</Label>
                <Input
                  id="location"
                  value={draft.location}
                  onChange={(e) => update('location', e.target.value)}
                  placeholder="Houston, TX"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pay">Pay</Label>
              <Input
                id="pay"
                value={draft.compensationDetails}
                onChange={(e) => update('compensationDetails', e.target.value)}
                placeholder="$1,200–$1,800/week, tips daily"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job description *</Label>
              <Textarea
                id="description"
                rows={6}
                value={draft.description}
                onChange={(e) => update('description', e.target.value)}
                placeholder="What the job involves, who you're looking for, salon atmosphere…"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vi">Mô tả tiếng Việt (optional)</Label>
              <Textarea
                id="vi"
                rows={4}
                value={draft.vietnameseDescription}
                onChange={(e) => update('vietnameseDescription', e.target.value)}
                placeholder="Tiệm cần thợ nails…"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">How candidates reach you</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="text-sm text-muted-foreground">
              Kept private. Your phone and email are never exposed to anonymous visitors.
            </p>
            <div className="grid gap-5 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="cname">Contact name</Label>
                <Input
                  id="cname"
                  value={draft.contactName}
                  onChange={(e) => update('contactName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cphone">Phone</Label>
                <Input
                  id="cphone"
                  value={draft.contactPhone}
                  onChange={(e) => update('contactPhone', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cemail">Email</Label>
                <Input
                  id="cemail"
                  type="email"
                  value={draft.contactEmail}
                  onChange={(e) => update('contactEmail', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {needsAccount && (
          <Alert className="mt-6">
            <AlertDescription className="space-y-3">
              <p className="font-medium">Your job is ready. Create a free account to publish it.</p>
              <p className="text-sm text-muted-foreground">
                Your draft is saved — you'll come right back to it.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild>
                  <Link to={authHref('/signup')}>Create free account</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to={authHref('/signin')}>I already have an account</Link>
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={publish}
            disabled={publishing || authLoading}
          >
            {publishing && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Publish job — Free
          </Button>
          <span className="text-sm text-muted-foreground">
            No payment, no credit card, no subscription.
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default PostJobFree;
