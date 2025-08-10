import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import DynamicSEO from '@/components/seo/DynamicSEO';
import BlogArticleActions from '@/components/blog/BlogArticleActions';
import { getArticleBySlug } from '@/data/blogArticles';

const AIAssistantsForBeautyPros: React.FC = () => {
  const registryArticle = getArticleBySlug('ai-assistants-for-beauty-pros');
  if (!registryArticle) return <div>Article not found</div>;

  const articleUrl = `https://emvi.app${registryArticle.url}`;

  return (
    <>
      <DynamicSEO
        title={registryArticle.title}
        description={registryArticle.description}
        url={articleUrl}
        type="article"
        image={"https://emvi.app/images/blog/ai-assistant-showdown-hero.jpg"}
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
          author: { '@type': 'Organization', name: 'EmviApp' },
          mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://emvi.app/blog/industry-insights/ai-assistants-for-beauty-pros' }
        }}
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
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                {registryArticle.category}
              </span>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {registryArticle.publishedAt}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {registryArticle.readTime}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {registryArticle.title}
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              {registryArticle.description}
            </p>

            <BlogArticleActions
              articleSlug={registryArticle.slug}
              articleTitle={registryArticle.title}
              articleUrl={articleUrl}
              articleDescription={registryArticle.description}
              articleImage={registryArticle.image}
              hashtags={registryArticle.tags}
              position="top"
              variant="full"
            />


            <div className="prose prose-lg max-w-none">
              <p><strong>TL;DR</strong></p>
              <ul>
                <li><strong>ChatGPT</strong> — best all-round writer & idea partner; great for job posts, bios, captions.</li>
                <li><strong>Claude</strong> — calm long-doc thinker; great for SOPs, policies, and structured output you can paste into forms.</li>
                <li><strong>Gemini</strong> — tight with Google; handy for images, search-adjacent tasks, and Android/mobile workflows.</li>
                <li><strong>Perplexity</strong> — fastest research with citations; perfect for “what changed lately?” and market checks.</li>
              </ul>
              <p>Use the playbooks below and copy the prompts. When facts matter, open sources and verify.</p>

              <h2>Next steps</h2>
              <ul>
                <li>Hire faster on <a href="/jobs">Jobs</a> or <a href="/post-job">Post a Job</a></li>
                <li>Get discovered on <a href="/artists">Artists</a></li>
                <li>Exit smoothly on <a href="/sell-salon">Sell your salon</a></li>
              </ul>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
};

export default AIAssistantsForBeautyPros;
