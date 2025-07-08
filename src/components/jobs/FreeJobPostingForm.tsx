
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useJobPosting, type JobFormData } from '@/hooks/jobs/useJobPosting';

const FreeJobPostingForm = () => {
  const { submitJob, isSubmitting, error, clearError } = useJobPosting();
  
  const [formData, setFormData] = useState<JobFormData>({
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

  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) clearError();
  };

  const handleContactInfoChange = (field: keyof JobFormData['contact_info'], value: string) => {
    setFormData(prev => ({
      ...prev,
      contact_info: {
        ...prev.contact_info,
        [field]: value
      }
    }));
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('📝 [JOB-FORM] Form submitted with data:', formData);
    
    // Basic validation
    if (!formData.title || !formData.category || !formData.location) {
      console.warn('⚠️ [JOB-FORM] Validation failed - missing required fields');
      return;
    }

    const success = await submitJob(formData);
    
    if (success) {
      console.log('🎉 [JOB-FORM] Job posted successfully, form will be reset');
      // Reset form on success
      setFormData({
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
    }
  };

  const categories = [
    'Nail Technician',
    'Hair Stylist',
    'Esthetician',
    'Massage Therapist',
    'Makeup Artist',
    'Barber',
    'Salon Manager',
    'Receptionist',
    'Other'
  ];

  const compensationTypes = [
    'Hourly',
    'Commission',
    'Salary',
    'Commission + Base',
    'Per Service',
    'Booth Rental'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-playfair text-center">Post a Job Opening</CardTitle>
            <p className="text-center text-gray-600">Share your opportunity with beauty professionals</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              {/* Job Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Experienced Nail Technician"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
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
                  placeholder="e.g., Los Angeles, CA"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the role, responsibilities, and what you're looking for..."
                  rows={4}
                />
              </div>

              {/* Compensation Type */}
              <div className="space-y-2">
                <Label htmlFor="compensation_type">Compensation Type</Label>
                <Select value={formData.compensation_type} onValueChange={(value) => handleInputChange('compensation_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select compensation type" />
                  </SelectTrigger>
                  <SelectContent>
                    {compensationTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
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
                  placeholder="e.g., $15-20/hour, 50% commission, etc."
                />
              </div>

              {/* Requirements */}
              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                  placeholder="List any required experience, certifications, or skills..."
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
                      value={formData.contact_info.owner_name || ''}
                      onChange={(e) => handleContactInfoChange('owner_name', e.target.value)}
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.contact_info.phone || ''}
                      onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.contact_info.email || ''}
                    onChange={(e) => handleContactInfoChange('email', e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.contact_info.notes || ''}
                    onChange={(e) => handleContactInfoChange('notes', e.target.value)}
                    placeholder="Any additional information for applicants..."
                    rows={2}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Posting Job...' : 'Post Job'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FreeJobPostingForm;
