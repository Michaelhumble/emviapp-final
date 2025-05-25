
/**
 * COMPREHENSIVE TESTS FOR BEAUTY INDUSTRY PREFILLS
 * Ensures all prefill data is accessible and properly structured
 */

import {
  getPrefillForIndustry,
  getAvailableIndustries,
  getJobPrefillByIndustry,
  validatePrefillData,
  type JobPrefillData
} from './beautyIndustryPrefills';

describe('Beauty Industry Prefills', () => {
  describe('getPrefillForIndustry', () => {
    test('returns correct prefill data for nail industry', () => {
      const nailPrefill = getPrefillForIndustry('nails');
      expect(nailPrefill).toBeTruthy();
      expect(nailPrefill?.title).toContain('Nail Technician');
      expect(nailPrefill?.trustPhrase).toContain('Established salon');
    });

    test('returns correct prefill data for hair industry', () => {
      const hairPrefill = getPrefillForIndustry('hair');
      expect(hairPrefill).toBeTruthy();
      expect(hairPrefill?.title).toContain('Hair Stylist');
      expect(hairPrefill?.salaryRange).toContain('$18-35');
    });

    test('returns correct prefill data for lashes industry', () => {
      const lashPrefill = getPrefillForIndustry('lashes');
      expect(lashPrefill).toBeTruthy();
      expect(lashPrefill?.title).toContain('Lash Artist');
      expect(lashPrefill?.experienceLevel).toContain('Certified');
    });

    test('handles case insensitive industry names', () => {
      const upperCase = getPrefillForIndustry('NAILS');
      const lowerCase = getPrefillForIndustry('nails');
      const mixedCase = getPrefillForIndustry('NaIlS');
      
      expect(upperCase).toEqual(lowerCase);
      expect(mixedCase).toEqual(lowerCase);
    });

    test('handles industry name variations with fuzzy matching', () => {
      expect(getPrefillForIndustry('nail')).toBeTruthy();
      expect(getPrefillForIndustry('nail-tech')).toBeTruthy();
      expect(getPrefillForIndustry('hairstylist')).toBeTruthy();
      expect(getPrefillForIndustry('lash-artist')).toBeTruthy();
      expect(getPrefillForIndustry('massage-therapist')).toBeTruthy();
    });

    test('returns null for unknown industry', () => {
      const unknown = getPrefillForIndustry('unknown-industry');
      expect(unknown).toBeNull();
    });
  });

  describe('getAvailableIndustries', () => {
    test('returns all available industry keys', () => {
      const industries = getAvailableIndustries();
      expect(industries).toContain('nails');
      expect(industries).toContain('hair');
      expect(industries).toContain('lashes');
      expect(industries).toContain('esthetician');
      expect(industries).toContain('massage');
      expect(industries).toContain('barber');
      expect(industries).toContain('makeup');
      expect(industries).toContain('spa');
      expect(industries).toContain('piercing');
      expect(industries).toContain('microblading');
    });

    test('returns at least 10 different industries', () => {
      const industries = getAvailableIndustries();
      expect(industries.length).toBeGreaterThanOrEqual(10);
    });
  });

  describe('getJobPrefillByIndustry (backwards compatibility)', () => {
    test('works the same as getPrefillForIndustry', () => {
      const templateResult = getJobPrefillByIndustry('nails');
      const directResult = getPrefillForIndustry('nails');
      expect(templateResult).toEqual(directResult);
    });
  });

  describe('validatePrefillData', () => {
    test('validates correct prefill data structure', () => {
      const validData: JobPrefillData = {
        title: 'Test Title',
        shortDescription: 'Short desc',
        longDescription: 'Long description',
        requirements: ['Req 1', 'Req 2'],
        benefits: ['Benefit 1', 'Benefit 2'],
        salaryRange: '$20-30/hour',
        experienceLevel: 'Entry level',
        workType: 'Full-time',
        location: 'Test location',
        trustPhrase: 'Trust phrase'
      };

      expect(validatePrefillData(validData)).toBe(true);
    });

    test('rejects invalid data structures', () => {
      const invalidData = {
        title: 'Test',
        // missing required fields
      };

      expect(validatePrefillData(invalidData)).toBe(false);
      expect(validatePrefillData(null)).toBe(false);
      expect(validatePrefillData(undefined)).toBe(false);
    });
  });

  describe('All industry prefill data quality', () => {
    test('all industries have complete, high-quality data', () => {
      const industries = getAvailableIndustries();
      
      industries.forEach(industry => {
        const prefill = getPrefillForIndustry(industry);
        
        expect(prefill).toBeTruthy();
        expect(validatePrefillData(prefill)).toBe(true);
        
        // Quality checks
        expect(prefill!.title.length).toBeGreaterThan(10);
        expect(prefill!.longDescription.length).toBeGreaterThan(100);
        expect(prefill!.requirements.length).toBeGreaterThanOrEqual(3);
        expect(prefill!.benefits.length).toBeGreaterThanOrEqual(5);
        expect(prefill!.salaryRange).toMatch(/\$\d+/); // Contains dollar amount
        expect(prefill!.trustPhrase.length).toBeGreaterThan(15);
        
        // Emotional engagement checks
        expect(prefill!.longDescription).toMatch(/[💰✨🌟💎🎨🌸🌿💫⚡]/); // Contains emojis
        expect(prefill!.benefits.some(benefit => benefit.includes('💰'))).toBe(true); // Has pay emoji
      });
    });

    test('each industry has unique, industry-specific content', () => {
      const industries = getAvailableIndustries();
      const titles = industries.map(industry => getPrefillForIndustry(industry)?.title);
      
      // All titles should be unique
      const uniqueTitles = new Set(titles);
      expect(uniqueTitles.size).toBe(titles.length);
      
      // Industry-specific keywords should appear in relevant content
      const nailPrefill = getPrefillForIndustry('nails');
      expect(nailPrefill?.longDescription.toLowerCase()).toContain('nail');
      
      const hairPrefill = getPrefillForIndustry('hair');
      expect(hairPrefill?.longDescription.toLowerCase()).toContain('hair');
      
      const lashPrefill = getPrefillForIndustry('lashes');
      expect(lashPrefill?.longDescription.toLowerCase()).toContain('lash');
    });
  });
});
