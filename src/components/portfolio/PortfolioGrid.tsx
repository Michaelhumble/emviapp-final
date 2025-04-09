
import { useState } from 'react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash2, Loader2, ImageIcon, ZoomIn, Edit, X } from 'lucide-react';
import { PortfolioItem } from '@/types/portfolio';

interface PortfolioGridProps {
  items: PortfolioItem[];
  isLoading: boolean;
  onDelete: (id: string, imageUrl: string) => Promise<void>;
}

const PortfolioGrid = ({ items, isLoading, onDelete }: PortfolioGridProps) => {
  const [itemToDelete, setItemToDelete] = useState<PortfolioItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [expandedItem, setExpandedItem] = useState<PortfolioItem | null>(null);

  const handleDelete = async () => {
    if (!itemToDelete) return;
    
    setIsDeleting(true);
    await onDelete(itemToDelete.id, itemToDelete.image_url);
    setIsDeleting(false);
    setItemToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-muted/20 rounded-lg border border-dashed">
        <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-muted-foreground">No portfolio items yet</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Your uploaded work will appear here
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="group relative bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-shadow">
            <div className="aspect-square relative">
              <img 
                src={item.image_url} 
                alt={item.title} 
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-medium truncate">{item.title}</h3>
                  {item.description && (
                    <p className="text-white/80 text-sm line-clamp-2">{item.description}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="absolute top-2 right-2 flex flex-col gap-2">
              <Button
                variant="secondary"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                onClick={() => setExpandedItem(item)}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              
              <Button
                variant="destructive"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                onClick={() => setItemToDelete(item)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!itemToDelete} onOpenChange={(open) => !open && setItemToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{itemToDelete?.title}" from your portfolio.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Image Preview Dialog */}
      <AlertDialog open={!!expandedItem} onOpenChange={(open) => !open && setExpandedItem(null)}>
        <AlertDialogContent className="max-w-3xl p-0 overflow-hidden">
          <div className="relative max-h-[80vh]">
            {expandedItem && (
              <img 
                src={expandedItem.image_url} 
                alt={expandedItem.title} 
                className="w-full object-contain"
              />
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-black/20 hover:bg-black/40 text-white"
              onClick={() => setExpandedItem(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4 bg-white">
            <h3 className="text-lg font-medium">{expandedItem?.title}</h3>
            {expandedItem?.description && (
              <p className="text-gray-600 mt-1">{expandedItem.description}</p>
            )}
            <p className="text-xs text-gray-400 mt-2">
              Added on {expandedItem && new Date(expandedItem.created_at).toLocaleDateString()}
            </p>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PortfolioGrid;
