
import React, { useState } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { QrCode, Copy, Loader2, Star, Download, Edit } from 'lucide-react';
import { toast } from 'sonner';
import QRCode from 'qrcode.react';

const GoogleReviewBoostPanel = () => {
  const { userProfile, refreshUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [reviewLink, setReviewLink] = useState(userProfile?.google_review_link || '');
  const [loading, setLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  // Simulate fetching average rating - in real implementation, this would come from Google API
  const generateRandomRating = () => {
    if (averageRating === null) {
      setAverageRating(Number((4 + Math.random()).toFixed(1)));
    }
  };

  React.useEffect(() => {
    if (userProfile?.google_review_link) {
      setReviewLink(userProfile.google_review_link);
      generateRandomRating(); // For demo purposes
    }
  }, [userProfile]);

  const saveReviewLink = async () => {
    if (!userProfile) return;
    
    setLoading(true);
    try {
      // Validate link format - basic validation
      if (reviewLink && !reviewLink.includes('g.page/') && !reviewLink.includes('maps.app.goo.gl') && !reviewLink.includes('google.com/maps')) {
        toast.error('Please enter a valid Google review link');
        return;
      }

      const { error } = await supabase
        .from('users')
        .update({ google_review_link: reviewLink })
        .eq('id', userProfile.id);

      if (error) throw error;
      
      await refreshUserProfile();
      toast.success('Google review link saved successfully');
      setIsEditing(false);
      generateRandomRating(); // For demo purposes
    } catch (error) {
      console.error('Error saving Google review link:', error);
      toast.error('Failed to save Google review link');
    } finally {
      setLoading(false);
    }
  };

  const copyReviewLink = () => {
    if (!reviewLink) {
      toast.error('No review link to copy');
      return;
    }
    
    navigator.clipboard.writeText(reviewLink)
      .then(() => toast.success('Review link copied to clipboard'))
      .catch(() => toast.error('Failed to copy link'));
  };

  const generateQR = () => {
    if (!reviewLink) {
      toast.error('Please add a Google review link first');
      return;
    }
    setShowQR(true);
  };

  const downloadQRCode = () => {
    if (!reviewLink) return;

    const canvas = document.getElementById('google-review-qr') as HTMLCanvasElement;
    if (!canvas) return;

    // Create a new canvas with padding and the salon name
    const printCanvas = document.createElement('canvas');
    const ctx = printCanvas.getContext('2d');
    if (!ctx) return;

    const width = 400;
    const height = 500;
    printCanvas.width = width;
    printCanvas.height = height;

    // Fill with white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Add salon name
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(userProfile?.salon_name || 'Our Salon', width / 2, 40);

    // Add instructions
    ctx.font = '16px Arial';
    ctx.fillText('Please leave us a review!', width / 2, 70);
    ctx.fillText('Scan this QR code', width / 2, 90);

    // Draw the QR code
    ctx.drawImage(canvas, (width - 300) / 2, 120, 300, 300);

    // Add rating if available
    if (averageRating) {
      ctx.fillText(`Current Rating: ${averageRating}★`, width / 2, 450);
    }

    // Create download link
    const link = document.createElement('a');
    link.download = `${userProfile?.salon_name || 'salon'}-google-review-qr.png`;
    link.href = printCanvas.toDataURL('image/png');
    link.click();
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-400" />
            <CardTitle className="text-lg font-medium">Boost Your Google Reviews</CardTitle>
          </div>
          {averageRating && (
            <div className="flex items-center text-sm space-x-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{averageRating}</span>
            </div>
          )}
        </div>
        <CardDescription>
          More reviews = more walk-ins and higher Google ranking
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isEditing ? (
          <div className="space-y-2">
            <Label htmlFor="review-link">Google Review Link</Label>
            <div className="flex gap-2">
              <Input 
                id="review-link" 
                value={reviewLink} 
                onChange={(e) => setReviewLink(e.target.value)}
                placeholder="https://g.page/r/YOUR_CODE/review"
                className="flex-1"
              />
              <Button 
                onClick={saveReviewLink} 
                disabled={loading}
                size="sm"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
                Save
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Enter your Google Maps review link from your Google Business Profile
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {reviewLink ? (
              <div className="rounded border p-3 break-all text-sm bg-muted/40">
                {reviewLink}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="h-3.5 w-3.5" />
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(true)}
                className="w-full border-dashed"
              >
                + Add Google Review Link
              </Button>
            )}

            {showQR && reviewLink ? (
              <div className="flex justify-center p-3 border rounded bg-white">
                <QRCode 
                  id="google-review-qr"
                  value={reviewLink} 
                  size={180}
                  fgColor="#000000"
                  level="H"
                  includeMargin={false}
                />
              </div>
            ) : null}
          </div>
        )}
      </CardContent>
      
      {reviewLink && !isEditing && (
        <CardFooter className="flex justify-between flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyReviewLink}
            className="flex-1"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Review Link
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={generateQR}
            className="flex-1"
          >
            <QrCode className="mr-2 h-4 w-4" />
            {showQR ? 'Hide QR Code' : 'Generate QR Code'}
          </Button>
          
          {showQR && (
            <Button
              variant="outline"
              size="sm"
              onClick={downloadQRCode}
              className="flex-1"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Review Card
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default GoogleReviewBoostPanel;
