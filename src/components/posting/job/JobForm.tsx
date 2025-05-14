import React, { useState } from 'react';
import { JobFormValues } from './jobFormSchema';
import { JOB_TYPES, JOB_TEMPLATES } from './jobFormConstants';

const YES_LADDER_OPTIONS = [
  { value: "weekly_pay", label: "Weekly Pay" },
  { value: "lunch_provided", label: "Lunch Provided" },
  { value: "quality_products", label: "Quality Products" },
  { value: "flexible_hours", label: "Flexible Hours" },
  { value: "growth_opportunity", label: "Growth Opportunity" },
  { value: "review_bonuses", label: "Review Bonuses" },
];

const JobForm: React.FC<{ onSubmit: (values: JobFormValues) => void }> = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState<JobFormValues>({
    title: '',
    type: '',
    location: '',
    compensation: '',
    description: '',
    summary: '',
    contactEmail: '',
    contactPhone: '',
    isUrgent: false,
    payWeekly: false,
    provideLunch: false,
    qualityProducts: false,
    flexibleTime: false,
    growthOpportunity: false,
    reviewBonuses: false,
    images: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Job Title</label>
        <input type="text" name="title" value={formValues.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Job Type</label>
        <select name="type" value={formValues.type} onChange={handleChange} required>
          {JOB_TYPES.map(jobType => (
            <option key={jobType.value} value={jobType.value}>{jobType.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Location</label>
        <input type="text" name="location" value={formValues.location} onChange={handleChange} required />
      </div>
      <div>
        <label>Compensation</label>
        <input type="text" name="compensation" value={formValues.compensation} onChange={handleChange} />
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={formValues.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Summary</label>
        <input type="text" name="summary" value={formValues.summary} onChange={handleChange} />
      </div>
      <div>
        <label>Contact Email</label>
        <input type="email" name="contactEmail" value={formValues.contactEmail} onChange={handleChange} required />
      </div>
      <div>
        <label>Contact Phone</label>
        <input type="tel" name="contactPhone" value={formValues.contactPhone} onChange={handleChange} required />
      </div>
      <div>
        <label>
          <input type="checkbox" name="isUrgent" checked={formValues.isUrgent} onChange={handleChange} />
          Urgent
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" name="payWeekly" checked={formValues.payWeekly} onChange={handleChange} />
          Pay Weekly
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" name="provideLunch" checked={formValues.provideLunch} onChange={handleChange} />
          Provide Lunch
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" name="qualityProducts" checked={formValues.qualityProducts} onChange={handleChange} />
          Quality Products
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" name="flexibleTime" checked={formValues.flexibleTime} onChange={handleChange} />
          Flexible Time
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" name="growthOpportunity" checked={formValues.growthOpportunity} onChange={handleChange} />
          Growth Opportunity
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" name="reviewBonuses" checked={formValues.reviewBonuses} onChange={handleChange} />
          Review Bonuses
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default JobForm;
