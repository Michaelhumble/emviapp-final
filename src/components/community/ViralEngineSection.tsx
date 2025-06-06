
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Users, Share2, Gift, Zap, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const ViralEngineSection = () => {
  const [activeTab, setActiveTab] = useState("challenges");

  const currentChallenge = {
    title: "Share Your Best Client Result This Week",
    prize: "$100 Credits + VIP Status",
    participants: 234,
    timeLeft: "4 days",
    featured: {
      name: "Sarah Kim",
      result: "Hair transformation that got 2.1K likes",
      avatar: "💇‍♀️"
    }
  };

  const leaderboards = [
    {
      title: "Top Contributors",
      icon: <Trophy className="h-5 w-5" />,
      leaders: [
        { name: "Isabella M.", points: 2450, badge: "🏆", trend: "+50" },
        { name: "James T.", points: 2180, badge: "🥈", trend: "+23" },
        { name: "Sophia C.", points: 1940, badge: "🥉", trend: "+67" }
      ]
    },
    {
      title: "Top Inviters",
      icon: <Users className="h-5 w-5" />,
      leaders: [
        { name: "Marcus R.", invites: 47, badge: "👑", trend: "+12" },
        { name: "Elena V.", invites: 39, badge: "⭐", trend: "+8" },
        { name: "David K.", invites: 32, badge: "💎", trend: "+15" }
      ]
    },
    {
      title: "Top Helpers",
      icon: <Gift className="h-5 w-5" />,
      leaders: [
        { name: "Priya P.", helps: 89, badge: "💝", trend: "+21" },
        { name: "Carlos M.", helps: 76, badge: "🌟", trend: "+18" },
        { name: "Amy L.", helps: 65, badge: "✨", trend: "+9" }
      ]
    }
  ];

  const referralRewards = [
    { invites: 5, reward: "VIP Badge + $25 Credits" },
    { invites: 10, reward: "Gold Member + $75 Credits" },
    { invites: 25, reward: "Ambassador + $200 Credits" },
    { invites: 50, reward: "Elite + Secret Perks" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="h-8 w-8 text-yellow-500" />
            <span className="text-lg font-semibold text-purple-700 bg-purple-100 px-4 py-1 rounded-full">
              Viral Engine
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
            Compete, Win, and Get Rewarded
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Turn your passion into prizes—climb the leaderboards and unlock exclusive perks
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-full p-1 flex">
            {[
              { id: "challenges", label: "Challenges", icon: <Trophy className="h-4 w-4" /> },
              { id: "leaderboards", label: "Leaderboards", icon: <Crown className="h-4 w-4" /> },
              { id: "referrals", label: "Referrals", icon: <Share2 className="h-4 w-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-purple-600 shadow-md"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "challenges" && (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              {/* Current Challenge */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200 mb-8">
                <div className="text-center mb-6">
                  <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-bold inline-block mb-4">
                    🔥 FEATURED CHALLENGE
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentChallenge.title}</h3>
                  <p className="text-lg text-orange-600 font-semibold">{currentChallenge.prize}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{currentChallenge.participants}</div>
                    <p className="text-gray-600">Participants</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">{currentChallenge.timeLeft}</div>
                    <p className="text-gray-600">Time Left</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl">{currentChallenge.featured.avatar}</div>
                    <p className="font-semibold text-gray-900">{currentChallenge.featured.name}</p>
                    <p className="text-sm text-gray-600">{currentChallenge.featured.result}</p>
                  </div>
                </div>

                <div className="text-center">
                  <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600">
                    <Trophy className="mr-2 h-5 w-5" />
                    Join Challenge
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "leaderboards" && (
            <motion.div
              key="leaderboards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {leaderboards.map((board, index) => (
                <motion.div
                  key={board.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                      {board.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{board.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {board.leaders.map((leader, idx) => (
                      <div key={leader.name} className="flex items-center justify-between bg-white rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{leader.badge}</span>
                          <div>
                            <p className="font-semibold text-gray-900">{leader.name}</p>
                            <p className="text-sm text-gray-600">
                              {leader.points && `${leader.points} points`}
                              {leader.invites && `${leader.invites} invites`}
                              {leader.helps && `${leader.helps} helps`}
                            </p>
                          </div>
                        </div>
                        <div className="text-green-600 text-sm font-semibold">
                          {leader.trend}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "referrals" && (
            <motion.div
              key="referrals"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Referral Leaderboard</h3>
                  <p className="text-gray-600">Bring friends, climb the ranks, unlock secret perks</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Unlock Rewards</h4>
                    <div className="space-y-3">
                      {referralRewards.map((reward, index) => (
                        <div key={reward.invites} className="flex items-center justify-between bg-white rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                              {reward.invites}
                            </div>
                            <span className="text-gray-900 font-medium">{reward.invites} invites</span>
                          </div>
                          <span className="text-blue-600 font-semibold text-sm">{reward.reward}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Your Referral Link</h4>
                    <div className="bg-white rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-600 mb-2">Share your unique link:</p>
                      <div className="bg-gray-50 rounded px-3 py-2 text-sm font-mono">
                        emviapp.com/join/your-code
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Referral Link
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ViralEngineSection;
