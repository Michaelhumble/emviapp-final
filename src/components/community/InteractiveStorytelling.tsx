
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, Share, Image, Video, Mic, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface Story {
  id: string;
  author: string;
  avatar: string;
  title: string;
  content: string;
  media: { type: 'image' | 'video' | 'audio'; url: string }[];
  likes: number;
  comments: number;
  timestamp: string;
}

const InteractiveStorytelling = () => {
  const [stories, setStories] = useState<Story[]>([
    {
      id: '1',
      author: 'Sarah Kim',
      avatar: '/api/placeholder/40/40',
      title: 'My Journey from Cosmetology School to Salon Owner',
      content: 'Three years ago, I was just another student wondering if I had what it takes. Today, I own two salons and employ 12 talented artists. Here\'s what I learned along the way...',
      media: [
        { type: 'image', url: '/api/placeholder/300/200' },
        { type: 'video', url: '/api/placeholder/300/200' }
      ],
      likes: 127,
      comments: 23,
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      author: 'Maria Rodriguez',
      avatar: '/api/placeholder/40/40',
      title: 'Overcoming Language Barriers in the Beauty Industry',
      content: 'English wasn\'t my first language, but passion was my universal translator. This is how I built connections that transcended words...',
      media: [{ type: 'audio', url: '/api/placeholder/300/100' }],
      likes: 89,
      comments: 15,
      timestamp: '5 hours ago'
    }
  ]);

  const [showCreateStory, setShowCreateStory] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Community Stories</h2>
        <Button 
          onClick={() => setShowCreateStory(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Share Your Story
        </Button>
      </div>

      {showCreateStory && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4">Share Your Journey</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Story title..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <textarea
              placeholder="Tell your story..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Image className="h-4 w-4 mr-1" />
                Photo
              </Button>
              <Button variant="outline" size="sm">
                <Video className="h-4 w-4 mr-1" />
                Video
              </Button>
              <Button variant="outline" size="sm">
                <Mic className="h-4 w-4 mr-1" />
                Audio
              </Button>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowCreateStory(false)}>
                Cancel
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Share Story
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="space-y-4">
        {stories.map((story) => (
          <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <img src={story.avatar} alt={story.author} className="w-10 h-10 rounded-full" />
                <div>
                  <h4 className="font-semibold text-gray-900">{story.author}</h4>
                  <p className="text-sm text-gray-500">{story.timestamp}</p>
                </div>
              </div>
              <CardTitle className="text-lg">{story.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{story.content}</p>
              
              {story.media.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {story.media.map((item, idx) => (
                    <div key={idx} className="relative rounded-lg overflow-hidden bg-gray-100">
                      {item.type === 'image' && (
                        <img src={item.url} alt="Story media" className="w-full h-32 object-cover" />
                      )}
                      {item.type === 'video' && (
                        <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                          <Video className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                      {item.type === 'audio' && (
                        <div className="w-full h-16 bg-gray-200 flex items-center justify-center">
                          <Mic className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-6 text-gray-500">
                <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                  <Heart className="h-4 w-4" />
                  {story.likes}
                </button>
                <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                  <MessageSquare className="h-4 w-4" />
                  {story.comments}
                </button>
                <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                  <Share className="h-4 w-4" />
                  Share
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InteractiveStorytelling;
