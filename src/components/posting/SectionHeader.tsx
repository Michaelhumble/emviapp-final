
import React from 'react';

interface SectionHeaderProps {
  title: string;
  emoji?: string;
  description?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  emoji, 
  description 
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-playfair font-medium flex items-center gap-2">
        {emoji && <span className="text-2xl">{emoji}</span>}
        {title}
      </h3>
      {description && (
        <p className="text-muted-foreground text-sm mt-1 font-inter">{description}</p>
      )}
    </div>
  );
};

export default SectionHeader;
