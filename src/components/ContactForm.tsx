
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { useToast } from "@/components/ui/use-toast";
import { Lightbulb, Bug, Brain, Star, Volume2, HelpCircle } from "lucide-react";

interface CategoryOption {
  id: string;
  icon: React.ReactNode;
  label: string;
}

const categories: CategoryOption[] = [
  { id: 'feature', icon: <Lightbulb className="h-5 w-5" />, label: "I have a feature idea" },
  { id: 'bug', icon: <Bug className="h-5 w-5" />, label: "I want to report a bug" },
  { id: 'investor', icon: <Brain className="h-5 w-5" />, label: "I'm an investor" },
  { id: 'review', icon: <Star className="h-5 w-5" />, label: "I want to leave a review" },
  { id: 'feedback', icon: <Volume2 className="h-5 w-5" />, label: "I just want to say something" },
  { id: 'other', icon: <HelpCircle className="h-5 w-5" />, label: "Other..." },
];

const ContactForm = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [allowFollowUp, setAllowFollowUp] = useState(true);
  const [stayAnonymous, setStayAnonymous] = useState(false);
  const { toast } = useToast();

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const detectLanguage = (text: string) => {
    // Simple Vietnamese detection based on diacritics
    const vietnamesePattern = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
    return vietnamesePattern.test(text) ? 'vi' : 'en';
  };

  const isVietnamese = detectLanguage(message) === 'vi';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!selectedCategory) {
      toast({
        title: "Please select a category",
        description: "Let us know what type of message you're sending.",
        variant: "destructive"
      });
      return;
    }

    if (!message.trim()) {
      toast({
        title: "Message is required",
        description: "Please tell us what's on your mind.",
        variant: "destructive"
      });
      return;
    }

    // TODO: In future phase, integrate with Supabase to store submissions
    console.log({
      category: selectedCategory,
      name: stayAnonymous ? 'Anonymous' : name,
      contact: stayAnonymous ? '' : contact,
      message,
      allowFollowUp,
    });

    toast({
      title: "Message received!",
      description: "Thank you for sharing your thoughts with us. We'll review your message soon.",
    });

    // Reset form
    setSelectedCategory(null);
    setName('');
    setContact('');
    setMessage('');
    setAllowFollowUp(true);
    setStayAnonymous(false);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-md">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Categories Section */}
          {!selectedCategory && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Select a category:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleCategorySelect(category.id)}
                    className="flex items-center gap-2 px-4 py-3 rounded-full border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form Fields */}
          {selectedCategory && (
            <>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  ← Change category
                </button>
                <span className="text-sm font-medium">
                  {categories.find(c => c.id === selectedCategory)?.label}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <Input
                    placeholder="Your name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={stayAnonymous}
                    className="w-full"
                  />
                </div>

                <div>
                  <Input
                    placeholder="Phone or Zalo..."
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    disabled={stayAnonymous}
                    className="w-full"
                  />
                </div>

                <div>
                  <Textarea
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full min-h-[120px]"
                    required
                  />
                </div>

                {isVietnamese && (
                  <div>
                    <div className="text-xs text-muted-foreground mb-2">We detected Vietnamese. Would you like to provide an English translation?</div>
                    <Textarea
                      placeholder="English translation (optional)..."
                      className="w-full min-h-[80px]"
                    />
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2">
                    <Toggle
                      pressed={allowFollowUp}
                      onPressedChange={setAllowFollowUp}
                      disabled={stayAnonymous}
                    />
                    <label className="text-sm cursor-pointer select-none">
                      I'm open to follow-up
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Toggle
                      pressed={stayAnonymous}
                      onPressedChange={(value) => {
                        setStayAnonymous(value);
                        if (value) setAllowFollowUp(false);
                      }}
                    />
                    <label className="text-sm cursor-pointer select-none">
                      I want to stay anonymous
                    </label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Send Message ✉️
                </Button>
              </div>
            </>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
