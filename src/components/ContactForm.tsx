
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Bug, Star, TrendingUp, MessageCircle, MoreHorizontal, User, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { analytics } from '@/lib/analytics';
import { ContactConversionTracker } from '@/components/analytics/ConversionTracking';

interface ContactReason {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const contactReasons: ContactReason[] = [
  {
    id: 'feature',
    title: 'I Have a Feature Idea',
    description: 'Your vision matters. What should EmviApp do next?',
    icon: <Lightbulb className="h-6 w-6" />,
    color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
  },
  {
    id: 'bug',
    title: 'I Found a Bug',
    description: "Help us squash it. We'll fix it faster than you expect.",
    icon: <Bug className="h-6 w-6 text-red-500" />,
    color: 'bg-red-50 border-red-200 hover:bg-red-100'
  },
  {
    id: 'review',
    title: 'I Want to Leave a Review',
    description: "Love what we're building? Say it loud. Inspire others.",
    icon: <Star className="h-6 w-6 text-yellow-500" />,
    color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
  },
  {
    id: 'investor',
    title: "I'm an Investor",
    description: "Let's talk scale, equity, and revolutionizing the beauty industry.",
    icon: <TrendingUp className="h-6 w-6 text-purple-500" />,
    color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
  },
  {
    id: 'something',
    title: 'I Just Want to Say Something',
    description: "A story. A thank-you. A whisper. We'll hear it.",
    icon: <MessageCircle className="h-6 w-6 text-green-500" />,
    color: 'bg-green-50 border-green-200 hover:bg-green-100'
  },
  {
    id: 'other',
    title: 'Other...',
    description: "Didn't see your reason? Doesn't matter. If it's on your heart, it belongs here.",
    icon: <MoreHorizontal className="h-6 w-6 text-gray-500" />,
    color: 'bg-gray-50 border-gray-200 hover:bg-gray-100'
  }
];

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    company: '',
    reason: '',
    message: '',
    honeypot: '' // Spam protection
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstname || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Honeypot spam protection
    if (formData.honeypot) {
      return; // Silent fail for bots
    }

    setIsSubmitting(true);

    try {
      // Get the selected reason title for the email
      const selectedReason = contactReasons.find(r => r.id === formData.reason);
      const reasonText = selectedReason ? selectedReason.title : 'General Inquiry';
      
      // Prepare the message with reason context
      const fullMessage = `Contact Reason: ${reasonText}\n\n${formData.message}`;

      // Call the edge function
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: fullMessage,
          currentUrl: window.location.href,
          userAgent: navigator.userAgent
        }
      });

      if (error) {
        console.error('Error sending contact email:', error);
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Store in database for tracking
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert({
          name: `${formData.firstname} ${formData.lastname}`.trim(),
          email: formData.email,
          message: fullMessage,
          status: 'new'
        } as any); // Type assertion to bypass schema mismatch

      if (dbError) {
        console.error('Error storing contact message:', dbError);
        // Don't show error to user as email was sent successfully
      }

      // Success feedback with analytics tracking
      const submissionTimestamp = Date.now().toString();
      setSubmissionId(submissionTimestamp);
      
      // Track conversion with GA4
      analytics.trackContactSubmission(reasonText, 'contact_page');
      
      // Redirect to thank you page
      window.location.href = '/thank-you?source=contact';

    } catch (error) {
      console.error('Contact form submission error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReasonSelect = (reasonId: string) => {
    setFormData({
      ...formData,
      reason: reasonId
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form name="Contact EmviApp" onSubmit={handleSubmit} className="space-y-8">
        {/* Contact Information Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="firstname" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <User className="h-4 w-4" />
              First Name
            </label>
            <Input
              id="firstname"
              name="firstname"
              type="text"
              placeholder="First name"
              value={formData.firstname}
              onChange={handleChange}
              required
              className="w-full h-12"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastname" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <User className="h-4 w-4" />
              Last Name
            </label>
            <Input
              id="lastname"
              name="lastname"
              type="text"
              placeholder="Last name"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full h-12"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full h-12"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Phone (Optional)
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={handleChange}
              className="w-full h-12"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="company" className="text-sm font-medium text-gray-700">
              Company (Optional)
            </label>
            <Input
              id="company"
              name="company"
              type="text"
              placeholder="Your company"
              value={formData.company}
              onChange={handleChange}
              className="w-full h-12"
            />
          </div>
        </div>

        {/* Honeypot field - hidden from users */}
        <div style={{ display: 'none' }}>
          <Input
            name="honeypot"
            type="text"
            value={formData.honeypot}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Choose a Reason Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm">
              😊
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Choose a reason</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contactReasons.map((reason) => (
              <Card
                key={reason.id}
                className={`cursor-pointer transition-all duration-200 border-2 ${
                  formData.reason === reason.id
                    ? 'border-purple-500 bg-purple-50 shadow-md'
                    : reason.color
                }`}
                onClick={() => handleReasonSelect(reason.id)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-start space-y-3">
                    <div className="flex items-center gap-3">
                      {reason.icon}
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {reason.title}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Message Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Your Message</h3>
          <Textarea
            id="message"
            name="message"
            placeholder="Share your thoughts, ideas, or feedback with us..."
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full resize-none text-base"
          />
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-8 text-center shadow-lg">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <CheckCircle className="h-16 w-16 text-green-500 animate-bounce" />
                <div className="absolute -top-1 -right-1 h-6 w-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs">
                  ✨
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-green-800 mb-3">
              Message Sent Successfully! 🎉
            </h3>
            <p className="text-green-700 text-lg mb-4">
              Thank you for reaching out. We've received your message and will get back to you within 24 hours.
            </p>
            <div className="bg-white/50 rounded-lg p-4 mt-4">
              <p className="text-sm text-green-600 font-medium">
                💌 Your message has been delivered to support@emvi.app
              </p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <Button 
            type="submit" 
            disabled={isSubmitting || isSubmitted}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 text-base"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : isSubmitted ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Sent!
              </>
            ) : (
              <>
                📧 Send Message
              </>
            )}
          </Button>
        </div>
        
        {/* Analytics Conversion Tracking */}
        {isSubmitted && submissionId && (
          <ContactConversionTracker 
            formType={contactReasons.find(r => r.id === formData.reason)?.title || 'General Inquiry'} 
            source="contact_page" 
          />
        )}
      </form>
    </div>
  );
};

export default ContactForm;
