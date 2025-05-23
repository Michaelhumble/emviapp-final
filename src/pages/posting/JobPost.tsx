
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft } from 'lucide-react';
import JobDetailsForm from '@/components/posting/job/JobDetailsForm';
import JobTemplateSelector from '@/components/posting/job/JobTemplateSelector';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { JobDetailsSubmission } from '@/types/job';
import { JobPreview } from '@/components/posting/JobPreview';

const JobPost = () => {
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState<JobDetailsSubmission | null>(null);
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);

  // Handle job details form submission
  const handleJobSubmit = (details: JobDetailsSubmission) => {
    console.log('Job details submitted:', details);
    setJobDetails(details);
    // Navigate to the next step or show preview
  };

  // Handle template selection
  const handleTemplateSelect = (values: Partial<JobFormValues>) => {
    // Convert JobFormValues to JobDetailsSubmission structure
    const templateDetails: Partial<JobDetailsSubmission> = {
      title: values.title,
      description: values.description,
      vietnamese_description: values.vietnamese_description,
      salonName: values.salonName,
      location: values.location,
      jobType: values.jobType,
      compensation_type: values.compensation_type,
      compensation_details: values.compensation_details,
      weekly_pay: values.weekly_pay,
      has_housing: values.has_housing,
      has_wax_room: values.has_wax_room,
      owner_will_train: values.owner_will_train,
      no_supply_deduction: values.no_supply_deduction,
      requirements: values.requirements,
      specialties: values.specialties,
      contact_info: {
        owner_name: values.contactName || '',
        phone: values.contactPhone || '',
        email: values.contactEmail || '',
        notes: values.contactNotes || '',
        zalo: values.contactZalo || '',
      }
    };
    
    console.log('Template selected, converted to:', templateDetails);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-1 text-gray-600"
        >
          <ChevronLeft size={16} />
          Back
        </Button>

        <h1 className="text-3xl font-bold mb-6">Post a Job</h1>
        
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList>
            <TabsTrigger value="details">Job Details</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Job Details</h2>
                <Button 
                  variant="outline" 
                  onClick={() => setIsTemplateSelectorOpen(true)}
                >
                  Use Template
                </Button>
              </div>
              
              <JobDetailsForm 
                onSubmit={handleJobSubmit} 
                initialValues={jobDetails || undefined}
                expressMode={false}
              />
            </Card>
          </TabsContent>
          
          <TabsContent value="preview">
            {jobDetails ? (
              <JobPreview jobDetails={jobDetails} />
            ) : (
              <Card className="p-6 text-center">
                <p>Complete the job details to see a preview</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
        
        <JobTemplateSelector 
          open={isTemplateSelectorOpen}
          onOpenChange={setIsTemplateSelectorOpen}
          onTemplateSelect={handleTemplateSelect}
        />
      </div>
    </div>
  );
};

export default JobPost;
