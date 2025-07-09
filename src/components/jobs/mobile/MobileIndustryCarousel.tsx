import React from 'react';
import { 
  Sparkles, 
  Scissors, 
  Zap, 
  Heart, 
  Star, 
  Palette, 
  Pen, 
  Eye,
  Brush
} from 'lucide-react';

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
              flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-colors
              ${activeIndustry === 'All' 
                ? 'bg-purple-600 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }
            `}
          >
            All Jobs
            <span className="ml-1 text-xs font-medium">
              ({Object.values(jobCounts).reduce((a, b) => a + b, 0)})
            </span>
          </button>

          {/* Industry tabs */}
          {industries.map((industry) => {
            const count = jobCounts[industry] || 0;
            
            // Skip industries with no jobs
            if (count === 0) return null;
            
            // Get industry icon
            const getIndustryIcon = (ind: string) => {
              const lower = ind.toLowerCase();
              if (lower.includes('nail')) return <Sparkles className="h-5 w-5" />;
              if (lower.includes('hair')) return <Scissors className="h-5 w-5" />;
              if (lower.includes('barber')) return <Zap className="h-5 w-5" />;
              if (lower.includes('massage')) return <Heart className="h-5 w-5" />;
              if (lower.includes('makeup')) return <Palette className="h-5 w-5" />;
              if (lower.includes('lash') || lower.includes('brow')) return <Eye className="h-5 w-5" />;
              if (lower.includes('tattoo')) return <Pen className="h-5 w-5" />;
              if (lower.includes('esthetic')) return <Star className="h-5 w-5" />;
              return <Brush className="h-5 w-5" />;
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
                  flex-shrink-0 px-3 py-2 rounded-full text-sm font-bold transition-colors flex items-center gap-2
                  ${activeIndustry === industry 
                    ? 'bg-purple-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }
                `}
              >
                {getIndustryIcon(industry)}
                {getShortName(industry)}
                <span className="text-xs font-bold">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active industry indicator */}
      {activeIndustry !== 'All' && (
        <div className="px-4 pb-2">
          <div className="text-xs font-medium text-gray-800">
            Showing jobs in <span className="font-bold text-gray-900">{activeIndustry}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileIndustryCarousel;