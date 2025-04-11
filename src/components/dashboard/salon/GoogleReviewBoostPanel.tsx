
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ExternalLink, Star, Award } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const GoogleReviewBoostPanel = () => {
  const { userProfile, refreshUserProfile } = useAuth();
  const [googleReviewLink, setGoogleReviewLink] = useState(userProfile?.google_review_link || '');
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSaveGoogleReview = async () => {
    if (!userProfile?.id) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('users')
        .update({ google_review_link: googleReviewLink })
        .eq('id', userProfile.id);
        
      if (error) {
        throw error;
      }
      
      // Refresh user profile
      await refreshUserProfile();
      toast.success('Google review link saved successfully');
    } catch (error) {
      console.error('Error saving Google review link:', error);
      toast.error('Failed to save Google review link');
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <Card className="bg-gradient-to-br from-yellow-50 to-white border-yellow-100">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="bg-yellow-100 p-2 rounded-full">
            <Star className="h-5 w-5 text-yellow-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-2">Google Reviews Booster</h3>
            <p className="text-sm text-gray-600 mb-4">
              Increase your reviews by sharing your Google Review link with clients.
              Add your link below to manage it in one place.
            </p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="googleReviewLink">Your Google Review Link</Label>
                <Input
                  id="googleReviewLink"
                  placeholder="https://g.page/r/YOUR_CODE/review"
                  value={googleReviewLink}
                  onChange={(e) => setGoogleReviewLink(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Find this in your Google Business Profile or create a review link
                </p>
              </div>
              
              <div className="flex gap-2 items-center">
                <Button 
                  onClick={handleSaveGoogleReview}
                  disabled={isSaving}
                  size="sm"
                >
                  {isSaving ? 'Saving...' : 'Save Link'}
                </Button>
                
                {userProfile?.google_review_link && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(userProfile.google_review_link, '_blank')}
                    className="flex items-center gap-1"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Test Link
                  </Button>
                )}
              </div>
              
              {userProfile?.google_review_link && (
                <div className="mt-4 border border-green-100 bg-green-50 p-3 rounded-md">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-green-600" />
                    <p className="text-sm text-green-800 font-medium">
                      Your review link is set up!
                    </p>
                  </div>
                  <p className="text-xs text-green-700 mt-1">
                    Share this with clients after their appointment to gather more reviews.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleReviewBoostPanel;
