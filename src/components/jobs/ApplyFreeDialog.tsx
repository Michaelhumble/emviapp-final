import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { track } from '@/lib/telemetry';
import {
  ApplicationDraft,
  emptyApplicationDraft,
  loadApplicationDraft,
  saveApplicationDraft,
  clearApplicationDraft,
  markPendingApplication,
} from '@/lib/jobs/applicationDraft';

interface ApplyFreeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: string;
  jobTitle: string;
}

const ApplyFreeDialog: React.FC<ApplyFreeDialogProps> = ({ open, onOpenChange, jobId, jobTitle }) => {
  const { user, isSignedIn } = useAuth();
  const [draft, setDraft] = useState<ApplicationDraft>(
    () => loadApplicationDraft(jobId) ?? emptyApplicationDraft(jobId)
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [startedTracked, setStartedTracked] = useState(false);

  useEffect(() => {
    if (!open) return;
    track('application_started', { job_id: jobId, authed: !!isSignedIn });
    setStartedTracked(true);
  }, [open, jobId, isSignedIn]);

  // Persist the draft as it is typed (client-side only).
  useEffect(() => {
    if (submitted) return;
    saveApplicationDraft(draft);
  }, [draft, submitted]);

  // Check for an existing application once signed in.
  useEffect(() => {
    const check = async () => {
      if (!open || !isSignedIn || !user?.id) return;
      const { data } = await (supabase as any)
        .from('job_applications')
        .select('id')
        .eq('job_id', jobId)
        .eq('applicant_id', user.id)
        .maybeSingle();
      if (data) setAlreadyApplied(true);
    };
    check();
  }, [open, isSignedIn, user?.id, jobId]);

  const update = (key: 'message' | 'phone', value: string) => {
    if (!startedTracked) {
      track('application_started', { job_id: jobId, authed: !!isSignedIn });
      setStartedTracked(true);
    }
    setDraft((d) => ({ ...d, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!isSignedIn || !user?.id) {
      markPendingApplication(jobId);
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await (supabase as any).from('job_applications').insert({
        job_id: jobId,
        applicant_id: user.id,
        cover_letter: draft.message.trim() || null,
        phone: draft.phone.trim() || null,
        status: 'submitted',
      });

      if (error) {
        if ((error as any).code === '23505') {
          setAlreadyApplied(true);
          return;
        }
        throw error;
      }

      clearApplicationDraft(jobId);
      setSubmitted(true);
      track('application_submitted', { job_id: jobId });
    } catch (e: any) {
      console.error('[apply] failed', e);
      toast.error(e?.message || 'Could not send your application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const signInHref = `/signin?redirect=${encodeURIComponent(`/jobs/${jobId}`)}`;
  const signUpHref = `/signup?redirect=${encodeURIComponent(`/jobs/${jobId}`)}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{submitted ? 'Application sent' : 'Apply Free'}</DialogTitle>
          <DialogDescription>
            {submitted ? jobTitle : `${jobTitle} — takes less than a minute. Always free.`}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="space-y-4">
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                Your application was sent to the salon. They can see your profile and message.
              </AlertDescription>
            </Alert>
            <Button asChild className="w-full">
              <Link to="/my-applications">View my applications</Link>
            </Button>
          </div>
        ) : alreadyApplied ? (
          <div className="space-y-4">
            <Alert>
              <AlertDescription>You already applied to this job.</AlertDescription>
            </Alert>
            <Button asChild variant="outline" className="w-full">
              <Link to="/my-applications">View my applications</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apply-message">Short message to the salon</Label>
              <Textarea
                id="apply-message"
                rows={4}
                placeholder="Hi! I have 3 years of nail experience and I'm available to start next week."
                value={draft.message}
                onChange={(e) => update('message', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apply-phone">Phone (optional — shared with this salon only)</Label>
              <Input
                id="apply-phone"
                inputMode="tel"
                placeholder="(555) 123-4567"
                value={draft.phone}
                onChange={(e) => update('phone', e.target.value)}
              />
            </div>

            {isSignedIn ? (
              <Button className="w-full" onClick={handleSubmit} disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  'Send application — Free'
                )}
              </Button>
            ) : (
              <div className="space-y-3">
                <Alert>
                  <AlertDescription>
                    Create a free account to send your application. Your message is saved and will be
                    here when you come back.
                  </AlertDescription>
                </Alert>
                <div className="flex gap-2">
                  <Button asChild className="flex-1" onClick={() => markPendingApplication(jobId)}>
                    <a href={signUpHref}>Create free account</a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1"
                    onClick={() => markPendingApplication(jobId)}
                  >
                    <a href={signInHref}>Sign in</a>
                  </Button>
                </div>
              </div>
            )}
            <p className="text-xs text-muted-foreground text-center">
              Applying is free. EmviApp never charges workers.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApplyFreeDialog;
