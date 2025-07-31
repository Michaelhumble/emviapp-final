import React, { useState } from 'react';

interface AuthorAvatarProps {
  name: string;
  image?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const AuthorAvatar: React.FC<AuthorAvatarProps> = ({ 
  name, 
  image, 
  size = 'md', 
  className = '' 
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-xl'
  };

  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const gradientColors = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-purple-500',
    'from-green-500 to-blue-500',
    'from-pink-500 to-rose-500',
    'from-indigo-500 to-purple-500',
    'from-teal-500 to-green-500'
  ];

  // Simple hash function to consistently assign colors based on name
  const nameHash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorIndex = nameHash % gradientColors.length;
  const gradientClass = gradientColors[colorIndex];

  if (!image || hasError) {
    return (
      <div 
        className={`
          ${sizeClasses[size]} 
          ${className}
          bg-gradient-to-br ${gradientClass}
          rounded-full 
          flex items-center justify-center 
          text-white font-semibold
          shadow-lg
        `}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={`${name} profile picture`}
      className={`
        ${sizeClasses[size]} 
        ${className}
        rounded-full 
        object-cover 
        shadow-lg
      `}
      onError={() => setHasError(true)}
    />
  );
};

export default AuthorAvatar;