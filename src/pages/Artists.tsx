import Layout from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/context/auth";
import { ArtistForHireCard } from "@/components/artists/ArtistForHireCard";
import { Button } from "@/components/ui/button";
import ArtistsFilters from "@/components/artists/ArtistsFilters";
import { useArtistsSearch } from "@/hooks/useArtistsSearch";
import { useMemo } from "react";
import ComprehensiveSEO from "@/components/seo/ComprehensiveSEO";
import { buildBreadcrumbJsonLd } from "@/components/seo/jsonld";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const Artists = () => {
  const { isSignedIn } = useAuth();
  const { items, loading, hasMore, loadMore, filters, setFilters, specialtyChips, featured } = useArtistsSearch({ available: true });

  const jsonLd = useMemo(() => {
    const firstTen = items.slice(0, 10);
    const itemListElement = firstTen.map((a: any, idx: number) => {
      const name = a.headline || a.full_name || 'Beauty Professional';
      const firstSpec = String(a.specialties || '').split(',').map((s: string) => s.trim()).filter(Boolean)[0] || 'Beauty Professional';
      const loc = String(a.location || '');
      const [city = '', regionRaw = ''] = loc.split(',').map((s: string) => s.trim());
      const region = (regionRaw || '').split(' ')[0] || undefined; // strip country if present
      const url = `https://www.emvi.app/artists/${(a as any).id || (a as any).user_id || ''}`;
      return {
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "Person",
          name,
          jobTitle: firstSpec,
          address: city || region ? { "@type": "PostalAddress", addressLocality: city || undefined, addressRegion: region || undefined, addressCountry: 'US' } : undefined,
          url,
        }
      };
    });
    return { "@context": "https://schema.org", "@type": "ItemList", itemListElement } as any;
  }, [items]);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I hire artists on EmviApp?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Browse verified artists, view their specialties and locations, then contact or book through their profiles."
        }
      },
      {
        "@type": "Question",
        name: "What specialties are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can find hair, nails, makeup, barber, skincare, brows & lashes, tattoo, and massage professionals."
        }
      },
      {
        "@type": "Question",
        name: "Is EmviApp free for artists?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, artists can create a free profile. Employers can post jobs or contact talent directly."
        }
      }
    ]
  } as const;

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Artists', href: '/artists', current: true }
  ];

  return (
    <Layout>
      <ComprehensiveSEO 
        title="Hire Top Beauty Artists - Nail Tech, Hair Stylists & More | EmviApp"
        description="Connect with verified beauty artists offering premium services. Browse nail technicians, hair stylists, barbers with proven khách sang experience and tip cao results."
        canonicalUrl="https://www.emvi.app/artists"
        structuredData={[buildBreadcrumbJsonLd([
          { name: 'Home', url: 'https://www.emvi.app' },
          { name: 'Artists', url: 'https://www.emvi.app/artists' }
        ]), jsonLd, faqJsonLd, {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Premium Beauty Artists",
          "jobTitle": "Beauty Professional",
          "description": "Verified beauty professionals offering nail tech, hair styling, barber, and wellness services with proven expertise.",
          "url": "https://www.emvi.app/artists",
          "worksFor": {
            "@type": "Organization",
            "name": "EmviApp"
          },
          "hasOccupation": {
            "@type": "Occupation",
            "name": "Beauty Professional",
            "experienceRequirements": "Verified expertise in beauty services"
          }
        }, {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How do I connect with artists on EmviApp?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Browse verified artist profiles, view their specialties and portfolios, then contact them directly through our secure messaging system or request their services for immediate booking."
              }
            },
            {
              "@type": "Question",
              "name": "Are all artists verified and licensed?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Every artist undergoes verification including license validation, portfolio review, and background checks to ensure you're connecting with qualified professionals who maintain khách sang standards."
              }
            },
            {
              "@type": "Question",
              "name": "What specialties can I find on the platform?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our network includes nail technicians, hair stylists, barbers, massage therapists, estheticians, makeup artists, brow & lash specialists, and tattoo artists with proven tip cao results."
              }
            },
            {
              "@type": "Question",
              "name": "Can I hire artists for events or temporary positions?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely! Many artists offer freelance services for events, temporary coverage, or short-term contracts. Filter by availability and booking preferences to find the perfect match."
              }
            }
          ]
        }]} 
      />

      {/* Breadcrumbs */}
      <section className="bg-white border-b border-gray-200">
        <Container className="py-4">
          <Breadcrumbs items={breadcrumbItems} />
        </Container>
      </section>


      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 via-purple-600/30 to-indigo-800/40"></div>
          <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-pink-400/15 via-purple-500/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-amber-300/15 via-pink-400/20 to-transparent rounded-full blur-3xl"></div>
        </div>
        <Container className="relative z-10 py-14 md:py-18">
          <div className="max-w-4xl mx-auto animate-fade-in text-center">
            <div className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur-md p-8 md:p-12 shadow-xl">
              <h2 className="font-playfair text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-amber-300 via-orange-200 to-yellow-300 bg-clip-text text-transparent">
                Top Beauty Pros — Available Now
              </h2>
            <p className="mt-3 text-white/85 text-base md:text-lg">
              Verified beauty professionals. Contact details for verified employers.
            </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <a href="#artists-grid">
                  <Button size="lg" variant="default">Hire Talent</Button>
                </a>
                <a href="/dashboard/profile">
                  <Button size="lg" variant="outline" className="backdrop-blur">Create Free Profile</Button>
                </a>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm mx-auto bg-white/10 text-white border-white/20">
                <span>4.9 avg rating • 10K+ pros • 50+ cities</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SEO Intro Copy */}
      <section className="py-8 bg-white">
        <Container>
          <article className="prose max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Premium Beauty Artists - Khách Sang Service Providers</h1>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Connect with Elite Beauty Professionals</h2>
                <p className="mb-4">
                  EmviApp's artist marketplace showcases the industry's most skilled beauty professionals, each verified for expertise and commitment to delivering khách sang level service. Our curated network includes nail technicians who consistently achieve tip cao results, hair stylists with proven track records at premium salons, and specialized artists who excel in creating exceptional client experiences.
                </p>
                <p className="mb-4">
                  Every professional in our network has been thoroughly vetted, with verified portfolios, client testimonials, and demonstrated expertise. Whether you need last-minute coverage for your salon or are seeking long-term partnership opportunities, our platform makes it easy to connect with artists who understand the importance of maintaining high standards and professional excellence.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Find Artists Who Deliver Results</h2>
                <p className="mb-4">
                  From nail technicians specializing in intricate designs to hair stylists with expertise in advanced color techniques, our platform connects you with professionals who bring both technical skill and business acumen to every appointment. Each artist profile includes specialties, experience level, service areas, and availability status for immediate matching.
                </p>
                <p className="mb-4">
                  Looking to expand your team? Browse our <a href="/jobs" className="text-primary underline">premium job opportunities</a> to attract top talent, or explore <a href="/salons" className="text-primary underline">established salons for sale</a> if you're ready to build your own team of exceptional artists.
                </p>
              </div>
            </div>
          </article>
        </Container>
      </section>

      {/* Browse Cities & Roles */}
      <section className="py-8 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Browse Artists by City & Specialty</h2>
              <p className="text-muted-foreground">Find top beauty professionals in your area</p>
            </div>
            
            <nav aria-label="Popular artist searches">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                <a href="/artists/nails/houston-tx" className="block p-3 border rounded-lg hover:bg-white hover:shadow-sm transition-all">
                  <span className="font-medium">Nail Artists</span>
                  <span className="text-sm text-muted-foreground block">Houston, TX</span>
                </a>
                <a href="/artists/hair/los-angeles-ca" className="block p-3 border rounded-lg hover:bg-white hover:shadow-sm transition-all">
                  <span className="font-medium">Hair Stylists</span>
                  <span className="text-sm text-muted-foreground block">Los Angeles, CA</span>
                </a>
                <a href="/artists/barber/new-york-ny" className="block p-3 border rounded-lg hover:bg-white hover:shadow-sm transition-all">
                  <span className="font-medium">Barbers</span>
                  <span className="text-sm text-muted-foreground block">New York, NY</span>
                </a>
                <a href="/artists/lashes/miami-fl" className="block p-3 border rounded-lg hover:bg-white hover:shadow-sm transition-all">
                  <span className="font-medium">Lash Artists</span>
                  <span className="text-sm text-muted-foreground block">Miami, FL</span>
                </a>
                <a href="/artists/skincare/chicago-il" className="block p-3 border rounded-lg hover:bg-white hover:shadow-sm transition-all">
                  <span className="font-medium">Estheticians</span>
                  <span className="text-sm text-muted-foreground block">Chicago, IL</span>
                </a>
                <a href="/artists/massage/phoenix-az" className="block p-3 border rounded-lg hover:bg-white hover:shadow-sm transition-all">
                  <span className="font-medium">Massage Therapists</span>
                  <span className="text-sm text-muted-foreground block">Phoenix, AZ</span>
                </a>
                <a href="/artists/nails/dallas-tx" className="block p-3 border rounded-lg hover:bg-white hover:shadow-sm transition-all">
                  <span className="font-medium">Nail Artists</span>
                  <span className="text-sm text-muted-foreground block">Dallas, TX</span>
                </a>
                <a href="/artists/hair/atlanta-ga" className="block p-3 border rounded-lg hover:bg-white hover:shadow-sm transition-all">
                  <span className="font-medium">Hair Stylists</span>
                  <span className="text-sm text-muted-foreground block">Atlanta, GA</span>
                </a>
              </div>
              
              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  Explore professionals in 25+ cities across 6 specialties
                </p>
              </div>
            </nav>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Artist Hiring FAQs</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">How do I connect with artists on EmviApp?</h3>
                <p className="text-gray-700">Browse verified artist profiles, view their specialties and portfolios, then contact them directly through our secure messaging system or request their services for immediate booking.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">Are all artists verified and licensed?</h3>
                <p className="text-gray-700">Yes! Every artist undergoes verification including license validation, portfolio review, and background checks to ensure you're connecting with qualified professionals who maintain khách sang standards.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">What specialties can I find on the platform?</h3>
                <p className="text-gray-700">Our network includes nail technicians, hair stylists, barbers, massage therapists, estheticians, makeup artists, brow & lash specialists, and tattoo artists with proven tip cao results.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">Can I hire artists for events or temporary positions?</h3>
                <p className="text-gray-700">Absolutely! Many artists offer freelance services for events, temporary coverage, or short-term contracts. Filter by availability and booking preferences to find the perfect match.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Sticky Filters */}
      <ArtistsFilters
        q={filters.q}
        location={filters.location}
        specialty={filters.specialty}
        available={filters.available}
        vietnamese={filters.vietnamese}
        sort={filters.sort}
        onChange={setFilters as any}
        specialtyChips={specialtyChips}
      />

      {/* Featured Pros (optional) */}
      {featured.length > 0 && (
        <section className="py-10 bg-gradient-to-br from-slate-50 via-white to-purple-50/40">
          <Container>
            <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-gray-200/50 shadow-xl p-6 md:p-10 animate-fade-in text-foreground">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-playfair font-bold">Featured Pros</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featured.map((a) => (
                  <ArtistForHireCard
                    key={(a as any).user_id || (a as any).id}
                    artist={a as any}
                    viewMode={isSignedIn ? "signedIn" : "public"}
                    theme="blue"
                    hidePhoto
                    contactGated
                  />
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3">Hire fast in…</h3>
                <div className="flex flex-wrap gap-2">
                  {(() => {
                    const { CITIES, ROLES } = require('@/seo/locations/seed');
                    const cityChips = (CITIES as any[]).slice(0,6).map((c: any) => ({ label: `${c.city}, ${c.state}`, href: `/artists/nails/${c.slug}` }));
                    const roleCity = (CITIES as any[]).slice(0,6).map((c: any, idx: number) => {
                      const r = (ROLES as string[])[idx];
                      const label = r.replace('-', ' ').replace(/\b\w/g, (ch) => ch.toUpperCase());
                      return { label: `${label} · ${c.city}, ${c.state}`, href: `/artists/${r}/${c.slug}` };
                    });
                    return [...cityChips, ...roleCity].map((chip) => (
                      <a key={chip.href} href={chip.href} className="inline-flex items-center rounded-full border px-3 py-1 text-sm hover:bg-muted/50 transition-colors">
                        {chip.label}
                      </a>
                    ));
                  })()}
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Artists Grid */}
      <section className="py-12 bg-gradient-to-b from-white to-purple-50/30" id="artists-grid">
        <Container>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/60 p-6 md:p-10 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-playfair font-bold">Available Now</h2>
            </div>
            {loading && items.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-muted rounded-lg border p-6 animate-pulse h-[220px]" />
                ))}
              </div>
            ) : items.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {items.map((a) => (
                    <ArtistForHireCard
                      key={(a as any).user_id || (a as any).id}
                      artist={a as any}
                      viewMode={isSignedIn ? "signedIn" : "public"}
                      theme="blue"
                      hidePhoto
                      contactGated
                      variant="blueMinimal"
                    />
                  ))}
                </div>
                {hasMore && (
                  <div className="text-center mt-8">
                    <Button onClick={loadMore} disabled={loading} variant="outline">
                      {loading ? "Loading..." : "Load more"}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                {isSignedIn ? (
                  <div>No one available yet — post a job and we will notify matches.</div>
                ) : (
                  <div>Nothing to show yet — sign in to see who is available.</div>
                )}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <a href="/artists/hair/los-angeles-ca" className="border rounded-lg p-4 text-center">Hair Artists — Los Angeles, CA</a>
                  <a href="/artists/nails/houston-tx" className="border rounded-lg p-4 text-center">Nail Artists — Houston, TX</a>
                  <a href="/artists/makeup/new-york-ny" className="border rounded-lg p-4 text-center">Makeup Artists — New York, NY</a>
                  <a href="/artists/barber/dallas-tx" className="border rounded-lg p-4 text-center">Barbers — Dallas, TX</a>
                </div>
                <div className="mt-4">
                  <a href="/dashboard/profile">
                    <Button>Create Free Profile</Button>
                  </a>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Social Proof band */}
      <section className="py-12 bg-gradient-to-br from-slate-900 via-purple-900/70 to-indigo-900/60">
        <Container>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">Proven Impact:</span> Success Stories That Prove It Works
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow animate-fade-in text-white">
              <h3 className="font-playfair text-xl font-bold mb-3">Case Study: Magic Nails Studio, Texas</h3>
              <ul className="list-disc pl-5 space-y-1 text-white/80">
                <li>150% increase in new client bookings</li>
                <li>40% reduction in service time per client</li>
                <li>95% increase in social media engagement</li>
                <li>$50k+ additional annual revenue</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow animate-fade-in text-white">
              <h3 className="font-playfair text-xl font-bold mb-3">Case Study: Glamour Salon Network, California</h3>
              <ul className="list-disc pl-5 space-y-1 text-white/80">
                <li>300% improvement in appointment efficiency</li>
                <li>80% reduction in customer wait times</li>
                <li>65% increase in customer lifetime value</li>
                <li>Opened 3 new locations in 18 months</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA band */}
      <section className="py-12">
        <Container>
          <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-3xl border p-8 text-center">
            <h3 className="font-playfair text-2xl md:text-3xl font-bold">Need talent fast?</h3>
            <p className="text-muted-foreground mt-2">Post a job and we’ll notify matching artists within minutes.</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <a href="/post-job">
                <Button size="lg">Post a Job</Button>
              </a>
              <a href="/dashboard/profile">
                <Button size="lg" variant="outline">Create Free Artist Profile</Button>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default Artists;
