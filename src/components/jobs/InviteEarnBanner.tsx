import React, { useState } from 'react';
import { Gift, Users, Star, Copy, Check, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const InviteEarnBanner = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = "BEAUTYPRO2024";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rewards = [
    { icon: "💰", title: "$50 Credit", description: "For each friend who joins" },
    { icon: "🎯", title: "Free Job Post", description: "After 3 successful referrals" },
    { icon: "⭐", title: "VIP Status", description: "Priority support & features" },
    { icon: "🏆", title: "Bonus Rewards", description: "Unlock exclusive perks" }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
      <Card className="overflow-hidden border-2 border-gradient-to-r from-emerald-200 to-blue-200 bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600 shadow-2xl">
        <CardContent className="p-0">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-blue-600 text-white p-8 md:p-12 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white/20 p-3 rounded-full">
                  <Gift className="w-8 h-8" />
                </div>
                <Badge variant="secondary" className="bg-yellow-400 text-yellow-900 animate-pulse">
                  <Sparkles className="w-3 h-3 mr-1" />
                  LIMITED TIME
                </Badge>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
                Invite Friends, Earn Big! 🎉
              </h2>
              
              <p className="text-xl md:text-2xl mb-6 opacity-95 leading-relaxed max-w-3xl">
                Share EmviApp with fellow beauty professionals and earn credits, free job posts, and exclusive perks!
              </p>
              
              <div className="flex items-center gap-2 text-lg">
                <Users className="w-6 h-6" />
                <span className="font-semibold">2,847 users earned rewards this month</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            {/* Rewards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {rewards.map((reward, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {reward.icon}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                    {reward.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {reward.description}
                  </p>
                </div>
              ))}
            </div>

            {/* How it works */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 p-8 rounded-2xl mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                How It Works - Super Simple! 
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">1</div>
                  <h4 className="font-semibold text-lg mb-2">Share Your Code</h4>
                  <p className="text-gray-600 dark:text-gray-300">Send your referral code to friends in the beauty industry</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">2</div>
                  <h4 className="font-semibold text-lg mb-2">They Join & Post</h4>
                  <p className="text-gray-600 dark:text-gray-300">Your friends sign up and post their first job or application</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">3</div>
                  <h4 className="font-semibold text-lg mb-2">You Both Earn!</h4>
                  <p className="text-gray-600 dark:text-gray-300">Get instant credits and unlock exclusive rewards</p>
                </div>
              </div>
            </div>

            {/* Referral Code Section */}
            <div className="bg-white dark:bg-slate-800 border-2 border-emerald-200 dark:border-emerald-700 p-6 rounded-xl text-center">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Your Personal Referral Code
              </h4>
              
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 px-6 py-3 rounded-lg">
                  <span className="text-2xl font-mono font-bold text-emerald-700 dark:text-emerald-300">
                    {referralCode}
                  </span>
                </div>
                
                <button
                  onClick={handleCopyCode}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-lg transition-all duration-300 flex items-center gap-2"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-8 py-3 rounded-xl font-bold hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  📧 Email Friends
                </button>
                <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl font-bold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  📱 Share on Social
                </button>
              </div>
            </div>

            {/* Success Stories */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                💫 <strong>Success Story:</strong> "I earned $500 in credits just by sharing EmviApp with my salon team!" - S.M., Nail Tech
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Platform credits and rewards are for illustration. Terms apply.
              </p>
              
              <div className="flex justify-center items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>4.9/5 user rating</span>
                </div>
                <div>•</div>
                <div>$127k+ earned by users</div>
                <div>•</div>
                <div>15,000+ successful referrals</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default InviteEarnBanner;