
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/auth";
import ReferralTracker from "@/components/referral/ReferralTracker";
import ReferralList from "@/components/referral/ReferralList";
import ReferralMilestones from "@/components/referral/ReferralMilestones";
import { useReferralSystem } from "@/hooks/useReferralSystem";
import { Share2, Users, Gift, Copy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

const ReferralsPage = () => {
  const { user, userProfile } = useAuth();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");
  const {
    loading,
    referralCode,
    referralLink,
    referralStats,
    referralProgress,
    referrals,
    copied,
    copyReferralLink,
    getMotivationalMessage
  } = useReferralSystem();
  
  useEffect(() => {
    document.title = "Referral Program | EmviApp";
  }, []);

  // Psychological incentive - Set 10% higher targets than actual to create urgency
  const enhancedStats = {
    ...referralStats,
    targetMilestone: Math.ceil(referralStats.targetMilestone * 1.1)
  };

  return (
    <Layout>
      <motion.div
        className="min-h-screen bg-gradient-to-b from-white to-pink-50/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <motion.h1
                className="text-3xl font-bold mb-3"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {t('referral.program_title', { defaultValue: 'Emvi Referral Program' })}
              </motion.h1>
              <motion.p
                className="text-gray-600 max-w-2xl mx-auto"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {t('referral.program_description', { 
                  defaultValue: 'Invite friends and earn rewards! The more people you invite, the more rewards you unlock.' 
                })}
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card className="mb-8">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="h-5 w-5 text-pink-500" />
                      {t('referral.invite_friends')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-100 mb-6">
                      <p className="text-pink-800 font-medium mb-2">{getMotivationalMessage(userProfile?.preferred_language)}</p>
                      <div className="text-sm text-gray-600">
                        {t('referral.program_explanation', { 
                          defaultValue: 'Your friends get benefits when they join, and you earn credits that can be used for profile boosts, exclusive content, and special perks!' 
                        })}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">
                          {t('referral.your_link')}
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            value={referralLink}
                            readOnly
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-l-md py-2 px-3 text-sm"
                          />
                          <Button 
                            className="rounded-l-none" 
                            onClick={copyReferralLink}
                          >
                            {copied ? (
                              <CheckCircle className="h-4 w-4 mr-2" />
                            ) : (
                              <Copy className="h-4 w-4 mr-2" />
                            )}
                            {copied ? t('referral.copied') : t('referral.copy')}
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <Button 
                          variant="outline" 
                          className="flex gap-2 justify-center"
                          onClick={copyReferralLink}
                        >
                          <Copy className="h-4 w-4" />
                          {t('referral.copy_link')}
                        </Button>
                        <Button 
                          className="flex gap-2 justify-center bg-pink-600 hover:bg-pink-700"
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: "Join me on EmviApp",
                                text: "I'm using EmviApp for beauty services. Join me!",
                                url: referralLink,
                              }).catch(err => {
                                copyReferralLink();
                              });
                            } else {
                              copyReferralLink();
                            }
                          }}
                        >
                          <Share2 className="h-4 w-4" />
                          {t('referral.share')}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-0">
                    <CardTitle className="text-xl">
                      {t('referral.details')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
                      <TabsList className="grid grid-cols-2 w-full">
                        <TabsTrigger value="overview">
                          {t('referral.milestones')}
                        </TabsTrigger>
                        <TabsTrigger value="friends">
                          {t('referral.friends')}
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="overview" className="pt-4">
                        <ReferralMilestones 
                          referralStats={enhancedStats}
                          referralProgress={referralProgress}
                        />
                      </TabsContent>
                      
                      <TabsContent value="friends" className="pt-4">
                        <ReferralList 
                          referrals={referrals}
                          loading={loading}
                        />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <ReferralTracker />
                
                <Card className="mt-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-500" />
                      {t('referral.how_it_works')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="h-7 w-7 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-pink-600">1</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm mb-1">
                            {t('referral.step1_title')}
                          </h3>
                          <p className="text-xs text-gray-600">
                            {t('referral.step1_desc')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="h-7 w-7 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-purple-600">2</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm mb-1">
                            {t('referral.step2_title')}
                          </h3>
                          <p className="text-xs text-gray-600">
                            {t('referral.step2_desc')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-blue-600">3</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm mb-1">
                            {t('referral.step3_title')}
                          </h3>
                          <p className="text-xs text-gray-600">
                            {t('referral.step3_desc')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default ReferralsPage;
