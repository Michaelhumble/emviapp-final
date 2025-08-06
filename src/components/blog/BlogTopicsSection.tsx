import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

interface BlogTopicsSectionProps {
  topics: string[];
  className?: string;
}

const BlogTopicsSection: React.FC<BlogTopicsSectionProps> = ({
  topics,
  className = ''
}) => {
  if (!topics.length) return null;

  return (
    <Container className={`py-16 ${className}`}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Popular Topics</h2>
        <p className="text-muted-foreground">What the beauty community is talking about</p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3">
        {topics.map((topic, index) => (
          <Button
            key={index}
            variant="outline"
            className="rounded-full hover:bg-primary hover:text-white transition-colors"
            asChild
          >
            <Link to={`/blog?tag=${encodeURIComponent(topic)}`}>
              #{topic}
            </Link>
          </Button>
        ))}
      </div>
    </Container>
  );
};

export default BlogTopicsSection;