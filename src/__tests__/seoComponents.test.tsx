import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
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
    const { container } = render(
      <BaseSEO
        title="Test Page"
        description="Test description"
        canonical="/test-page"
      />
    );
    
    // Check if canonical link exists in the document head
    const canonicalLinks = document.querySelectorAll('link[rel="canonical"]');
    const hasCorrectCanonical = Array.from(canonicalLinks).some(
      link => (link as HTMLLinkElement).href === 'https://www.emvi.app/test-page'
    );
    expect(hasCorrectCanonical).toBe(true);
  });

  it('BaseSEO renders absolute URLs for canonicals', () => {
    render(
      <BaseSEO
        title="Test Page"
        description="Test description"
        canonical="https://www.emvi.app/absolute-test"
      />
    );
    
    const canonicalLinks = document.querySelectorAll('link[rel="canonical"]');
    const hasCorrectCanonical = Array.from(canonicalLinks).some(
      link => (link as HTMLLinkElement).href === 'https://www.emvi.app/absolute-test'
    );
    expect(hasCorrectCanonical).toBe(true);
  });

  it('JobSEO generates valid JobPosting structured data', () => {
    render(<JobSEO job={mockJob} />);
    
    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
    let jobPostingFound = false;
    
    jsonLdScripts.forEach(script => {
      try {
        const data = JSON.parse(script.textContent || '{}');
        if (data['@type'] === 'JobPosting') {
          expect(data.title).toBe('Senior Hair Stylist');
          expect(data.description).toBe('Amazing opportunity for experienced hair stylist');
          expect(data.url).toBe('https://www.emvi.app/jobs/test-job-seo');
          expect(data.hiringOrganization.name).toBe('Beauty Salon LLC');
          expect(data.jobLocation.address.addressLocality).toBe('Los Angeles, CA');
          jobPostingFound = true;
        }
      } catch (e) {
        // Skip invalid JSON
      }
    });
    
    expect(jobPostingFound).toBe(true);
  });

  it('GlobalSEOInjection renders Organization and Website schemas', () => {
    render(<GlobalSEOInjection />);
    
    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
    let organizationFound = false;
    let websiteFound = false;
    
    jsonLdScripts.forEach(script => {
      try {
        const data = JSON.parse(script.textContent || '{}');
        if (data['@type'] === 'Organization') {
          expect(data.name).toBe('EmviApp');
          expect(data.url).toBe('https://www.emvi.app');
          organizationFound = true;
        }
        if (data['@type'] === 'WebSite') {
          expect(data.name).toBe('EmviApp');
          expect(data.potentialAction['@type']).toBe('SearchAction');
          websiteFound = true;
        }
      } catch (e) {
        // Skip invalid JSON
      }
    });
    
    expect(organizationFound).toBe(true);
    expect(websiteFound).toBe(true);
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
    
    const canonicalLinks = document.querySelectorAll('link[rel="canonical"]');
    const ogUrlMetas = document.querySelectorAll('meta[property="og:url"]');
    const ogImageMetas = document.querySelectorAll('meta[property="og:image"]');
    
    const hasCorrectCanonical = Array.from(canonicalLinks).some(
      link => (link as HTMLLinkElement).href === 'https://www.emvi.app/relative-path'
    );
    
    const hasCorrectOgUrl = Array.from(ogUrlMetas).some(
      meta => (meta as HTMLMetaElement).content === 'https://www.emvi.app/relative-path'
    );
    
    const hasCorrectOgImage = Array.from(ogImageMetas).some(
      meta => (meta as HTMLMetaElement).content === 'https://www.emvi.app/image.jpg'
    );
    
    expect(hasCorrectCanonical).toBe(true);
    expect(hasCorrectOgUrl).toBe(true);
    expect(hasCorrectOgImage).toBe(true);
  });

  it('JobSEO handles noindex properly for expired jobs', () => {
    const expiredJob = {
      ...mockJob,
      expires_at: '2024-01-01T00:00:00Z' // Expired
    };
    
    render(<JobSEO job={expiredJob} />);
    
    const robotsMetas = document.querySelectorAll('meta[name="robots"]');
    const hasNoIndex = Array.from(robotsMetas).some(
      meta => (meta as HTMLMetaElement).content === 'noindex, follow'
    );
    
    expect(hasNoIndex).toBe(true);
  });
});