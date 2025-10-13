/**
 * Popular Cities & Roles - Rotating internal links for SEO crawl depth
 * Displays a curated set of high-value city/role combinations
 */

const POPULAR_LINKS = [
  { label: 'Nail Tech Houston', href: '/nail-tech/houston-tx' },
  { label: 'Hair Stylist LA', href: '/hair-stylist/los-angeles-ca' },
  { label: 'Barber NYC', href: '/barber/new-york-ny' },
  { label: 'Nail Jobs Miami', href: '/jobs/miami-fl' },
  { label: 'Salons Dallas', href: '/salons/dallas-tx' },
  { label: 'Hair Phoenix', href: '/hair-stylist/phoenix-az' },
  { label: 'Nail Tech Chicago', href: '/nail-tech/chicago-il' },
  { label: 'Barber Atlanta', href: '/barber/atlanta-ga' },
  { label: 'Makeup Artist LA', href: '/makeup/los-angeles-ca' },
  { label: 'Esthetician NYC', href: '/skincare/new-york-ny' },
  { label: 'Lash Tech Miami', href: '/brows-lashes/miami-fl' },
  { label: 'Nail Salons Vegas', href: '/salons/las-vegas-nv' }
];

export default function PopularLinks() {
  return (
    <div className="border-t border-border/40 pt-6 mt-6">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Popular Cities & Roles
      </h3>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {POPULAR_LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
