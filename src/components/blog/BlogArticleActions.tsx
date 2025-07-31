import React from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SocialShare from './SocialShare';
import { useArticleSave } from '@/hooks/blog/useArticleSave';

interface BlogArticleActionsProps {
  articleSlug: string;
  articleTitle: string;
  articleUrl: string;
  articleDescription: string;
  articleImage?: string;
  hashtags?: string[];
  position?: 'top' | 'bottom';
  variant?: 'compact' | 'full';
  className?: string;
}

const BlogArticleActions: React.FC<BlogArticleActionsProps> = ({
  articleSlug,
  articleTitle,
  articleUrl,
  articleDescription,
  articleImage,
  hashtags = ['EmviApp', 'BeautyBusiness', 'SalonSuccess'],
  position = 'top',
  variant = 'full',
  className = ''
}) => {
  const { isSaved, loading, toggleSave } = useArticleSave(articleSlug, articleTitle, articleUrl);

  const handleSaveClick = async () => {
    await toggleSave();
  };

  const isCompact = variant === 'compact';
  const isBottom = position === 'bottom';

  return (
    <div className={`${isBottom ? 'border-t border-gray-200 pt-8 mt-12' : 'border-b border-gray-100 pb-6 mb-8'} ${className}`}>
      {!isCompact && (
        <div className="text-center mb-6">
          <p className={`${isBottom ? 'text-xl' : 'text-lg'} font-semibold text-gray-800 mb-2`}>
            {isBottom ? 'Found this helpful? Share the knowledge!' : 'Love this article? Share it with your network!'}
          </p>
          <p className="text-sm text-muted-foreground">
            {isBottom ? 'Spread the word and help the beauty community grow' : 'Help other beauty professionals discover valuable insights'}
          </p>
        </div>
      )}

      <div className={`flex ${isCompact ? 'items-center gap-4' : 'flex-col lg:flex-row items-center justify-between gap-6'}`}>
        {/* Save Button */}
        <div className={`flex items-center ${isCompact ? '' : 'order-2 lg:order-1'}`}>
          <Button
            variant="outline"
            size={isCompact ? "sm" : "default"}
            onClick={handleSaveClick}
            disabled={loading}
            className="gap-2 hover:bg-primary hover:text-white transition-all duration-200"
          >
            {isSaved ? (
              <BookmarkCheck className="h-4 w-4 text-primary" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
            {loading ? 'Saving...' : isSaved ? 'Saved' : 'Save Article'}
          </Button>
        </div>

        {/* Social Share */}
        <div className={`${isCompact ? 'flex-1' : 'order-1 lg:order-2'}`}>
          <SocialShare
            url={articleUrl}
            title={articleTitle}
            description={articleDescription}
            image={articleImage}
            hashtags={hashtags}
            size={isCompact ? "sm" : "default"}
            variant={isCompact ? "minimal" : "horizontal"}
            className="justify-center"
          />
        </div>
      </div>
    </div>
  );
};

export default BlogArticleActions;