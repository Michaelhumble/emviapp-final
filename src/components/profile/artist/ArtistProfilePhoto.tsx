
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ImageOff, Upload, Loader2 } from 'lucide-react';

interface ArtistProfilePhotoProps {
  avatarUrl: string | null;
  avatarPreview: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveAvatar: () => void;
  isLoading: boolean;
}

const ArtistProfilePhoto = ({
  avatarUrl,
  avatarPreview,
  onFileChange,
  onRemoveAvatar,
  isLoading
}: ArtistProfilePhotoProps) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="h-40 w-40 rounded-full border-2 border-primary flex items-center justify-center overflow-hidden bg-muted">
        {avatarPreview ? (
          <img src={avatarPreview} alt="Profile preview" className="h-full w-full object-cover" />
        ) : avatarUrl ? (
          <img src={avatarUrl} alt="Profile" className="h-full w-full object-cover" />
        ) : (
          <Upload className="h-12 w-12 text-muted-foreground" />
        )}
      </div>
      
      <div className="flex gap-4">
        <Input
          id="avatar"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="hidden"
        />
        <Label 
          htmlFor="avatar" 
          className="cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium"
        >
          {avatarUrl || avatarPreview ? "Change Photo" : "Upload Photo"}
        </Label>
        
        {(avatarUrl || avatarPreview) && (
          <Button
            type="button"
            variant="outline"
            className="text-destructive"
            onClick={onRemoveAvatar}
            disabled={isLoading}
          >
            <ImageOff className="h-4 w-4 mr-2" />
            Remove
          </Button>
        )}
      </div>

      <div className="bg-muted/50 p-4 rounded-md">
        <h4 className="text-sm font-medium mb-2">Photo Tips:</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Use good lighting and a neutral background</li>
          <li>• Show your face clearly</li>
          <li>• Professional attire builds client trust</li>
          <li>• Square or portrait orientation works best</li>
        </ul>
      </div>
    </div>
  );
};

export default ArtistProfilePhoto;
