import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Briefcase, Users, Eye, Edit, Trash2, Calendar, ExternalLink, Lock, MapPin } from 'lucide-react';
import { useSalonJobs } from '@/hooks/useSalonJobs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SalonJobManager = () => {
  const navigate = useNavigate();
  const { jobs, applications, loading, updateJob, deleteJob, updateApplicationStatus, refetch } = useSalonJobs();
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
  const [isJobDetailOpen, setIsJobDetailOpen] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    date: "",
    time: "",
    type: "interview",
    notes: ""
  });

  const handlePostJob = () => {
    // Redirect to the main paid job posting flow
    navigate('/post-job');
  };

  const handleEditJob = async (jobId: string) => {
    // TODO: Open edit modal or navigate to edit page
    console.log('Edit job:', jobId);
  };

  const handleDeleteJob = async (jobId: string) => {
    await deleteJob(jobId);
  };

  const handleViewApplicant = (applicantId: string) => {
    // TODO: Open applicant profile modal
    console.log('View applicant:', applicantId);
  };

  const handleViewJob = (job: any) => {
    setSelectedJob(job);
    setIsJobDetailOpen(true);
  };

  const handleScheduleInterview = (applicant: any) => {
    setSelectedApplicant(applicant);
    setIsScheduleDialogOpen(true);
  };

  const handleSaveSchedule = async () => {
    // TODO: Save schedule to database
    await updateApplicationStatus(selectedApplicant.id, 'interview');
    setIsScheduleDialogOpen(false);
    setSelectedApplicant(null);
    setScheduleForm({ date: "", time: "", type: "interview", notes: "" });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

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
              <p className="text-purple-100">Manage existing jobs posted through our secure payment system</p>
            </div>
            <Button 
              onClick={handlePostJob}
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </div>
          <div className="mt-4 p-3 bg-purple-500/20 rounded-lg border border-purple-400/30">
            <div className="flex items-center gap-2 mb-1">
              <Lock className="h-4 w-4" />
              <span className="text-sm font-medium">Secure Job Posting</span>
            </div>
            <p className="text-xs text-purple-100">
              To post a new job and reach top talent, please use our official Post a Job system with premium visibility and secure payment protection.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Jobs and Applications Tabs */}
      <Tabs defaultValue="jobs" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="jobs" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            My Job Posts ({jobs.length})
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
              {jobs.length > 0 ? (
                <div className="space-y-4">
                  {jobs.map((job) => (
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
                            <Badge variant="outline">{job.category}</Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{job.location || 'Location not specified'}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Posted: {new Date(job.created_at).toLocaleDateString()}</span>
                            <span>{applications.filter(app => app.job_id === job.id).length} applications</span>
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
                            onClick={() => handleViewJob(job)}
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
                  <p className="text-gray-500 mb-2">No active job postings. To post your first job, click below to use our secure posting system.</p>
                  <p className="text-sm text-gray-400 mb-4">All job posts go through our premium platform with Stripe payment protection</p>
                  <Button onClick={handlePostJob} className="bg-purple-600 hover:bg-purple-700">
                    <ExternalLink className="h-4 w-4 mr-2" />
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
                            <h3 className="text-lg font-semibold text-gray-800">Applicant #{application.applicant_id}</h3>
                            <Badge className={getStatusColor(application.status)}>
                              {application.status}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-1">Job ID: {application.job_id}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Applied: {new Date(application.created_at).toLocaleDateString()}</span>
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
                            onClick={() => handleScheduleInterview(application)}
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

      {/* Job Detail Dialog */}
      <Dialog open={isJobDetailOpen} onOpenChange={setIsJobDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedJob?.title}</DialogTitle>
            <DialogDescription>
              Job details and requirements
            </DialogDescription>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Briefcase className="h-4 w-4" />
                  <span>{selectedJob.type}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedJob.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{selectedJob.applications} applications</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Posted: {new Date(selectedJob.postedDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Job Description</h4>
                <p className="text-gray-600 text-sm mb-4">
                  We are looking for an experienced {selectedJob.title.toLowerCase()} to join our dynamic team. 
                  The ideal candidate will have excellent technical skills, a passion for beauty, and outstanding customer service abilities.
                </p>
                
                <h4 className="font-semibold mb-2">Requirements</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Valid {selectedJob.title.toLowerCase()} license</li>
                  <li>• Minimum 2+ years of experience</li>
                  <li>• Excellent communication skills</li>
                  <li>• Availability for flexible scheduling</li>
                  <li>• Team player with positive attitude</li>
                </ul>
                
                <h4 className="font-semibold mb-2 mt-4">Benefits</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Competitive compensation</li>
                  <li>• Flexible scheduling</li>
                  <li>• Professional development opportunities</li>
                  <li>• Team bonuses and incentives</li>
                </ul>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={() => handleEditJob(selectedJob.id)} className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Job
                </Button>
                <Button variant="outline" onClick={() => setIsJobDetailOpen(false)} className="flex-1">
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Schedule Interview Dialog */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule with {selectedApplicant?.applicantName}</DialogTitle>
            <DialogDescription>
              Set up an interview or trial appointment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="schedule-type">Type</Label>
              <Select value={scheduleForm.type} onValueChange={(value) => setScheduleForm(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="trial">Trial Shift</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="schedule-date">Date</Label>
                <Input
                  id="schedule-date"
                  type="date"
                  value={scheduleForm.date}
                  onChange={(e) => setScheduleForm(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="schedule-time">Time</Label>
                <Input
                  id="schedule-time"
                  type="time"
                  value={scheduleForm.time}
                  onChange={(e) => setScheduleForm(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="schedule-notes">Notes</Label>
              <Textarea
                id="schedule-notes"
                value={scheduleForm.notes}
                onChange={(e) => setScheduleForm(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any additional notes or instructions..."
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveSchedule} className="flex-1">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule {scheduleForm.type}
              </Button>
              <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalonJobManager;