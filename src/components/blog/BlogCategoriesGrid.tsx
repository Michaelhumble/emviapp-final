import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, BarChart3, Award, Building2, Palette, Trophy } from 'lucide-react';
import { Container } from '@/components/ui/container';

interface BlogCategoriesGridProps {
  categories: Array<{
    name: string;
    slug: string;
    count: number;
  }>;
  className?: string;
}

const BlogCategoriesGrid: React.FC<BlogCategoriesGridProps> = ({
  categories,
  className = ''
}) => {
  if (!categories.length) return null;

  // Map categories to display format with icons and colors
  const categoryDisplay = categories.map((cat, index) => {
    const icons = [Sparkles, BarChart3, Award, Building2, Palette, Trophy];
    const colors = [
      "bg-gradient-to-br from-pink-500/10 to-purple-500/10",
      "bg-gradient-to-br from-blue-500/10 to-cyan-500/10", 
      "bg-gradient-to-br from-yellow-500/10 to-orange-500/10",
      "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
      "bg-gradient-to-br from-purple-500/10 to-indigo-500/10",
      "bg-gradient-to-br from-red-500/10 to-pink-500/10"
    ];
    const iconColors = ["text-pink-600", "text-blue-600", "text-yellow-600", "text-green-600", "text-purple-600", "text-red-600"];
    
    return {
      ...cat,
      color: colors[index % colors.length],
      icon: icons[index % icons.length],
      iconColor: iconColors[index % iconColors.length]
    };
  });

  return (
    <Container className={`py-16 ${className}`}>
      <h2 className="text-3xl font-bold mb-12 text-center">Explore Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryDisplay.map((category) => {
          const IconComponent = category.icon;
          return (
            <Link
              key={category.slug}
              to={`/blog/categories/${category.slug}`}
              className={`${category.color} p-6 rounded-xl hover:scale-105 transition-all duration-300 group border border-white/20 backdrop-blur-sm`}
            >
              <div className="mb-4">
                <IconComponent className={`h-8 w-8 ${category.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-3">
                {category.count} articles
              </p>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          );
        })}
      </div>
    </Container>
  );
};

export default BlogCategoriesGrid;