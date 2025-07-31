import React from 'react';
import BlogArticleActions from './BlogArticleActions';

interface BlogSocialShareProps {
  url: string;
  title: string;
  description: string;
  image?: string;
  hashtags?: string[];
  position: 'top' | 'bottom';
  className?: string;
  articleSlug: string;
}

const BlogSocialShare: React.FC<BlogSocialShareProps> = ({
  url,
  title,
  description,
  image,
  hashtags = ['EmviApp', 'BeautyBusiness', 'SalonSuccess'],
  position,
  className = '',
  articleSlug
}) => {
  return (
    <BlogArticleActions
      articleSlug={articleSlug}
      articleTitle={title}
      articleUrl={url}
      articleDescription={description}
      articleImage={image}
      hashtags={hashtags}
      position={position}
      variant="full"
      className={className}
    />
  );
};

export default BlogSocialShare;