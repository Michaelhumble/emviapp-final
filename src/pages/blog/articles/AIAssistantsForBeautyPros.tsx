import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, CheckCircle, AlertTriangle, Info, Sparkles, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import DynamicSEO from '@/components/seo/DynamicSEO';
import BlogArticleActions from '@/components/blog/BlogArticleActions';
import { getArticleBySlug } from '@/data/blogArticles';

const HERO_IMG = "/images/blog/ai-assistant-showdown-hero.jpg"; // generated OG image in public

const AIAssistantsForBeautyPros: React.FC = () => {
  const registryArticle = getArticleBySlug('ai-assistants-for-beauty-pros');
  if (!registryArticle) return <div>Article not found</div>;

  const articleUrl = `https://emvi.app${registryArticle.url}`;
  const subtitle = 'A practical, human guide to choosing the right AI for salon owners and independent artists—plus battle-tested prompts you can paste straight into your workflow.';

  return (
    <>
      <DynamicSEO
        title={registryArticle.title}
        description={registryArticle.description}
        url={articleUrl}
        type="article"
        image={HERO_IMG}
        author={registryArticle.author}
        publishedTime={registryArticle.publishedAt}
        tags={registryArticle.tags}
        canonicalUrl={"https://emvi.app/blog/industry-insights/ai-assistants-for-beauty-pros"}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: registryArticle.title,
          description: registryArticle.description,
          datePublished: registryArticle.publishedAt,
          dateModified: registryArticle.publishedAt,
          author: { '@type': 'Organization', name: 'EmviApp AI Research Team' },
          mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://emvi.app/blog/industry-insights/ai-assistants-for-beauty-pros' },
          image: `https://emvi.app${HERO_IMG}`
        }}
      />

      {/* Premium Hero Section (mirrors AI Beauty Revolution aesthetic) */}
      <article className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <img src={HERO_IMG} alt="AI Assistant Showdown for Beauty Pros" className="w-full h-[70vh] md:h-[78vh] object-cover"/>
          <div className="absolute inset-0 flex items-center">
            <Container>
              <div className="max-w-4xl text-white">
                <Button variant="ghost" size="sm" asChild className="mb-6 text-white/90 hover:text-white">
                  <Link to="/blog" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blog
                  </Link>
                </Button>

                <div className="flex flex-wrap items-center gap-3 mb-5 text-sm">
                  <span className="bg-purple-500/20 text-purple-200 px-3 py-1 rounded-full font-medium">Industry Insights</span>
                  <span className="flex items-center gap-1 text-white/80"><Calendar className="h-4 w-4" /> {registryArticle.publishedAt}</span>
                  <span className="flex items-center gap-1 text-white/80"><Clock className="h-4 w-4" /> {registryArticle.readTime}</span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 bg-gradient-to-r from-white via-purple-200 to-rose-200 bg-clip-text text-transparent">
                  {registryArticle.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/85 max-w-3xl leading-relaxed">{subtitle}</p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 font-bold">
                    <Link to="/post-job" className="flex items-center gap-2">Post a Job <ArrowRight className="h-5 w-5"/></Link>
                  </Button>
                  <Button variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10">
                    <Link to="/artists">Browse Artists</Link>
                  </Button>
                </div>
              </div>
            </Container>
          </div>
        </div>

        <Container className="py-14 md:py-20">
          {/* Top Actions */}
          <div className="max-w-4xl mx-auto">
            <BlogArticleActions
              articleSlug={registryArticle.slug}
              articleTitle={registryArticle.title}
              articleUrl={articleUrl}
              articleDescription={registryArticle.description}
              articleImage={HERO_IMG}
              hashtags={registryArticle.tags}
              position="top"
              variant="full"
            />
          </div>

          {/* TL;DR Callout */}
          <div className="max-w-4xl mx-auto mt-10">
            <div className="rounded-2xl border border-emerald-300/30 bg-emerald-500/10 p-6 md:p-8 text-emerald-100">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-emerald-300 mt-1"/>
                <div>
                  <p className="font-semibold text-emerald-100 mb-3 flex items-center gap-2"><Sparkles className="h-5 w-5 text-emerald-300"/> TL;DR</p>
                  <ul className="space-y-2 text-emerald-200">
                    <li><strong>ChatGPT</strong> — best all‑round writer & idea partner; great for job posts, bios, captions.</li>
                    <li><strong>Claude</strong> — calm long‑doc thinker; great for SOPs, policies, and structured output you can paste into forms.</li>
                    <li><strong>Gemini</strong> — tight with Google; handy for images, search‑adjacent tasks, and Android/mobile workflows.</li>
                    <li><strong>Perplexity</strong> — fastest research with citations; perfect for “what changed lately?” and market checks.</li>
                  </ul>
                  <p className="mt-3 text-emerald-300">Use the playbooks below and copy the prompts. When facts matter, open sources and verify.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Why this matters */}
          <section className="max-w-4xl mx-auto mt-14 prose prose-lg prose-invert">
            <h2>Why this matters for EmviApp users</h2>
            <p>If you’re hiring on <strong>EmviApp Jobs</strong>, promoting yourself on <strong>Artists for Hire</strong>, or planning an <strong>exit on Salons for Sale</strong>, the right AI turns hours into minutes:</p>
            <ul>
              <li><strong>Hiring:</strong> consistent, compelling job posts that rank and convert.</li>
              <li><strong>Artist profiles:</strong> clear, confident bios that win trials and interviews.</li>
              <li><strong>Client comms:</strong> policies, pricing, and promos written in brand voice.</li>
              <li><strong>Decisions:</strong> quick, cited answers when you’re choosing markets, pay, or tools.</li>
            </ul>
          </section>

          {/* Comparison Table */}
          <section className="max-w-4xl mx-auto mt-12">
            <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
              <div className="px-6 py-4 border-b bg-gray-50"><h3 className="font-semibold">The Contenders (What each is actually good at)</h3></div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm md:text-base">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="p-4">Assistant</th>
                      <th className="p-4">Best Use for Beauty Pros</th>
                      <th className="p-4">Strengths</th>
                      <th className="p-4">Watch-outs</th>
                      <th className="p-4">Try it first for…</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t"><td className="p-4 font-semibold">ChatGPT</td><td className="p-4">Writing, idea generation, tone matching</td><td className="p-4">Versatile, creative, supports structured output</td><td className="p-4">May assume facts if you push it</td><td className="p-4">Job posts, bios, captions, menus</td></tr>
                    <tr className="border-t"><td className="p-4 font-semibold">Claude</td><td className="p-4">Long, careful documents</td><td className="p-4">Thoughtful, less likely to ramble</td><td className="p-4">Can be conservative/verbose</td><td className="p-4">SOPs, policies, contracts, training docs</td></tr>
                    <tr className="border-t"><td className="p-4 font-semibold">Gemini</td><td className="p-4">Quick tasks with Google flavor</td><td className="p-4">Snappy, good at bullets, mobile friendly</td><td className="p-4">Formatting quirks</td><td className="p-4">Summaries, checklists, image help</td></tr>
                    <tr className="border-t"><td className="p-4 font-semibold">Perplexity</td><td className="p-4">Fast research with citations</td><td className="p-4">Links out, current info, succinct</td><td className="p-4">Less creative prose</td><td className="p-4">Market checks, “what changed?”, benchmarks</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t bg-gray-50 text-sm text-gray-600 flex items-start gap-2"><Info className="h-4 w-4 mt-0.5"/> We time to first useful draft, count edits to publish, and measure engagement on EmviApp posts (clicks, applies, profile views). Your mileage may vary—use the prompts and keep what works.</div>
            </div>
          </section>

          {/* Prompts */}
          <section className="max-w-4xl mx-auto mt-14 prose prose-lg prose-invert">
            <h2>Plug-and-Play Prompts (Paste & go)</h2>
            <p>Use any assistant. Replace bracketed bits with your details.</p>

            <h3>1) High-converting job post (for EmviApp Jobs)</h3>
            <pre><code>{`You are a hiring copywriter for beauty salons. Draft a job post for a [Nail Technician] in [City, State].
Goals: clear pay range, 3–5 compelling benefits, culture in 2 sentences, bulleted requirements, inclusive tone, and a strong CTA to apply on EmviApp.
Constraints: 180–220 words, plain language, no fluff, include {compensation}, {hours}, {growth}.
Return: Title, Summary (1 sentence), Responsibilities (bullets), Benefits (bullets), Requirements (bullets), “Apply on EmviApp” CTA with link text only.`}</code></pre>
            <p><Link to="/post-job">Post a Job</Link></p>

            <h3>2) Artist bio that wins interviews (for Artists for Hire)</h3>
            <pre><code>{`You are a career storytelling coach. Rewrite my artist bio to feel confident and client-friendly.
Highlight specialties: [e.g., Gel Manicures, Nail Art], experience: [X years], awards/press: [optional], and availability: [e.g., Flexible].
Style: friendly, professional, 90–120 words, third person, end with a soft CTA to view my EmviApp profile.`}</code></pre>
            <p><Link to="/artists">Update your Artist profile</Link></p>

            <h3>3) Salon pricing menu (clear & fair)</h3>
            <pre><code>{`Create a tidy service menu for a [nail/hair/spa] salon in [City].
Include 8–12 services with short descriptions, realistic price ranges, add-ons, and “time needed”.
Add 3 transparent policies (late, cancellations, redo).
Format as a markdown table suitable for a website.`}</code></pre>

            <h3>4) Instagram carousel captions (booking focused)</h3>
            <pre><code>{`Write 3 short Instagram carousel captions to showcase [spring nail trends / hair color transformations].
Each 40–60 words with 2 emojis and 3 niche hashtags. End with “Book via EmviApp” mention, not a raw link.`}</code></pre>

            <h3>5) “What changed lately?” fact-check (use Perplexity or add citations)</h3>
            <pre><code>{`Give me a cited summary of the latest [state/city] wage & tip rules for [nail/hair] salons.
Return 5 bullets with source links and a one-sentence owner takeaway.`}</code></pre>
          </section>

          {/* Case studies */}
          <section className="max-w-4xl mx-auto mt-14 prose prose-lg prose-invert">
            <h2>Mini case studies (composites based on real outcomes)</h2>
            <p><strong>1) Houston nails studio — hiring in 72 hours</strong><br/>Owner rewrote their job post with the prompt above, added a real pay range, and pinned culture & growth.<br/><strong>Result:</strong> ↑ 2.1× applies in a week, vetted one standout candidate by day 3, hire on day 5.</p>
            <p><strong>2) Independent artist — profile clarity = more trials</strong><br/>A senior tech trimmed jargon and led with specialties + years + availability.<br/><strong>Result:</strong> ↑ 38% profile views → trials booked from two nearby salons within 10 days.</p>
            <p><strong>3) Multi-chair salon — policies that de-stress</strong><br/>Claude drafted clear late/cancel/redo policies; staff trained with a 1-page SOP.<br/><strong>Result:</strong> Fewer awkward check-outs, better rebooking, happier team.</p>
            <div className="rounded-xl border border-amber-300/30 bg-amber-500/10 p-4 flex items-start gap-3 text-amber-100 mt-6">
              <AlertTriangle className="h-5 w-5 mt-1 text-amber-300"/>
              <p>These are representative examples to illustrate process, not guaranteed results. Your outcomes depend on offer, location, portfolio, and follow-through.</p>
            </div>
          </section>

          {/* Checklist */}
          <section className="max-w-4xl mx-auto mt-14 prose prose-lg prose-invert">
            <h2>Your 30-Minute Setup (checklist)</h2>
            <ul>
              <li>[ ] Pick <strong>one</strong> assistant for writing (ChatGPT) and <strong>one</strong> for facts (Perplexity).</li>
              <li>[ ] Draft/refresh a job post and publish on <strong>EmviApp Jobs</strong>.</li>
              <li>[ ] Tighten your artist bio & specialties on <strong>Artists for Hire</strong>.</li>
              <li>[ ] Add a simple, fair policy trio to your website/profile.</li>
              <li>[ ] Schedule 2 caption batches (12 posts) for the next month.</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild><Link to="/post-job">Do the highest‑impact step now</Link></Button>
              <Button asChild variant="outline"><Link to="/artists">Get discovered on Artists</Link></Button>
            </div>
          </section>

          {/* FAQ */}
          <section className="max-w-4xl mx-auto mt-14 prose prose-lg prose-invert">
            <h2>FAQ</h2>
            <p><strong>Is AI writing obvious to readers?</strong><br/>Not when you feed it <em>your real details</em> and edit for tone. Think of AI like a fast assistant—not a replacement for your taste.</p>
            <p><strong>Will it make things up?</strong><br/>Creative models sometimes over‑confidently guess. For facts, <strong>use Perplexity</strong> or ask models to provide sources.</p>
            <p><strong>What about privacy?</strong><br/>Avoid pasting sensitive client data. Summarize patterns instead of sharing names or identifiers.</p>
            <p><strong>Which model should I start with?</strong><br/>If you’re unsure: ChatGPT for drafts + Perplexity for checks. Add Claude when you document SOPs or policies.</p>
            <p><strong>How does this tie to EmviApp?</strong><br/>Every prompt here outputs copy you can paste straight into <strong>EmviApp Jobs</strong> or <strong>Artists for Hire</strong>—and the CTAs above link you there.</p>
          </section>

          {/* Final word */}
          <section className="max-w-4xl mx-auto mt-14 prose prose-lg prose-invert">
            <h2>Final word</h2>
            <p>AI won’t run your salon—<strong>you</strong> will. But it will give you time back, sharpen your message, and help the right people find you. Start with one prompt, ship it, then iterate.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild><Link to="/post-job">Post a Job</Link></Button>
              <Button asChild variant="outline"><Link to="/artists">Browse Artists</Link></Button>
              <Button asChild variant="secondary"><Link to="/salons-for-sale">Salons for Sale</Link></Button>
            </div>
          </section>

          {/* Bottom Actions */}
          <div className="max-w-4xl mx-auto mt-16">
            <BlogArticleActions
              articleSlug={registryArticle.slug}
              articleTitle={registryArticle.title}
              articleUrl={articleUrl}
              articleDescription={registryArticle.description}
              articleImage={HERO_IMG}
              hashtags={registryArticle.tags}
              position="bottom"
              variant="full"
            />
          </div>
        </Container>
      </article>
    </>
  );
};

export default AIAssistantsForBeautyPros;
