import { useEffect } from 'react';
import { notifyJobUpsert, notifyJobRemove, generateJobUrl, pingSitemaps } from '@/lib/indexing/google';

interface JobData {
  id: string;
  title?: string;
  location?: string;
  category?: string;
  status?: string;
}

/**
 * Hook to handle Google Indexing API notifications for job changes
 */
export const useJobIndexing = () => {
  
  /**
   * Notify Google when a job is created or updated
   */
  const notifyJobCreated = async (job: JobData) => {
    try {
      const jobUrl = generateJobUrl(job.id, job.title, job.location, job.category);
      console.log(`🔍 Notifying Google about new job: ${jobUrl}`);
      
      // Notify Google Indexing API
      const indexingResult = await notifyJobUpsert(jobUrl);
      
      // Ping sitemaps to let Google know about updates
      const sitemapResult = await pingSitemaps();
      
      if (indexingResult.success) {
        console.log('✅ Successfully notified Google about job creation');
      } else {
        console.warn('⚠️ Failed to notify Google about job creation:', indexingResult.error);
      }
      
      return { indexingResult, sitemapResult };
    } catch (error) {
      console.error('❌ Error in job creation notification:', error);
      return { 
        indexingResult: { success: false, action: 'notify_job_upsert', error: (error as Error).message },
        sitemapResult: { success: false, action: 'ping_sitemaps', error: (error as Error).message }
      };
    }
  };

  /**
   * Notify Google when a job is updated
   */
  const notifyJobUpdated = async (job: JobData) => {
    try {
      const jobUrl = generateJobUrl(job.id, job.title, job.location, job.category);
      console.log(`🔄 Notifying Google about job update: ${jobUrl}`);
      
      // For updates, we use the same upsert endpoint
      const indexingResult = await notifyJobUpsert(jobUrl);
      
      // Ping sitemaps
      const sitemapResult = await pingSitemaps();
      
      if (indexingResult.success) {
        console.log('✅ Successfully notified Google about job update');
      } else {
        console.warn('⚠️ Failed to notify Google about job update:', indexingResult.error);
      }
      
      return { indexingResult, sitemapResult };
    } catch (error) {
      console.error('❌ Error in job update notification:', error);
      return { 
        indexingResult: { success: false, action: 'notify_job_upsert', error: (error as Error).message },
        sitemapResult: { success: false, action: 'ping_sitemaps', error: (error as Error).message }
      };
    }
  };

  /**
   * Notify Google when a job is deleted or expired
   */
  const notifyJobDeleted = async (job: JobData) => {
    try {
      const jobUrl = generateJobUrl(job.id, job.title, job.location, job.category);
      console.log(`🗑️ Notifying Google about job deletion: ${jobUrl}`);
      
      // Notify Google about URL deletion
      const indexingResult = await notifyJobRemove(jobUrl);
      
      // Ping sitemaps
      const sitemapResult = await pingSitemaps();
      
      if (indexingResult.success) {
        console.log('✅ Successfully notified Google about job deletion');
      } else {
        console.warn('⚠️ Failed to notify Google about job deletion:', indexingResult.error);
      }
      
      return { indexingResult, sitemapResult };
    } catch (error) {
      console.error('❌ Error in job deletion notification:', error);
      return { 
        indexingResult: { success: false, action: 'notify_job_remove', error: (error as Error).message },
        sitemapResult: { success: false, action: 'ping_sitemaps', error: (error as Error).message }
      };
    }
  };

  /**
   * Handle job status changes automatically
   */
  const handleJobStatusChange = async (
    job: JobData, 
    previousStatus?: string, 
    newStatus?: string
  ) => {
    // If job becomes active from draft/pending
    if (newStatus === 'active' && previousStatus !== 'active') {
      return await notifyJobCreated(job);
    }
    
    // If job becomes inactive/expired/filled
    if (previousStatus === 'active' && newStatus !== 'active') {
      return await notifyJobDeleted(job);
    }
    
    // If job is updated while active
    if (newStatus === 'active' && previousStatus === 'active') {
      return await notifyJobUpdated(job);
    }
    
    console.log(`ℹ️ No indexing notification needed for status change: ${previousStatus} → ${newStatus}`);
    return null;
  };

  return {
    notifyJobCreated,
    notifyJobUpdated,
    notifyJobDeleted,
    handleJobStatusChange
  };
};