import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Image, User, Package, Mail } from 'lucide-react';

const MediaKit: React.FC = () => {
  const handleDownloadClick = (assetType: string) => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'media_kit_download',
        asset_type: assetType
      });
    }
  };

  const handleMediaContactClick = () => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'media_contact_click',
        contact_type: 'email',
        location: 'media_kit_section'
      });
    }
  };

  return (
    <div className="bg-card border rounded-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Media Kit</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          High-resolution assets, founder information, and media resources for journalists and content creators.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Logo Pack */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Image className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">Logo Pack</h3>
          <p className="text-sm text-muted-foreground">
            SVG, PNG, and vector formats in various sizes
          </p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleDownloadClick('logo_pack')}
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>

        {/* Founder Photos */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
            <User className="w-8 h-8 text-secondary" />
          </div>
          <h3 className="font-semibold text-foreground">Founder Headshots</h3>
          <p className="text-sm text-muted-foreground">
            Professional photos of Michael Humble, CEO
          </p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleDownloadClick('founder_photos')}
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>

        {/* Product Screenshots */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
            <Package className="w-8 h-8 text-accent" />
          </div>
          <h3 className="font-semibold text-foreground">Product Shots</h3>
          <p className="text-sm text-muted-foreground">
            App screenshots and interface mockups
          </p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleDownloadClick('product_shots')}
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>

        {/* Press Contact */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">Press Contact</h3>
          <p className="text-sm text-muted-foreground">
            Media inquiries and interview requests
          </p>
          <Button 
            variant="outline" 
            size="sm"
            asChild
          >
            <a
              href="mailto:press@emvi.app?subject=Media%20Inquiry"
              onClick={handleMediaContactClick}
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </a>
          </Button>
        </div>
      </div>

      {/* Company Information */}
      <div className="bg-muted/20 rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4">Company Information</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-foreground mb-2">About EmviApp</h4>
            <p className="text-muted-foreground leading-relaxed">
              EmviApp is the first AI-powered growth engine for the global beauty industry, 
              connecting salons, beauty professionals, and customers through intelligent technology.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Key Facts</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Founded: 2025</li>
              <li>• Founder & CEO: Michael Humble</li>
              <li>• Industry: Beauty Technology</li>
              <li>• Users: 22,000+ professionals</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaKit;