
import { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { Gift, Copy, Check, Award, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const SalonReferralSection = () => {
  const { t } = useTranslation();
  const { user, userProfile } = useAuth();
  const [referralCode, setReferralCode] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [referralCount, setReferralCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    if (!user?.id) return;
    
    const fetchReferralData = async () => {
      setLoading(true);
      try {
        // Get referral code
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('referral_code')
          .eq('id', user.id)
          .single();
          
        if (userError) throw userError;
        
        const code = userData.referral_code || `EMVI${user.id.substring(0, 6)}`;
        setReferralCode(code);
        setReferralLink(`https://emviapp.com/join?ref=${code}`);
        
        // Get referral count
        const { data: statsData, error: statsError } = await supabase
          .rpc('get_user_referral_stats', { user_id: user.id });
          
        if (statsError) throw statsError;
        
        const statsObject = Array.isArray(statsData) ? statsData[0] : statsData;
        setReferralCount(statsObject.referral_count || 0);
      } catch (error) {
        console.error('Error fetching referral data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReferralData();
  }, [user?.id]);
  
  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success(t("Referral link copied to clipboard!"));
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Calculate progress to next milestone (5 referrals for this example)
  const targetMilestone = 5;
  const progressPercentage = Math.min(100, (referralCount / targetMilestone) * 100);
  
  return (
    <Card className="overflow-hidden shadow-sm border-blue-100">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-4">
        <CardTitle className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 rounded-md">
            <Gift className="h-5 w-5 text-blue-700" />
          </div>
          {t("Salon Owner Referral Program")}
        </CardTitle>
        <CardDescription className="text-blue-700">
          {t("Refer salon owners, get 50 credits for each successful referral")}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Referral Link */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500">
              {t("Your Referral Link")}
            </h3>
            
            <div className="flex space-x-2">
              <Input 
                value={referralLink} 
                readOnly 
                className="bg-gray-50"
              />
              <Button 
                variant="outline" 
                className={copied ? "bg-green-50 text-green-600 border-green-200" : ""}
                onClick={handleCopyReferralLink}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-700">
                {t("Share this link with other salon owners. When they sign up using your link, both of you will receive 50 credits!")}
              </p>
              <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700" onClick={handleCopyReferralLink}>
                {t("Copy & Share")}
              </Button>
            </div>
          </div>
          
          {/* Referral Stats */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500">
              {t("Your Referral Stats")}
            </h3>
            
            <motion.div 
              className="grid grid-cols-2 gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm text-center">
                <h4 className="text-sm text-gray-500 mb-1">{t("Salons Referred")}</h4>
                <p className="text-3xl font-bold text-blue-700">{referralCount}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm text-center">
                <h4 className="text-sm text-gray-500 mb-1">{t("Credits Earned")}</h4>
                <p className="text-3xl font-bold text-indigo-700">{referralCount * 50}</p>
              </div>
            </motion.div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 flex items-center">
                  <Award className="h-4 w-4 mr-1 text-blue-600" />
                  {t("Next Milestone")}
                </span>
                <span className="font-medium">{referralCount} / {targetMilestone}</span>
              </div>
              
              <Progress value={progressPercentage} className="h-2" />
              
              <p className="text-sm text-center text-gray-600">
                {targetMilestone - referralCount > 0 ? (
                  <>
                    {t("Refer")} <strong>{targetMilestone - referralCount}</strong> {t("more salon(s) to unlock Gold status")}
                  </>
                ) : (
                  <span className="text-blue-700 font-medium">{t("Gold status achieved! 🏆")}</span>
                )}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100">
          <Button variant="ghost" className="w-full justify-between" asChild>
            <Link to="/referrals">
              {t("View Detailed Referral Dashboard")}
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonReferralSection;
