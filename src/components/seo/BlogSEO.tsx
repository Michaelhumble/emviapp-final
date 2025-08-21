import React from 'react';
import BaseSEO from './BaseSEO';
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from './jsonld';

interface BlogPost {
  title: string;
  slug: string;
  description: string;
  content?: string;
  author: string;
  publishedDate: string;
  modifiedDate?: string;
  featuredImage?: string;
  tags?: string[];
  category?: string;
  readingTime?: number;
}

interface BlogSEOProps {
  post: BlogPost;
  baseUrl?: string;
}

const BlogSEO: React.FC<BlogSEOProps> = ({ post, baseUrl = 'https://www.emvi.app' }) => {
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  
  // SEO-optimized title
  const title = `${post.title} | EmviApp Blog`;
  
  // Enhanced meta description
  const description = post.description.length > 160 
    ? `${post.description.substring(0, 157)}...`
    : post.description;

  // Article JSON-LD
  const articleJsonLd = buildArticleJsonLd({
    title: post.title,
    description: post.description,
    author: post.author,
    datePublished: post.publishedDate,
    dateModified: post.modifiedDate,
    url: postUrl,
    image: post.featuredImage
  });

  // Breadcrumb JSON-LD
  const breadcrumbItems = [
    { name: 'Home', url: baseUrl },
    { name: 'Blog', url: `${baseUrl}/blog` }
  ];

  if (post.category) {
    breadcrumbItems.push({
      name: post.category,
      url: `${baseUrl}/blog/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`
    });
  }

  breadcrumbItems.push({ name: post.title, url: postUrl });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(breadcrumbItems);

  // Enhanced Open Graph image with proper fallback
  const getBlogOgImage = () => {
    if (post.featuredImage) return post.featuredImage;
    return '/og-blog.jpg'; // Fallback to default blog og image
  };
  
  const ogImage = getBlogOgImage();

  return (
    <BaseSEO
      title={title}
      description={description}
      canonical={postUrl}
      ogImage={ogImage}
      jsonLd={[articleJsonLd, breadcrumbJsonLd]}
      type="article"
    />
  );
};

export default BlogSEO;