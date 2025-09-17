import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';
import { MainContent } from '@/components/layout/MainContent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Star, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TestimonialSubmit = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    city: '',
    quote: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConsentChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, consent: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to our terms before submitting your testimonial.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // GA4 event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'testimonial_submitted', {
          role: formData.role,
          city: formData.city
        });
      }

      // Custom event for other analytics
      window.dispatchEvent(new CustomEvent('testimonial_submitted', {
        detail: { ...formData, timestamp: Date.now() }
      }));

      // HubSpot submission (using existing analytics helper)
      try {
        const { HubSpotCRM } = await import('@/lib/analytics/hubspot');
        const hubspot = HubSpotCRM.getInstance();
        
        await hubspot.upsertContact(`testimonial_${Date.now()}@temp.emvi.app`, {
          firstName: formData.name.split(' ')[0],
          lastName: formData.name.split(' ').slice(1).join(' ') || '',
          role: formData.role,
          city: formData.city,
        });
        
        await hubspot.trackEvent('testimonial_submitted', {
          role: formData.role,
          city: formData.city,
          quote_length: formData.quote.length,
          consent_given: formData.consent
        });
      } catch (hubspotError) {
        console.warn('HubSpot tracking failed:', hubspotError);
        // Continue with success even if HubSpot fails
      }

      setIsSubmitted(true);
      toast({
        title: "Thank You! 💜",
        description: "Your testimonial has been submitted for review. We appreciate you sharing your experience!"
      });

    } catch (error) {
      console.error('Testimonial submission error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your testimonial. Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <Helmet>
          <title>Thank You - Testimonial Submitted | EmviApp</title>
          <meta name="robots" content="noindex" />
        </Helmet>

        <MainContent className="max-w-2xl mx-auto px-4 py-12">
          <Card className="text-center border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="py-12">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Thank You for Your Testimonial! 
              </h1>
              
              <p className="text-lg text-gray-600 mb-6 max-w-lg mx-auto">
                Your experience matters to us and helps other beauty professionals 
                discover what makes EmviApp special.
              </p>
              
              <div className="bg-white/80 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">What Happens Next?</h3>
                <ul className="text-sm text-gray-600 space-y-2 text-left max-w-sm mx-auto">
                  <li>• Our team will review your testimonial</li>
                  <li>• We may reach out for permission to feature it</li>
                  <li>• Your feedback helps us improve EmviApp</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <Button 
                  asChild 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <a href="/">Return to EmviApp</a>
                </Button>
                
                <p className="text-sm text-gray-500">
                  Want to share more? Feel free to submit another testimonial anytime.
                </p>
              </div>
            </CardContent>
          </Card>
        </MainContent>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Share Your EmviApp Experience | Community Testimonials</title>
        <meta name="description" content="Help other beauty professionals by sharing your EmviApp experience. Your testimonial helps our community grow stronger." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.emvi.app/community/testimonials/submit" />
      </Helmet>

      <MainContent className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Share Your EmviApp Experience
          </h1>
          
          <p className="text-xl text-gray-600">
            Your story inspires other beauty professionals to join our growing community
          </p>
        </div>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-purple-50/30">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Tell Us Your Story</CardTitle>
            <CardDescription className="text-center">
              Help us showcase real experiences from real professionals
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium">
                    Professional Role <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="role"
                    name="role"
                    type="text"
                    required
                    value={formData.role}
                    onChange={handleInputChange}
                    placeholder="e.g. Nail Technician, Salon Owner"
                    className="focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium">
                  City & State <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g. Los Angeles, CA"
                  className="focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quote" className="text-sm font-medium">
                  Your EmviApp Experience <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="quote"
                  name="quote"
                  required
                  value={formData.quote}
                  onChange={handleInputChange}
                  placeholder="Share how EmviApp has helped your career, what you love about the platform, or advice for other professionals..."
                  className="min-h-[120px] focus:ring-2 focus:ring-purple-500"
                  maxLength={500}
                />
                <p className="text-sm text-gray-500 text-right">
                  {formData.quote.length}/500 characters
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={handleConsentChange}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label 
                      htmlFor="consent" 
                      className="text-sm leading-relaxed cursor-pointer"
                    >
                      I consent to EmviApp using my testimonial in marketing materials, 
                      website, and promotional content. I understand this submission does not 
                      guarantee publication. <span className="text-red-500">*</span>
                    </Label>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.consent}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Star className="w-4 h-4 mr-2" />
                      Submit Testimonial
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                By submitting, you agree to our terms and privacy policy. 
                We'll never share your contact information without permission.
              </p>
            </form>
          </CardContent>
        </Card>
      </MainContent>
    </Layout>
  );
};

export default TestimonialSubmit;