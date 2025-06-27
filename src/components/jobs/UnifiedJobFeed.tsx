
import React, { useState } from 'react';
import { Job } from '@/types/job';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, DollarSign, Building2, Clock, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { JobDetailModal } from './JobDetailModal';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface UnifiedJobFeedProps {
  jobs: Job[];
  onRenew?: (job: Job) => void;
  isRenewing?: boolean;
  renewalJobId?: string | null;
}

const UnifiedJobFeed = ({ jobs, onRenew, isRenewing, renewalJobId }: UnifiedJobFeedProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(job => 
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'Nail Tech': return 'bg-pink-100 text-pink-800';
      case 'Hair Stylist': return 'bg-purple-100 text-purple-800';
      case 'Lash Tech': return 'bg-blue-100 text-blue-800';
      case 'Barber': return 'bg-green-100 text-green-800';
      case 'Spa': return 'bg-teal-100 text-teal-800';
      case 'Esthetician': return 'bg-orange-100 text-orange-800';
      case 'Makeup': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with search */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800 text-sm mb-4">
          📢 We're working on even smarter job categories soon. For now, all beauty industry jobs are shown together for maximum visibility!
        </p>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by job title, company, location, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow duration-200">
            <div className="relative">
              {job.image && (
                <div className="aspect-video relative bg-gray-100 rounded-t-lg overflow-hidden">
                  <ImageWithFallback 
                    src={job.image} 
                    alt={job.title || job.company || "Job listing"} 
                    className="w-full h-full object-cover"
                    businessName={job.company}
                  />
                </div>
              )}
              
              {/* Category badge */}
              {job.category && (
                <div className="absolute top-3 left-3">
                  <Badge className={`text-xs font-medium ${getCategoryColor(job.category)}`}>
                    {job.category}
                  </Badge>
                </div>
              )}

              {/* Pricing tier badge */}
              {job.pricingTier && job.pricingTier !== 'free' && (
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="text-xs">
                    {job.pricingTier === 'diamond' && '💎'}
                    {job.pricingTier === 'premium' && '⭐'}
                    {job.pricingTier === 'gold' && '🏆'}
                    {job.pricingTier}
                  </Badge>
                </div>
              )}
            </div>

            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-lg line-clamp-2">
                  {job.title || 'Untitled Position'}
                </h3>
                {job.company && (
                  <div className="flex items-center gap-1 text-gray-600 mt-1">
                    <Building2 className="h-4 w-4" />
                    <span className="text-sm">{job.company}</span>
                  </div>
                )}
              </div>

              {job.location && (
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{job.location}</span>
                </div>
              )}

              {(job.salary_range || job.compensation_details) && (
                <div className="flex items-center gap-1 text-green-600">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {job.salary_range || job.compensation_details}
                  </span>
                </div>
              )}

              {job.contact_info?.phone && (
                <div className="flex items-center gap-1 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">{job.contact_info.phone}</span>
                </div>
              )}

              {job.description && (
                <p className="text-gray-600 text-sm line-clamp-2">
                  {job.description}
                </p>
              )}

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="h-3 w-3" />
                  {job.created_at ? formatDate(job.created_at) : 'Recently posted'}
                </div>

                <Button 
                  size="sm" 
                  onClick={() => setSelectedJob(job)}
                  className="text-xs"
                >
                  View Details
                </Button>
              </div>

              {/* Renewal button for expired jobs */}
              {job.status === 'expired' && onRenew && (
                <Button
                  onClick={() => onRenew(job)}
                  disabled={isRenewing && renewalJobId === job.id}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  {isRenewing && renewalJobId === job.id ? 'Renewing...' : 'Renew Job'}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            {searchTerm ? 'No jobs found matching your search.' : 'No jobs available at the moment.'}
          </p>
          {searchTerm && (
            <Button variant="outline" onClick={() => setSearchTerm('')}>
              Clear Search
            </Button>
          )}
        </div>
      )}

      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
};

export default UnifiedJobFeed;
