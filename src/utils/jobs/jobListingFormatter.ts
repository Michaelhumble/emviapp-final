import { Job } from '@/types/job';
import { generateVietnameseNailJobs } from './vietnameseNailJobSamples';
import { generateRandomSalon } from './placeholderGenerators';

export const formatJobListing = (job: Job): Job => {
  const isVietnamese = job.title.toLowerCase().includes('vietnamese') || job.description.toLowerCase().includes('vietnamese');

  if (isVietnamese) {
    const vietnameseJobs = generateVietnameseNailJobs(1);
    if (vietnameseJobs.length > 0) {
      const sampleJob = vietnameseJobs[0];
      return {
        ...job,
        salary: sampleJob.salary || job.salary,
        specialties: sampleJob.specialties || job.specialties,
      };
    }
  }

  // Add salon details if missing
  if (!job.salon) {
    const randomSalon = generateRandomSalon();
    return {
      ...job,
      salon: randomSalon,
    };
  }

  return job;
};
