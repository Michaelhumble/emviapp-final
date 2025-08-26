import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Users } from 'lucide-react';

const PressPageHero: React.FC = () => {
  const handlePressReleaseClick = () => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'press_release_click',
        outlet_key: 'ein_presswire',
        outlet_name: 'EIN Presswire'
      });
    }
  };

  const handleJoinClick = () => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'join_emviapp_click',
        location: 'press_page_hero'
      });
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 animate-pulse opacity-50" />
      
      <div className="relative container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Press & Media
          </h1>
          
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-xl text-muted-foreground leading-relaxed">
              EmviApp launched as the first AI-powered growth engine for the global beauty industry, 
              connecting professionals with opportunities through intelligent technology.
            </p>
            
            <p className="text-sm text-muted-foreground font-medium">
              Published August 26, 2025
            </p>
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://www.einpresswire.com/article/843218633/emviapp-launches-the-first-ai-powered-growth-engine-for-the-global-beauty-industry"
              target="_blank"
              rel="noopener nofollow"
              onClick={handlePressReleaseClick}
            >
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Read launch release
              </Button>
            </a>
            
            <Button 
              variant="outline" 
              size="lg"
              className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
              asChild
            >
              <a href="/jobs" onClick={handleJoinClick}>
                <Users className="w-5 h-5 mr-2" />
                Join EmviApp Free
              </a>
            </Button>
          </div>

          {/* Micro stats */}
          <div className="pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              Trusted by 12,000+ jobs • 10,000+ artists • 98 new jobs this week
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressPageHero;