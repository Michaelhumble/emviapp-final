import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Calculator, FileText, Percent, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import DynamicSEO from '@/components/seo/DynamicSEO';
import BaseSEO from '@/components/seo/BaseSEO';
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from '@/components/seo/jsonld';
import BlogImage from '@/components/blog/BlogImage';
import BlogArticleActions from '@/components/blog/BlogArticleActions';
import AuthorAvatar from '@/components/blog/AuthorAvatar';
import { getArticleBySlug } from '@/data/blogArticles';

const HERO = '/images/blog/booth-rent-vs-commission-2025/hero.jpg';
const IMG_TOOLS = '/images/blog/booth-rent-vs-commission-2025/tools-costs.jpg';
const IMG_TAXES = '/images/blog/booth-rent-vs-commission-2025/taxes-math.jpg';
const IMG_CONTRACT = '/images/blog/booth-rent-vs-commission-2025/contract-checklist.jpg';

const BoothRentVsCommission2025: React.FC = () => {
  const registryArticle = getArticleBySlug('booth-rent-vs-commission-2025');
  if (!registryArticle) return <div>Article not found</div>;

  const article = {
    title: 'Booth Rent vs Commission in 2025: What Pays More?',
    description: 'Clear math, contracts, taxes, and real examples so stylists and salon owners choose the right model—with checklists, FAQs, and on-ramps to take action.',
    author: 'EmviApp AI Research Team',
    publishedAt: 'August 10, 2025',
    publishedISO: '2025-08-10T12:00:00Z',
    readTime: '16 min read',
    category: 'Industry Insights',
    tags: ['booth rent','commission','salon pay','contracts','taxes','stylists','salon owners'],
    image: HERO,
    url: `https://emvi.app${registryArticle.url}`
  };

  const faq = [
    { q: 'Is booth rent or commission better in 2025?', a: 'Neither is universally better. Commission often wins for new stylists who need demand and training. Booth rent can net more once your chair stays 70%+ booked and you’re comfortable handling taxes, retail, and supplies.' },
    { q: 'How much is typical booth rent?', a: 'In the U.S., $150–$350/week for nails; $200–$500/week for hair, depending on location and amenities. Always compare to your projected commission after product fees.' },
    { q: 'What about taxes (W‑2 vs 1099)?', a: 'Commission employees receive W‑2s; payroll taxes are handled by the employer. Booth renters are independent (1099), responsible for self‑employment tax (~15.3% on net profit) and quarterly estimates.' },
    { q: 'Can salons mix models?', a: 'Yes. Many operate hybrid: junior stylists on commission, seniors on rent. Make policies crystal‑clear to avoid legal misclassification.' },
    { q: 'What should be in a booth‑rental contract?', a: 'Space and hours, rent amount and increases, retail rules, sanitation, insurance, supplies, non‑compete/non‑solicit (local law dependent), termination terms, and dispute resolution.' },
  ];

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
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.description,
          image: article.image,
          author: { '@type': 'Organization', name: article.author },
          publisher: {
            '@type': 'Organization',
            name: 'EmviApp',
            logo: { '@type': 'ImageObject', url: 'https://emvi.app/logo.png' }
          },
          datePublished: article.publishedISO,
          dateModified: article.publishedISO,
          mainEntityOfPage: article.url
        }}
        canonicalUrl={article.url}
      />

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
              articleSlug={registryArticle.slug}
              articleTitle={article.title}
              articleUrl={article.url}
              articleDescription={article.description}
              articleImage={article.image}
              hashtags={article.tags}
              position="top"
              variant="full"
            />

            <div className="aspect-[2/1] rounded-2xl overflow-hidden mb-12 shadow-2xl">
              <BlogImage src={HERO} alt="Flat-lay: salon chair silhouette, calculator, contract pages, shears on neutral gradient" className="w-full h-full" priority />
            </div>
          </div>
        </Container>

        <Container className="py-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl leading-relaxed mb-8 text-muted-foreground">
                If you’re choosing between booth rent and commission in 2025, the honest answer is: it depends on your numbers, your goals, and your appetite for business tasks. This guide gives you the clean math, real‑world scenarios, and practical checklists both stylists and salon owners can trust.
              </p>

              <div className="bg-card rounded-xl border p-6 mb-10 shadow-sm">
                <h3 className="m-0 text-lg font-semibold mb-3">Key takeaways (2‑minute skim)</h3>
                <ul className="m-0 grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <li>• Commission rewards early career growth; booth rent rewards established demand</li>
                  <li>• Flip point often appears at ~70%+ chair utilization</li>
                  <li>• Don’t forget card fees, software, and supplies in rent math</li>
                  <li>• W‑2 vs 1099 changes your tax admin and benefits picture</li>
                  <li>• Hybrid models (juniors commission, seniors rent) work well in 2025</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold mb-6 text-foreground">What Searchers Want Right Now</h2>
              <p className="mb-6">Search interest for “booth rent vs commission” keeps rising amid tighter labor markets and profit pressure. Owners want predictability; stylists want upside and autonomy. Our take: make the decision on real utilization, not vibes.</p>

              <blockquote className="border-l-4 border-primary pl-6 italic text-xl mb-8 text-muted-foreground">
                “Commission rewards early career growth; booth rent rewards established demand.”
              </blockquote>

              <h2 className="text-3xl font-bold mb-6 text-foreground">The Quick Math (2025 Reality)</h2>
              <div className="bg-card rounded-xl border p-6 mb-6">
                <div className="flex items-center gap-2 mb-3"><Calculator className="h-5 w-5 text-primary" /><h3 className="m-0 text-xl font-semibold">Commission Example</h3></div>
                <ul className="m-0 space-y-2 text-muted-foreground">
                  <li>• Service sales: $6,000/mo</li>
                  <li>• Commission rate: 45%</li>
                  <li>• Product fee chargeback: 5% of sales</li>
                  <li>• Est. tips: $600/mo</li>
                </ul>
                <p className="mt-3"><strong>Take‑home (pre‑tax):</strong> $6,000 × 0.45 − (0.05 × 6,000) + $600 = <strong>$2,700</strong></p>
              </div>
              <div className="bg-card rounded-xl border p-6 mb-8">
                <div className="flex items-center gap-2 mb-3"><Calculator className="h-5 w-5 text-primary" /><h3 className="m-0 text-xl font-semibold">Booth Rent Example</h3></div>
                <ul className="m-0 space-y-2 text-muted-foreground">
                  <li>• Service sales: $6,000/mo</li>
                  <li>• Rent: $250/week (≈$1,083/mo)</li>
                  <li>• Supplies/retail: $350/mo</li>
                  <li>• Card fees & software: $180/mo</li>
                </ul>
                <p className="mt-3"><strong>Net (pre‑tax):</strong> $6,000 − $1,083 − $350 − $180 = <strong>$4,387</strong> → minus self‑employment tax (~15.3% on net profit)</p>
              </div>

              <div className="rounded-2xl overflow-hidden mb-10 shadow">
                <BlogImage src={IMG_TOOLS} alt="Salon tools with labeled costs and a calculator—visualizing overhead math" />
              </div>

              <h2 className="text-3xl font-bold mb-6 text-foreground">When Commission Wins</h2>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li><strong>You’re building demand.</strong> New or relocating stylists benefit from a salon that markets, books, and trains.</li>
                <li><strong>Team education matters.</strong> Advanced training and mentorship are part of comp.</li>
                <li><strong>Predictability.</strong> Owners cover overhead; you focus on service quality.</li>
              </ul>

              <h2 className="text-3xl font-bold mb-6 text-foreground">When Booth Rent Wins</h2>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li><strong>70%+ utilization.</strong> Your chair is consistently booked from your own brand/referrals.</li>
                <li><strong>Business comfort.</strong> You handle supplies, light marketing, and taxes without friction.</li>
                <li><strong>Upside.</strong> After fixed rent, the extra bookings are mostly yours.</li>
              </ul>

              <div className="overflow-x-auto rounded-xl border bg-card mb-8">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-foreground">
                    <tr>
                      <th className="text-left p-3">Criteria</th>
                      <th className="text-left p-3">Commission (W‑2)</th>
                      <th className="text-left p-3">Booth Rent (1099)</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-t">
                      <td className="p-3">Income volatility</td>
                      <td className="p-3">Lower — slow days partly absorbed</td>
                      <td className="p-3">Higher — fixed rent regardless of bookings</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3">Marketing responsibility</td>
                      <td className="p-3">Salon-led</td>
                      <td className="p-3">Stylist-led</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3">Admin & taxes</td>
                      <td className="p-3">Payroll handled (W‑2)</td>
                      <td className="p-3">Self-employment tax, quarterly estimates</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3">Supplies & retail</td>
                      <td className="p-3">Often subsidized or chargebacks</td>
                      <td className="p-3">Your cost, your margin</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3">Upside potential</td>
                      <td className="p-3">Moderate — ladders/bonuses</td>
                      <td className="p-3">High — after fixed costs</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3">Benefits</td>
                      <td className="p-3">Possible (PTO, education)</td>
                      <td className="p-3">None — buy privately</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6 mb-10">
                <div className="flex items-center gap-2 mb-2"><TrendingUp className="h-5 w-5 text-emerald-600" /><h3 className="m-0 text-xl font-semibold">Rule of Thumb</h3></div>
                <p className="m-0 text-emerald-800 dark:text-emerald-100">If your projected <strong>commission take‑home</strong> is under what you’d net after <strong>rent + supplies + fees</strong>, go booth rent. Otherwise, stay commission and grow demand until it flips.</p>
              </div>

              <h2 className="text-3xl font-bold mb-6 text-foreground">Taxes & Classification (W‑2 vs 1099)</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-card rounded-xl border p-6">
                  <div className="flex items-center gap-2 mb-2"><Percent className="h-5 w-5 text-primary" /><h3 className="m-0 text-lg font-semibold">Commission (W‑2)</h3></div>
                  <ul className="m-0 space-y-2 text-muted-foreground text-sm">
                    <li>• Employer handles payroll taxes.</li>
                    <li>• Potential benefits (PTO, education allowances).</li>
                    <li>• Less tax admin for stylists.</li>
                  </ul>
                </div>
                <div className="bg-card rounded-xl border p-6">
                  <div className="flex items-center gap-2 mb-2"><Percent className="h-5 w-5 text-primary" /><h3 className="m-0 text-lg font-semibold">Booth Rent (1099)</h3></div>
                  <ul className="m-0 space-y-2 text-muted-foreground text-sm">
                    <li>• You pay self‑employment tax (~15.3%).</li>
                    <li>• Quarterly estimated payments.</li>
                    <li>• Deduct expenses (rent, supplies, software).</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden mb-10 shadow">
                <BlogImage src={IMG_TAXES} alt="1099 vs W‑2 concept with calculator and simple charts" />
              </div>

              <h2 className="text-3xl font-bold mb-6 text-foreground">Contracts & House Rules (What to Include)</h2>
              <div className="bg-card rounded-xl border p-6 mb-6">
                <div className="flex items-center gap-2 mb-3"><FileText className="h-5 w-5 text-primary" /><h3 className="m-0 text-xl font-semibold">Booth‑Rental Agreement Checklist</h3></div>
                <ul className="m-0 space-y-2">
                  <li>• Space description, days/hours, keys/access</li>
                  <li>• Rent amount, due date, increases, late policy</li>
                  <li>• Shared utilities/amenities (laundry, receptionist, booking app)</li>
                  <li>• Supplies & product rules; retail splits</li>
                  <li>• Sanitation & state board compliance</li>
                  <li>• Insurance requirements (liability)</li>
                  <li>• Non‑compete/solicit (where legal)</li>
                  <li>• Termination & dispute resolution</li>
                </ul>
              </div>

              <div className="rounded-2xl overflow-hidden mb-10 shadow">
                <BlogImage src={IMG_CONTRACT} alt="Contract checklist illustration for salon agreements" />
              </div>

              <h2 className="text-3xl font-bold mb-6 text-foreground">Commission Ladders that Retain Talent</h2>
              <div className="bg-card rounded-xl border p-6 mb-8">
                <p className="m-0 mb-3 text-muted-foreground">Use clear, non-punitive tiers tied to education and client satisfaction, not just raw revenue.</p>
                <ul className="m-0 space-y-2 text-sm">
                  <li>• Level 1: 40% + paid education stipend</li>
                  <li>• Level 2: 45% + rebooking bonus at 60%+</li>
                  <li>• Level 3: 50% + retail incentive + education days</li>
                  <li>• Opt-in Rent Track: offered at 70%+ utilization</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3">Clarity reduces churn; growth paths keep seniors engaged even before rent.</p>
              </div>

              <h2 className="text-3xl font-bold mb-6 text-foreground">Owner Economics (Predictable Profit vs Utilization Risk)</h2>
              <p className="mb-6">Commission aligns revenue with demand but exposes you to payroll and slow days. Booth rent stabilizes cash flow but shifts marketing risk to stylists. Many owners run hybrid models: juniors on commission, seniors on rent.</p>

              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mb-10">
                <div className="flex items-center gap-2 mb-2"><AlertCircle className="h-5 w-5 text-amber-600" /><h3 className="m-0 text-xl font-semibold">Misclassification Warning</h3></div>
                <p className="m-0 text-amber-800 dark:text-amber-100">If you control schedules, pricing, dress code, and retail quotas for renters, you might be treating them as employees. Know your state’s rules.</p>
              </div>

              <h2 className="text-3xl font-bold mb-6 text-foreground">Field Stories (What Pros Actually Do)</h2>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li><strong>Nail tech in TX:</strong> Switched to $250/week rent after building a 70% rebook rate; net rose ~22% vs prior 45% commission.</li>
                <li><strong>Colorist in NJ:</strong> Stayed on commission for brand’s demand gen and education credits worth ~$400/mo.</li>
                <li><strong>Hybrid salon in CA:</strong> Juniors commission for 12–18 months, seniors offered rent once 70% booked.</li>
              </ul>

              <h2 className="text-3xl font-bold mb-6 text-foreground">Try the Flip Test</h2>
              <ol className="list-decimal pl-6 mb-8 space-y-2">
                <li>Estimate your monthly service sales for the next 3 months.</li>
                <li>Run the two equations above with realistic rent and fees.</li>
                <li>Compare your take‑home after taxes (W‑2 vs 1099).</li>
                <li>If booth rent wins by 15%+ for two months in a row, consider switching.</li>
              </ol>

              <blockquote className="border-l-4 border-primary pl-6 italic text-xl mb-8 text-muted-foreground">
                “Don’t switch for ego. Switch when the math and your calendar say you’re ready.”
              </blockquote>

              <h2 className="text-3xl font-bold mb-6 text-foreground">On‑Ramps: What to Do Next</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-card rounded-xl border p-6">
                  <h3 className="m-0 text-lg font-semibold mb-2">Stylists & Artists</h3>
                  <ul className="m-0 space-y-2 text-sm">
                    <li>• Browse open roles to gauge demand → <a href="/jobs" className="text-primary underline">EmviApp Jobs</a></li>
                    <li>• Build a portfolio that converts → <a href="/artists" className="text-primary underline">Top Artists</a></li>
                    <li>• Negotiate a fair commission ladder with training baked in</li>
                  </ul>
                </div>
                <div className="bg-card rounded-xl border p-6">
                  <h3 className="m-0 text-lg font-semibold mb-2">Owners & Managers</h3>
                  <ul className="m-0 space-y-2 text-sm">
                    <li>• Hiring now? Post in minutes → <a href="/post-job" className="text-primary underline">Post a Job</a></li>
                    <li>• Thinking of exiting? Compare valuations → <a href="/salons-for-sale" className="text-primary underline">Salons for Sale</a></li>
                    <li>• Pilot a hybrid model for 90 days; measure utilization</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-6 text-foreground">Citations & Sources</h2>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-sm text-muted-foreground">
                <li>U.S. BLS — Manicurists and Pedicurists (pay & outlook): <a href="https://www.bls.gov/ooh/personal-care-and-service/manicurists-and-pedicurists.htm" target="_blank" rel="noreferrer">bls.gov</a></li>
                <li>Payscale — Nail Technician Hourly Pay (2025): <a href="https://www.payscale.com/research/US/Job=Nail_Technician/Hourly_Rate" target="_blank" rel="noreferrer">payscale.com</a></li>
                <li>GlossGenius — Booth Rent vs Commission overview: <a href="https://glossgenius.com/blog/booth-rent-vs-commission" target="_blank" rel="noreferrer">glossgenius.com</a></li>
                <li>Booksy — Booth rent costs guide (2025): <a href="https://biz.booksy.com/en-us/blog/how-much-does-it-cost-to-rent-a-booth-in-a-salon-booksy-ultimate-guide-for-salons-and-barbershops" target="_blank" rel="noreferrer">booksy.com</a></li>
              </ul>

              <h2 className="text-3xl font-bold mb-6 text-foreground">FAQ</h2>
              {faq.map((f, i) => (
                <details key={i} className="mb-4 rounded-lg border p-4">
                  <summary className="font-semibold cursor-pointer">{f.q}</summary>
                  <p className="mt-2 text-muted-foreground">{f.a}</p>
                </details>
              ))}

              <div className="mt-10">
                <BlogArticleActions
                  articleSlug={registryArticle.slug}
                  articleTitle={article.title}
                  articleUrl={article.url}
                  articleDescription={article.description}
                  articleImage={article.image}
                  hashtags={article.tags}
                  position="bottom"
                  variant="full"
                />
              </div>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
};

export default BoothRentVsCommission2025;
