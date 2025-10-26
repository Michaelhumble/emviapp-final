import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Bell, CheckCircle2, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CALCULATOR_ROLES, CALCULATOR_CITIES } from '@/data/salary-calculator-data';

export default function JobAlerts() {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(searchParams.get('role') || '');
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !role || !city) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all fields.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('job_alerts')
        .insert({
          email,
          role,
          city
        });

      if (error) throw error;

      setIsSuccess(true);
    } catch (error: any) {
      console.error('Error creating job alert:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create job alert. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Job Alerts - EmviApp",
    "description": "Get notified when new beauty jobs matching your criteria are posted on EmviApp.",
    "url": "https://www.emvi.app/job-alerts",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.emvi.app"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Job Alerts",
          "item": "https://www.emvi.app/job-alerts"
        }
      ]
    }
  };

  if (isSuccess) {
    return (
      <>
        <Helmet>
          <title>Job Alert Created | EmviApp</title>
          <meta name="robots" content="noindex" />
        </Helmet>

        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-8 text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 mx-auto">
              <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">You're All Set!</h1>
              <p className="text-muted-foreground">
                We'll notify you at <span className="font-medium text-foreground">{email}</span> when new {role} jobs are posted in {city}.
              </p>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
              <p>📧 One-click unsubscribe in every email.</p>
            </div>

            <div className="space-y-3 pt-4">
              <Button asChild className="w-full" size="lg">
                <Link to="/jobs">Browse Jobs Now</Link>
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
        <title>Job Alerts | EmviApp - Get Notified of New Beauty Jobs</title>
        <meta name="description" content="Sign up for job alerts and get notified when new beauty industry positions matching your criteria are posted on EmviApp." />
        <link rel="canonical" href="https://www.emvi.app/job-alerts" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Bell className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Never Miss a Job Opportunity
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Get instant email alerts when new beauty jobs matching your criteria are posted. Stay ahead of the competition.
            </p>
          </div>

          {/* Form Card */}
          <Card className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">
                  Role <span className="text-destructive">*</span>
                </Label>
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {CALCULATOR_ROLES.map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">
                  City <span className="text-destructive">*</span>
                </Label>
                <Select value={city} onValueChange={setCity} required>
                  <SelectTrigger id="city">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {CALCULATOR_CITIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground space-y-2">
                <p className="font-medium text-foreground">What to expect:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Instant notifications when matching jobs are posted</li>
                  <li>No spam - only relevant job alerts</li>
                  <li>One-click unsubscribe in every email</li>
                  <li>Manage your alerts anytime</li>
                </ul>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Alert...' : 'Get Job Alerts'}
              </Button>
            </form>
          </Card>

          {/* Info Section */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              By signing up, you agree to receive job alerts from EmviApp.
              <br />
              You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
