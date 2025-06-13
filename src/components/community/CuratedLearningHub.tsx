
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Clock, Users, BookOpen, Filter, Search, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface LearningResource {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  instructor: string;
  rating: number;
  enrolled: number;
  tags: string[];
  type: 'video' | 'article' | 'course';
}

const CuratedLearningHub = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const resources: LearningResource[] = [
    {
      id: '1',
      title: 'Nail Art Fundamentals: From Basic to Beautiful',
      description: 'Learn the essential techniques for creating stunning nail art designs',
      thumbnail: '/api/placeholder/300/200',
      duration: '45 min',
      difficulty: 'Beginner',
      category: 'Nail Art',
      instructor: 'Sarah Kim',
      rating: 4.8,
      enrolled: 1247,
      tags: ['basics', 'technique', 'design'],
      type: 'video'
    },
    {
      id: '2',
      title: 'Advanced Color Theory for Hair Stylists',
      description: 'Master color mixing and matching for professional hair coloring',
      thumbnail: '/api/placeholder/300/200',
      duration: '1hr 20min',
      difficulty: 'Advanced',
      category: 'Hair Styling',
      instructor: 'Maria Rodriguez',
      rating: 4.9,
      enrolled: 892,
      tags: ['color', 'theory', 'advanced'],
      type: 'course'
    },
    {
      id: '3',
      title: 'Building Your Beauty Business: Marketing Essentials',
      description: 'Essential marketing strategies for beauty professionals',
      thumbnail: '/api/placeholder/300/200',
      duration: '30 min read',
      difficulty: 'Intermediate',
      category: 'Business',
      instructor: 'David Chen',
      rating: 4.7,
      enrolled: 2156,
      tags: ['marketing', 'business', 'growth'],
      type: 'article'
    }
  ];

  const categories = ['all', 'Nail Art', 'Hair Styling', 'Makeup', 'Business', 'Skincare'];
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-4 w-4" />;
      case 'course': return <BookOpen className="h-4 w-4" />;
      case 'article': return <BookOpen className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesDifficulty = selectedDifficulty === 'all' || resource.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesDifficulty && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Learning Hub</h2>
          <p className="text-gray-600">Curated resources to grow your beauty expertise</p>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full sm:w-64"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>
                {difficulty === 'all' ? 'All Levels' : difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Learning Path Suggestions */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-purple-600" />
            Recommended Learning Path
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Based on your profile, we recommend starting with "Nail Art Fundamentals" and progressing to "Advanced Techniques"
          </p>
          <div className="flex gap-2">
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              Start Learning Path
            </Button>
            <Button size="sm" variant="outline">
              Customize Path
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource, index) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
              <div className="relative">
                <img 
                  src={resource.thumbnail} 
                  alt={resource.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                    {resource.difficulty}
                  </span>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-black bg-opacity-70 text-white flex items-center gap-1">
                    {getTypeIcon(resource.type)}
                    {resource.type}
                  </span>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {resource.duration}
                </div>
              </div>
              
              <CardContent className="p-4 flex flex-col h-full">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{resource.description}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{resource.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{resource.enrolled.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {resource.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t">
                  <span className="text-sm text-gray-500">by {resource.instructor}</span>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Start Learning
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-600">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
};

export default CuratedLearningHub;
