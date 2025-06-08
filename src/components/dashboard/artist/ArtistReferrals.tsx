
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Trophy, 
  TrendingUp, 
  Gift,
  Star,
  Zap,
  Crown,
  Target,
  Calendar,
  CheckCircle
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useReferralSystem } from "@/hooks/useReferralSystem";
import { useAuth } from "@/context/auth";
import ReferralList from "@/components/referral/ReferralList";

const ArtistReferrals = () => {
  const { t } = useTranslation();
  const { referralStats, referrals, loading } = useReferralSystem();
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  const isVietnamese = userProfile?.preferred_language?.toLowerCase() === 'vietnamese';
  
  // Mock leaderboard data
  const [leaderboard] = useState([
    { rank: 1, name: 'Sarah M.', referrals: 47, badge: '👑' },
    { rank: 2, name: 'Linda K.', referrals: 35, badge: '🥈' },
    { rank: 3, name: 'You', referrals: referralStats?.completedReferrals || 0, badge: '🥉' },
    { rank: 4, name: 'Maria P.', referrals: 18, badge: '⭐' },
    { rank: 5, name: 'Anna L.', referrals: 12, badge: '💎' },
  ]);

  // Achievement levels
  const achievements = [
    { level: 1, name: 'First Friend', requirement: 1, reward: '10 credits', unlocked: (referralStats?.completedReferrals || 0) >= 1 },
    { level: 2, name: 'Growing Network', requirement: 5, reward: '50 credits + Badge', unlocked: (referralStats?.completedReferrals || 0) >= 5 },
    { level: 3, name: 'Influence Builder', requirement: 10, reward: '100 credits + Premium Badge', unlocked: (referralStats?.completedReferrals || 0) >= 10 },
    { level: 4, name: 'Network Master', requirement: 25, reward: '250 credits + Crown Badge', unlocked: (referralStats?.completedReferrals || 0) >= 25 },
    { level: 5, name: 'Empire Builder', requirement: 50, reward: '500 credits + VIP Status', unlocked: (referralStats?.completedReferrals || 0) >= 50 },
  ];

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="grid grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-purple-50">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center gap-2">
            <Crown className="h-4 w-4" />
            Leaderboard
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold">
                    {t({
                      english: "Your Referral Empire",
                      vietnamese: "Đế Chế Giới Thiệu Của Bạn"
                    })}
                  </span>
                  <p className="text-sm text-gray-600 font-normal">
                    {t({
                      english: "Build your network and earn rewards",
                      vietnamese: "Xây dựng mạng lưới và nhận thưởng"
                    })}
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <motion.div 
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <Users className="h-8 w-8 text-blue-500 mb-2" />
                  <div className="text-2xl font-bold text-blue-700">{referralStats?.completedReferrals || 0}</div>
                  <div className="text-sm text-blue-600">
                    {t({
                      english: "Total Referrals",
                      vietnamese: "Tổng Giới Thiệu"
                    })}
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <Zap className="h-8 w-8 text-green-500 mb-2" />
                  <div className="text-2xl font-bold text-green-700">{referralStats?.credits || 0}</div>
                  <div className="text-sm text-green-600">
                    {t({
                      english: "Credits Earned",
                      vietnamese: "Credits Nhận"
                    })}
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <TrendingUp className="h-8 w-8 text-orange-500 mb-2" />
                  <div className="text-2xl font-bold text-orange-700">#{leaderboard.find(l => l.name === 'You')?.rank || 'N/A'}</div>
                  <div className="text-sm text-orange-600">
                    {t({
                      english: "Your Rank",
                      vietnamese: "Thứ Hạng"
                    })}
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <Gift className="h-8 w-8 text-purple-500 mb-2" />
                  <div className="text-2xl font-bold text-purple-700">{referralStats?.estimatedEarnings || 0}</div>
                  <div className="text-sm text-purple-600">
                    {t({
                      english: "Estimated Value",
                      vietnamese: "Giá Trị Ước Tính"
                    })}
                  </div>
                </motion.div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  {t({
                    english: "Quick Actions",
                    vietnamese: "Hành Động Nhanh"
                  })}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    onClick={() => setActiveTab('achievements')}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    {t({
                      english: "View Achievements",
                      vietnamese: "Xem Thành Tích"
                    })}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setActiveTab('leaderboard')}
                    className="border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    <Crown className="h-4 w-4 mr-2" />
                    {t({
                      english: "Check Leaderboard",
                      vietnamese: "Xem Bảng Xếp Hạng"
                    })}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                {t({
                  english: "Referral Leaderboard",
                  vietnamese: "Bảng Xếp Hạng Giới Thiệu"
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((entry, index) => (
                  <motion.div
                    key={entry.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-between p-4 rounded-xl border ${
                      entry.name === 'You' 
                        ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                        entry.rank <= 3 ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' : 'bg-gray-200'
                      }`}>
                        {entry.badge}
                      </div>
                      <div>
                        <div className="font-semibold">{entry.name}</div>
                        <div className="text-sm text-gray-500">
                          {entry.referrals} {t({
                            english: "referrals",
                            vietnamese: "giới thiệu"
                          })}
                        </div>
                      </div>
                    </div>
                    <Badge variant={entry.name === 'You' ? 'default' : 'outline'}>
                      #{entry.rank}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-purple-500" />
                {t({
                  english: "Achievement Levels",
                  vietnamese: "Cấp Độ Thành Tích"
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.level}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          achievement.unlocked 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          {achievement.unlocked ? <CheckCircle className="h-5 w-5" /> : achievement.level}
                        </div>
                        <div>
                          <h4 className="font-semibold">{achievement.name}</h4>
                          <p className="text-sm text-gray-600">
                            {achievement.requirement} {t({
                              english: "referrals required",
                              vietnamese: "giới thiệu cần thiết"
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={achievement.unlocked ? 'default' : 'outline'}>
                          {achievement.reward}
                        </Badge>
                        {achievement.unlocked && (
                          <div className="text-sm text-green-600 mt-1">✅ Unlocked</div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                {t({
                  english: "Referral History",
                  vietnamese: "Lịch Sử Giới Thiệu"
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ReferralList referrals={referrals} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ArtistReferrals;
