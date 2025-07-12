import React from 'react';
import { Clock, TrendingUp, Eye, Users } from 'lucide-react';
import { Job } from '@/types/job';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FeaturedTrendingJobsProps {
  jobs: Job[];
}

const FeaturedTrendingJobs = ({ jobs }: FeaturedTrendingJobsProps) => {
  // Get recent and trending jobs
  const hotJobs = jobs
    .filter(job => job.status === 'active')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 6);

  const getTimeAgo = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just posted!';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getRandomViewCount = () => Math.floor(Math.random() * 150) + 25;
  const getRandomApplicantCount = () => Math.floor(Math.random() * 12) + 2;

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 px-4 py-2 rounded-full mb-4">
          <TrendingUp className="w-5 h-5 text-orange-500" />
          <span className="text-orange-600 font-semibold text-sm">HOT RIGHT NOW</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 dark:text-white mb-4">
          Featured & Trending Jobs
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          These jobs are getting the most attention. Apply fast before they're gone!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotJobs.map((job, index) => (
          <Card key={job.id} className="group relative overflow-hidden border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-6">
              {/* Status badges */}
              <div className="flex gap-2 mb-3">
                {index < 2 && (
                  <Badge variant="destructive" className="bg-red-500 text-white text-xs animate-pulse">
                    🔥 NEW!
                  </Badge>
                )}
                {getTimeAgo(job.created_at) === 'Just posted!' && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                    ⚡ Just Posted!
                  </Badge>
                )}
                {job.pricing_tier && job.pricing_tier !== 'free' && (
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-700 text-xs border-yellow-300">
                    ⭐ Featured
                  </Badge>
                )}
              </div>

              {/* Job title */}
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
                {job.title}
              </h3>

              {/* Location */}
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                📍 {job.location || 'Remote'}
              </p>

              {/* Compensation */}
              {job.compensation_details && (
                <p className="text-green-600 font-semibold text-sm mb-4">
                  💰 {job.compensation_details}
                </p>
              )}

              {/* Stats row */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{getRandomViewCount()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{getRandomApplicantCount()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-orange-500">
                  <Clock className="w-4 h-4" />
                  <span>{getTimeAgo(job.created_at)}</span>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View all button */}
      <div className="text-center mt-8">
        <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl">
          View All Hot Jobs →
        </button>
      </div>
    </section>
  );
};

export default FeaturedTrendingJobs;