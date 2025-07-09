import React from 'react';

interface MobileIndustryCarouselProps {
  industries: string[];
  activeIndustry: string;
  onIndustryChange: (industry: string) => void;
  jobCounts: Record<string, number>;
}

const MobileIndustryCarousel: React.FC<MobileIndustryCarouselProps> = ({
  industries,
  activeIndustry,
  onIndustryChange,
  jobCounts
}) => {
  return (
    <div className="sticky top-0 bg-white z-40 border-b border-gray-200 mb-6">
      <div className="overflow-x-auto">
        <div className="flex space-x-2 px-4 py-3" style={{ width: 'max-content' }}>
          {/* All Industries tab */}
          <button
            onClick={() => onIndustryChange('All')}
            className={`
              flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${activeIndustry === 'All' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            All Jobs
            <span className="ml-1 text-xs">
              ({Object.values(jobCounts).reduce((a, b) => a + b, 0)})
            </span>
          </button>

          {/* Industry tabs */}
          {industries.map((industry) => {
            const count = jobCounts[industry] || 0;
            
            // Skip industries with no jobs
            if (count === 0) return null;
            
            // Get industry emoji
            const getIndustryEmoji = (ind: string) => {
              const lower = ind.toLowerCase();
              if (lower.includes('nail')) return '💅';
              if (lower.includes('hair')) return '✂️';
              if (lower.includes('barber')) return '💈';
              if (lower.includes('massage')) return '💆';
              if (lower.includes('makeup')) return '💄';
              if (lower.includes('lash') || lower.includes('brow')) return '👁️';
              if (lower.includes('tattoo')) return '🎨';
              if (lower.includes('esthetic')) return '✨';
              return '🏢';
            };

            // Shorten industry names for mobile
            const getShortName = (ind: string) => {
              return ind
                .replace('Technician', 'Tech')
                .replace('Therapist', 'Therapy')
                .replace('Artist', 'Art')
                .replace('Stylist', 'Style');
            };

            return (
              <button
                key={industry}
                onClick={() => onIndustryChange(industry)}
                className={`
                  flex-shrink-0 px-3 py-2 rounded-full text-sm font-medium transition-colors flex items-center
                  ${activeIndustry === industry 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                <span className="mr-1">{getIndustryEmoji(industry)}</span>
                {getShortName(industry)}
                <span className="ml-1 text-xs">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active industry indicator */}
      {activeIndustry !== 'All' && (
        <div className="px-4 pb-2">
          <div className="text-xs text-gray-600">
            Showing jobs in <span className="font-medium">{activeIndustry}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileIndustryCarousel;