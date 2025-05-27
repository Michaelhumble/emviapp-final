
import React from 'react';
import { useTranslation } from "@/hooks/useTranslation";

interface SectionHeaderProps {
  title: { english: string; vietnamese: string };
  subtitle?: { english: string; vietnamese: string };
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  className = ""
}) => {
  const { t, isVietnamese } = useTranslation();

  return (
    <div className={`text-center ${className}`}>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        {t(title)}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {t(subtitle)}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
