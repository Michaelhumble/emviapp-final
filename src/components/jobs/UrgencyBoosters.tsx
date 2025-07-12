import React from 'react';
import { Clock, Zap, Flame, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Job } from '@/types/job';

interface UrgencyBoostersProps {
  jobs: Job[];
}

const UrgencyBoosters = ({ jobs }: UrgencyBoostersProps) => {
  // Get recent featured jobs for urgency
  const urgentJobs = jobs
    .filter(job => job.status === 'active' && job.pricing_tier && job.pricing_tier !== 'free')
    .slice(0, 4);

  const getTimeLeft = () => {
    const hours = Math.floor(Math.random() * 48) + 12;
    return `${hours}h`;
  };

  const getSpotsLeft = () => Math.floor(Math.random() * 3) + 1;

  const getUrgencyLevel = (index: number) => {
    if (index === 0) return { level: 'critical', color: 'red', icon: AlertTriangle };
    if (index === 1) return { level: 'high', color: 'orange', icon: Flame };
    return { level: 'medium', color: 'yellow', icon: Clock };
  };

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/10 to-orange-500/10 px-4 py-2 rounded-full mb-4">
          <Zap className="w-5 h-5 text-red-500 animate-pulse" />
          <span className="text-red-600 font-semibold text-sm">URGENT OPPORTUNITIES</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 dark:text-white mb-4">
          Act Fast - Limited Time Offers
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          These premium positions are filling fast. Don't miss your chance!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {urgentJobs.map((job, index) => {
          const urgency = getUrgencyLevel(index);
          const spotsLeft = getSpotsLeft();
          const timeLeft = getTimeLeft();
          
          return (
            <Card key={job.id} className={`relative overflow-hidden border-2 border-${urgency.color}-200 bg-gradient-to-br from-white to-${urgency.color}-50/30 dark:from-slate-800 dark:to-slate-700 shadow-lg hover:shadow-xl transition-all duration-300`}>
              <CardContent className="p-6">
                {/* Urgency header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <urgency.icon className={`w-5 h-5 text-${urgency.color}-500 animate-pulse`} />
                    <Badge variant="destructive" className={`bg-${urgency.color}-500 text-white animate-pulse`}>
                      {urgency.level.toUpperCase()} URGENCY
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className={`text-${urgency.color}-600 font-bold text-sm`}>⏰ {timeLeft} left</div>
                  </div>
                </div>

                {/* Spots remaining alert */}
                <div className={`bg-${urgency.color}-100 border border-${urgency.color}-300 p-3 rounded-lg mb-4`}>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={`w-4 h-4 text-${urgency.color}-600`} />
                    <span className={`text-${urgency.color}-800 font-semibold text-sm`}>
                      Only {spotsLeft} spot{spotsLeft > 1 ? 's' : ''} remaining!
                    </span>
                  </div>
                </div>

                {/* Job details */}
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {job.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  📍 {job.location || 'Remote'}
                </p>

                {/* Premium features */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">Most popular job this week</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-700 dark:text-gray-300">Filled in 48 hours average</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300">High-priority hiring</span>
                  </div>
                </div>

                {/* Compensation preview */}
                {job.compensation_details && (
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 font-semibold">💰 {job.compensation_details}</span>
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-3">
                  <button className={`flex-1 bg-gradient-to-r from-${urgency.color}-500 to-${urgency.color}-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-${urgency.color}-600 hover:to-${urgency.color}-700 transition-all duration-300 shadow-lg`}>
                    Apply Now
                  </button>
                  <button className="bg-white dark:bg-slate-700 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-slate-600 transition-all duration-300">
                    Save Job
                  </button>
                </div>

                {/* Urgency indicator bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Urgency Level</span>
                    <span>{urgency.level}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r from-${urgency.color}-400 to-${urgency.color}-600 h-2 rounded-full transition-all duration-1000`}
                      style={{ 
                        width: urgency.level === 'critical' ? '90%' : urgency.level === 'high' ? '70%' : '50%'
                      }}
                    ></div>
                  </div>
                </div>
              </CardContent>

              {/* Animated border effect */}
              <div className={`absolute inset-0 border-2 border-${urgency.color}-400 rounded-lg opacity-75 animate-pulse pointer-events-none`}></div>
            </Card>
          );
        })}
      </div>

      {/* Call to action for posting */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-2xl border-2 border-red-200/50 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Want Your Job to Fill This Fast?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
            Upgrade to Premium or Featured listings and get the urgency boost that attracts top talent immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:from-red-700 hover:to-orange-700 transition-all duration-300 shadow-lg">
              🚀 Upgrade My Job Posting
            </button>
            <button className="bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 border-2 border-red-600 dark:border-red-400 px-8 py-4 rounded-xl font-bold hover:bg-red-50 dark:hover:bg-slate-700 transition-all duration-300">
              Learn About Premium Features
            </button>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground text-center mt-6">
          Sample positions shown for illustration. Sign in to see live, real opportunities now.
        </p>
      </div>
    </section>
  );
};

export default UrgencyBoosters;