import React from 'react';
import DynamicSEO from './DynamicSEO';
import { Job } from '@/types/job';
import { generateJobUrl } from '@/utils/seoHelpers';
import { SEO_JOBS_ENABLED } from '@/config/seo';

interface JobSEOProps {
  job: Job;
  baseUrl?: string;
}

const JobSEO: React.FC<JobSEOProps> = ({ job, baseUrl = 'https://www.emvi.app' }) => {
  const jobUrlPath = generateJobUrl({ title: job.title, location: job.location, id: job.id, category: job.category });
  const jobUrl = `${baseUrl}${jobUrlPath.startsWith('/') ? '' : '/'}${jobUrlPath}`;
  
  // Location parsing
  const { city, region, country } = parseLocation(job.location);

  // Compute SEO-friendly title per template
  const pay = formatPay(job.compensation_details || job.salary_range || '');
  const brand = job.company || 'EmviApp';
  const role = job.title;
  const loc = [city, region].filter(Boolean).join(', ');
  const title = `${role}${loc ? ` – ${loc}` : ''}${pay ? ` | ${pay}` : ''} | ${brand} | EmviApp`;
  
  // Generate description from job details (plain text) 160–180 chars
  const rawDescription = job.description || '';
  const baseDesc = `Hiring ${role}${loc ? ` in ${loc}` : ''}. ${shortPerks(rawDescription)}${pay ? ` Pay ${pay}.` : ''} Apply on EmviApp.`.trim();
  const description = baseDesc.length > 180 ? baseDesc.slice(0, 177) + '...' : baseDesc;
  
  // Get primary image
  const image = job.image_urls?.[0] || job.image_url || `${baseUrl}/og-job-default.jpg`;


  // Location parsing
  const { city, region, country } = parseLocation(job.location);

  // Employment type
  const employmentType = (job.employment_type || getEmploymentType(job.category)).toUpperCase();

  // Dates
  const datePosted = job.created_at || new Date().toISOString();
  const validThrough = job.expires_at || new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString();

  // Salary parsing
  const salary = parseSalary(job.compensation_details || job.salary_range || '');

  // Hiring org
  const hiringOrganization = {
    "@type": "Organization",
    name: job.company || 'EmviApp',
    sameAs: baseUrl
  };
  
  // Generate structured data for JobPosting
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: description,
    datePosted: datePosted,
    validThrough: validThrough,
    employmentType: employmentType,
    hiringOrganization,
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: city,
        addressRegion: region,
        addressCountry: country
      }
    },
    ...(salary ? {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: salary.currency,
        value: {
          "@type": "QuantitativeValue",
          value: salary.value,
          minValue: salary.minValue,
          maxValue: salary.maxValue,
          unitText: salary.unitText
        }
      }
    } : {}),
    identifier: {
      "@type": "PropertyValue",
      name: "EmviApp",
      value: job.id
    },
    directApply: true,
    url: jobUrl,
    industry: job.industry || 'Beauty and Personal Care',
    occupationalCategory: job.category,
    image: image
  } as any;

  return (
    <>
      {/* Only inject SEO when enabled */}
      {SEO_JOBS_ENABLED && (
        <DynamicSEO
          title={title}
          description={description}
          image={image}
          url={jobUrl}
          type="article"
          tags={[job.category, 'beauty job', 'career', job.location].filter(Boolean)}
          structuredData={structuredData}
          canonicalUrl={jobUrl}
        />
      )}
    </>
  );
};

// Helper functions
function getEmploymentType(category: string): string {
  const fullTimeCategories = ['hair', 'nails', 'skincare', 'makeup'];
  return fullTimeCategories.includes(category.toLowerCase()) ? 'FULL_TIME' : 'PART_TIME';
}

function extractSalaryAmount(salaryString: string | null): number | undefined {
  if (!salaryString) return undefined;
  const numbers = salaryString.match(/\d+/g);
  return numbers ? parseInt(numbers[0]) : undefined;
}

function stripHtml(input?: string): string {
  if (!input) return '';
  return input.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function shortPerks(input?: string): string {
  const clean = stripHtml(input);
  if (!clean) return '';
  // Extract a short phrase of perks/benefits if present
  const sentences = clean.split(/\.(\s|$)/).map(s => s.trim()).filter(Boolean);
  return sentences[0] ? `${sentences[0]}.` : clean.slice(0, 100);
}


function parseLocation(loc?: string) {
  if (!loc) return { city: undefined, region: undefined, country: 'US' };
  const parts = loc.split(',').map((s) => s.trim());
  const city = parts[0];
  const region = parts[1];
  const country = parts[2] || 'US';
  return { city, region, country };
}

function formatPay(input: string): string | '' {
  if (!input) return '' as any;
  const nums = input.match(/\$?\s*\d+[\,\d]*(?:\.\d+)?/g);
  let unit: string | undefined;
  if (/year|yr|annual/i.test(input)) unit = 'yr';
  else if (/month|mo/i.test(input)) unit = 'mo';
  else if (/week|wk/i.test(input)) unit = 'wk';
  else if (/hour|hr/i.test(input)) unit = 'hr';
  const amount = nums ? nums[0].replace(/\s/g, '') : '';
  return amount ? `${amount}${unit ? `/${unit}` : ''}` : '' as any;
}


function parseSalary(input: string) {
  if (!input) return null as any;
  const nums = input.match(/\d+[\.,]?\d*/g);
  const value = nums ? Number(nums[0].replace(/,/g, '')) : undefined;
  let unitText: 'HOUR' | 'WEEK' | 'MONTH' | 'YEAR' = 'HOUR';
  if (/year|yr|annual/i.test(input)) unitText = 'YEAR';
  else if (/month|mo/i.test(input)) unitText = 'MONTH';
  else if (/week|wk/i.test(input)) unitText = 'WEEK';
  const currency = /usd|\$/i.test(input) ? 'USD' : 'USD';
  let minValue: number | undefined;
  let maxValue: number | undefined;
  if (nums && nums.length >= 2) {
    minValue = Number(nums[0].replace(/,/g, ''));
    maxValue = Number(nums[1].replace(/,/g, ''));
  }
  return value ? { currency, value, unitText, minValue, maxValue } : null;
}

export default JobSEO;
