
import React from 'react';
import { Job } from '@/types/job';
import JobGrid from './JobGrid';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface BeautyIndustrySectionsProps {
  jobs: Job[];
  expirations: Record<string, boolean>;
  currentUserId?: string;
  onRenew: (job: Job) => void;
  isRenewing: boolean;
  renewalJobId: string | null;
  onDelete?: (jobId: string) => void;
  checkExpiration?: (job: Job) => boolean;
}

const BeautyIndustrySections = ({ 
  jobs, 
  expirations, 
  currentUserId, 
  onRenew, 
  isRenewing,
  renewalJobId,
  onDelete,
  checkExpiration
}: BeautyIndustrySectionsProps) => {

  // Define beauty industry categories in the specified order
  const beautyCategories = [
    { key: 'nails', title: 'Nail Tech Jobs', emoji: '💅', icon: '🌟' },
    { key: 'hair', title: 'Hair Stylist Jobs', emoji: '💇', icon: '✂️' },
    { key: 'barber', title: 'Barber Jobs', emoji: '💈', icon: '🪒' },
    { key: 'lash', title: 'Lash Tech Jobs', emoji: '👁️', icon: '✨' },
    { key: 'spa', title: 'Spa Jobs', emoji: '🧖', icon: '🌿' },
    { key: 'esthetician', title: 'Esthetician Jobs', emoji: '🧴', icon: '💆' },
    { key: 'tattoo', title: 'Tattoo Artist Jobs', emoji: '🎨', icon: '🖋️' },
    { key: 'makeup', title: 'Makeup Artist Jobs', emoji: '💄', icon: '🎭' },
    { key: 'permanent-makeup', title: 'Permanent Makeup Jobs', emoji: '🖌️', icon: '💋' },
    { key: 'receptionist', title: 'Receptionist Jobs', emoji: '📞', icon: '💼' },
    { key: 'booth-rental', title: 'Booth Rental', emoji: '🏪', icon: '🔑' },
    { key: 'salon-manager', title: 'Salon Manager Jobs', emoji: '👔', icon: '📊' },
    { key: 'other-beauty', title: 'Other Beauty Jobs', emoji: '✨', icon: '🌟' }
  ];

  // Group jobs by category
  const groupJobsByCategory = (jobs: Job[]) => {
    const grouped: Record<string, Job[]> = {};
    
    // Initialize all categories with empty arrays
    beautyCategories.forEach(cat => {
      grouped[cat.key] = [];
    });
    
    // Group jobs by their employment_type or title keywords
    jobs.forEach(job => {
      const jobType = job.employment_type?.toLowerCase() || '';
      const jobTitle = job.title?.toLowerCase() || '';
      
      let categorized = false;
      
      // Check each category for matches
      for (const category of beautyCategories) {
        if (jobType.includes(category.key) || 
            jobTitle.includes(category.key) ||
            (category.key === 'hair' && (jobTitle.includes('stylist') || jobTitle.includes('hair'))) ||
            (category.key === 'nails' && (jobTitle.includes('nail') || jobTitle.includes('manicure'))) ||
            (category.key === 'barber' && jobTitle.includes('barber')) ||
            (category.key === 'lash' && (jobTitle.includes('lash') || jobTitle.includes('eyelash'))) ||
            (category.key === 'spa' && jobTitle.includes('spa')) ||
            (category.key === 'esthetician' && (jobTitle.includes('esthetician') || jobTitle.includes('facial'))) ||
            (category.key === 'tattoo' && jobTitle.includes('tattoo')) ||
            (category.key === 'makeup' && jobTitle.includes('makeup')) ||
            (category.key === 'permanent-makeup' && jobTitle.includes('permanent')) ||
            (category.key === 'receptionist' && jobTitle.includes('receptionist')) ||
            (category.key === 'booth-rental' && (jobTitle.includes('booth') || jobTitle.includes('rental'))) ||
            (category.key === 'salon-manager' && (jobTitle.includes('manager') || jobTitle.includes('supervisor')))) {
          grouped[category.key].push(job);
          categorized = true;
          break;
        }
      }
      
      // If not categorized, put in other-beauty
      if (!categorized) {
        grouped['other-beauty'].push(job);
      }
    });
    
    return grouped;
  };

  const groupedJobs = groupJobsByCategory(jobs);

  const EmptyStateCard = ({ category }: { category: typeof beautyCategories[0] }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
      <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">{category.emoji}</span>
      </div>
      <h3 className="font-playfair text-xl font-semibold text-gray-900 mb-2">
        No {category.title.replace(' Jobs', '')} positions yet {category.emoji}
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto font-inter">
        Be the first to post a {category.title.replace(' Jobs', '').toLowerCase()} opportunity. Connect with qualified professionals in your area.
      </p>
      <Link to="/post-job">
        <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-inter font-semibold rounded-xl px-6 py-3">
          <Plus className="mr-2 h-4 w-4" />
          Post a {category.title.replace(' Jobs', '')} Job
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="space-y-8">
      {beautyCategories.map((category) => {
        const categoryJobs = groupedJobs[category.key] || [];
        
        return (
          <div key={category.key} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.emoji}</span>
                <div>
                  <h2 className="font-playfair text-2xl font-bold text-gray-900">
                    {category.title}
                  </h2>
                  <p className="text-gray-600 mt-1 font-inter">
                    {categoryJobs.length} {categoryJobs.length === 1 ? 'position' : 'positions'} available
                  </p>
                </div>
              </div>
              <Link to="/post-job">
                <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-inter font-semibold rounded-xl px-6 py-3">
                  <Plus className="mr-2 h-4 w-4" />
                  Post a {category.title.replace(' Jobs', '')} Job
                </Button>
              </Link>
            </div>
            
            {categoryJobs.length > 0 ? (
              <JobGrid
                jobs={categoryJobs}
                expirations={expirations}
                onRenew={onRenew}
                isRenewing={isRenewing}
                renewalJobId={renewalJobId}
              />
            ) : (
              <EmptyStateCard category={category} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BeautyIndustrySections;
