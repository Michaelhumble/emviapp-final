// Utility to generate and count programmatic artist routes
import { SEO_ROLES } from '@/data/seo-roles';
import { SEO_LOCATIONS } from '@/data/seo-locations';

export function generateAllArtistRoutes() {
  const routes: Array<{ role: string; cityState: string; url: string; title: string }> = [];
  
  for (const role of SEO_ROLES) {
    for (const location of SEO_LOCATIONS) {
      routes.push({
        role: role.id,
        cityState: location.id,
        url: `/artists/${role.id}/${location.id}`,
        title: `Top ${role.pluralName} in ${location.fullName} – EmviApp`
      });
    }
  }
  
  return routes;
}

export function getRouteCount() {
  return SEO_ROLES.length * SEO_LOCATIONS.length;
}

// Test samples for verification
export const SAMPLE_ROUTES = [
  '/artists/nails/houston-tx',
  '/artists/hair/los-angeles-ca', 
  '/artists/barber/chicago-il'
];

console.log('Expected route count:', getRouteCount());
console.log('Sample routes:', SAMPLE_ROUTES);
console.log('First 5 generated routes:', generateAllArtistRoutes().slice(0, 5));