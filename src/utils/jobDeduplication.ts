/**
 * BILLION-DOLLAR JOB DEDUPLICATION UTILITY
 * Prevents duplicate jobs from appearing in any display section
 */

import { Job } from '@/types/job';

/**
 * Remove duplicate jobs based on multiple criteria
 * Priority: ID > Title+Location > Title similarity
 */
export const deduplicateJobs = (jobs: Job[]): Job[] => {
  if (!jobs || !Array.isArray(jobs)) return [];
  
  const seen = new Set<string>();
  const titleLocationSeen = new Set<string>();
  const deduplicatedJobs: Job[] = [];
  
  console.log('🔍 [DEDUP] Starting deduplication for', jobs.length, 'jobs');
  
  for (const job of jobs) {
    // Primary deduplication by ID
    if (seen.has(job.id)) {
      console.log('❌ [DEDUP] Duplicate ID detected:', job.id, job.title);
      continue;
    }
    
    // Secondary deduplication by title + location combo
    const titleLocationKey = `${job.title?.toLowerCase()}_${job.location?.toLowerCase()}`;
    if (titleLocationSeen.has(titleLocationKey)) {
      console.log('❌ [DEDUP] Duplicate title+location detected:', titleLocationKey);
      continue;
    }
    
    // Tertiary deduplication by similar titles (>90% similarity)
    const isDuplicateTitle = deduplicatedJobs.some(existingJob => {
      if (!job.title || !existingJob.title) return false;
      const similarity = calculateTitleSimilarity(job.title, existingJob.title);
      return similarity > 0.9;
    });
    
    if (isDuplicateTitle) {
      console.log('❌ [DEDUP] Similar title detected:', job.title);
      continue;
    }
    
    // Job is unique, add to results
    seen.add(job.id);
    titleLocationSeen.add(titleLocationKey);
    deduplicatedJobs.push(job);
    
    console.log('✅ [DEDUP] Unique job added:', job.id, job.title);
  }
  
  console.log('✅ [DEDUP] Deduplication complete:', deduplicatedJobs.length, 'unique jobs');
  return deduplicatedJobs;
};

/**
 * Calculate similarity between two job titles
 * Returns value between 0 (no similarity) and 1 (identical)
 */
const calculateTitleSimilarity = (title1: string, title2: string): number => {
  const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const norm1 = normalize(title1);
  const norm2 = normalize(title2);
  
  if (norm1 === norm2) return 1;
  
  // Simple Levenshtein distance ratio
  const maxLength = Math.max(norm1.length, norm2.length);
  if (maxLength === 0) return 1;
  
  const distance = levenshteinDistance(norm1, norm2);
  return 1 - (distance / maxLength);
};

/**
 * Calculate Levenshtein distance between two strings
 */
const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const substitutionCost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + substitutionCost // substitution
      );
    }
  }
  
  return matrix[str2.length][str1.length];
};

/**
 * Remove duplicates within a specific industry/category
 */
export const deduplicateJobsByIndustry = (jobs: Job[], industry: string): Job[] => {
  const industryJobs = jobs.filter(job => 
    job.category?.toLowerCase() === industry.toLowerCase() ||
    job.category?.toLowerCase().includes(industry.toLowerCase())
  );
  
  return deduplicateJobs(industryJobs);
};