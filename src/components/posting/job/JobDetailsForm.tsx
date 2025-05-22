
import React, { useState } from 'react';
import { JobFormValues } from './jobFormSchema';
import JobForm from './JobForm';
import { JobDetailsSubmission } from '@/types/job';

interface JobDetailsFormProps {
  onSubmit: (details: JobDetailsSubmission) => void;
  initialValues?: JobDetailsSubmission;
}

const JobDetailsForm: React.FC<JobDetailsFormProps> = ({ onSubmit, initialValues }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Map JobDetailsSubmission to JobFormValues for the form
  const mapInitialValues = (): Partial<JobFormValues> => {
    if (!initialValues) return {};

    return {
      title: initialValues.title,
      description: initialValues.description,
      vietnameseDescription: initialValues.vietnamese_description,
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
      requirements: initialValues.requirements || [],
      specialties: initialValues.specialties || []
    };
  };

  // Map form values to JobDetailsSubmission format needed by API
  const handleFormSubmit = (formValues: JobFormValues) => {
    setIsSubmitting(true);
    
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
      },
      vietnamese_description: formValues.vietnameseDescription,
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
      post_type: 'job'
    };

    // Submit the mapped job details
    try {
      onSubmit(jobDetails);
      console.log('Submitting job details:', jobDetails);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <JobForm 
        onSubmit={handleFormSubmit}
        defaultValues={mapInitialValues()}
      />
    </div>
  );
};

export default JobDetailsForm;
