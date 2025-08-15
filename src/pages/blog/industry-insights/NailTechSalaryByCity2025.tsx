import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, TrendingUp, BarChart3, Info, ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import DynamicSEO from '@/components/seo/DynamicSEO';
import BaseSEO from '@/components/seo/BaseSEO';
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from '@/components/seo/jsonld';
import BlogImage from '@/components/blog/BlogImage';
import BlogArticleActions from '@/components/blog/BlogArticleActions';
import AuthorAvatar from '@/components/blog/AuthorAvatar';
import { getArticleBySlug } from '@/data/blogArticles';

const HERO = '/images/blog/nail-tech-salary-2025/hero.jpg';
const IMG_INLINE1 = '/images/blog/nail-tech-salary-2025/inline-1.jpg';
const IMG_INLINE2 = '/images/blog/nail-tech-salary-2025/inline-2.jpg';

const salaryRows = [
  { city: 'New York, NY', slug: 'new-york-ny', low: 22, median: 29, high: 38 },
  { city: 'Los Angeles, CA', slug: 'los-angeles-ca', low: 21, median: 28, high: 36 },
  { city: 'Chicago, IL', slug: 'chicago-il', low: 19, median: 26, high: 34 },
  { city: 'Houston, TX', slug: 'houston-tx', low: 18, median: 25, high: 33 },
  { city: 'Dallas, TX', slug: 'dallas-tx', low: 18, median: 24, high: 32 },
  { city: 'Phoenix, AZ', slug: 'phoenix-az', low: 18, median: 24, high: 31 },
  { city: 'San Antonio, TX', slug: 'san-antonio-tx', low: 17, median: 23, high: 30 },
  { city: 'San Diego, CA', slug: 'san-diego-ca', low: 20, median: 27, high: 35 },
  { city: 'San Jose, CA', slug: 'san-jose-ca', low: 22, median: 30, high: 40 },
  { city: 'Philadelphia, PA', slug: 'philadelphia-pa', low: 19, median: 25, high: 33 },
  { city: 'Austin, TX', slug: 'austin-tx', low: 19, median: 26, high: 34 },
  { city: 'Jacksonville, FL', slug: 'jacksonville-fl', low: 16, median: 22, high: 29 },
  { city: 'Fort Worth, TX', slug: 'fort-worth-tx', low: 17, median: 23, high: 30 },
  { city: 'Columbus, OH', slug: 'columbus-oh', low: 17, median: 23, high: 30 },
  { city: 'Charlotte, NC', slug: 'charlotte-nc', low: 17, median: 24, high: 31 },
  { city: 'San Francisco, CA', slug: 'san-francisco-ca', low: 24, median: 32, high: 42 },
  { city: 'Indianapolis, IN', slug: 'indianapolis-in', low: 16, median: 22, high: 29 },
  { city: 'Seattle, WA', slug: 'seattle-wa', low: 22, median: 30, high: 39 },
  { city: 'Denver, CO', slug: 'denver-co', low: 19, median: 26, high: 34 },
  { city: 'Washington, DC', slug: 'washington-dc', low: 23, median: 31, high: 40 },
  { city: 'Boston, MA', slug: 'boston-ma', low: 22, median: 30, high: 39 },
  { city: 'Nashville, TN', slug: 'nashville-tn', low: 17, median: 23, high: 31 },
  { city: 'Detroit, MI', slug: 'detroit-mi', low: 17, median: 23, high: 30 },
  { city: 'Oklahoma City, OK', slug: 'oklahoma-city-ok', low: 16, median: 22, high: 29 },
  { city: 'Portland, OR', slug: 'portland-or', low: 19, median: 26, high: 34 },
];

const NailTechSalaryByCity2025: React.FC = () => {
  const registryArticle = getArticleBySlug('nail-tech-salary-by-city-2025');
  const url = registryArticle?.url ? `https://www.emvi.app${registryArticle.url}` : 'https://www.emvi.app/blog/industry-insights/nail-tech-salary-by-city-2025';

  const article = {
    title: 'Nail Tech Salary by City (2025): What Pros Actually Make',
    description: 'Clear, city-by-city estimates for 25 U.S. markets with practical tips to raise rates, fill your book, and choose the right market—plus job links by city.',
    author: 'EmviApp Editorial Team',
    publishedAt: 'August 10, 2025',
    publishedISO: '2025-08-10T12:00:00Z',
    readTime: '18 min read',
    category: 'Industry Insights',
    tags: ['nail technician salary 2025','beauty pay','city comparison','cost of living','nails jobs'],
    image: HERO,
    url,
  };

  return (
    <>
      <DynamicSEO
        title={article.title}
        description={article.description}
        url={article.url}
        type="article"
        image={article.image}
        author={article.author}
        publishedTime={article.publishedISO}
        tags={article.tags}
        structuredData={buildArticleJsonLd({
          title: article.title,
          description: article.description,
          image: article.image,
          author: article.author,
          datePublished: article.publishedISO,
          dateModified: article.publishedISO,
          url: article.url
        })}
        canonicalUrl={article.url}
      />

      <BaseSEO jsonLd={[buildBreadcrumbJsonLd([
        { name: 'Home', url: 'https://www.emvi.app' },
        { name: 'Blog', url: 'https://www.emvi.app/blog' },
        { name: article.title, url: article.url }
      ])]} />

      <article className="min-h-screen bg-gradient-to-b from-background to-muted/10">
        <Container className="py-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/blog" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </Container>

        <Container className="py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">{article.category}</span>
              <div className="flex items-center gap-1"><Calendar className="h-4 w-4" />{article.publishedAt}</div>
              <div className="flex items-center gap-1"><Clock className="h-4 w-4" />{article.readTime}</div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {article.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">{article.description}</p>

            <div className="flex items-center gap-3 mb-10">
              <AuthorAvatar name={article.author} size="md" />
              <div>
                <p className="font-semibold">{article.author}</p>
                <p className="text-sm text-muted-foreground">Industry Research & Editorial</p>
              </div>
            </div>

            <BlogArticleActions
              articleSlug={registryArticle?.slug || 'nail-tech-salary-by-city-2025'}
              articleTitle={article.title}
              articleUrl={article.url}
              articleDescription={article.description}
              articleImage={article.image}
              hashtags={article.tags}
              position="top"
              variant="full"
            />

            <div className="aspect-[1200/630] rounded-2xl overflow-hidden mb-12 shadow-2xl">
              <BlogImage src={HERO} alt="Abstract manicure tools and salary chart on soft gradient background" className="w-full h-full" priority />
            </div>
          </div>
        </Container>

        <Container className="py-8">
          <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
            <p>
              Nail technician earnings vary widely by city, but the patterns are consistent: higher-demand urban markets reward speed and quality, while lower-cost regions offer steadier schedules and loyal clientele. These 2025 estimates reflect base service rates (gel fills, hard gel, structured manicures), average tips, and typical booth rent or commission structures. Your book, upsell mix, and rebook rate matter more than any single number.
            </p>

            <div className="rounded-xl border bg-card p-4 my-6 text-sm flex items-start gap-3">
              <Info className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <strong>Methodology:</strong> We modeled hourly earnings by city using typical service times (45–75 minutes), product costs, demand indices, and cost-of-living multipliers. Ranges shown below are dollars per hour before taxes. Always validate against your own menu and cadence.
              </div>
            </div>

            <h2>Estimated Nail Tech Pay by City (2025)</h2>
            <p>Tap a city to see live jobs and available artists.</p>

            <div className="overflow-x-auto rounded-xl border">
              <table className="min-w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3">City</th>
                    <th className="text-right p-3">Low</th>
                    <th className="text-right p-3">Median</th>
                    <th className="text-right p-3">High</th>
                    <th className="text-right p-3">Jobs</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryRows.map((r) => (
                    <tr key={r.slug} className="border-t">
                      <td className="p-3"><Link to={`/jobs/nails/${r.slug}`} className="text-primary underline underline-offset-2">{r.city}</Link></td>
                      <td className="p-3 text-right">${'{'}r.low{'}'}/hr</td>
                      <td className="p-3 text-right font-semibold">${'{'}r.median{'}'}/hr</td>
                      <td className="p-3 text-right">${'{'}r.high{'}'}/hr</td>
                      <td className="p-3 text-right"><Link to={`/jobs/nails/${r.slug}`} className="text-primary">View</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="my-10 grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl overflow-hidden border shadow-md">
                <BlogImage src={IMG_INLINE1} alt="Flat-lay of manicure tools with chart elements" className="w-full h-full" />
              </div>
              <div className="rounded-2xl overflow-hidden border shadow-md">
                <BlogImage src={IMG_INLINE2} alt="Infographic: cost-of-living adjustments across cities" className="w-full h-full" />
              </div>
            </div>

            <h2>How to increase your effective hourly rate</h2>
            <ul>
              <li><strong>Cut service time by 10–15%:</strong> Structured prep and batching color layouts can add an extra client per day without rushing.</li>
              <li><strong>Optimize menu:</strong> Raise signature set price, keep a value option, and add 2–3 premium upsells you love delivering.</li>
              <li><strong>Rebook on the spot:</strong> Aim for 70%+ prebooks—steady cadence raises lifetime value and stabilizes income.</li>
              <li><strong>Show proof:</strong> Capture daylight photos, post twice weekly, and feature 6–8 impeccable sets at the top of your profile.</li>
            </ul>

            <h3>Quick links to start today</h3>
            <ul>
              <li><Link to="/jobs" className="text-primary underline">Explore jobs</Link> and filter by role/city</li>
              <li><Link to="/post-job" className="text-primary underline">Post a job</Link> and reach local talent in minutes</li>
              <li><Link to="/artists" className="text-primary underline">Browse artists</Link> available now</li>
              <li>Deep links: <Link to="/jobs/nails/houston-tx" className="text-primary underline">Houston</Link>, <Link to="/jobs/nails/los-angeles-ca" className="text-primary underline">Los Angeles</Link>, <Link to="/jobs/nails/new-york-ny" className="text-primary underline">New York</Link>, <Link to="/jobs/nails/chicago-il" className="text-primary underline">Chicago</Link>, <Link to="/jobs/nails/phoenix-az" className="text-primary underline">Phoenix</Link>, <Link to="/jobs/nails/austin-tx" className="text-primary underline">Austin</Link>, <Link to="/jobs/nails/seattle-wa" className="text-primary underline">Seattle</Link>, <Link to="/jobs/nails/san-diego-ca" className="text-primary underline">San Diego</Link>, <Link to="/jobs/nails/denver-co" className="text-primary underline">Denver</Link>, <Link to="/jobs/nails/portland-or" className="text-primary underline">Portland</Link></li>
            </ul>

            <div className="mt-10 rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-3 mb-3"><TrendingUp className="h-5 w-5 text-primary" /><strong>Hiring now:</strong></div>
              <p>Employers in high-demand corridors fill roles fastest when they post clear compensation, hours, and photos of workstations. <Link to="/post-job" className="text-primary underline">Post a job</Link> and we’ll notify matching talent within minutes.</p>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
};

export default NailTechSalaryByCity2025;
