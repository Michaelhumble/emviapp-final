import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { sanitizeUserInput, isValidEmail, auditUserAction } from '@/utils/security';
import { useSecurityContext } from '@/components/security/SecurityProvider';

interface SecurityContactFormProps {
  type: 'security' | 'privacy' | 'general';
}

const SecurityContactForm: React.FC<SecurityContactFormProps> = ({ type }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const { toast } = useToast();
  const { checkRateLimit } = useSecurityContext();

  const getEmailAddress = () => {
    switch (type) {
      case 'security':
        return 'security@emvi.app';
      case 'privacy':
        return 'privacy@emvi.app';
      default:
        return 'support@emvi.app';
    }
  };

  const getFormTitle = () => {
    switch (type) {
      case 'security':
        return 'Security Issue Report';
      case 'privacy':
        return 'Privacy Inquiry';
      default:
        return 'General Support';
    }
  };

  const handleInputChange = (field: string, value: string) => {
    const sanitizedValue = sanitizeUserInput(value);
    setFormData(prev => ({
      ...prev,
      [field]: sanitizedValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    const rateLimitPassed = await checkRateLimit('contact-form');
    if (!rateLimitPassed) {
      toast({
        title: "Rate Limit Exceeded",
        description: "Please wait before submitting another message.",
        variant: "destructive"
      });
      return;
    }

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real implementation, this would send an email
      // For now, we'll just log the audit action
      await auditUserAction(
        'contact_form_submitted',
        'contact',
        undefined,
        {
          type,
          email_to: getEmailAddress(),
          subject: formData.subject || getFormTitle()
        }
      );

      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Message Sent",
        description: `Your ${type} inquiry has been sent successfully. We'll respond within 24 hours.`,
        variant: "default"
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error('Contact form submission error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">{getFormTitle()}</h3>
      <p className="text-sm text-gray-600 mb-4">
        Send to: <a href={`mailto:${getEmailAddress()}`} className="text-primary hover:underline">
          {getEmailAddress()}
        </a>
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
        </div>
        
        <div>
          <Input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </div>
        
        <div>
          <Input
            placeholder="Subject (optional)"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
          />
        </div>
        
        <div>
          <Textarea
            placeholder="Your message..."
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={4}
            required
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
      
      {type === 'security' && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm">
          <strong>Security Notice:</strong> If you've discovered a security vulnerability, 
          please include steps to reproduce and any relevant technical details.
        </div>
      )}
    </div>
  );
};

export default SecurityContactForm;