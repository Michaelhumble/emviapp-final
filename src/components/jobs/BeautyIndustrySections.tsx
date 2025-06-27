
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

// Minimal SVG icon components - can be replaced with premium SVGs later
const NailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="12" rx="8" ry="6" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M8 12c0-2 1.5-3 4-3s4 1 4 3" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
  </svg>
);

const HairIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3c-3 0-5 2-5 5v8c0 2 2 4 5 4s5-2 5-4V8c0-3-2-5-5-5z" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M8 8c-1-1-3-1-4 0M16 8c1-1 3-1 4 0" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
  </svg>
);

const BarberIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="4" width="12" height="16" rx="6" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M10 8h4M10 12h4M10 16h4" stroke="#8B5CF6" strokeWidth="2"/>
  </svg>
);

const LashIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="12" rx="8" ry="4" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M8 10c0-1 1-2 2-2M12 8c0-1 0-2 0-2M16 10c0-1-1-2-2-2" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
  </svg>
);

const SpaIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="8" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M8 12c2-2 4-2 6 0s4 2 6 0" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
  </svg>
);

const EstheticianIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M8 16c0-2 2-4 4-4s4 2 4 4v4H8v-4z" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
  </svg>
);

const TattooIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 4l8 16M16 4L8 20" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="12" r="2" fill="#8B5CF6"/>
  </svg>
);

const MakeupIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="8" width="12" height="8" rx="2" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M10 6v2M14 6v2" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
  </svg>
);

const PermanentMakeupIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 18L18 6M8 6h8M6 8v8" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <circle cx="15" cy="9" r="1" fill="#8B5CF6"/>
  </svg>
);

const ReceptionistIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="8" width="16" height="10" rx="2" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M8 12h8M8 15h6" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
  </svg>
);

const BoothRentalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="16" height="12" rx="2" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
  </svg>
);

const ManagerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="3" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M8 16c0-2 2-3 4-3s4 1 4 3v4H8v-4z" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M16 12l2-2M18 14l2-2" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
  </svg>
);

const OtherBeautyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="8" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
    <path d="M12 8v8M8 12h8" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
  </svg>
);

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
  
  const beautyIndustries = [
    { key: 'nail', title: 'Nail Tech Jobs', icon: NailIcon, buttonText: 'Post a Nail Tech Job' },
    { key: 'hair', title: 'Hair Stylist Jobs', icon: HairIcon, buttonText: 'Post a Hair Stylist Job' },
    { key: 'barber', title: 'Barber Jobs', icon: BarberIcon, buttonText: 'Post a Barber Job' },
    { key: 'lash', title: 'Lash Technician Jobs', icon: LashIcon, buttonText: 'Post a Lash Tech Job' },
    { key: 'spa', title: 'Spa Jobs', icon: SpaIcon, buttonText: 'Post a Spa Job' },
    { key: 'esthetician', title: 'Esthetician Jobs', icon: EstheticianIcon, buttonText: 'Post an Esthetician Job' },
    { key: 'tattoo', title: 'Tattoo Artist Jobs', icon: TattooIcon, buttonText: 'Post a Tattoo Artist Job' },
    { key: 'makeup', title: 'Makeup Artist Jobs', icon: MakeupIcon, buttonText: 'Post a Makeup Artist Job' },
    { key: 'permanent-makeup', title: 'Permanent Makeup Jobs', icon: PermanentMakeupIcon, buttonText: 'Post a Permanent Makeup Job' },
    { key: 'receptionist', title: 'Receptionist Jobs', icon: ReceptionistIcon, buttonText: 'Post a Receptionist Job' },
    { key: 'booth-rental', title: 'Booth Rental', icon: BoothRentalIcon, buttonText: 'Post a Booth Rental' },
    { key: 'manager', title: 'Salon Manager Jobs', icon: ManagerIcon, buttonText: 'Post a Manager Job' },
    { key: 'other', title: 'Other Beauty Jobs', icon: OtherBeautyIcon, buttonText: 'Post a Beauty Job' }
  ];

  // Group jobs by employment_type or assign to 'other' category
  const groupJobsByIndustry = (jobs: Job[]) => {
    const grouped: Record<string, Job[]> = {};
    
    // Initialize all categories
    beautyIndustries.forEach(industry => {
      grouped[industry.key] = [];
    });
    
    jobs.forEach(job => {
      const employmentType = job.employment_type?.toLowerCase() || 'other';
      let category = 'other';
      
      // Map employment types to our categories
      if (employmentType.includes('nail')) category = 'nail';
      else if (employmentType.includes('hair')) category = 'hair';
      else if (employmentType.includes('barber')) category = 'barber';
      else if (employmentType.includes('lash') || employmentType.includes('eyelash')) category = 'lash';
      else if (employmentType.includes('spa') || employmentType.includes('massage')) category = 'spa';
      else if (employmentType.includes('esthetic') || employmentType.includes('facial')) category = 'esthetician';
      else if (employmentType.includes('tattoo')) category = 'tattoo';
      else if (employmentType.includes('makeup') && !employmentType.includes('permanent')) category = 'makeup';
      else if (employmentType.includes('permanent') && employmentType.includes('makeup')) category = 'permanent-makeup';
      else if (employmentType.includes('reception') || employmentType.includes('front desk')) category = 'receptionist';
      else if (employmentType.includes('booth') || employmentType.includes('rental')) category = 'booth-rental';
      else if (employmentType.includes('manager') || employmentType.includes('supervisor')) category = 'manager';
      
      grouped[category].push(job);
    });
    
    return grouped;
  };

  const groupedJobs = groupJobsByIndustry(jobs);

  const EmptyStateCard = ({ industry }: { industry: typeof beautyIndustries[0] }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
      <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
        <industry.icon />
      </div>
      <h3 className="font-playfair text-xl font-semibold text-gray-900 mb-2">
        No {industry.title.replace(' Jobs', '')} Jobs Yet
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Be the first to post a {industry.title.replace(' Jobs', '').toLowerCase()} job opportunity. Connect with qualified professionals in your area.
      </p>
      <Link to="/post-job">
        <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-inter font-semibold rounded-xl px-6 py-3">
          <Plus className="mr-2 h-4 w-4" />
          {industry.buttonText}
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="space-y-8">
      {beautyIndustries.map((industry) => {
        const industryJobs = groupedJobs[industry.key] || [];
        
        return (
          <div key={industry.key} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <industry.icon />
                <div>
                  <h2 className="font-playfair text-2xl font-bold text-gray-900">
                    {industry.title}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {industryJobs.length} {industryJobs.length === 1 ? 'position' : 'positions'} available
                  </p>
                </div>
              </div>
              <Link to="/post-job">
                <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-inter font-semibold rounded-xl px-6 py-3">
                  <Plus className="mr-2 h-4 w-4" />
                  {industry.buttonText}
                </Button>
              </Link>
            </div>
            
            {industryJobs.length > 0 ? (
              <JobGrid
                jobs={industryJobs}
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
