
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  Lightbulb, Bug, Star, Brain, MessageSquare, HelpCircle, Mail, ArrowRight 
} from 'lucide-react';

// Define contact form schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Please enter your name' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  category: z.string().min(1, { message: 'Please select a category' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      category: '',
      message: '',
    },
  });
  
  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call (replace with your actual submission logic)
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', values);
      toast.success('Thank you for your message! We'll get back to you soon.', {
        duration: 5000,
      });
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    'feature': <Lightbulb className="w-5 h-5" />,
    'bug': <Bug className="w-5 h-5" />,
    'review': <Star className="w-5 h-5" />,
    'investor': <Brain className="w-5 h-5" />,
    'general': <MessageSquare className="w-5 h-5" />,
    'other': <HelpCircle className="w-5 h-5" />,
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your name" 
                      className="border-gray-300 focus:border-primary" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="your.email@example.com" 
                      type="email"
                      className="border-gray-300 focus:border-primary" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">🔮 Choose a reason</FormLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md flex flex-col ${
                      field.value === 'feature' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:border-primary/50'
                    }`}
                    onClick={() => form.setValue('category', 'feature')}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-blue-100 p-2 rounded-md text-blue-600">
                        <Lightbulb className="w-5 h-5" />
                      </div>
                      <h3 className="font-medium">I Have a Feature Idea</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Your vision matters. What should EmviApp do next?</p>
                  </div>

                  <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md flex flex-col ${
                      field.value === 'bug' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:border-primary/50'
                    }`}
                    onClick={() => form.setValue('category', 'bug')}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-red-100 p-2 rounded-md text-red-600">
                        <Bug className="w-5 h-5" />
                      </div>
                      <h3 className="font-medium">I Found a Bug</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Help us squash it. We'll fix it faster than you expect.</p>
                  </div>

                  <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md flex flex-col ${
                      field.value === 'review' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:border-primary/50'
                    }`}
                    onClick={() => form.setValue('category', 'review')}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-yellow-100 p-2 rounded-md text-yellow-600">
                        <Star className="w-5 h-5" />
                      </div>
                      <h3 className="font-medium">I Want to Leave a Review</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Love what we're building? Say it loud. Inspire others.</p>
                  </div>

                  <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md flex flex-col ${
                      field.value === 'investor' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:border-primary/50'
                    }`}
                    onClick={() => form.setValue('category', 'investor')}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-purple-100 p-2 rounded-md text-purple-600">
                        <Brain className="w-5 h-5" />
                      </div>
                      <h3 className="font-medium">I'm an Investor</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Let's talk scale, equity, and revolutionizing the beauty industry.</p>
                  </div>

                  <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md flex flex-col ${
                      field.value === 'general' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:border-primary/50'
                    }`}
                    onClick={() => form.setValue('category', 'general')}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-green-100 p-2 rounded-md text-green-600">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <h3 className="font-medium">I Just Want to Say Something</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">A story. A thank-you. A whisper. We'll hear it.</p>
                  </div>

                  <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md flex flex-col ${
                      field.value === 'other' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:border-primary/50'
                    }`}
                    onClick={() => form.setValue('category', 'other')}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-gray-100 p-2 rounded-md text-gray-600">
                        <HelpCircle className="w-5 h-5" />
                      </div>
                      <h3 className="font-medium">Other...</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Didn't see your reason? Doesn't matter. If it's on your heart, it belongs here.</p>
                  </div>
                </div>
                <input 
                  type="hidden" 
                  {...field} 
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Your Message</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Share your thoughts, ideas, or feedback with us..." 
                    className="min-h-[150px] border-gray-300 focus:border-primary" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
