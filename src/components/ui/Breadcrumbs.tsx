import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  name: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  return (
    <nav 
      className={cn("flex text-sm text-gray-500", className)} 
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={item.href} className="inline-flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
            )}
            {item.current ? (
              <span 
                className="text-gray-900 font-medium"
                aria-current="page"
              >
                {index === 0 && <Home className="w-4 h-4 mr-1 inline" />}
                {item.name}
              </span>
            ) : (
              <Link
                to={item.href}
                className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors"
              >
                {index === 0 && <Home className="w-4 h-4 mr-1" />}
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;