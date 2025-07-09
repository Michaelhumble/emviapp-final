import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, DollarSign } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface JobPreview {
  id: string;
  title: string;
  location: string;
  salary: string;
  type: 'gold' | 'premium';
  summary: string;
  imageUrl: string;
}

interface IndustryPreviewSectionProps {
  industryName: string;
  displayName: string;
  jobs: JobPreview[];
  routePath: string;
  gradientColors: string;
  icon: string;
}

const IndustryPreviewSection: React.FC<IndustryPreviewSectionProps> = ({
  industryName,
  displayName,
  jobs,
  routePath,
  gradientColors,
  icon
}) => {
  return (
    <motion.div 
      className={`bg-gradient-to-br ${gradientColors} rounded-3xl p-8 md:p-12 border border-white/20 shadow-lg`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-8">
        <h3 className="text-3xl md:text-4xl font-playfair font-bold text-gray-800 mb-4 flex items-center justify-center">
          <span className="text-4xl mr-3">{icon}</span>
          {displayName} Opportunities
        </h3>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Premium {industryName.toLowerCase()} positions with top salaries and verified employers
        </p>
      </div>

      {/* Preview Cards - Show 4 jobs maximum */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {jobs.slice(0, 4).map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="h-full bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border-0">
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                <ImageWithFallback 
                  src={job.imageUrl} 
                  alt={job.title}
                  className="w-full h-full object-cover"
                  category={industryName.toLowerCase()}
                />
                <Badge className={`absolute top-2 left-2 text-xs ${
                  job.type === 'gold' 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-purple-500 text-white'
                }`}>
                  {job.type === 'gold' ? 'Featured' : 'Premium'}
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <h4 className="font-bold text-gray-900 line-clamp-1 mb-2">
                  {job.title}
                </h4>
                
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="w-3 h-3 mr-1" />
                  {job.location}
                </div>
                
                <div className="bg-green-50 p-2 rounded-lg mb-3">
                  <div className="flex items-center text-green-700 font-bold">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {job.salary}
                  </div>
                </div>
                
                <p className="text-xs text-gray-600 line-clamp-2">
                  {job.summary}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link to={routePath}>
          <Button 
            size="lg"
            className="bg-white/90 text-gray-800 hover:bg-white border-2 border-white/40 hover:border-white/60 font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            See All {displayName} Jobs <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default IndustryPreviewSection;