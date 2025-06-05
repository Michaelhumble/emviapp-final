
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, MessageCircle } from 'lucide-react';
import PostRequestModal from './PostRequestModal';

const PostRequestWidget = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Didn't Find What You Need?
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-purple-100 mb-6 text-lg">
            Post a request and let the EmviApp community help you find exactly what you're looking for!
          </p>
          
          <Button 
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-50 font-semibold px-8"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="h-5 w-5 mr-2" />
            Post What You're Looking For
          </Button>

          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-purple-100">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>Free to post</span>
            </div>
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Get responses fast</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <PostRequestModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default PostRequestWidget;
