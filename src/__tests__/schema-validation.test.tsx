import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import '@testing-library/jest-dom';
import { validateSchemas, deduplicateSchemas, validateCanonicalAlignment, extractSchemasFromHTML } from '@/utils/seo/schemaValidator';
import JobSEO from '@/components/seo/JobSEO';
import GlobalSEOInjection from '@/components/seo/GlobalSEOInjection';
import { Job } from '@/types/job';

const mockJob: Job = {
  id: 'test-job-123',
  title: 'Senior Nail Technician',
  category: 'nails',
  location: 'Los Angeles, CA',
  description: 'Seeking experienced nail technician for luxury salon',
  company: 'Luxury Nails Spa',
  salary_range: '$40,000 - $60,000',
  employment_type: 'FULL_TIME',
  created_at: '2025-01-15T10:00:00Z',
  expires_at: '2025-04-15T10:00:00Z'
};

describe('Schema Validation Suite', () => {
  describe('Duplicate @id Detection', () => {
    it('detects duplicate @id in schemas', () => {
      const schemas = [
        { '@type': 'Organization', '@id': 'https://www.emvi.app/#organization', name: 'EmviApp' },
        { '@type': 'WebSite', '@id': 'https://www.emvi.app/#website', name: 'EmviApp' },
        { '@type': 'Organization', '@id': 'https://www.emvi.app/#organization', name: 'EmviApp Duplicate' }
      ];

      const result = validateSchemas(schemas);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0]).toContain('Duplicate @id');
    });

    it('allows unique @id entries', () => {
      const schemas = [
        { '@type': 'Organization', '@id': 'https://www.emvi.app/#organization', name: 'EmviApp' },
        { '@type': 'WebSite', '@id': 'https://www.emvi.app/#website', name: 'EmviApp' }
      ];

      const result = validateSchemas(schemas);
      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('deduplicates schemas correctly', () => {
      const schemas = [
        { '@type': 'Organization', '@id': 'https://www.emvi.app/#org', name: 'First' },
        { '@type': 'Organization', '@id': 'https://www.emvi.app/#org', name: 'Duplicate' },
        { '@type': 'WebSite', name: 'Site1' },
        { '@type': 'WebSite', name: 'Site2' }
      ];

      const deduplicated = deduplicateSchemas(schemas);
      expect(deduplicated.length).toBe(2); // One org, one website
      expect(deduplicated[0].name).toBe('First');
    });
  });

  describe('JobPosting Required Fields', () => {
    it('validates required JobPosting fields', () => {
      const incompleteJob = {
        '@type': 'JobPosting',
        title: 'Test Job'
        // Missing: description, datePosted, employmentType, hiringOrganization, jobLocation, identifier
      };

      const result = validateSchemas([incompleteJob]);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('missing required fields'))).toBe(true);
    });

    it('validates complete JobPosting schema', () => {
      const completeJob = {
        '@type': 'JobPosting',
        title: 'Senior Nail Tech',
        description: 'Join our team',
        datePosted: '2025-01-15T10:00:00Z',
        employmentType: 'FULL_TIME',
        hiringOrganization: {
          '@type': 'Organization',
          name: 'Test Salon'
        },
        jobLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Los Angeles'
          }
        },
        identifier: {
          '@type': 'PropertyValue',
          name: 'EmviApp',
          value: 'test-123'
        }
      };

      const result = validateSchemas([completeJob]);
      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('warns about missing recommended fields', () => {
      const jobWithoutRecommended = {
        '@type': 'JobPosting',
        title: 'Test',
        description: 'Desc',
        datePosted: '2025-01-15T10:00:00Z',
        employmentType: 'FULL_TIME',
        hiringOrganization: { '@type': 'Organization', name: 'Test' },
        jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: 'LA' } },
        identifier: { '@type': 'PropertyValue', value: '123' }
        // Missing: validThrough, baseSalary, url
      };

      const result = validateSchemas([jobWithoutRecommended]);
      expect(result.valid).toBe(true); // Still valid
      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.warnings[0]).toContain('missing recommended fields');
    });
  });

  describe('Canonical URL Alignment', () => {
    it('validates schema URLs match canonical', () => {
      const canonicalUrl = 'https://www.emvi.app/jobs/test-123';
      const schemas = [
        {
          '@type': 'JobPosting',
          title: 'Test',
          url: 'https://www.emvi.app/jobs/test-123',
          description: 'Test',
          datePosted: '2025-01-01',
          employmentType: 'FULL_TIME',
          hiringOrganization: { '@type': 'Organization', name: 'Test' },
          jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: 'LA' } },
          identifier: { '@type': 'PropertyValue', value: '123' }
        }
      ];

      const errors = validateCanonicalAlignment(canonicalUrl, schemas);
      expect(errors.length).toBe(0);
    });

    it('detects mismatched URLs', () => {
      const canonicalUrl = 'https://www.emvi.app/jobs/test-123';
      const schemas = [
        {
          '@type': 'JobPosting',
          title: 'Test',
          url: 'https://www.emvi.app/jobs/wrong-id',
          description: 'Test',
          datePosted: '2025-01-01',
          employmentType: 'FULL_TIME',
          hiringOrganization: { '@type': 'Organization', name: 'Test' },
          jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: 'LA' } },
          identifier: { '@type': 'PropertyValue', value: '123' }
        }
      ];

      const errors = validateCanonicalAlignment(canonicalUrl, schemas);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0]).toContain('does not match canonical');
    });
  });

  describe('Component Integration Tests', () => {
    it('JobSEO component produces valid schema', () => {
      const { container } = render(
        <HelmetProvider>
          <JobSEO job={mockJob} baseUrl="https://www.emvi.app" />
        </HelmetProvider>
      );

      const scripts = container.querySelectorAll('script[type="application/ld+json"]');
      expect(scripts.length).toBeGreaterThan(0);

      const schemas = Array.from(scripts).map(script => {
        return JSON.parse((script as HTMLScriptElement).textContent || '{}');
      });

      const result = validateSchemas(schemas);
      if (!result.valid) {
        console.error('JobSEO validation errors:', result.errors);
      }
      expect(result.valid).toBe(true);
    });

    it('GlobalSEOInjection produces unique schemas', () => {
      const { container } = render(
        <HelmetProvider>
          <GlobalSEOInjection />
        </HelmetProvider>
      );

      const scripts = container.querySelectorAll('script[type="application/ld+json"]');
      const schemas = Array.from(scripts).map(script => {
        return JSON.parse((script as HTMLScriptElement).textContent || '{}');
      });

      const result = validateSchemas(schemas);
      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);

      // Check no duplicate @ids
      const ids = schemas.map(s => s['@id']).filter(Boolean);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('detects if page has both global and local Organization schemas', () => {
      const { container: container1 } = render(
        <HelmetProvider>
          <GlobalSEOInjection />
        </HelmetProvider>
      );

      const { container: container2 } = render(
        <HelmetProvider>
          <JobSEO job={mockJob} />
        </HelmetProvider>
      );

      // Simulate both on same page
      const allScripts = [
        ...Array.from(container1.querySelectorAll('script[type="application/ld+json"]')),
        ...Array.from(container2.querySelectorAll('script[type="application/ld+json"]'))
      ];

      const schemas = allScripts.map(script => {
        return JSON.parse((script as HTMLScriptElement).textContent || '{}');
      });

      // Check for Organization duplicates
      const orgSchemas = schemas.filter(s => s['@type'] === 'Organization');
      if (orgSchemas.length > 1) {
        // If multiple org schemas, they should have different @ids or one should not have @id
        const orgIds = orgSchemas.map(s => s['@id']).filter(Boolean);
        const uniqueOrgIds = new Set(orgIds);
        
        // Allow multiple if they have unique @ids or no @id
        expect(uniqueOrgIds.size).toBe(orgIds.length);
      }
    });
  });

  describe('HTML Extraction', () => {
    it('extracts schemas from HTML string', () => {
      const html = `
        <html>
          <head>
            <script type="application/ld+json">
              {"@type": "Organization", "name": "Test"}
            </script>
            <script type="application/ld+json">
              {"@type": "WebSite", "name": "Test Site"}
            </script>
          </head>
        </html>
      `;

      const schemas = extractSchemasFromHTML(html);
      expect(schemas.length).toBe(2);
      expect(schemas[0]['@type']).toBe('Organization');
      expect(schemas[1]['@type']).toBe('WebSite');
    });
  });
});
