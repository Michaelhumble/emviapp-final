import React from 'react';
import { MapPin, Clock, Star } from 'lucide-react';

const LocalSEO: React.FC = () => {
  return (
    <div className="mt-16 py-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-border/50">
      <div className="text-center max-w-2xl mx-auto px-6">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-3 text-foreground">
          Local Business Integration
        </h3>
        
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Google Business Profile integration coming soon. Connect with local customers, 
          manage reviews, and showcase your business directly through our platform.
        </p>
        
        <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4" />
            <span>Review Management</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Business Hours</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Location Services</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalSEO;