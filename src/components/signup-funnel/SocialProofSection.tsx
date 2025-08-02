import React from 'react';
import { Star, User } from 'lucide-react';
import { useFunnelTranslation } from '@/hooks/useFunnelTranslation';

interface SocialProofSectionProps {
  className?: string;
  variant?: 'full' | 'compact';
}

const SocialProofSection: React.FC<SocialProofSectionProps> = ({ 
  className = "",
  variant = 'full'
}) => {
  const { t } = useFunnelTranslation();

  if (variant === 'compact') {
    return (
      <div className={`text-center ${className}`}>
        <div className="flex items-center justify-center gap-2 text-sm text-white/80 mb-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>{t.socialProof.verifiedProfessionals}</span>
        </div>
        <div className="text-xs text-white/60">
          {t.socialProof.joinedToday}
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="text-center mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">
          {t.socialProof.verifiedProfessionals}
        </p>
        <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>{t.socialProof.joinedToday}</span>
        </div>
      </div>

      <div className="space-y-4">
        {t.socialProof.testimonials.map((testimonial, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {testimonial.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 mb-2">"{testimonial.comment}"</p>
                <div className="text-xs text-gray-500">
                  <span className="font-medium">{testimonial.name}</span>
                  <span className="mx-1">•</span>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialProofSection;