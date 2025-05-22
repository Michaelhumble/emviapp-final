
import React, { useState } from 'react';
import { JobFormValues } from './jobFormSchema';
import JobForm from './JobForm';
import { JobDetailsSubmission } from '@/types/job';
import { toast } from 'sonner';

interface JobDetailsFormProps {
  onSubmit: (details: JobDetailsSubmission) => void;
  initialValues?: JobDetailsSubmission;
  expressMode?: boolean;
}

const JobDetailsForm: React.FC<JobDetailsFormProps> = ({ onSubmit, initialValues, expressMode = false }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Map JobDetailsSubmission to JobFormValues for the form
  const mapInitialValues = (): Partial<JobFormValues> => {
    if (!initialValues) return {};

    return {
      title: initialValues.title,
      description: initialValues.description,
      vietnamese_description: initialValues.vietnamese_description,
      salonName: initialValues.salonName || initialValues.company || '',
      location: initialValues.location,
      jobType: initialValues.jobType as any,
      compensation_type: initialValues.compensation_type as any,
      compensation_details: initialValues.compensation_details,
      weekly_pay: initialValues.weekly_pay,
      has_housing: initialValues.has_housing,
      has_wax_room: initialValues.has_wax_room,
      owner_will_train: initialValues.owner_will_train,
      no_supply_deduction: initialValues.no_supply_deduction,
      salary_range: initialValues.salary_range,
      contactName: initialValues.contact_info?.owner_name || '',
      contactPhone: initialValues.contact_info?.phone || '',
      contactEmail: initialValues.contact_info?.email || '',
      contactNotes: initialValues.contact_info?.notes || '',
      contactZalo: initialValues.contact_info?.zalo || '',
      requirements: initialValues.requirements || [],
      specialties: initialValues.specialties || [],
      employment_type: initialValues.employment_type,
      preferred_languages: initialValues.preferred_languages,
      benefits: initialValues.benefits,
      features: initialValues.features,
      salon_type: initialValues.salon_type,
      tip_range: initialValues.tip_range,
      is_urgent: initialValues.is_urgent,
    };
  };

  // Map form values to JobDetailsSubmission format needed by API
  const handleFormSubmit = (formValues: JobFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Validate required fields manually as additional check
      const requiredFields = [
        { field: 'title', name: 'Job title' },
        { field: 'description', name: 'Job description' },
        { field: 'location', name: 'Location' },
        { field: 'salonName', name: 'Salon name' },
        { field: 'jobType', name: 'Job type' },
        { field: 'contactName', name: 'Contact name' },
        { field: 'contactPhone', name: 'Contact phone' },
        { field: 'contactEmail', name: 'Contact email' },
      ];
      
      const missingFields = requiredFields.filter(
        rf => !formValues[rf.field as keyof JobFormValues]
      ).map(f => f.name);
      
      if (missingFields.length > 0) {
        const errorMessage = `Please fill in the following required fields: ${missingFields.join(', ')}`;
        toast.error(errorMessage);
        console.error("Validation failed:", errorMessage);
        setIsSubmitting(false);
        return;
      }
      
      // Map JobFormValues to JobDetailsSubmission
      const jobDetails: JobDetailsSubmission = {
        title: formValues.title,
        description: formValues.description,
        location: formValues.location,
        salonName: formValues.salonName,
        company: formValues.salonName, // For backward compatibility
        jobType: formValues.jobType,
        contact_info: {
          owner_name: formValues.contactName,
          phone: formValues.contactPhone,
          email: formValues.contactEmail,
          notes: formValues.contactNotes || '',
          zalo: formValues.contactZalo || '',
        },
        vietnamese_description: formValues.vietnamese_description,
        compensation_type: formValues.compensation_type,
        compensation_details: formValues.compensation_details,
        weekly_pay: formValues.weekly_pay,
        has_housing: formValues.has_housing,
        has_wax_room: formValues.has_wax_room,
        owner_will_train: formValues.owner_will_train,
        no_supply_deduction: formValues.no_supply_deduction,
        salary_range: formValues.salary_range,
        specialties: formValues.specialties,
        requirements: formValues.requirements,
        employment_type: formValues.jobType,
        post_type: 'job',
        preferred_languages: formValues.preferred_languages,
        benefits: formValues.benefits,
        features: formValues.features,
        salon_type: formValues.salon_type,
        tip_range: formValues.tip_range,
        is_urgent: formValues.is_urgent,
      };

      // Submit the validated job details
      console.log('Submitting job details:', jobDetails);
      onSubmit(jobDetails);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <JobForm 
        onSubmit={handleFormSubmit}
        defaultValues={mapInitialValues()}
        expressMode={expressMode}
      />
    </div>
  );
};

export default JobDetailsForm;
