
import React from "react";
import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import JobCardContact from "./JobCardContact";
import { useJobPermissions } from "@/hooks/useJobPermissions";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface FreeListingsSectionProps {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
}

const FreeListingsSection = ({ jobs, onViewDetails }: FreeListingsSectionProps) => {
  const { canEditJob, canDeleteJob } = useJobPermissions();
  const navigate = useNavigate();

  if (!jobs.length) return null;

  const handleEditJob = (job: Job) => {
    // Navigate to edit form with job ID
    navigate(`/jobs/edit-free/${job.id}`);
  };

  const handleDeleteJob = async (job: Job) => {
    if (!window.confirm('Are you sure you want to delete this job posting?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', job.id);

      if (error) {
        console.error('Error deleting job:', error);
        toast.error('Failed to delete job');
        return;
      }

      toast.success('Job deleted successfully');
      // Trigger a page refresh or update the jobs list
      window.location.reload();
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete job');
    }
  };

  const getContactInfo = (job: Job) => {
    // Safely handle contact_info which might be stored as JSON string or object
    if (!job.contact_info) return { phone: null };
    
    if (typeof job.contact_info === 'string') {
      try {
        const parsed = JSON.parse(job.contact_info);
        return parsed;
      } catch {
        return { phone: null };
      }
    }
    
    if (typeof job.contact_info === 'object') {
      return job.contact_info;
    }
    
    return { phone: null };
  };

  return (
    <motion.section
      className="mt-8 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl lg:text-3xl font-playfair font-semibold">Free Listings</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {jobs.map((job) => {
          const contactInfo = getContactInfo(job);
          
          return (
            <Card
              key={job.id}
              className="border border-gray-200 hover:border-gray-300 transition-all duration-300 overflow-hidden"
            >
              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="font-playfair font-semibold text-lg line-clamp-2">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                </div>

                <div className="flex items-center text-base text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" /> {job.location}
                </div>

                {job.compensation_details && (
                  <div className="flex items-center text-base text-gray-600 mb-2">
                    <span className="text-lg mr-1">💰</span> {job.compensation_details}
                  </div>
                )}

                <div className="flex items-center text-base text-gray-600 mb-3">
                  <Calendar className="h-4 w-4 mr-1" /> {new Date(job.created_at).toLocaleDateString()}
                </div>

                <div className="flex justify-between items-center mt-3">
                  <div>
                    {contactInfo.phone && (
                      <JobCardContact phoneNumber={contactInfo.phone} />
                    )}
                  </div>
                  
                  <Button
                    className="font-bold bg-purple-500 hover:bg-purple-600 text-white"
                    onClick={() => onViewDetails(job)}
                  >
                    Xem Chi Tiết
                  </Button>
                </div>

                {/* Edit/Delete buttons for authorized users */}
                {(canEditJob(job) || canDeleteJob(job)) && (
                  <div className="flex gap-2 mt-3 pt-3 border-t">
                    {canEditJob(job) && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditJob(job)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-3 w-3" />
                        Edit
                      </Button>
                    )}
                    {canDeleteJob(job) && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteJob(job)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </motion.section>
  );
};

export default FreeListingsSection;
