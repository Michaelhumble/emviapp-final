import React, { useState } from 'react';
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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface SalonJobPostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onJobCreated: () => void;
}

const SalonJobPostModal: React.FC<SalonJobPostModalProps> = ({
  open,
  onOpenChange,
  onJobCreated
}) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
    requirements: "",
    compensation_type: "",
    compensation_details: "",
    contact_info: {
      owner_name: "",
      phone: "",
      email: "",
      notes: ""
    }
  });

  const handleSubmit = async () => {
    if (!user?.id) {
      toast.error('You must be logged in to post a job');
      return;
    }

    if (!jobForm.title || !jobForm.category || !jobForm.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('jobs')
        .insert({
          user_id: user.id,
          title: jobForm.title,
          category: jobForm.category,
          location: jobForm.location,
          description: jobForm.description,
          requirements: jobForm.requirements,
          compensation_type: jobForm.compensation_type,
          compensation_details: jobForm.compensation_details,
          contact_info: jobForm.contact_info,
          status: 'active'
        });

      if (error) throw error;

      toast.success('Job posted successfully!');
      onJobCreated();
      onOpenChange(false);
      
      // Reset form
      setJobForm({
        title: "",
        category: "",
        location: "",
        description: "",
        requirements: "",
        compensation_type: "",
        compensation_details: "",
        contact_info: {
          owner_name: "",
          phone: "",
          email: "",
          notes: ""
        }
      });
    } catch (error: any) {
      console.error('Error posting job:', error);
      toast.error('Failed to post job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Post New Job</DialogTitle>
          <DialogDescription>
            Create a new job posting to attract talented professionals
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="job-title">Job Title *</Label>
              <Input
                id="job-title"
                value={jobForm.title}
                onChange={(e) => setJobForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Senior Nail Technician"
              />
            </div>
            <div>
              <Label htmlFor="job-category">Category *</Label>
              <Select value={jobForm.category} onValueChange={(value) => setJobForm(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nails">Nails</SelectItem>
                  <SelectItem value="hair">Hair</SelectItem>
                  <SelectItem value="massage">Massage</SelectItem>
                  <SelectItem value="facial-skincare">Facial & Skincare</SelectItem>
                  <SelectItem value="makeup">Makeup</SelectItem>
                  <SelectItem value="brow-lashes">Brow & Lashes</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                  <SelectItem value="receptionist">Receptionist</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="job-location">Location</Label>
            <Input
              id="job-location"
              value={jobForm.location}
              onChange={(e) => setJobForm(prev => ({ ...prev, location: e.target.value }))}
              placeholder="City, State"
            />
          </div>

          <div>
            <Label htmlFor="job-description">Job Description *</Label>
            <Textarea
              id="job-description"
              value={jobForm.description}
              onChange={(e) => setJobForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the role, responsibilities, and what makes your salon special..."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="job-requirements">Requirements</Label>
            <Textarea
              id="job-requirements"
              value={jobForm.requirements}
              onChange={(e) => setJobForm(prev => ({ ...prev, requirements: e.target.value }))}
              placeholder="Required skills, experience, certifications..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="compensation-type">Compensation Type</Label>
              <Select value={jobForm.compensation_type} onValueChange={(value) => setJobForm(prev => ({ ...prev, compensation_type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="commission">Commission</SelectItem>
                  <SelectItem value="salary">Salary</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="compensation-details">Compensation Details</Label>
              <Input
                id="compensation-details"
                value={jobForm.compensation_details}
                onChange={(e) => setJobForm(prev => ({ ...prev, compensation_details: e.target.value }))}
                placeholder="e.g., $20-25/hr or 50% commission"
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">Contact Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact-name">Contact Name</Label>
                <Input
                  id="contact-name"
                  value={jobForm.contact_info.owner_name}
                  onChange={(e) => setJobForm(prev => ({ 
                    ...prev, 
                    contact_info: { ...prev.contact_info, owner_name: e.target.value }
                  }))}
                  placeholder="Your name"
                />
              </div>
              <div>
                <Label htmlFor="contact-phone">Phone</Label>
                <Input
                  id="contact-phone"
                  value={jobForm.contact_info.phone}
                  onChange={(e) => setJobForm(prev => ({ 
                    ...prev, 
                    contact_info: { ...prev.contact_info, phone: e.target.value }
                  }))}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                value={jobForm.contact_info.email}
                onChange={(e) => setJobForm(prev => ({ 
                  ...prev, 
                  contact_info: { ...prev.contact_info, email: e.target.value }
                }))}
                placeholder="your.email@example.com"
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="contact-notes">Additional Notes</Label>
              <Textarea
                id="contact-notes"
                value={jobForm.contact_info.notes}
                onChange={(e) => setJobForm(prev => ({ 
                  ...prev, 
                  contact_info: { ...prev.contact_info, notes: e.target.value }
                }))}
                placeholder="Any additional instructions for applicants..."
                rows={2}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Posting...' : 'Post Job'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)} 
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SalonJobPostModal;