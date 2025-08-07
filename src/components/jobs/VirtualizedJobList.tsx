import React, { memo, useCallback, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { Job } from '@/types/job';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign, Sparkles, Crown } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface VirtualizedJobListProps {
  jobs: Job[];
  loading: boolean;
  hasNextPage: boolean;
  loadNextPage: () => Promise<void>;
  onJobClick: (job: Job) => void;
  height: number;
  width: string;
}

// Optimized job card component with minimal re-renders
const JobCard = memo(({ job, onClick, style }: {
  job: Job;
  onClick: (job: Job) => void;
  style: React.CSSProperties;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleClick = useCallback(() => {
    onClick(job);
  }, [job, onClick]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const isNewJob = job.created_at && 
    new Date(job.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const isPremium = job.pricing_tier && job.pricing_tier !== 'free';

  return (
    <div style={style} className="p-2">
      <div
        onClick={handleClick}
        className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer group h-full"
      >
        <div className="flex gap-4 h-full">
          {/* Image Section - Optimized lazy loading */}
          <div className="flex-shrink-0 w-16 h-16 relative">
            {job.image_url && !imageError ? (
              <>
                {!imageLoaded && (
                  <div className="w-full h-full bg-gray-200 rounded-md animate-pulse" />
                )}
                <img
                  src={job.image_url}
                  alt=""
                  className={`w-full h-full object-cover rounded-md transition-opacity ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="lazy"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 rounded-md flex items-center justify-center">
                <span className="text-2xl">💼</span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors truncate">
                {job.title}
              </h3>
              <div className="flex gap-1 ml-2 flex-shrink-0">
                {isNewJob && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                    <Sparkles className="w-3 h-3 mr-1" />
                    New
                  </Badge>
                )}
                {isPremium && (
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-1 text-sm text-gray-600">
              {job.location && (
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                  <span className="truncate">{job.location}</span>
                </div>
              )}
              
              {job.compensation_details && (
                <div className="flex items-center">
                  <DollarSign className="w-3 h-3 mr-1 flex-shrink-0" />
                  <span className="truncate">{job.compensation_details}</span>
                </div>
              )}
              
              <div className="flex items-center text-gray-500">
                <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">
                  {job.created_at ? formatDistanceToNow(new Date(job.created_at), { addSuffix: true }) : 'Recently'}
                </span>
              </div>
            </div>

            {job.category && (
              <Badge variant="outline" className="mt-2 text-xs">
                {job.category}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

JobCard.displayName = 'JobCard';

// Skeleton loader for virtualized items
const JobCardSkeleton = memo(({ style }: { style: React.CSSProperties }) => (
  <div style={style} className="p-2">
    <div className="bg-white rounded-lg border border-gray-200 p-4 h-full">
      <div className="flex gap-4 h-full">
        <div className="w-16 h-16 bg-gray-200 rounded-md animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
        </div>
      </div>
    </div>
  </div>
));

JobCardSkeleton.displayName = 'JobCardSkeleton';

const VirtualizedJobList: React.FC<VirtualizedJobListProps> = ({
  jobs,
  loading,
  hasNextPage,
  loadNextPage,
  onJobClick,
  height,
  width
}) => {
  // Calculate item count including loading placeholders
  const itemCount = hasNextPage ? jobs.length + 5 : jobs.length;
  
  // Check if item is loaded
  const isItemLoaded = useCallback((index: number) => {
    return index < jobs.length;
  }, [jobs.length]);

  // Row renderer for virtualized list
  const Row = useCallback(({ index, style }: { index: number; style: React.CSSProperties }) => {
    if (index >= jobs.length) {
      // Show skeleton for loading items
      return <JobCardSkeleton style={style} />;
    }

    const job = jobs[index];
    return (
      <JobCard
        key={job.id}
        job={job}
        onClick={onJobClick}
        style={style}
      />
    );
  }, [jobs, onJobClick]);

  const ITEM_HEIGHT = 120; // Height of each job card

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadNextPage}
      threshold={5} // Load more when 5 items from the end
    >
      {({ onItemsRendered, ref }) => (
        <List
          ref={ref}
          height={height}
          width={width === "100%" ? window.innerWidth - 64 : parseInt(width)}
          itemCount={itemCount}
          itemSize={ITEM_HEIGHT}
          onItemsRendered={onItemsRendered}
          overscanCount={5} // Render 5 extra items for smooth scrolling
        >
          {Row}
        </List>
      )}
    </InfiniteLoader>
  );
};

export default memo(VirtualizedJobList);