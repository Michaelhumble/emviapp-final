
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Upload, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface OpenToOffersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: OpenToOffersData) => void;
  currentData?: OpenToOffersData;
}

export interface OpenToOffersData {
  headline: string;
  bio: string;
  preferredLocations: string;
  preferredHours: string;
  photo?: string;
  spotlightEnabled: boolean;
}

const OpenToOffersModal = ({ isOpen, onClose, onSave, currentData }: OpenToOffersModalProps) => {
  const [formData, setFormData] = useState<OpenToOffersData>({
    headline: currentData?.headline || "",
    bio: currentData?.bio || "",
    preferredLocations: currentData?.preferredLocations || "",
    preferredHours: currentData?.preferredHours || "",
    photo: currentData?.photo || "",
    spotlightEnabled: currentData?.spotlightEnabled || false,
  });

  const handleSave = () => {
    if (!formData.headline.trim() || !formData.bio.trim()) {
      toast.error("Please fill in headline and bio");
      return;
    }
    
    onSave(formData);
    onClose();
    toast.success("Your 'Open to Offers' profile is now live!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif">Open to Offers</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Let salons know you're available for new opportunities
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="headline">Headline *</Label>
            <Input
              id="headline"
              placeholder="e.g., Experienced Nail Artist Looking for New Salon"
              value={formData.headline}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              maxLength={80}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {formData.headline.length}/80 characters
            </p>
          </div>

          <div>
            <Label htmlFor="bio">Short Introduction *</Label>
            <Textarea
              id="bio"
              placeholder="Tell salons a bit about yourself and what you're looking for..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              maxLength={200}
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {formData.bio.length}/200 characters
            </p>
          </div>

          <div>
            <Label htmlFor="locations">Preferred Locations (Optional)</Label>
            <Input
              id="locations"
              placeholder="e.g., Manhattan, Brooklyn"
              value={formData.preferredLocations}
              onChange={(e) => setFormData({ ...formData, preferredLocations: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="hours">Preferred Hours (Optional)</Label>
            <Input
              id="hours"
              placeholder="e.g., Full-time, Part-time, Weekends"
              value={formData.preferredHours}
              onChange={(e) => setFormData({ ...formData, preferredHours: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg bg-gradient-to-r from-amber-50 to-orange-50">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-amber-600" />
              <div>
                <p className="text-sm font-medium">Spotlight Feature</p>
                <p className="text-xs text-muted-foreground">
                  Appear at top of listings for 7 days
                </p>
              </div>
            </div>
            <Switch
              checked={formData.spotlightEnabled}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, spotlightEnabled: checked })
              }
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Go Live
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpenToOffersModal;
