
import React from 'react';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

const ReferralsPage = () => {
  const { user, userProfile } = useAuth();
  const { t } = useTranslation();
  const [copied, setCopied] = React.useState(false);
  
  // Generate a sample referral link
  const referralLink = `https://emviapp.com/join?ref=${userProfile?.referral_code || 'ABC123'}`;
  
  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success(t('Copied to clipboard'));
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="container py-16 mt-16">
      <h1 className="text-3xl font-bold mb-6">
        {t('Invite Friends to EmviApp')}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('Your Referral Link')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <input 
                  type="text" 
                  value={referralLink} 
                  readOnly 
                  className="flex-1 p-2 border rounded-l-md"
                />
                <Button
                  variant={copied ? "outline" : "default"}
                  className={`rounded-l-none ${copied ? "bg-green-500 text-white hover:bg-green-600" : ""}`}
                  onClick={handleCopy}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      {t('Copied')}
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      {t('Copy')}
                    </>
                  )}
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  {t('Share via Email')}
                </Button>
                <Button variant="outline" className="flex-1">
                  {t('Share to Instagram')}
                </Button>
                <Button variant="outline" className="flex-1">
                  {t('Share to Facebook')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t('How It Works')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>{t('Share your unique referral link with friends')}</li>
                <li>{t('They sign up using your link')}</li>
                <li>{t('When they complete their first booking, you earn rewards')}</li>
                <li>{t('Earn up to 100 credits per successful referral')}</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReferralsPage;
