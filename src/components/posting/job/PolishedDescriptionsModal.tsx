
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Briefcase, Crown, Zap, Star, Heart, ThumbsUp, Fire, Award, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PolishedDescriptionOption {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  theme: string;
}

interface PolishedDescriptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalDescription: string;
  onSelectDescription: (description: string) => void;
}

const PolishedDescriptionsModal: React.FC<PolishedDescriptionsModalProps> = ({
  isOpen,
  onClose,
  originalDescription,
  onSelectDescription,
}) => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [generatedOptions, setGeneratedOptions] = useState<PolishedDescriptionOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // This would typically be an API call to generate descriptions
  // For now, we'll simulate it with a timeout
  React.useEffect(() => {
    if (isOpen && originalDescription && generatedOptions.length === 0) {
      setIsLoading(true);
      
      // Simulate API call delay
      const timer = setTimeout(() => {
        const newOptions = generateDescriptionOptions(originalDescription);
        setGeneratedOptions(newOptions);
        setIsLoading(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, originalDescription]);

  const handleSelectDescription = (description: string) => {
    onSelectDescription(description);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" /> 
            AI Polished Job Descriptions
          </DialogTitle>
          <DialogDescription>
            Choose a version that matches your style and voice. Your original description will remain unchanged until you select one.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between items-center mb-4">
          <div className="font-medium">10 unique versions created by AI</div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className={cn(view === 'grid' ? 'bg-muted' : '')}
              onClick={() => setView('grid')}
            >
              Grid
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className={cn(view === 'list' ? 'bg-muted' : '')}
              onClick={() => setView('list')}
            >
              List
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Generating polished descriptions...</p>
          </div>
        ) : (
          <div className={cn(
            "grid gap-4",
            view === 'grid' ? 'md:grid-cols-2' : 'grid-cols-1'
          )}>
            {generatedOptions.map((option) => (
              <Card key={option.id} className="border overflow-hidden hover:border-primary/40 transition-all">
                <CardHeader className="pb-3 flex flex-row items-center gap-2 border-b bg-muted/30">
                  <div className="p-1.5 rounded-full bg-background border">
                    {option.icon}
                  </div>
                  <div>
                    <CardTitle className="text-base">{option.title}</CardTitle>
                    <CardDescription className="text-xs">{option.theme}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 pb-0 h-[160px] overflow-y-auto text-sm">
                  <p className="line-clamp-6">{option.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end pt-2 pb-3 border-t bg-muted/10">
                  <Button 
                    onClick={() => handleSelectDescription(option.description)}
                    size="sm" 
                    className="text-xs"
                  >
                    Use this version
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => handleSelectDescription(originalDescription)}>
            Keep Original
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Function to generate description options (simulated AI results)
const generateDescriptionOptions = (originalDescription: string): PolishedDescriptionOption[] => {
  // In a real implementation, this would call an API to generate variations
  const baseDescription = originalDescription || "We are looking for a talented professional to join our team.";
  
  const options: PolishedDescriptionOption[] = [
    {
      id: "friendly",
      title: "Warm & Friendly",
      theme: "Creates a welcoming, personal connection",
      icon: <Heart className="h-4 w-4 text-pink-500" />,
      description: `${baseDescription}\n\nWe're a fun, friendly team that treats each other like family. We believe in creating a supportive environment where you can thrive and feel appreciated every day. Our clients love our warm atmosphere, and we're looking for someone who shares our passion for making people feel welcome and valued.`
    },
    {
      id: "urgent",
      title: "Urgently Hiring",
      theme: "Emphasizes immediate opportunity",
      icon: <Zap className="h-4 w-4 text-amber-500" />,
      description: `IMMEDIATE OPENING: ${baseDescription}\n\nWe need to fill this position ASAP for our growing clientele! This is an exceptional opportunity for the right candidate to start right away. Don't miss this chance to join our busy, thriving business - applications are being reviewed daily and we're ready to hire immediately for the right person.`
    },
    {
      id: "luxury",
      title: "Premium & Luxury",
      theme: "Elevated, sophisticated tone",
      icon: <Crown className="h-4 w-4 text-yellow-500" />,
      description: `${baseDescription}\n\nJoin our distinguished establishment where excellence is standard and luxury is our promise. We cater to a discerning clientele who expect nothing but the finest quality and service. As part of our elite team, you'll work in elegant surroundings with high-end products and techniques that set us apart in the industry.`
    },
    {
      id: "professional",
      title: "Highly Professional",
      theme: "Formal, business-focused approach",
      icon: <Briefcase className="h-4 w-4 text-blue-500" />,
      description: `${baseDescription}\n\nOur established business has built its reputation on consistently delivering exceptional results and maintaining the highest professional standards in the industry. We offer a structured environment with clear advancement opportunities, professional development, and a focus on career growth for motivated individuals.`
    },
    {
      id: "growth",
      title: "Growth Opportunity",
      theme: "Emphasis on career development",
      icon: <Award className="h-4 w-4 text-purple-500" />,
      description: `${baseDescription}\n\nThis role offers extraordinary growth potential for ambitious professionals. We actively invest in our team's development through ongoing training, mentorship, and advancement opportunities. Many of our leaders started in similar positions and have built rewarding careers with us. We're looking for someone eager to grow alongside our expanding business.`
    },
    {
      id: "seo",
      title: "SEO Optimized",
      theme: "Better searchability and visibility",
      icon: <Sparkles className="h-4 w-4 text-indigo-500" />,
      description: `${baseDescription}\n\nOur top-rated salon/studio is currently seeking an experienced professional specialist with expertise in the latest techniques and trends. Located in a prime area with high foot traffic, we offer competitive compensation, flexible scheduling, and a collaborative work environment. Perfect for certified professionals with portfolio work and client retention skills.`
    },
    {
      id: "benefits",
      title: "Benefits Focused",
      theme: "Highlights perks and advantages",
      icon: <ThumbsUp className="h-4 w-4 text-green-500" />,
      description: `${baseDescription}\n\nWe offer an exceptional package that goes beyond just competitive pay: flexible scheduling that works for your life, paid continuing education to boost your skills, product discounts, health benefits, paid vacation, and a supportive team environment. We believe happy staff create happy clients, which is why we invest in your wellbeing and job satisfaction.`
    },
    {
      id: "community",
      title: "Community Centered",
      theme: "Focus on local connections",
      icon: <MessageSquare className="h-4 w-4 text-teal-500" />,
      description: `${baseDescription}\n\nAs a beloved community business serving our neighborhood for years, we've built lasting relationships with generations of clients. We actively participate in local events, support community causes, and create a welcoming space for everyone. Join us in making a meaningful difference while building your career in a place where everyone knows your name.`
    },
    {
      id: "fast-paced",
      title: "High Energy",
      theme: "Dynamic, exciting workplace",
      icon: <Fire className="h-4 w-4 text-orange-500" />,
      description: `${baseDescription}\n\nJoin our bustling, energetic environment where no two days are the same! We're known for our vibrant atmosphere, trendsetting work, and the constant buzz of satisfied clients. This fast-paced position is perfect for someone who thrives in dynamic settings, loves staying busy, and brings enthusiasm to everything they do.`
    },
    {
      id: "artistic",
      title: "Creative & Artistic",
      theme: "Freedom for artistic expression",
      icon: <Star className="h-4 w-4 text-fuchsia-500" />,
      description: `${baseDescription}\n\nUnleash your creativity in our unique studio where artistic expression is celebrated and encouraged. We provide the freedom to develop your signature style, experiment with innovative techniques, and showcase your artistic vision. Our clients come specifically seeking distinctive, creative work from passionate artists who bring imagination to their craft.`
    }
  ];
  
  return options;
};

export default PolishedDescriptionsModal;
