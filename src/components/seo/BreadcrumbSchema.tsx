import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items?: BreadcrumbItem[];
  autoGenerate?: boolean;
}

const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ items, autoGenerate = true }) => {
  const location = useLocation();
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items && items.length > 0) return items;
    if (!autoGenerate) return [];
    
    const pathname = location.pathname;
    const segments = pathname.split('/').filter(Boolean);
    
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', url: 'https://www.emvi.app' }
    ];
    
    let currentPath = 'https://www.emvi.app';
    
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Format segment name
      let name = segment.charAt(0).toUpperCase() + segment.slice(1);
      
      // Special cases for better naming
      switch (segment) {
        case 'nails':
          name = 'Nail Jobs';
          break;
        case 'hair':
          name = 'Hair Jobs';
          break;
        case 'barber':
          name = 'Barber Jobs';
          break;
        case 'massage':
          name = 'Massage Jobs';
          break;
        case 'makeup':
          name = 'Makeup Jobs';
          break;
        case 'skincare':
          name = 'Skincare Jobs';
          break;
        case 'tattoo':
          name = 'Tattoo Jobs';
          break;
        case 'brows-lashes':
          name = 'Brows & Lashes Jobs';
          break;
        case 'artists':
          name = 'Beauty Artists';
          break;
        case 'salons':
          name = 'Beauty Salons';
          break;
        case 'jobs':
          name = 'Beauty Jobs';
          break;
        default:
          // Convert kebab-case and handle IDs
          if (segment.length > 30 && segment.includes('-')) {
            // Likely a slug with ID, extract meaningful part
            const parts = segment.split('-');
            name = parts.slice(0, -1).join(' ').replace(/\b\w/g, l => l.toUpperCase());
          } else {
            name = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          }
      }
      
      breadcrumbs.push({ name, url: currentPath });
    });
    
    return breadcrumbs;
  };

  const breadcrumbItems = generateBreadcrumbs();
  
  if (breadcrumbItems.length <= 1) return null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

export default BreadcrumbSchema;