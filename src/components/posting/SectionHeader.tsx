
import React from 'react';

interface SectionHeaderProps {
  emoji?: string;
  title: string;
  description?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ emoji, title, description }) => {
  return (
    <div className="mb-6">
      {emoji && (
        <div className="text-2xl mb-3">
          {emoji}
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500">{description}</p>
      )}
    </div>
  );
};

export default SectionHeader;
