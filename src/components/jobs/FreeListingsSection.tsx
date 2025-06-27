
import React from "react";
import { Job } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, DollarSign, Building2, Edit, Trash2 } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { useJobPermissions } from "@/hooks/useJobPermissions";

interface FreeListingsSectionProps {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
}

const FreeListingsSection: React.FC<FreeListingsSectionProps> = ({ 
  jobs, 
  onViewDetails 
}) => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const { canEditJob, canDeleteJob } = useJobPermissions();

  const handleEdit = (job: Job, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/jobs/edit-free/${job.id}`);
  };

  const handleDelete = (job: Job, e: React.MouseEvent) => {
    e.stopPropagation();
    // This will be handled by the EditFreeJob component
    navigate(`/jobs/edit-free/${job.id}`);
  };

  if (!jobs || jobs.length === 0) {
    return (
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Free Job Listings</h2>
          <Button 
            onClick={() => navigate('/jobs/post-free')}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Post a Free Job
          </Button>
        </div>
        
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No free job listings available at the moment.</p>
          <Button 
            onClick={() => navigate('/jobs/post-free')}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Be the first to post a free job
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Free Job Listings
          <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
            {jobs.length} jobs
          </span>
        </h2>
        <Button 
          onClick={() => navigate('/jobs/post-free')}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Post a Free Job
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {jobs.map((job) => (
          <Card 
            key={job.id} 
            className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 border-l-green-500 relative"
            onClick={() => onViewDetails(job)}
          >
            <CardContent className="p-4">
              {/* Action buttons for owners/admin */}
              {(canEditJob(job) || canDeleteJob(job)) && (
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {canEditJob(job) && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => handleEdit(job, e)}
                      className="h-8 w-8 p-0 hover:bg-blue-100"
                    >
                      <Edit size={14} className="text-blue-600" />
                    </Button>
                  )}
                  {canDeleteJob(job) && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => handleDelete(job, e)}
                      className="h-8 w-8 p-0 hover:bg-red-100"
                    >
                      <Trash2 size={14} className="text-red-600" />
                    </Button>
                  )}
                </div>
              )}

              {/* Job Image */}
              {job.image && (
                <div className="w-full h-32 mb-3 rounded-lg overflow-hidden bg-gray-100">
                  <img 
                    src={job.image} 
                    alt={job.title || 'Job listing'} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Job Title */}
              <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                {job.title || 'Job Title'}
              </h3>

              {/* Company/Salon */}
              {job.company && (
                <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                  <Building2 size={12} />
                  <span className="truncate">{job.company}</span>
                </div>
              )}

              {/* Location */}
              <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                <MapPin size={12} />
                <span className="truncate">{job.location || 'Location'}</span>
              </div>

              {/* Salary Range */}
              {job.salary_range && (
                <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                  <DollarSign size={12} />
                  <span className="truncate">{job.salary_range}</span>
                </div>
              )}

              {/* Posted Date */}
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                <Clock size={12} />
                <span>
                  {job.created_at 
                    ? new Date(job.created_at).toLocaleDateString()
                    : 'Recently posted'
                  }
                </span>
              </div>

              {/* Description Preview */}
              {job.description && (
                <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                  {job.description}
                </p>
              )}

              {/* Free Badge */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Free Listing
                </span>
                
                {/* Contact Info Indicator */}
                {job.contact_info?.phone && (
                  <span className="text-xs text-gray-500">
                    📞 Contact available
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FreeListingsSection;
