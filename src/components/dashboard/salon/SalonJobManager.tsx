import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Briefcase, Users, Eye, Edit, Trash2, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const SalonJobManager = () => {
  const navigate = useNavigate();
  const [activeJobs] = useState([
    {
      id: 1,
      title: 'Senior Nail Technician',
      type: 'Full-time',
      location: 'San Francisco, CA',
      postedDate: '2024-01-10',
      applications: 12,
      status: 'active'
    },
    {
      id: 2,
      title: 'Massage Therapist',
      type: 'Part-time',
      location: 'San Francisco, CA',
      postedDate: '2024-01-08',
      applications: 8,
      status: 'active'
    }
  ]);

  const [applications] = useState([
    {
      id: 1,
      jobTitle: 'Senior Nail Technician',
      applicantName: 'Sarah Johnson',
      experience: '5 years',
      appliedDate: '2024-01-12',
      status: 'pending'
    },
    {
      id: 2,
      jobTitle: 'Senior Nail Technician',
      applicantName: 'Maria Garcia',
      experience: '3 years',
      appliedDate: '2024-01-11',
      status: 'reviewed'
    },
    {
      id: 3,
      jobTitle: 'Massage Therapist',
      applicantName: 'Lisa Chen',
      experience: '7 years',
      appliedDate: '2024-01-10',
      status: 'interview'
    }
  ]);

  const handlePostJob = () => {
    navigate('/post-job');
  };

  const handleEditJob = (jobId: number) => {
    toast.success("Redirecting to job editor...");
  };

  const handleDeleteJob = (jobId: number) => {
    toast.success("Job posting deleted successfully");
  };

  const handleViewApplicant = (applicantId: number) => {
    toast.success("Opening applicant profile...");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'interview': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Post Job Button */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Job Management Center</h2>
              <p className="text-purple-100">Post jobs and manage applications from talented professionals</p>
            </div>
            <Button 
              onClick={handlePostJob}
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
            >
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Jobs and Applications Tabs */}
      <Tabs defaultValue="jobs" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="jobs" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            My Job Posts ({activeJobs.length})
          </TabsTrigger>
          <TabsTrigger value="applications" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Applications ({applications.length})
          </TabsTrigger>
        </TabsList>

        {/* Active Jobs Tab */}
        <TabsContent value="jobs" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Active Job Postings</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {activeJobs.length > 0 ? (
                <div className="space-y-4">
                  {activeJobs.map((job) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                            <Badge className={getStatusColor(job.status)}>
                              {job.status}
                            </Badge>
                            <Badge variant="outline">{job.type}</Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{job.location}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                            <span>{job.applications} applications</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditJob(job.id)}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeleteJob(job.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Briefcase className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No active job postings</h3>
                  <p className="text-gray-500 mb-4">Start by posting your first job to attract talented professionals</p>
                  <Button onClick={handlePostJob}>
                    <Plus className="h-4 w-4 mr-2" />
                    Post Your First Job
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Applications Tab */}
        <TabsContent value="applications" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {applications.length > 0 ? (
                <div className="space-y-4">
                  {applications.map((application) => (
                    <motion.div
                      key={application.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">{application.applicantName}</h3>
                            <Badge className={getStatusColor(application.status)}>
                              {application.status}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-1">Applied for: {application.jobTitle}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Experience: {application.experience}</span>
                            <span>Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewApplicant(application.id)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View Profile
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            <Calendar className="h-3 w-3 mr-1" />
                            Schedule
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No applications yet</h3>
                  <p className="text-gray-500">Applications will appear here once you post jobs</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalonJobManager;