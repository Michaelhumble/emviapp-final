
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Camera, ImageIcon, Loader2 } from 'lucide-react';
import PortfolioGrid from './PortfolioGrid';
import PortfolioUploadForm from './PortfolioUploadForm';
import { usePortfolio } from '@/hooks/usePortfolio';
import { PortfolioFormData } from '@/types/portfolio';

const ArtistPortfolioSection = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const { 
    portfolioItems, 
    portfolioStats,
    isLoading, 
    isUploading, 
    uploadPortfolioItem, 
    deletePortfolioItem 
  } = usePortfolio();

  const handleSubmit = async (data: PortfolioFormData) => {
    await uploadPortfolioItem(data);
    setShowUploadForm(false);
  };

  return (
    <Card className="shadow-md border-purple-100">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-serif">My Portfolio</CardTitle>
          <CardDescription>Showcase your best work to attract clients</CardDescription>
        </div>
        <Button 
          onClick={() => setShowUploadForm(true)} 
          disabled={showUploadForm || isUploading}
          className="bg-purple-600 hover:bg-purple-700"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Plus className="mr-1 h-4 w-4" />
              Add New
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {showUploadForm ? (
          <PortfolioUploadForm 
            onSubmit={handleSubmit}
            isUploading={isUploading}
            onCancel={() => setShowUploadForm(false)}
          />
        ) : (
          <>
            <PortfolioGrid 
              items={portfolioItems}
              isLoading={isLoading}
              onDelete={deletePortfolioItem}
            />
            
            {portfolioItems.length > 0 && !isLoading && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-xs text-purple-600 uppercase font-semibold">Total Items</p>
                  <p className="text-2xl font-bold">{portfolioStats.totalItems}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-600 uppercase font-semibold">View Count</p>
                  <p className="text-2xl font-bold">{portfolioStats.viewCount}</p>
                </div>
                <div className="p-3 bg-pink-50 rounded-lg">
                  <p className="text-xs text-pink-600 uppercase font-semibold">Latest Update</p>
                  <p className="text-2xl font-bold">
                    {portfolioItems.length > 0 ? 
                      new Date(portfolioItems[0].created_at).toLocaleDateString() : 
                      'N/A'}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 flex justify-between text-sm text-gray-500 px-6 py-3">
        <div className="flex items-center">
          <Camera className="h-4 w-4 mr-1 text-gray-400" />
          <span>High-quality images attract more clients</span>
        </div>
        <div className="flex items-center">
          <ImageIcon className="h-4 w-4 mr-1 text-gray-400" />
          <span>Max 12 images recommended</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ArtistPortfolioSection;
