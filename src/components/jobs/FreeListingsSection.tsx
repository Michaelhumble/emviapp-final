
import React, { useState, useEffect } from "react";
import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useJobQueries } from "@/hooks/jobs/useJobQueries";
import { useJobMutations } from "@/hooks/jobs/useJobMutations";
import { useJobPermissions } from "@/hooks/useJobPermissions";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface FreeListingsSectionProps {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
}

const FreeListingsSection = ({ jobs, onViewDetails }: FreeListingsSectionProps) => {
  const navigate = useNavigate();
  const { fetchJobs } = useJobQueries();
  const { deleteJob } = useJobMutations();
  const { canEditJob, canDeleteJob } = useJobPermissions();
  const [freeJobs, setFreeJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch free jobs from database
  useEffect(() => {
    const loadFreeJobs = async () => {
      console.log('🔄 FreeListingsSection: Loading free jobs...');
      setLoading(true);
      
      try {
        const fetchedJobs = await fetchJobs({ 
          pricingTier: 'free', 
          status: 'active' 
        });
        console.log('📊 FreeListingsSection: Fetched free jobs:', fetchedJobs);
        setFreeJobs(fetchedJobs);
      } catch (error) {
        console.error('❌ FreeListingsSection: Error loading free jobs:', error);
        toast.error('Failed to load free job listings');
      } finally {
        setLoading(false);
      }
    };

    loadFreeJobs();
  }, [fetchJobs]);

  const handleEdit = (job: Job) => {
    navigate(`/jobs/edit-free/${job.id}`);
  };

  const handleDelete = async (job: Job) => {
    if (confirm('Are you sure you want to delete this job posting?')) {
      const success = await deleteJob(job.id);
      if (success) {
        // Refresh the list
        const fetchedJobs = await fetchJobs({ 
          pricingTier: 'free', 
          status: 'active' 
        });
        setFreeJobs(fetchedJobs);
      }
    }
  };

  if (loading) {
    return (
      <motion.section className="mt-8 mb-12">
        <h2 className="text-2xl lg:text-3xl font-playfair font-semibold mb-6">
          💚 Free Job Listings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-video bg-gray-200"></div>
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      className="mt-8 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl lg:text-3xl font-playfair font-semibold">
          💚 Free Job Listings ({freeJobs.length})
        </h2>
        <Button 
          onClick={() => navigate('/jobs/post-free')}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Post Free Job
        </Button>
      </div>

      {freeJobs.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500 mb-4">No free job listings available yet.</p>
          <Button 
            onClick={() => navigate('/jobs/post-free')}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Post the First Free Job
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {freeJobs.map((job, index) => (
            <Card
              key={job.id}
              className="overflow-hidden border border-green-200 shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <div className="aspect-video relative bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="text-green-600 text-4xl mb-2">💼</div>
                  <Badge className="bg-green-500 text-white border-0">
                    Free
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-3">
                  <h3 className="font-playfair font-semibold text-lg line-clamp-2">{job.title}</h3>
                  <p className="text-gray-600 font-medium">{job.company || 'Company'}</p>
                </div>

                <div className="flex items-center text-base text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" /> {job.location}
                </div>

                {job.compensation_details && (
                  <div className="flex items-center text-base text-gray-600 mb-2">
                    <span className="text-lg mr-1">💰</span> {job.compensation_details}
                  </div>
                )}

                <div className="flex items-center text-base text-gray-600 mb-4">
                  <Calendar className="h-4 w-4 mr-1" /> {new Date(job.created_at).toLocaleDateString()}
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1 font-bold bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => onViewDetails(job)}
                  >
                    View Details
                  </Button>
                  
                  {canEditJob(job) && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(job)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                  
                  {canDeleteJob(job) && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(job)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default FreeListingsSection;
