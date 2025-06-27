
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

// Professional SVG Icons for each industry
const NailTechIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C13.1 2 14 2.9 14 4V8H10V4C10 2.9 10.9 2 12 2Z" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M10 8H14V16C14 17.1 13.1 18 12 18C10.9 18 10 17.1 10 16V8Z" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M8 12H16" stroke="#8B5CF6" strokeWidth="2"/>
    <path d="M8 14H16" stroke="#8B5CF6" strokeWidth="2"/>
  </svg>
);

const HairIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8 2 5 5 5 9C5 11 6 13 8 14V20H16V14C18 13 19 11 19 9C19 5 16 2 12 2Z" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M9 10C9 9.5 9.5 9 10 9C10.5 9 11 9.5 11 10" stroke="#8B5CF6" strokeWidth="2"/>
    <path d="M13 10C13 9.5 13.5 9 14 9C14.5 9 15 9.5 15 10" stroke="#8B5CF6" strokeWidth="2"/>
  </svg>
);

const BarberIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 18L8 16L16 8L18 6L16 4L14 6L6 14L4 16L6 18Z" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M14.5 9.5L16.5 7.5" stroke="#8B5CF6" strokeWidth="2"/>
    <path d="M8.5 15.5L6.5 17.5" stroke="#8B5CF6" strokeWidth="2"/>
    <circle cx="18" cy="6" r="2" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
  </svg>
);

const LashIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12C4 8 8 4 12 4C16 4 20 8 20 12" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M6 12C6 14 8 16 10 18" stroke="#8B5CF6" strokeWidth="2"/>
    <path d="M12 12V18" stroke="#8B5CF6" strokeWidth="2"/>
    <path d="M18 12C18 14 16 16 14 18" stroke="#8B5CF6" strokeWidth="2"/>
    <circle cx="12" cy="10" r="1" stroke="#8B5CF6" strokeWidth="2" fill="#8B5CF6"/>
  </svg>
);

const SpaIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L13.5 6.5H18L14.5 9.5L16 14L12 11L8 14L9.5 9.5L6 6.5H10.5L12 2Z" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="18" r="3" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M9 18H15" stroke="#8B5CF6" strokeWidth="2"/>
  </svg>
);

const EstheticianIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M8 14C8 16 10 18 12 18C14 18 16 16 16 14" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M10 9C10 8.5 10.5 8 11 8C11.5 8 12 8.5 12 9" stroke="#8B5CF6" strokeWidth="2"/>
    <path d="M12 9C12 8.5 12.5 8 13 8C13.5 8 14 8.5 14 9" stroke="#8B5CF6" strokeWidth="2"/>
  </svg>
);

const TattooIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2L16 4L20 8L22 6L18 2Z" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M16 4L4 16L8 20L20 8" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M6 18L2 22" stroke="#8B5CF6" strokeWidth="2"/>
    <circle cx="14" cy="10" r="1" stroke="#8B5CF6" strokeWidth="2" fill="#8B5CF6"/>
  </svg>
);

const MakeupIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12L6 8L12 14L18 8L22 12L12 22L2 12Z" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="6" r="2" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M8 10L16 10" stroke="#8B5CF6" strokeWidth="2"/>
  </svg>
);

const PermanentMakeupIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21L12 12L21 3L18 6L12 12L6 18L3 21Z" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <circle cx="18" cy="6" r="2" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M9 15L15 9" stroke="#8B5CF6" strokeWidth="2"/>
    <path d="M7 17L17 7" stroke="#8B5CF6" strokeWidth="2"/>
  </svg>
);

const ReceptionistIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4H20V16H4V4Z" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M8 8H16" stroke="#8B5CF6" strokeWidth="2"/>
    <path d="M8 12H12" stroke="#8B5CF6" strokeWidth="2"/>
    <circle cx="16" cy="12" r="2" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M4 20H20" stroke="#8B5CF6" strokeWidth="2"/>
  </svg>
);

const BoothRentalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21H21V9L12 3L3 9V21Z" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M9 21V12H15V21" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M9 9H15" stroke="#8B5CF6" strokeWidth="2"/>
    <circle cx="12" cy="15" r="1" stroke="#8B5CF6" strokeWidth="2" fill="#8B5CF6"/>
  </svg>
);

const ManagerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="7" r="4" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M5.5 21V19C5.5 15.7 8.2 13 11.5 13H12.5C15.8 13 18.5 15.7 18.5 19V21" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M16 3L20 7L16 11" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
  </svg>
);

const OtherBeautyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M8 12L12 16L16 8" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="6" r="1" stroke="#8B5CF6" strokeWidth="2" fill="#8B5CF6"/>
  </svg>
);

const beautyIndustries = [
  { key: 'nails', title: 'Nail Tech Jobs', icon: NailTechIcon, category: 'Nail Technician' },
  { key: 'hair', title: 'Hair Stylist Jobs', icon: HairIcon, category: 'Hair Stylist' },
  { key: 'barber', title: 'Barber Jobs', icon: BarberIcon, category: 'Barber' },
  { key: 'lash', title: 'Lash Tech Jobs', icon: LashIcon, category: 'Lash Technician' },
  { key: 'spa', title: 'Spa Jobs', icon: SpaIcon, category: 'Spa Therapist' },
  { key: 'esthetician', title: 'Esthetician Jobs', icon: EstheticianIcon, category: 'Esthetician' },
  { key: 'tattoo', title: 'Tattoo Artist Jobs', icon: TattooIcon, category: 'Tattoo Artist' },
  { key: 'makeup', title: 'Makeup Artist Jobs', icon: MakeupIcon, category: 'Makeup Artist' },
  { key: 'permanent-makeup', title: 'Permanent Makeup Jobs', icon: PermanentMakeupIcon, category: 'Permanent Makeup Artist' },
  { key: 'receptionist', title: 'Receptionist Jobs', icon: ReceptionistIcon, category: 'Receptionist' },
  { key: 'booth-rental', title: 'Booth Rental', icon: BoothRentalIcon, category: 'Booth Rental' },
  { key: 'manager', title: 'Salon Manager Jobs', icon: ManagerIcon, category: 'Salon Manager' },
  { key: 'other', title: 'Other Beauty Jobs', icon: OtherBeautyIcon, category: 'Other Beauty' }
];

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

  const getJobsByCategory = (category: string) => {
    return jobs.filter(job => {
      const jobCategory = job.employment_type || job.category || '';
      return jobCategory.toLowerCase().includes(category.toLowerCase()) ||
             category.toLowerCase().includes(jobCategory.toLowerCase());
    });
  };

  const EmptyStateCard = ({ industry }: { industry: typeof beautyIndustries[0] }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
      <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
        <industry.icon />
      </div>
      <h3 className="font-playfair text-xl font-semibold text-gray-900 mb-2">
        No {industry.category} Jobs Yet
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto font-inter">
        Be the first to post a {industry.category.toLowerCase()} job opportunity. Connect with qualified professionals in your area.
      </p>
      <Link to="/post-job">
        <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-inter font-semibold rounded-xl px-6 py-3">
          <Plus className="mr-2 h-4 w-4" />
          Post a {industry.category} Job
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="space-y-8">
      {beautyIndustries.map((industry) => {
        const categoryJobs = getJobsByCategory(industry.category);
        
        return (
          <div key={industry.key} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-purple-50 rounded-full w-12 h-12 flex items-center justify-center">
                  <industry.icon />
                </div>
                <div>
                  <h2 className="font-playfair text-2xl font-bold text-gray-900">
                    {industry.title}
                  </h2>
                  <p className="text-gray-600 mt-1 font-inter">
                    {categoryJobs.length} {categoryJobs.length === 1 ? 'position' : 'positions'} available
                  </p>
                </div>
              </div>
              <Link to="/post-job">
                <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-inter font-semibold rounded-xl px-6 py-3">
                  <Plus className="mr-2 h-4 w-4" />
                  Post a {industry.category} Job
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
              <EmptyStateCard industry={industry} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BeautyIndustrySections;
