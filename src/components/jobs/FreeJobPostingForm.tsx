
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Briefcase } from 'lucide-react';
import { toast } from 'sonner';

const FreeJobPostingForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    description: '',
    compensation_type: '',
    compensation_details: '',
    requirements: '',
    contact_info: {
      owner_name: '',
      phone: '',
      email: '',
      notes: ''
    }
  });

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('contact_info.')) {
      const contactField = field.replace('contact_info.', '');
      setFormData(prev => ({
        ...prev,
        contact_info: {
          ...prev.contact_info,
          [contactField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      console.error('🔐 [JOB-FORM] User not authenticated');
      toast.error('Please sign in to post a job');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare job data for submission
      const jobData = {
        title: formData.title,
        category: formData.category,
        location: formData.location,
        description: formData.description,
        compensation_type: formData.compensation_type,
        compensation_details: formData.compensation_details,
        requirements: formData.requirements,
        contact_info: formData.contact_info,
        user_id: user.id,
        pricing_tier: 'free',
        status: 'active'
      };

      console.log('📝 [JOB-FORM] Job data to submit:', jobData);

      // Insert job into Supabase
      const { data, error } = await supabase
        .from('jobs')
        .insert([jobData])
        .select()
        .single();

      console.log('📊 [JOB-FORM] Supabase insert response:', { data, error });

      if (error) {
        console.error('❌ [JOB-FORM] Supabase insert error:', error);
        throw error;
      }

      console.log('✅ [JOB-FORM] Job successfully created:', data);
      
      toast.success('Job posted successfully!');
      
      // Navigate to jobs page to see the new listing
      navigate('/jobs');
      
    } catch (error: any) {
      console.error('💥 [JOB-FORM] Form submission error:', error);
      toast.error(error.message || 'Failed to post job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Briefcase className="h-6 w-6 text-purple-600" />
              <div>
                <CardTitle className="text-2xl">Post a Free Job</CardTitle>
                <CardDescription>
                  Connect with talented beauty professionals in your area
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Job Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Nail Technician, Hair Stylist"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleInputChange('category', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select job category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nails">Nails</SelectItem>
                    <SelectItem value="hair">Hair</SelectItem>
                    <SelectItem value="facial-skincare">Facial & Skincare</SelectItem>
                    <SelectItem value="massage-spa">Massage & Spa</SelectItem>
                    <SelectItem value="brow-lashes">Brow & Lashes</SelectItem>
                    <SelectItem value="makeup">Makeup</SelectItem>
                    <SelectItem value="management">Management</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, State"
                  required
                />
              </div>

              {/* Job Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the position, responsibilities, and what you're looking for..."
                  rows={4}
                  required
                />
              </div>

              {/* Compensation Type */}
              <div className="space-y-2">
                <Label htmlFor="compensation_type">Compensation Type</Label>
                <Select 
                  value={formData.compensation_type} 
                  onValueChange={(value) => handleInputChange('compensation_type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select compensation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="commission">Commission</SelectItem>
                    <SelectItem value="salary">Salary</SelectItem>
                    <SelectItem value="booth-rental">Booth Rental</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Compensation Details */}
              <div className="space-y-2">
                <Label htmlFor="compensation_details">Compensation Details</Label>
                <Input
                  id="compensation_details"
                  value={formData.compensation_details}
                  onChange={(e) => handleInputChange('compensation_details', e.target.value)}
                  placeholder="e.g., $15-20/hour, 50% commission, $800/week"
                />
              </div>

              {/* Requirements */}
              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                  placeholder="List any required skills, certifications, or experience..."
                  rows={3}
                />
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="owner_name">Contact Name</Label>
                    <Input
                      id="owner_name"
                      value={formData.contact_info.owner_name}
                      onChange={(e) => handleInputChange('contact_info.owner_name', e.target.value)}
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.contact_info.phone}
                      onChange={(e) => handleInputChange('contact_info.phone', e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.contact_info.email}
                    onChange={(e) => handleInputChange('contact_info.email', e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.contact_info.notes}
                    onChange={(e) => handleInputChange('contact_info.notes', e.target.value)}
                    placeholder="Any additional information for applicants..."
                    rows={2}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !formData.title || !formData.category || !formData.location || !formData.description}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Posting Job...
                    </>
                  ) : (
                    'Post Free Job'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FreeJobPostingForm;
