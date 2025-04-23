
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
import { Plus, Image as ImageIcon, Move, Trash2, Pencil } from 'lucide-react';
import { useArtistPortfolio } from '@/hooks/useArtistPortfolio';
import PortfolioUploader from './PortfolioUploader';
import EditPortfolioItemModal from "./EditPortfolioItemModal";

// Replace the entire component - now with full local/mock data handling and modal logic.
const initialPortfolioItems = [
  {
    id: 1,
    image: "/lovable-uploads/67947adb-5754-4569-aa1c-228d8f9db461.png",
    title: "French Gradient",
    featured: true
  },
  {
    id: 2,
    image: "/lovable-uploads/70c8662a-4525-4854-a529-62616b5b6c81.png",
    title: "Minimalist Line Art",
    featured: false
  },
  {
    id: 3,
    image: "/lovable-uploads/81e6d95d-e09b-45f0-a4bc-96358592e462.png",
    title: "Pink Floral Design",
    featured: false
  },
  {
    id: 4,
    image: "/lovable-uploads/7d585be5-b70d-4d65-b57f-803de81839ba.png",
    title: "Elegant Marble Pattern",
    featured: true
  },
  {
    id: 5,
    image: "/lovable-uploads/a3c08446-c1cb-492d-a361-7ec4aca18cfd.png",
    title: "Geometric Abstract",
    featured: false
  },
  {
    id: 6,
    image: "/lovable-uploads/c9e52825-c7f4-4923-aecf-a92a8799530b.png",
    title: "Glitter Accent",
    featured: false
  }
];

const ArtistPortfolioManager = () => {
  // Local mock state only!
  const [portfolio, setPortfolio] = useState(initialPortfolioItems);
  const [editingItem, setEditingItem] = useState<typeof initialPortfolioItems[0] | null>(null);

  // Modal open state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  // Drag-and-drop reorder using react-beautiful-dnd
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const newPortfolio = Array.from(portfolio);
    const [removed] = newPortfolio.splice(result.source.index, 1);
    newPortfolio.splice(result.destination.index, 0, removed);
    setPortfolio(newPortfolio);
    toast({
      title: "Portfolio reordered",
      description: "Your portfolio order has been updated.",
    });
  };

  // Handle save changes
  const handleSave = (id: number, newTitle: string, newImage?: File | null) => {
    setPortfolio((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              title: newTitle,
              image: newImage
                ? URL.createObjectURL(newImage)
                : item.image
            }
          : item
      )
    );
    toast({
      title: "Portfolio updated",
      description: "Your portfolio item has been updated successfully.",
    });
  };

  // Handle delete
  const handleDelete = (id: number) => {
    setPortfolio((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: "Portfolio item deleted",
      description: "Your portfolio item has been removed.",
      variant: "destructive"
    });
  };

  // Open modal for editing
  const handleEdit = (item: typeof initialPortfolioItems[0]) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  // Close modal handler
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setEditingItem(null), 200); // Small delay for modal exit
  };

  return (
    <Card className="shadow-sm border-purple-100">
      <CardHeader className="pb-3 bg-gradient-to-r from-purple-50 to-white">
        <CardTitle className="text-xl font-serif flex items-center">
          <span className="mr-2"><img src="/lovable-uploads/f6bb9656-c400-4f28-ba97-69d71c651a97.png" alt="" className="h-6 w-6 rounded-md" /></span>
          Portfolio Gallery
        </CardTitle>
        <CardDescription>
          Showcase your best work to attract clients
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Drag & Drop portfolio grid */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="portfolio-grid" direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid grid-cols-2 md:grid-cols-3 gap-5"
              >
                {portfolio.map((item, idx) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={idx}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`relative aspect-square rounded-lg overflow-hidden border transition-all duration-200 bg-white shadow-sm group
                          ${snapshot.isDragging ? "shadow-lg ring-2 ring-purple-400" : ""}`}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                        />
                        {/* Edit Button - Always visible */}
                        <button
                          className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md"
                          onClick={() => handleEdit(item)}
                          type="button"
                          aria-label="Edit"
                        >
                          <Pencil className="h-4 w-4 text-purple-500" />
                        </button>
                        {/* Drag handle */}
                        <div
                          {...provided.dragHandleProps}
                          className="absolute left-2 top-2 bg-black/40 p-1.5 rounded-full cursor-grab"
                          style={{ zIndex: 6 }}
                        >
                          <span className="inline-block w-2 h-2 bg-purple-300 rounded-full" />
                        </div>
                        {/* Title overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                          <span className="text-white text-sm font-semibold">{item.title}</span>
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
        {/* Edit Modal */}
        <EditPortfolioItemModal
          open={isModalOpen}
          onClose={handleCloseModal}
          item={editingItem}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      </CardContent>
    </Card>
  );
};

export default ArtistPortfolioManager;
