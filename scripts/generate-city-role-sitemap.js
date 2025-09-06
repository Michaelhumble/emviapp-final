// Generate City × Role Job Hub sitemap entries

const TARGET_CITIES = [
  'new-york-ny', 'los-angeles-ca', 'chicago-il', 'houston-tx', 'phoenix-az',
  'philadelphia-pa', 'san-antonio-tx', 'san-diego-ca', 'dallas-tx', 'san-jose-ca',
  'miami-fl', 'las-vegas-nv', 'atlanta-ga', 'orlando-fl', 'nashville-tn',
  'denver-co', 'seattle-wa', 'austin-tx', 'charlotte-nc', 'portland-or',
  'tampa-fl', 'raleigh-nc', 'sacramento-ca', 'kansas-city-mo', 'virginia-beach-va'
];

const BEAUTY_ROLES = [
  'nail-technician', 'hair-stylist', 'barber', 'esthetician', 'massage-therapist', 'lash-artist'
];

// Generate all combinations
let sitemapXML = '  <!-- NEW: Programmatic City × Role Job Hub Pages (25 cities × 6 roles = 150 pages) -->\n';

TARGET_CITIES.forEach(city => {
  sitemapXML += `  <!-- ${city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} -->\n`;
  BEAUTY_ROLES.forEach(role => {
    sitemapXML += `  <url><loc>https://www.emvi.app/jobs/${city}/${role}</loc><lastmod>2025-01-02T00:00:00Z</lastmod></url>\n`;
  });
  sitemapXML += '\n';
});

console.log(sitemapXML);