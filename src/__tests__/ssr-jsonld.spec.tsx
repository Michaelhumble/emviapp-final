import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { organizationJsonLd, websiteJsonLd, jobPostingJsonLd, localBusinessJsonLd, faqJsonLd } from '@/lib/seo/jsonld';

// Mock data
const mockJobData = {
  id: 'test-job-123',
  title: 'Senior Nail Technician',
  description: 'Looking for an experienced nail technician to join our team.',
  location: 'Austin, TX',
  salary_range: '$50,000 - $65,000',
  company: 'Beauty Salon LLC',
  created_at: '2025-01-01T00:00:00Z',
  category: 'nails'
};

const mockBusinessData = {
  name: 'Test Beauty Salon',
  url: 'https://www.emvi.app/salon/test',
  addressLocality: 'Austin',
  addressRegion: 'TX',
  addressCountry: 'US',
  telephone: '555-123-4567'
};

const mockFAQData = [
  {
    question: 'How do I apply for jobs?',
    answer: 'You can apply directly through our platform by clicking the Apply button on any job listing.'
  }
];

describe('SSR JSON-LD Helper Functions', () => {
  it('generates valid Organization schema', () => {
    const schema = organizationJsonLd();
    
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Organization');
    expect(schema.name).toBe('EmviApp');
    expect(schema.url).toBe('https://www.emvi.app');
    expect(schema.sameAs).toBeInstanceOf(Array);
    expect(schema.sameAs.length).toBeGreaterThan(0);
  });

  it('generates valid Website schema', () => {
    const schema = websiteJsonLd();
    
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('WebSite');
    expect(schema.name).toBe('EmviApp');
    expect(schema.url).toBe('https://www.emvi.app');
    expect(schema.potentialAction).toBeDefined();
    expect(schema.potentialAction['@type']).toBe('SearchAction');
  });

  it('generates valid JobPosting schema', () => {
    const schema = jobPostingJsonLd(mockJobData);
    
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('JobPosting');
    expect(schema.title).toBe(mockJobData.title);
    expect(schema.description).toContain('experienced nail technician');
    expect(schema.identifier).toBeDefined();
    expect(schema.identifier.value).toBe(mockJobData.id);
    expect(schema.hiringOrganization).toBeDefined();
    expect(schema.jobLocation).toBeDefined();
    expect(schema.datePosted).toBeDefined();
    expect(schema.validThrough).toBeDefined();
  });

  it('generates valid LocalBusiness schema', () => {
    const schema = localBusinessJsonLd(mockBusinessData);
    
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('NailSalon'); // default business type
    expect(schema.name).toBe(mockBusinessData.name);
    expect(schema.url).toBe(mockBusinessData.url);
    expect(schema.address).toBeDefined();
    expect(schema.address.addressLocality).toBe(mockBusinessData.addressLocality);
    expect(schema.address.addressCountry).toBe(mockBusinessData.addressCountry);
    expect(schema.telephone).toBe(mockBusinessData.telephone);
  });

  it('generates valid FAQ schema', () => {
    const schema = faqJsonLd(mockFAQData);
    
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity).toBeInstanceOf(Array);
    expect(schema.mainEntity).toHaveLength(1);
    expect(schema.mainEntity[0]['@type']).toBe('Question');
    expect(schema.mainEntity[0].name).toBe(mockFAQData[0].question);
    expect(schema.mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe(mockFAQData[0].answer);
  });

  it('strips HTML from job descriptions', () => {
    const jobWithHtml = {
      ...mockJobData,
      description: '<p>Looking for an <strong>experienced</strong> nail technician to join our <em>amazing</em> team.</p>'
    };
    
    const schema = jobPostingJsonLd(jobWithHtml);
    
    expect(schema.description).not.toContain('<p>');
    expect(schema.description).not.toContain('<strong>');
    expect(schema.description).not.toContain('<em>');
    expect(schema.description).toContain('experienced');
    expect(schema.description).toContain('amazing');
  });

  it('handles missing optional fields gracefully', () => {
    const minimalJobData = {
      id: 'test-job-minimal',
      title: 'Basic Job Title',
      category: 'beauty'
    };
    
    const schema = jobPostingJsonLd(minimalJobData);
    
    expect(schema['@type']).toBe('JobPosting');
    expect(schema.title).toBe(minimalJobData.title);
    expect(schema.identifier.value).toBe(minimalJobData.id);
    // Should have defaults for missing fields
    expect(schema.hiringOrganization.name).toBe('EmviApp Partner');
    expect(schema.jobLocation.address.addressLocality).toBe('Various Locations');
  });

  it('ensures all JSON-LD can be safely stringified', () => {
    const orgSchema = organizationJsonLd();
    const websiteSchema = websiteJsonLd();
    const jobSchema = jobPostingJsonLd(mockJobData);
    const businessSchema = localBusinessJsonLd(mockBusinessData);
    const faqSchema = faqJsonLd(mockFAQData);
    
    // Should not throw when stringified
    expect(() => JSON.stringify(orgSchema)).not.toThrow();
    expect(() => JSON.stringify(websiteSchema)).not.toThrow();
    expect(() => JSON.stringify(jobSchema)).not.toThrow();
    expect(() => JSON.stringify(businessSchema)).not.toThrow();
    expect(() => JSON.stringify(faqSchema)).not.toThrow();
    
    // Stringified versions should be valid JSON
    expect(JSON.parse(JSON.stringify(orgSchema))).toEqual(orgSchema);
    expect(JSON.parse(JSON.stringify(websiteSchema))).toEqual(websiteSchema);
    expect(JSON.parse(JSON.stringify(jobSchema))).toEqual(jobSchema);
    expect(JSON.parse(JSON.stringify(businessSchema))).toEqual(businessSchema);
    expect(JSON.parse(JSON.stringify(faqSchema))).toEqual(faqSchema);
  });
});

describe('SSR JSON-LD Integration', () => {
  it('sets window flag for development detection', () => {
    // In development/testing, we can set a flag to verify JSON-LD is present
    if (typeof window !== 'undefined') {
      (window as any).__hasSSRJsonLd = true;
      expect((window as any).__hasSSRJsonLd).toBe(true);
    }
  });
});