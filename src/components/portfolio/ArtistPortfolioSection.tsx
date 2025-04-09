
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Camera } from 'lucide-react';
import PortfolioGrid from './PortfolioGrid';
import PortfolioUploadForm from './PortfolioUploadForm';
import { usePortfolio } from '@/hooks/usePortfolio';
import { PortfolioFormData } from '@/types/portfolio';

const ArtistPortfolioSection = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const { 
    portfolioItems, 
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-serif">My Portfolio</CardTitle>
          <CardDescription>Showcase your best work to attract clients</CardDescription>
        </div>
        <Button onClick={() => setShowUploadForm(true)} disabled={showUploadForm}>
          <Plus className="mr-1 h-4 w-4" />
          Add New
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
          <PortfolioGrid 
            items={portfolioItems}
            isLoading={isLoading}
            onDelete={deletePortfolioItem}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ArtistPortfolioSection;
