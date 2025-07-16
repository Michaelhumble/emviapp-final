import React from 'react';
import { useRecommendations } from '@/context/RecommendationContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RecommendationWidgetProps {
  type: 'job' | 'salon' | 'artist';
  title?: string;
  limit?: number;
  className?: string;
}

const RecommendationWidget: React.FC<RecommendationWidgetProps> = ({
  type,
  title,
  limit = 4,
  className = ''
}) => {
  const { getRecommendations, trackInteraction } = useRecommendations();
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadRecommendations();
  }, [type]);

  const loadRecommendations = async () => {
    try {
      const items = await getRecommendations(type, limit);
      setRecommendations(items);
    } catch (error) {
      console.warn('Failed to load recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (item: any) => {
    trackInteraction(item.id, item.type, 'click');
    
    // Navigate to the appropriate page
    if (item.type === 'job') {
      navigate(`/${item.category}/${item.id}`);
    } else if (item.type === 'salon') {
      navigate(`/salons/${item.id}`);
    } else if (item.type === 'artist') {
      navigate(`/u/${item.id}`);
    }
  };

  const getDefaultTitle = () => {
    switch (type) {
      case 'job': return 'Recommended Jobs';
      case 'salon': return 'Recommended Salons';
      case 'artist': return 'Recommended Artists';
      default: return 'Recommendations';
    }
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {title || getDefaultTitle()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (recommendations.length === 0) return null;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-primary" />
          {title || getDefaultTitle()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="group cursor-pointer p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex gap-3">
                {item.image && (
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  
                  <div className="flex items-center gap-2 mt-1">
                    {item.location && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="line-clamp-1">{item.location}</span>
                      </div>
                    )}
                    
                    {item.category && (
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {item.reason}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <button
            onClick={() => navigate(`/${type}s`)}
            className="text-sm text-primary hover:text-primary/80 font-medium"
          >
            View all {type}s →
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationWidget;