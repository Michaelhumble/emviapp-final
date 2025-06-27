import React, { useState } from 'react';
import { Job } from '@/types/job';
import JobListingCard from './JobListingCard';
import { JobDetailModal } from './JobDetailModal';
import { 
  Hand, 
  Scissors, 
  Sparkles, 
  Eye, 
  Heart, 
  Waves,
  Home,
  Palette,
  Zap,
  Wrench
} from 'lucide-react';

interface JobsByIndustrySectionProps {
  jobs: Job[];
  expirations: Record<string, boolean>;
  currentUserId?: string;
  onRenew: (job: Job) => void;
  isRenewing: boolean;
  renewalJobId: string | null;
  onDelete?: (jobId: string) => void;
  checkExpiration?: (job: Job) => boolean;
}

const categorizeJobs = (jobs: Job[]) => {
  const categories = {
    nails: [] as Job[],
    hair: [] as Job[],
    barber: [] as Job[],
    lash: [] as Job[],
    esthetician: [] as Job[],
    spa: [] as Job[],
    makeup: [] as Job[],
    permanent_makeup: [] as Job[],
    massage: [] as Job[],
    other: [] as Job[]
  };

  jobs.forEach(job => {
    const title = job.title?.toLowerCase() || '';
    const description = job.description?.toLowerCase() || '';
    const text = `${title} ${description}`;

    if (text.includes('nail') || text.includes('manicure') || text.includes('pedicure')) {
      categories.nails.push(job);
    } else if (text.includes('hair') && !text.includes('barber')) {
      categories.hair.push(job);
    } else if (text.includes('barber') || text.includes('men\'s grooming')) {
      categories.barber.push(job);
    } else if (text.includes('lash') || text.includes('eyelash') || text.includes('brow') || text.includes('eyebrow')) {
      categories.lash.push(job);
    } else if (text.includes('esthetician') || text.includes('facial') || text.includes('skincare')) {
      categories.esthetician.push(job);
    } else if (text.includes('spa') || text.includes('wellness') || text.includes('body treatment')) {
      categories.spa.push(job);
    } else if (text.includes('makeup') && !text.includes('permanent')) {
      categories.makeup.push(job);
    } else if (text.includes('permanent makeup') || text.includes('microblading') || text.includes('tattoo')) {
      categories.permanent_makeup.push(job);
    } else if (text.includes('massage') || text.includes('therapist')) {
      categories.massage.push(job);
    } else {
      categories.other.push(job);
    }
  });

  return categories;
};

const JobsByIndustrySection: React.FC<JobsByIndustrySectionProps> = ({
  jobs,
  expirations,
  currentUserId,
  onRenew,
  isRenewing,
  renewalJobId,
  onDelete,
  checkExpiration
}) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const categorizedJobs = categorizeJobs(jobs);

  const industryConfig = [
    {
      key: 'nails' as keyof typeof categorizedJobs,
      title: 'Nail Technician',
      icon: Hand,
      description: 'For nail salons looking for experienced technicians with skills in manicures, pedicures, and nail art.',
      emptyMessage: '💅 No nail technician positions available right now'
    },
    {
      key: 'hair' as keyof typeof categorizedJobs,
      title: 'Hair Stylist',
      icon: Scissors,
      description: 'For salons seeking professionals skilled in cutting, coloring, and styling services.',
      emptyMessage: '✂️ No hair stylist positions available right now'
    },
    {
      key: 'barber' as keyof typeof categorizedJobs,
      title: 'Barber',
      icon: Scissors,
      description: 'For barbershops looking for skilled professionals in men\'s grooming and styling.',
      emptyMessage: '✂️ No barber positions available right now'
    },
    {
      key: 'lash' as keyof typeof categorizedJobs,
      title: 'Lash Technician',
      icon: Eye,
      description: 'For beauty businesses seeking specialists in eyelash extensions and lash services.',
      emptyMessage: '👁️ No lash technician positions available right now'
    },
    {
      key: 'esthetician' as keyof typeof categorizedJobs,
      title: 'Esthetician',
      icon: Sparkles,
      description: 'For spas and salons seeking skincare specialists for facials and treatments.',
      emptyMessage: '✨ No esthetician positions available right now'
    },
    {
      key: 'spa' as keyof typeof categorizedJobs,
      title: 'Spa Technician',
      icon: Heart,
      description: 'For wellness centers seeking professionals for body treatments, wraps, and therapeutic services.',
      emptyMessage: '💜 No spa technician positions available right now'
    },
    {
      key: 'massage' as keyof typeof categorizedJobs,
      title: 'Massage Therapist',
      icon: Waves,
      description: 'For spas and wellness centers seeking licensed therapists for massage and bodywork services.',
      emptyMessage: '🌊 No massage therapist positions available right now'
    },
    {
      key: 'makeup' as keyof typeof categorizedJobs,
      title: 'Makeup Artist',
      icon: Palette,
      description: 'For salons and studios seeking professionals skilled in makeup application for various occasions.',
      emptyMessage: '🎨 No makeup artist positions available right now'
    },
    {
      key: 'permanent_makeup' as keyof typeof categorizedJobs,
      title: 'Permanent Makeup',
      icon: Zap,
      description: 'For studios seeking skilled artists with strong portfolios and tattooing expertise.',
      emptyMessage: '⚡ No permanent makeup positions available right now'
    },
    {
      key: 'other' as keyof typeof categorizedJobs,
      title: 'Other Beauty Services',
      icon: Wrench,
      description: 'For businesses seeking specialized beauty services such as microblading, threading, or waxing.',
      emptyMessage: '🔧 No other beauty service positions available right now'
    }
  ];

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const handleCloseDetails = () => {
    setSelectedJob(null);
  };

  return (
    <div className="space-y-12">
      {industryConfig.map(({ key, title, icon: IconComponent, description, emptyMessage }) => {
        const sectionJobs = categorizedJobs[key].sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        return (
          <section key={key} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100">
                <IconComponent className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {title} <span className="text-sm font-normal text-gray-500">({sectionJobs.length})</span>
                </h2>
                <p className="text-gray-600 text-sm">{description}</p>
              </div>
            </div>

            {sectionJobs.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <p className="text-gray-500">{emptyMessage}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sectionJobs.map((job) => (
                  <JobListingCard
                    key={job.id}
                    job={job}
                    isExpired={checkExpiration ? checkExpiration(job) : expirations[job.id]}
                    onViewDetails={() => handleViewDetails(job)}
                    onRenew={() => onRenew(job)}
                    onDelete={onDelete ? () => onDelete(job.id) : undefined}
                    isRenewing={isRenewing && renewalJobId === job.id}
                    currentUserId={currentUserId}
                    showOwnerActions={currentUserId === job.user_id}
                  />
                ))}
              </div>
            )}
          </section>
        );
      })}

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isOpen={!!selectedJob}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default JobsByIndustrySection;
