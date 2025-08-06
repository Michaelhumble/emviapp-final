import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { BlogArticle } from '@/data/blogArticles';
import VirtualizedBlogGrid from './VirtualizedBlogGrid';

interface BlogTrendingSectionProps {
  articles: BlogArticle[];
  className?: string;
}

const BlogTrendingSection: React.FC<BlogTrendingSectionProps> = ({
  articles,
  className = ''
}) => {
  if (!articles.length) return null;

  return (
    <Container className={`py-16 ${className}`}>
      <div className="text-center mb-12">
        <TrendingUp className="h-8 w-8 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Trending Now</h2>
        <p className="text-muted-foreground">The hottest topics in the beauty industry</p>
      </div>
      
      <VirtualizedBlogGrid
        articles={articles.slice(0, 3)}
        variant="default"
        columns={3}
        showCategory={true}
        showAuthor={true}
        showImage={true}
        initialLoad={3}
        loadMore={0}
      />
    </Container>
  );
};

export default BlogTrendingSection;