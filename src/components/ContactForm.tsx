
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Lightbulb, Bug, Star, TrendingUp, MessageCircle, MoreHorizontal } from 'lucide-react';

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
      id: 'feature-idea',
      title: 'I Have a Feature Idea',
      description: 'Your vision matters. What should EmviApp do next?',
      icon: Lightbulb,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-500'
    },
    {
      id: 'bug-report',
      title: 'I Found a Bug',
      description: 'Help us squash it. We\'ll fix it faster than you expect.',
      icon: Bug,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconColor: 'text-red-500'
    },
    {
      id: 'review',
      title: 'I Want to Leave a Review',
      description: 'Love what we\'re building? Say it loud. Inspire others.',
      icon: Star,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      iconColor: 'text-yellow-500'
    },
    {
      id: 'investor',
      title: 'I\'m an Investor',
      description: 'Let\'s talk scale, equity, and revolutionizing the beauty industry.',
      icon: TrendingUp,
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconColor: 'text-purple-500'
    },
    {
      id: 'say-something',
      title: 'I Just Want to Say Something',
      description: 'A story. A thank-you. A whisper. We\'ll hear it.',
      icon: MessageCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconColor: 'text-green-500'
    },
    {
      id: 'other',
      title: 'Other...',
      description: 'Didn\'t see your reason? Doesn\'t matter. If it\'s on your heart, it belongs here.',
      icon: MoreHorizontal,
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      iconColor: 'text-gray-500'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReasonSelect = (reasonId: string, reasonTitle: string) => {
    setFormData({
      ...formData,
      reason: reasonTitle
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.reason || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          message: `Reason: ${formData.reason}\n\nMessage: ${formData.message}`
        }
      });

      if (error) throw error;

      toast.success('Message sent successfully!', {
        description: 'Thank you for reaching out. We\'ll get back to you soon.'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        reason: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message', {
        description: 'Please try again or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Name and Email Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full"
            required
          />
        </div>
      </div>

      {/* Choose a Reason Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="text-pink-500 mr-2">🎯</span>
          Choose a reason
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((reason) => {
            const IconComponent = reason.icon;
            const isSelected = formData.reason === reason.title;
            
            return (
              <button
                key={reason.id}
                type="button"
                onClick={() => handleReasonSelect(reason.id, reason.title)}
                className={`p-4 border-2 rounded-xl text-left transition-all hover:shadow-md ${
                  isSelected 
                    ? `${reason.borderColor} ${reason.bgColor} ring-2 ring-blue-500 ring-opacity-50` 
                    : `${reason.borderColor} ${reason.bgColor} hover:${reason.borderColor}`
                }`}
              >
                <div className="flex items-start space-x-3">
                  <IconComponent className={`h-5 w-5 ${reason.iconColor} mt-0.5 flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">
                      {reason.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Your Message
        </label>
        <Textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Share your thoughts, ideas, or feedback with us..."
          value={formData.message}
          onChange={handleInputChange}
          className="w-full resize-none"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-medium"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </div>

      {/* Final Message */}
      <div className="text-center pt-8 border-t border-gray-200">
        <div className="mb-4 flex items-center justify-center">
          <span className="inline-block w-8 h-0.5 bg-gradient-to-r from-purple-600/50 to-blue-600/50 mr-2"></span>
          <span className="text-sm font-medium uppercase tracking-wider text-gray-500">Final Message</span>
          <span className="inline-block w-8 h-0.5 bg-gradient-to-r from-blue-600/50 to-purple-600/50 ml-2"></span>
        </div>
        <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
          We read every message. Your words guide EmviApp's growth.
          Together, we'll make something unforgettable.
        </p>
        
        <div className="py-4 px-4 mx-auto max-w-md">
          <p className="text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent">
            "This project wouldn't exist without Sunshine." ☀️
          </p>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
