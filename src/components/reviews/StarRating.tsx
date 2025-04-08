
import React from "react";
import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showEmpty?: boolean;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 'md',
  className,
  showEmpty = true,
  interactive = false,
  onChange
}) => {
  const sizeMap = {
    sm: 'h-3 w-3',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const handleClick = (selectedRating: number) => {
    if (interactive && onChange) {
      onChange(selectedRating);
    }
  };

  const iconClassName = sizeMap[size];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className={cn("flex items-center", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <div 
          key={star}
          className={cn("text-yellow-400", interactive && "cursor-pointer")}
          onClick={() => handleClick(star)}
        >
          {star <= fullStars ? (
            <Star className={iconClassName} fill="currentColor" />
          ) : star === fullStars + 1 && hasHalfStar ? (
            <StarHalf className={iconClassName} fill="currentColor" />
          ) : showEmpty ? (
            <Star className={cn(iconClassName, "text-gray-300")} />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default StarRating;
