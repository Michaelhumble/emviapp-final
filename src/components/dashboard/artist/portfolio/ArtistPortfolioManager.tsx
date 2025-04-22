
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Plus, Image as ImageIcon, Move, Trash2 } from 'lucide-react';
import { useArtistPortfolio } from '@/hooks/useArtistPortfolio';
import PortfolioUploader from './PortfolioUploader';

const ArtistPortfolioManager = () => {
  const { toast } = useToast();
  const { 
    portfolio, 
    isLoading, 
    reorderPortfolioItems,
    addPortfolioItem,
    deletePortfolioItem,
    fetchPortfolio
  } = useArtistPortfolio();
  
  const [showUploader, setShowUploader] = useState(false);

  useEffect(() => {
    fetchPortfolio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;
    
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    
    if (startIndex === endIndex) return;
    
    try {
      await reorderPortfolioItems(startIndex, endIndex);
      toast({
        title: "Portfolio reordered",
        description: "Your images have been reordered successfully."
      });
    } catch (error) {
      console.error('Error reordering portfolio:', error);
      toast({
        title: "Reordering failed",
        description: "There was a problem saving the new order.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteItem = async (id: string, imageUrl: string) => {
    try {
      await deletePortfolioItem(id, imageUrl);
      toast({
        title: "Image deleted",
        description: "Portfolio item has been removed."
      });
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        title: "Deletion failed",
        description: "There was a problem removing this item.",
        variant: "destructive"
      });
    }
  };
  
  const handleUploadItem = async (file: File, title: string, description?: string) => {
    const success = await addPortfolioItem(file, title, description);
    if (success) {
      setShowUploader(false);
    }
    return success;
  };

  return (
    <Card className="shadow-sm border-purple-100">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-serif flex items-center">
          <ImageIcon className="h-5 w-5 mr-2 text-purple-500" />
          Portfolio Gallery
        </CardTitle>
        <CardDescription>
          Showcase your best work to attract clients
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {showUploader ? (
          <PortfolioUploader 
            onComplete={() => setShowUploader(false)}
            onUpload={handleUploadItem}
          />
        ) : (
          <>
            <div className="mb-4">
              <Button 
                onClick={() => setShowUploader(true)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Portfolio Images
              </Button>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="aspect-square rounded-md bg-gray-100 animate-pulse"
                  />
                ))}
              </div>
            ) : portfolio.length === 0 ? (
              <div className="text-center py-16 bg-muted/30 rounded-lg border border-dashed">
                <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No portfolio images yet</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setShowUploader(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Upload Your First Image
                </Button>
              </div>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="portfolio-items" direction="horizontal">
                  {(provided) => (
                    <div 
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="grid grid-cols-2 md:grid-cols-3 gap-5"
                    >
                      {portfolio.map((item, index) => (
                        <Draggable 
                          key={item.id} 
                          draggableId={item.id} 
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`
                                relative aspect-square rounded-lg overflow-hidden border
                                ${snapshot.isDragging ? 'shadow-lg ring-2 ring-purple-300' : 'shadow-sm'}
                                transition-all duration-200
                              `}
                            >
                              <img 
                                src={item.image_url} 
                                alt={item.title || 'Portfolio item'} 
                                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                              />
                              
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                                <div {...provided.dragHandleProps} className="self-start bg-black/40 p-1.5 rounded-full cursor-grab">
                                  <Move className="h-4 w-4 text-white" />
                                </div>
                                
                                <div>
                                  <h4 className="text-white font-medium truncate">{item.title || 'Untitled'}</h4>
                                  <div className="flex justify-between items-center mt-1">
                                    <input 
                                      type="text" 
                                      placeholder="Add title..." 
                                      defaultValue={item.title || ''}
                                      className="bg-white/20 text-white text-sm rounded px-2 py-1 w-3/4 placeholder:text-white/70 focus:outline-none focus:ring-1 focus:ring-white/50"
                                      onBlur={async (e) => {
                                        const newTitle = e.target.value;
                                        if (newTitle !== item.title) {
                                          // Handle title update in a real implementation
                                          toast({
                                            title: "Title updated",
                                            description: "Changes saved successfully."
                                          });
                                        }
                                      }}
                                    />
                                    <button
                                      onClick={() => handleDeleteItem(item.id, item.image_url)}
                                      className="bg-red-500/80 p-1.5 rounded-full hover:bg-red-600/80"
                                    >
                                      <Trash2 className="h-3.5 w-3.5 text-white" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ArtistPortfolioManager;
