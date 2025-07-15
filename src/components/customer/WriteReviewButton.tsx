import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star, Edit } from 'lucide-react';
import ReviewModal from './ReviewModal';

interface WriteReviewButtonProps {
  bookingId?: string;
  targetId: string;
  targetType: 'artist' | 'salon';
  targetName: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  onReviewSubmitted?: () => void;
  className?: string;
}

export default function WriteReviewButton({
  bookingId,
  targetId,
  targetType,
  targetName,
  variant = 'default',
  size = 'default',
  onReviewSubmitted,
  className
}: WriteReviewButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReviewSubmitted = () => {
    setIsModalOpen(false);
    if (onReviewSubmitted) {
      onReviewSubmitted();
    }
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsModalOpen(true)}
        className={className}
      >
        <Star className="h-4 w-4 mr-2" />
        Write Review
      </Button>

      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookingId={bookingId}
        targetId={targetId}
        targetType={targetType}
        targetName={targetName}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </>
  );
}