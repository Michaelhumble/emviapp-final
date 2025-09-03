import React from 'react';
import { SEO_ROLES } from '@/data/seo-roles';
import { SEO_LOCATIONS } from '@/data/seo-locations';

interface CityRoleIntroProps {
  roleId: string;
  cityStateId: string;
  artistCount?: number;
}

const CityRoleIntro: React.FC<CityRoleIntroProps> = ({ 
  roleId, 
  cityStateId, 
  artistCount = 0 
}) => {
  const roleData = SEO_ROLES.find(role => role.id === roleId);
  const locationData = SEO_LOCATIONS.find(location => location.id === cityStateId);

  if (!roleData || !locationData) {
    return null;
  }

  const { pluralName, description } = roleData;
  const { city, state, fullName } = locationData;

  return (
    <div className="max-w-4xl mx-auto prose prose-lg text-center">
      <p className="text-lg md:text-xl text-muted-foreground">
        {description} Discover {artistCount > 0 ? `${artistCount} verified` : 'top'} {pluralName.toLowerCase()} 
        in {fullName} who are ready to deliver exceptional service. Whether you're looking to hire for your salon, 
        book freelance services, or connect with professionals for events, our vetted network ensures you're 
        working with qualified experts.
      </p>
      
      {artistCount > 0 && (
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border px-6 py-2 text-sm bg-primary/5 border-primary/20">
          <span className="text-primary font-medium">
            {artistCount} {pluralName.toLowerCase()} available in {city}, {state}
          </span>
        </div>
      )}
    </div>
  );
};

export default CityRoleIntro;