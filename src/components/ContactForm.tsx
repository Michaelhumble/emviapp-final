
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Lightbulb, Bug, Star, TrendingUp, MessageCircle, HelpCircle } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reasons = [
    {
      id: 'feature-idea',
      title: 'I Have a Feature Idea',
      description: 'Your vision matters. What should EmviApp do next?',
      icon: Lightbulb,
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      id: 'bug-report',
      title: 'I Found a Bug',
      description: "Help us squash it. We'll fix it faster than you expect.",
      icon: Bug,
      color: 'bg-red-50 border-red-200 hover:bg-red-100'
    },
    {
      id: 'review',
      title: 'I Want to Leave a Review',
      description: 'Love what we\'re building? Say it loud. Inspire others.',
      icon: Star,
      color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
    },
    {
      id: 'investor',
      title: "I'm an Investor",
      description: "Let's talk scale, equity, and revolutionizing the beauty industry.",
      icon: TrendingUp,
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    },
    {
      id: 'general',
      title: 'I Just Want to Say Something',
      description: 'A story. A thank-you. A whisper. We\'ll hear it.',
      icon: MessageCircle,
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      id: 'other',
      title: 'Other...',
      description: "Didn't see your reason? Doesn't matter. If it's on your heart, it belongs here.",
      icon: HelpCircle,
      color: 'bg-gray-50 border-gray-200 hover:bg-gray-100'
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReasonSelect = (reasonId: string) => {
    setFormData(prev => ({
      ...prev,
      reason: reasonId
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedReason = reasons.find(r => r.id === formData.reason);
      const reasonText = selectedReason ? selectedReason.title : 'General Inquiry';
      
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: `Reason: ${reasonText}\n\n${formData.message.trim()}`
        }
      });

      if (error) {
        throw error;
      }

      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '', reason: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-purple-600">
          <span className="text-xl">💌</span>
          <Label className="text-base font-medium">Choose a reason</Label>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((reason) => {
            const IconComponent = reason.icon;
            return (
              <button
                key={reason.id}
                type="button"
                onClick={() => handleReasonSelect(reason.id)}
                disabled={isSubmitting}
                className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                  formData.reason === reason.id 
                    ? 'border-purple-500 bg-purple-50 shadow-md' 
                    : reason.color
                }`}
              >
                <div className="flex items-start gap-3">
                  <IconComponent className={`h-5 w-5 mt-0.5 ${
                    formData.reason === reason.id ? 'text-purple-600' : 'text-gray-600'
                  }`} />
                  <div className="flex-1">
                    <h3 className={`font-medium text-sm mb-1 ${
                      formData.reason === reason.id ? 'text-purple-900' : 'text-gray-900'
                    }`}>
                      {reason.title}
                    </h3>
                    <p className={`text-xs ${
                      formData.reason === reason.id ? 'text-purple-700' : 'text-gray-600'
                    }`}>
                      {reason.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message">Your Message</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Share your thoughts, ideas, or feedback with us..."
          className="min-h-[120px] resize-none"
          required
          disabled={isSubmitting}
        />
        <div className="flex justify-end items-center gap-2 text-sm text-gray-500">
          <span>😊</span>
          <span>😍</span>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending Message...
          </>
        ) : (
          <>📨 Send Message →</>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;
