import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function JobAlertsUnsubscribe() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const role = searchParams.get('role');
  const city = searchParams.get('city');
  
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleUnsubscribe = async () => {
    if (!email) {
      setError('Email address is required');
      return;
    }

    setIsUnsubscribing(true);
    setError('');

    try {
      let query = supabase
        .from('job_alerts')
        .delete()
        .eq('email', email);

      if (role) query = query.eq('role', role);
      if (city) query = query.eq('city', city);

      const { error: deleteError } = await query;

      if (deleteError) throw deleteError;

      setIsSuccess(true);
    } catch (err: any) {
      console.error('Error unsubscribing:', err);
      setError(err.message || 'Failed to unsubscribe. Please try again.');
    } finally {
      setIsUnsubscribing(false);
    }
  };

  if (!email) {
    return (
      <>
        <Helmet>
          <title>Unsubscribe | EmviApp</title>
          <meta name="robots" content="noindex" />
        </Helmet>

        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-8 text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mx-auto">
              <X className="w-8 h-8 text-destructive" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Invalid Link</h1>
              <p className="text-muted-foreground">
                This unsubscribe link is not valid. Please use the link from your email.
              </p>
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link to="/">Back to Home</Link>
            </Button>
          </Card>
        </div>
      </>
    );
  }

  if (isSuccess) {
    return (
      <>
        <Helmet>
          <title>Unsubscribed | EmviApp</title>
          <meta name="robots" content="noindex" />
        </Helmet>

        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-8 text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 mx-auto">
              <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Successfully Unsubscribed</h1>
              <p className="text-muted-foreground">
                You have been removed from job alerts for:
              </p>
              <div className="p-4 bg-muted/50 rounded-lg text-sm">
                <p><strong>Email:</strong> {email}</p>
                {role && <p><strong>Role:</strong> {role}</p>}
                {city && <p><strong>City:</strong> {city}</p>}
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              You will no longer receive job alerts for this criteria. You can always sign up again if you change your mind.
            </p>

            <div className="space-y-3 pt-4">
              <Button asChild className="w-full" size="lg">
                <Link to="/jobs">Browse Jobs</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Unsubscribe from Job Alerts | EmviApp</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Unsubscribe from Job Alerts</h1>
            <p className="text-muted-foreground">
              We're sorry to see you go. You're about to unsubscribe from:
            </p>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg text-sm space-y-1">
            <p><strong>Email:</strong> {email}</p>
            {role && <p><strong>Role:</strong> {role}</p>}
            {city && <p><strong>City:</strong> {city}</p>}
          </div>

          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <Button 
              onClick={handleUnsubscribe}
              variant="destructive"
              className="w-full" 
              size="lg"
              disabled={isUnsubscribing}
            >
              {isUnsubscribing ? 'Unsubscribing...' : 'Confirm Unsubscribe'}
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/">Cancel</Link>
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
