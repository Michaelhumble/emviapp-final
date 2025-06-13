
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Lightbulb, Bug, Star, DollarSign, MessageCircle, MoreHorizontal, Send } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reasons = [
    {
      id: 'feature',
      title: 'I Have a Feature Idea',
      description: 'Your vision matters. What should EmviApp do next?',
      icon: Lightbulb,
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      id: 'bug',
      title: 'I Found a Bug',
      description: "Help us squash it. We'll fix it faster than you expect.",
      icon: Bug,
      color: 'bg-red-50 border-red-200 hover:bg-red-100'
    },
    {
      id: 'review',
      title: 'I Want to Leave a Review',
      description: "Love what we're building? Say it loud. Inspire others.",
      icon: Star,
      color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
    },
    {
      id: 'investor',
      title: "I'm an Investor",
      description: "Let's talk scale, equity, and revolutionizing the beauty industry.",
      icon: DollarSign,
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    },
    {
      id: 'general',
      title: 'I Just Want to Say Something',
      description: "A story. A thank-you. A whisper. We'll hear it.",
      icon: MessageCircle,
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      id: 'other',
      title: 'Other...',
      description: "Didn't see your reason? Doesn't matter. If it's on your heart, it belongs here.",
      icon: MoreHorizontal,
      color: 'bg-gray-50 border-gray-200 hover:bg-gray-100'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReasonSelect = (reasonId: string) => {
    setFormData(prev => ({ ...prev, reason: reasonId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          reason: formData.reason
        }
      });

      if (error) throw error;

      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', reason: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name and Email Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full"
          />
        </div>
      </div>

      {/* Choose a Reason Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-purple-600">🎯</span>
          <h3 className="text-lg font-semibold text-gray-900">Choose a reason</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <Card
                key={reason.id}
                className={`cursor-pointer transition-all duration-200 ${reason.color} ${
                  formData.reason === reason.id 
                    ? 'ring-2 ring-purple-500 border-purple-300' 
                    : 'border-gray-200'
                }`}
                onClick={() => handleReasonSelect(reason.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm mb-1">
                        {reason.title}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Your Message
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Share your thoughts, ideas, or feedback with us..."
          value={formData.message}
          onChange={handleInputChange}
          required
          className="min-h-[120px] resize-none border-purple-200 focus:border-purple-400 focus:ring-purple-400"
        />
        <div className="flex justify-end mt-2">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>😊</span>
            <span>😍</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
      >
        <Send className="h-4 w-4" />
        {isSubmitting ? 'Sending Message...' : 'Send Message'}
      </Button>
    </form>
  );
};

export default ContactForm;
