import React from 'react';
import { Calendar, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { BlogArticle } from '@/data/blogArticles';
import VirtualizedBlogGrid from './VirtualizedBlogGrid';

interface BlogRecentSectionProps {
  articles: BlogArticle[];
  className?: string;
}

const BlogRecentSection: React.FC<BlogRecentSectionProps> = ({
  articles,
  className = ''
}) => {
  return (
    <Container className={`py-16 ${className}`}>
      <div className="text-center mb-12">
        <Calendar className="h-8 w-8 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Latest Articles</h2>
        <p className="text-muted-foreground">Stay updated with the freshest content</p>
      </div>
      
      <VirtualizedBlogGrid
        articles={articles}
        variant="default"
        columns={3}
        showCategory={true}
        showAuthor={true}
        showImage={true}
        initialLoad={6}
        loadMore={6}
      />
      
      {/* Strategic Sign-Up CTA Section */}
      <div className="mt-16 mb-8">
        <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 rounded-3xl p-8 md:p-12 border border-purple-100 shadow-lg">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200/50 rounded-full px-6 py-3 mb-6">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-purple-700 font-medium text-sm tracking-wide">EXCLUSIVE ACCESS</span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-gray-900">
              Ready to Transform Your Beauty Career?
            </h3>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of beauty professionals who've found their dream opportunities through EmviApp. 
              Start your journey today with premium job matching and industry connections.
            </p>
            
            {/* Dual CTA Implementation */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup?redirect=%2F">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  ✨ Create Your Free Account
                </Button>
              </Link>
              
              <Link to="/signin?redirect=%2F">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Sign In to Your Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BlogRecentSection;