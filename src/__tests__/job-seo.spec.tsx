import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import JobSEO from '@/components/seo/JobSEO';
import { Job } from '@/types/job';

const mockJob: Job = {
  id: 'test-id',
  title: 'Senior Nail Technician',
  category: 'nails',
  location: 'Austin, TX, US',
  description: '<p>Provide <strong>premium</strong> nail services.</p>',
  created_at: '2025-08-10T12:00:00Z'
};

describe('JobSEO JSON-LD', () => {
  it('injects JobPosting JSON-LD with required fields and plain-text description', () => {
    const { container } = render(<JobSEO job={mockJob} baseUrl="https://www.emvi.app" />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
    const json = JSON.parse(script!.textContent || '{}');
    expect(json['@type']).toBe('JobPosting');
    expect(json.title).toBe(mockJob.title);
    expect(json.description).toBe('Provide premium nail services.');
    expect(json.datePosted).toBeTruthy();
    expect(json.validThrough).toBeTruthy();
    expect(json.employmentType).toBeTruthy();
    expect(json.hiringOrganization).toBeTruthy();
    expect(json.jobLocation).toBeTruthy();
    expect(json.identifier).toEqual({ '@type': 'PropertyValue', name: 'EmviApp', value: 'test-id' });
    expect(json.url).toMatch(/\/jobs\//);
  });
});
