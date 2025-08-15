import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Helmet } from 'react-helmet-async';
import BaseSEO from '@/components/seo/BaseSEO';
import JobSEO from '@/components/seo/JobSEO';
import GlobalSEOInjection from '@/components/seo/GlobalSEOInjection';
import { Job } from '@/types/job';

const mockJob: Job = {
  id: 'test-job-seo',
  title: 'Senior Hair Stylist',
  category: 'hair',
  location: 'Los Angeles, CA',
  description: '<p>Amazing opportunity for experienced hair stylist</p>',
  created_at: '2025-01-01T00:00:00Z',
  status: 'active',
  contact_info: {
    owner_name: 'Beauty Salon LLC'
  }
};

describe('SEO Components Tests', () => {
  it('BaseSEO renders canonical URLs correctly', () => {
    render(
      <BaseSEO
        title="Test Page"
        description="Test description"
        canonical="/test-page"
      />
    );
    
    const helmet = Helmet.peek();
    const canonicalLink = helmet.linkTags.find(tag => tag.rel === 'canonical');
    expect(canonicalLink?.href).toBe('https://www.emvi.app/test-page');
  });

  it('BaseSEO renders absolute URLs for canonicals', () => {
    render(
      <BaseSEO
        title="Test Page"
        description="Test description"
        canonical="https://www.emvi.app/absolute-test"
      />
    );
    
    const helmet = Helmet.peek();
    const canonicalLink = helmet.linkTags.find(tag => tag.rel === 'canonical');
    expect(canonicalLink?.href).toBe('https://www.emvi.app/absolute-test');
  });

  it('JobSEO generates valid JobPosting structured data', () => {
    render(<JobSEO job={mockJob} />);
    
    const helmet = Helmet.peek();
    const jsonLdScript = helmet.scriptTags.find(tag => 
      tag.type === 'application/ld+json'
    );
    
    expect(jsonLdScript).toBeDefined();
    const structuredData = JSON.parse(jsonLdScript!.innerHTML);
    
    expect(structuredData['@type']).toBe('JobPosting');
    expect(structuredData.title).toBe('Senior Hair Stylist');
    expect(structuredData.description).toBe('Amazing opportunity for experienced hair stylist');
    expect(structuredData.url).toBe('https://www.emvi.app/jobs/test-job-seo');
    expect(structuredData.hiringOrganization.name).toBe('Beauty Salon LLC');
    expect(structuredData.jobLocation.address.addressLocality).toBe('Los Angeles, CA');
  });

  it('GlobalSEOInjection renders Organization and Website schemas', () => {
    render(<GlobalSEOInjection />);
    
    const helmet = Helmet.peek();
    const jsonLdScripts = helmet.scriptTags.filter(tag => 
      tag.type === 'application/ld+json'
    );
    
    expect(jsonLdScripts.length).toBe(2);
    
    const schemas = jsonLdScripts.map(script => JSON.parse(script.innerHTML));
    const organizationSchema = schemas.find(s => s['@type'] === 'Organization');
    const websiteSchema = schemas.find(s => s['@type'] === 'WebSite');
    
    expect(organizationSchema).toBeDefined();
    expect(organizationSchema.name).toBe('EmviApp');
    expect(organizationSchema.url).toBe('https://www.emvi.app');
    
    expect(websiteSchema).toBeDefined();
    expect(websiteSchema.name).toBe('EmviApp');
    expect(websiteSchema.potentialAction['@type']).toBe('SearchAction');
  });

  it('SEO components normalize all URLs to https://www.emvi.app', () => {
    render(
      <BaseSEO
        title="Test"
        description="Test"
        canonical="/relative-path"
        ogImage="/image.jpg"
      />
    );
    
    const helmet = Helmet.peek();
    
    const canonical = helmet.linkTags.find(tag => tag.rel === 'canonical');
    const ogUrl = helmet.metaTags.find(tag => tag.property === 'og:url');
    const ogImage = helmet.metaTags.find(tag => tag.property === 'og:image');
    
    expect(canonical?.href).toBe('https://www.emvi.app/relative-path');
    expect(ogUrl?.content).toBe('https://www.emvi.app/relative-path');
    expect(ogImage?.content).toBe('https://www.emvi.app/image.jpg');
  });

  it('JobSEO handles noindex properly for expired jobs', () => {
    const expiredJob = {
      ...mockJob,
      expires_at: '2024-01-01T00:00:00Z' // Expired
    };
    
    render(<JobSEO job={expiredJob} />);
    
    const helmet = Helmet.peek();
    const robotsMeta = helmet.metaTags.find(tag => tag.name === 'robots');
    
    expect(robotsMeta?.content).toBe('noindex, follow');
  });
});