import React, { useState, useEffect } from 'react';
import { Activity, Users, Briefcase, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const RealTimeActivity = () => {
  const [counters, setCounters] = useState({
    applicationsToday: 145,
    newJobsToday: 23,
    viewsToday: 2847,
    onlineNow: 156
  });

  const [activityFeed, setActivityFeed] = useState([
    "Sarah M. just applied to Senior Nail Tech position",
    "Elite Salon posted a new Hair Stylist job",
    "Mike R. just viewed Massage Therapist role",
    "Luxury Spa received 5 new applications",
    "Jessica L. just applied to Lash Artist position"
  ]);

  const [currentActivity, setCurrentActivity] = useState(0);

  // Simulate real-time counter updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCounters(prev => ({
        applicationsToday: prev.applicationsToday + Math.floor(Math.random() * 3),
        newJobsToday: prev.newJobsToday + (Math.random() > 0.9 ? 1 : 0),
        viewsToday: prev.viewsToday + Math.floor(Math.random() * 5) + 1,
        onlineNow: prev.onlineNow + Math.floor(Math.random() * 6) - 3
      }));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Rotate activity feed
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % activityFeed.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [activityFeed.length]);

  const CounterCard = ({ icon: Icon, label, value, color, animate = false }: {
    icon: any;
    label: string;
    value: number;
    color: string;
    animate?: boolean;
  }) => (
    <Card className={`relative overflow-hidden border-2 ${color} bg-gradient-to-br from-white to-gray-50/50 dark:from-slate-800 dark:to-slate-700`}>
      <CardContent className="p-6 text-center">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${color.replace('border-', 'bg-').replace('/50', '/10')}`}>
          <Icon className={`w-6 h-6 ${color.replace('border-', 'text-').replace('/50', '')}`} />
        </div>
        <div className={`text-3xl font-bold ${color.replace('border-', 'text-').replace('/50', '')} ${animate ? 'animate-pulse' : ''}`}>
          {value.toLocaleString()}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
          {label}
        </div>
        {animate && (
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-16 bg-gradient-to-br from-blue-50/30 to-indigo-50/50 dark:from-slate-900/30 dark:to-slate-800/50">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 px-4 py-2 rounded-full mb-4">
          <Activity className="w-5 h-5 text-blue-500 animate-pulse" />
          <span className="text-blue-600 font-semibold text-sm">LIVE ACTIVITY</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 dark:text-white mb-4">
          Real-Time Platform Activity
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          See what's happening right now on EmviApp
        </p>
      </div>

      {/* Live Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <CounterCard
          icon={Users}
          label="Artists Applied Today"
          value={counters.applicationsToday}
          color="border-green-500/50"
          animate={true}
        />
        <CounterCard
          icon={Briefcase}
          label="New Jobs Posted"
          value={counters.newJobsToday}
          color="border-blue-500/50"
        />
        <CounterCard
          icon={TrendingUp}
          label="Job Views Today"
          value={counters.viewsToday}
          color="border-purple-500/50"
          animate={true}
        />
        <CounterCard
          icon={Activity}
          label="Users Online Now"
          value={counters.onlineNow}
          color="border-orange-500/50"
        />
      </div>

      {/* Live Activity Feed */}
      <Card className="max-w-3xl mx-auto overflow-hidden border-2 border-gray-200/50 bg-gradient-to-br from-white to-gray-50/30 dark:from-slate-800 dark:to-slate-700">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Live Activity Feed</h3>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            
            <div className="relative h-20 flex items-center justify-center">
              <div className="text-lg text-gray-700 dark:text-gray-300 animate-fade-in">
                🔔 {activityFeed[currentActivity]}
              </div>
            </div>
            
            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              Updates every few seconds • {activityFeed.length} recent activities
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to action */}
      <div className="text-center mt-12">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Join the activity! Post a job or start applying today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300">
            Post a Job
          </button>
          <button className="bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-300">
            Browse Jobs
          </button>
        </div>
      </div>
    </section>
  );
};

export default RealTimeActivity;