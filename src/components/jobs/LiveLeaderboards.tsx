import React from 'react';
import { Trophy, Crown, Award, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const LiveLeaderboards = () => {
  // Mock data for top hiring salons
  const topSalons = [
    { name: "Luxe Nail Studio", hires: 23, badge: "gold", trending: true },
    { name: "Signature Salon", hires: 19, badge: "silver", trending: false },
    { name: "Modern Beauty Lounge", hires: 15, badge: "bronze", trending: true },
    { name: "Glamour Nails Spa", hires: 12, badge: null, trending: false },
    { name: "Artisan Beauty Bar", hires: 10, badge: null, trending: true },
  ];

  // Mock data for most popular jobs
  const popularJobs = [
    { title: "Senior Nail Technician", applications: 47, location: "Beverly Hills", trending: true },
    { title: "Hair Stylist - Premium Salon", applications: 42, location: "Manhattan", trending: false },
    { title: "Master Colorist", applications: 38, location: "Miami Beach", trending: true },
    { title: "Nail Artist - Luxury Spa", applications: 35, location: "Chicago", trending: false },
    { title: "Lash Extension Specialist", applications: 31, location: "Austin", trending: true },
  ];

  const getBadgeIcon = (badge: string | null, index: number) => {
    if (badge === "gold" || index === 0) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (badge === "silver" || index === 1) return <Award className="w-5 h-5 text-gray-400" />;
    if (badge === "bronze" || index === 2) return <Trophy className="w-5 h-5 text-amber-600" />;
    return <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-600">{index + 1}</div>;
  };

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-16 bg-gradient-to-br from-gray-50/50 to-purple-50/30 dark:from-slate-900/50 dark:to-slate-800/30">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 px-4 py-2 rounded-full mb-4">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-yellow-600 font-semibold text-sm">LIVE RANKINGS</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 dark:text-white mb-4">
          This Week's Leaderboards
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          See who's hiring the most and which jobs are getting the most attention
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Hiring Salons */}
        <Card className="overflow-hidden border-2 border-yellow-200/50 bg-gradient-to-br from-white to-yellow-50/30 dark:from-slate-800 dark:to-slate-700">
          <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            <CardTitle className="flex items-center gap-2">
              <Crown className="w-6 h-6" />
              Top Hiring Salons This Week
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {topSalons.map((salon, index) => (
                <div key={salon.name} className="flex items-center justify-between p-4 rounded-xl bg-white/80 dark:bg-slate-700/50 border border-gray-200/50 hover:border-yellow-300/50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30">
                      {getBadgeIcon(salon.badge, index)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        {salon.name}
                        {salon.trending && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Hot
                          </Badge>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{salon.hires} new hires</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yellow-600">{index + 1}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Most Popular Jobs */}
        <Card className="overflow-hidden border-2 border-purple-200/50 bg-gradient-to-br from-white to-purple-50/30 dark:from-slate-800 dark:to-slate-700">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Most Popular Jobs Right Now
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {popularJobs.map((job, index) => (
                <div key={job.title} className="flex items-center justify-between p-4 rounded-xl bg-white/80 dark:bg-slate-700/50 border border-gray-200/50 hover:border-purple-300/50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30">
                      {getBadgeIcon(null, index)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        {job.title}
                        {job.trending && (
                          <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs animate-pulse">
                            🔥 Viral
                          </Badge>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">📍 {job.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-purple-600">{job.applications}</div>
                    <div className="text-xs text-gray-500">applications</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <p className="text-sm text-muted-foreground text-center mt-8">
        Live activity data shown for illustration.
      </p>
    </section>
  );
};

export default LiveLeaderboards;