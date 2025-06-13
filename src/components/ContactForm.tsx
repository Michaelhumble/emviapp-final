
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Bug, Star, TrendingUp, MessageCircle, MoreHorizontal, User, Mail } from 'lucide-react';

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
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
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Name and Email Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <User className="h-4 w-4" />
              Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
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

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <Button 
            type="submit" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 text-base"
            size="lg"
          >
            📧 Send Message
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
