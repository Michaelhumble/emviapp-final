import React from 'react';
import SocialShare from './SocialShare';

interface BlogSocialShareProps {
  url: string;
  title: string;
  description: string;
  image?: string;
  hashtags?: string[];
  position: 'top' | 'bottom';
  className?: string;
}

const BlogSocialShare: React.FC<BlogSocialShareProps> = ({
  url,
  title,
  description,
  image,
  hashtags = ['EmviApp', 'BeautyBusiness', 'SalonSuccess'],
  position,
  className = ''
}) => {
  const topStyles = "border-b border-gray-100 pb-6 mb-8";
  const bottomStyles = "border-t border-gray-200 pt-8 mt-12";

  return (
    <div className={`${position === 'top' ? topStyles : bottomStyles} ${className}`}>
      {position === 'top' && (
        <div className="text-center mb-6">
          <p className="text-lg font-semibold text-gray-800 mb-2">
            Love this article? Share it with your network!
          </p>
          <p className="text-sm text-muted-foreground">
            Help other beauty professionals discover valuable insights
          </p>
        </div>
      )}

      {position === 'bottom' && (
        <div className="text-center mb-6">
          <p className="text-xl font-semibold text-gray-800 mb-2">
            Found this helpful? Share the knowledge!
          </p>
          <p className="text-sm text-muted-foreground">
            Spread the word and help the beauty community grow
          </p>
        </div>
      )}

      <div className="flex justify-center">
        <SocialShare
          url={url}
          title={title}
          description={description}
          image={image}
          hashtags={hashtags}
          size="lg"
          variant="horizontal"
        />
      </div>
    </div>
  );
};

export default BlogSocialShare;