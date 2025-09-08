import React from 'react';
import { SEO_ROLES } from '@/data/seo-roles';
import { SEO_LOCATIONS } from '@/data/seo-locations';

interface InternalLinkSystemProps {
  currentRole?: string;
  currentLocation?: string;
  type: 'category-hub' | 'city-hub' | 'category-city' | 'footer';
  maxLinks?: number;
}

const InternalLinkSystem: React.FC<InternalLinkSystemProps> = ({
  currentRole,
  currentLocation,
  type,
  maxLinks = 12
}) => {
  const renderCategoryHub = () => {
    const otherRoles = SEO_ROLES.filter(role => role.id !== currentRole).slice(0, maxLinks);
    const topCities = SEO_LOCATIONS.slice(0, 8);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Other Beauty Categories</h3>
          <div className="grid grid-cols-2 gap-2">
            {otherRoles.map(role => (
              <a
                key={role.id}
                href={`/seo/category/${role.id}`}
                className="text-sm text-muted-foreground hover:text-primary hover:underline"
              >
                {role.pluralName}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Popular Cities</h3>
          <div className="grid grid-cols-2 gap-2">
            {topCities.map(city => (
              <a
                key={city.id}
                href={`/seo/${currentRole}/${city.id}`}
                className="text-sm text-muted-foreground hover:text-primary hover:underline"
              >
                {city.city}, {city.state}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderCityHub = () => {
    const allRoles = SEO_ROLES.slice(0, maxLinks);
    const nearbyCities = SEO_LOCATIONS.filter(loc => loc.id !== currentLocation).slice(0, 8);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Beauty Jobs by Category</h3>
          <div className="grid grid-cols-2 gap-2">
            {allRoles.map(role => (
              <a
                key={role.id}
                href={`/seo/${role.id}/${currentLocation}`}
                className="text-sm text-muted-foreground hover:text-primary hover:underline"
              >
                {role.pluralName}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Nearby Cities</h3>
          <div className="grid grid-cols-2 gap-2">
            {nearbyCities.map(city => (
              <a
                key={city.id}
                href={`/seo/city/${city.id}`}
                className="text-sm text-muted-foreground hover:text-primary hover:underline"
              >
                {city.city}, {city.state}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderCategoryCityLinks = () => {
    const currentRoleData = SEO_ROLES.find(r => r.id === currentRole);
    const currentLocationData = SEO_LOCATIONS.find(l => l.id === currentLocation);
    
    const otherRolesInCity = SEO_ROLES.filter(role => role.id !== currentRole).slice(0, 6);
    const sameRoleOtherCities = SEO_LOCATIONS.filter(loc => loc.id !== currentLocation).slice(0, 6);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Other Beauty Jobs in {currentLocationData?.city}
          </h3>
          <div className="space-y-2">
            {otherRolesInCity.map(role => (
              <a
                key={role.id}
                href={`/seo/${role.id}/${currentLocation}`}
                className="block text-sm text-muted-foreground hover:text-primary hover:underline"
              >
                {role.pluralName} in {currentLocationData?.city}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {currentRoleData?.pluralName} in Other Cities
          </h3>
          <div className="space-y-2">
            {sameRoleOtherCities.map(city => (
              <a
                key={city.id}
                href={`/seo/${currentRole}/${city.id}`}
                className="block text-sm text-muted-foreground hover:text-primary hover:underline"
              >
                {currentRoleData?.pluralName} in {city.city}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderFooterLinks = () => {
    const topRoles = SEO_ROLES.slice(0, 8);
    const topCities = SEO_LOCATIONS.slice(0, 8);

    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h4 className="font-semibold mb-3">Beauty Jobs</h4>
          <div className="space-y-2">
            {topRoles.slice(0, 4).map(role => (
              <a
                key={role.id}
                href={`/seo/category/${role.id}`}
                className="block text-sm text-muted-foreground hover:text-primary"
              >
                {role.pluralName}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">More Categories</h4>
          <div className="space-y-2">
            {topRoles.slice(4, 8).map(role => (
              <a
                key={role.id}
                href={`/seo/category/${role.id}`}
                className="block text-sm text-muted-foreground hover:text-primary"
              >
                {role.pluralName}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Top Cities</h4>
          <div className="space-y-2">
            {topCities.slice(0, 4).map(city => (
              <a
                key={city.id}
                href={`/seo/city/${city.id}`}
                className="block text-sm text-muted-foreground hover:text-primary"
              >
                {city.city}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">More Cities</h4>
          <div className="space-y-2">
            {topCities.slice(4, 8).map(city => (
              <a
                key={city.id}
                href={`/seo/city/${city.id}`}
                className="block text-sm text-muted-foreground hover:text-primary"
              >
                {city.city}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (type) {
      case 'category-hub':
        return renderCategoryHub();
      case 'city-hub':
        return renderCityHub();
      case 'category-city':
        return renderCategoryCityLinks();
      case 'footer':
        return renderFooterLinks();
      default:
        return null;
    }
  };

  return (
    <div className="bg-secondary/30 rounded-lg p-6">
      {renderContent()}
    </div>
  );
};

export default InternalLinkSystem;