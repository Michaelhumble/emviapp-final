import React from 'react';
import { Star } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { BlogArticle } from '@/data/blogArticles';
import VirtualizedBlogGrid from './VirtualizedBlogGrid';

interface BlogFeaturedSectionProps {
  articles: BlogArticle[];
  className?: string;
}

const BlogFeaturedSection: React.FC<BlogFeaturedSectionProps> = ({
  articles,
  className = ''
}) => {
  if (!articles.length) return null;

  return (
    <Container className={`py-16 ${className}`}>
      <div className="text-center mb-12">
        <Star className="h-8 w-8 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Featured Articles</h2>
        <p className="text-muted-foreground">Hand-picked insights from industry experts</p>
      </div>
      
      <VirtualizedBlogGrid
        articles={articles.slice(1, 4)} // Skip hero article
        variant="featured"
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

export default BlogFeaturedSection;