
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Building, Loader2 } from 'lucide-react';

interface SalonLogoTabProps {
  logoPreview: string | null;
  logoUrl: string | null;
  isLoading: boolean;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeLogo: () => void;
}

const SalonLogoTab = ({ 
  logoPreview, 
  logoUrl, 
  isLoading, 
  handleFileChange, 
  removeLogo 
}: SalonLogoTabProps) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h3 className="text-lg font-medium">Salon Logo or Image</h3>
      
      <div className="h-40 w-40 rounded-lg border-2 border-primary flex items-center justify-center bg-muted relative overflow-hidden">
        {logoPreview || logoUrl ? (
          <img
            src={logoPreview || logoUrl || ""}
            alt="Salon logo"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-muted">
            <Building className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        
        {isLoading && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div>
          <input
            id="logo"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={isLoading}
          />
          <Label
            htmlFor="logo"
            className={`cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-2 rounded-md text-sm font-medium inline-flex items-center ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            {logoUrl || logoPreview ? "Change Image" : "Upload Image"}
          </Label>
        </div>
        
        {(logoUrl || logoPreview) && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={removeLogo}
            disabled={isLoading}
            className="text-destructive hover:text-destructive"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            Remove
          </Button>
        )}
      </div>
      
      <p className="text-sm text-muted-foreground text-center max-w-md">
        Upload a high-quality logo or image of your salon to make a great first impression with potential clients and professionals.
      </p>
    </div>
  );
};

export default SalonLogoTab;
