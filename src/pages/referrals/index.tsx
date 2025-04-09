
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReferralMilestones from "@/components/referral/ReferralMilestones";
import ReferralTracker from "@/components/referral/ReferralTracker";
import ReferralList from "@/components/referral/ReferralList";
import { Users, Award, RefreshCw } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { toTranslatableText } from "@/components/dashboard/salon/SalonTranslationHelper";
import { useReferralSystem } from "@/hooks/useReferralSystem";
import { ReferralData } from "@/components/referral/types";

const ReferralsPage = () => {
  const { t } = useTranslation();
  const { 
    referralStats, 
    referralProgress, 
    referrals: fetchedReferrals,
    loading 
  } = useReferralSystem();

  // Sample referrals data for demo purposes
  const sampleReferrals: ReferralData[] = [
    { 
      id: "1", 
      referredName: "Sarah Johnson", 
      referredEmail: "sarah@example.com",
      status: "joined", 
      milestoneReached: false, 
      createdAt: "2023-12-01" 
    },
    { 
      id: "2", 
      referredName: "Alex Wong", 
      referredEmail: "alex@example.com", 
      status: "subscribed", 
      milestoneReached: true,
      createdAt: "2023-11-28" 
    },
    { 
      id: "3", 
      referredName: "Maria Garcia", 
      referredEmail: "maria@example.com",
      status: "joined", 
      milestoneReached: false, 
      createdAt: "2023-11-25" 
    },
    { 
      id: "4", 
      referredName: "David Park", 
      referredEmail: "david@example.com",
      status: "completed", 
      milestoneReached: false, 
      createdAt: "2023-11-20" 
    }
  ];
  
  useEffect(() => {
    document.title = "Referral Program | EmviApp";
  }, []);
  
  return (
    <Layout>
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-white to-indigo-50/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container px-4 mx-auto py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">
                {t(toTranslatableText("Referral Program"))}
              </h1>
              <p className="text-gray-600">
                {t(toTranslatableText("Invite friends and colleagues to EmviApp and earn rewards"))}
              </p>
            </div>
            
            <Card className="mb-8 overflow-hidden border-indigo-100">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 pb-8 pt-8">
                <CardTitle className="text-center text-2xl text-indigo-700 mb-2 flex items-center justify-center">
                  <Users className="h-6 w-6 mr-2 text-indigo-500" />
                  {t(toTranslatableText("How It Works"))}
                </CardTitle>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                    <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg mx-auto mb-3">
                      1
                    </div>
                    <h3 className="font-medium mb-2">
                      {t(toTranslatableText("Share Your Link"))}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t(toTranslatableText("Send your personal referral link to other salons and beauty professionals"))}
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                    <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg mx-auto mb-3">
                      2
                    </div>
                    <h3 className="font-medium mb-2">
                      {t(toTranslatableText("They Sign Up"))}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t(toTranslatableText("When they create an account using your link, they're connected to you"))}
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                    <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg mx-auto mb-3">
                      3
                    </div>
                    <h3 className="font-medium mb-2">
                      {t(toTranslatableText("Earn Rewards"))}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t(toTranslatableText("You'll receive credits and badges based on your referrals' activity"))}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="py-6">
                <ReferralTracker />
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="md:col-span-2">
                <Card className="h-full border-purple-100">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="h-5 w-5 mr-2 text-purple-500" />
                      {t(toTranslatableText("Milestone Rewards"))}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ReferralMilestones 
                      referralStats={referralStats || { completedReferrals: 0, totalReferrals: 0 }}
                      referralProgress={referralProgress || { percentage: 0, nextMilestoneIn: 5, currentTier: 0, nextTier: 1 }}
                    />
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="h-full border-blue-100">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <RefreshCw className="h-5 w-5 mr-2 text-blue-500" />
                      {t(toTranslatableText("Recent Activity"))}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ReferralList referrals={fetchedReferrals || sampleReferrals} />
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
