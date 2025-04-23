
import { useState } from 'react';
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
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

// Initial mock items
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
  const [portfolio, setPortfolio] = useState(initialPortfolioItems);
  const [editingItem, setEditingItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletePending, setDeletePending] = useState(null);

  // Drag-and-drop handler for smooth reorder
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newPortfolio = Array.from(portfolio);
    const [removed] = newPortfolio.splice(result.source.index, 1);
    newPortfolio.splice(result.destination.index, 0, removed);
    setPortfolio(newPortfolio);
  };

  // Edit functionality — Allow inline editing of the title
  const handleEdit = (item) => {
    setEditingItem({ ...item });
    setIsEditModalOpen(true);
  };

  const handleEditSave = (newTitle) => {
    if (!editingItem) return;
    setPortfolio((prev) =>
      prev.map((item) =>
        item.id === editingItem.id ? { ...item, title: newTitle || editingItem.title } : item
      )
    );
    setEditingItem(null);
    setIsEditModalOpen(false);
  };

  // Delete with confirmation modal
  const handleDelete = (id) => {
    setDeletePending(id);
  };
  const confirmDelete = () => {
    setPortfolio((prev) => prev.filter((item) => item.id !== deletePending));
    setDeletePending(null);
  };

  // Add New Work
  const [showUploader, setShowUploader] = useState(false);
  const [newFile, setNewFile] = useState<File | null>(null);
  const [newPreview, setNewPreview] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const handleNewFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setNewFile(file);
    setNewTitle(file.name.replace(/\.[^/.]+$/, ''));
    const reader = new FileReader();
    reader.onload = () => setNewPreview(reader.result as string);
    reader.readAsDataURL(file);
  };
  const handleAddNewWork = () => {
    if (!newTitle || !newPreview) return;
    setPortfolio(prev => [
      ...prev,
      {
        id: Date.now(),
        image: newPreview,
        title: newTitle,
        featured: false
      }
    ]);
    setShowUploader(false);
    setNewFile(null);
    setNewPreview(null);
    setNewTitle('');
  };

  // Animation variants for premium feel
  const cardAnim = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 180, damping: 16 } }
  };

  return (
    <motion.div
      variants={cardAnim}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <Card className="border-none shadow-none bg-white/80">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-xl font-serif">My Portfolio</CardTitle>
            <CardDescription>Showcase your best work and reorder by dragging.</CardDescription>
          </div>
          <Button
            variant="default"
            className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-full px-5 shadow-sm transition min-w-[44px]"
            onClick={() => setShowUploader(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Work
          </Button>
        </CardHeader>
        <CardContent>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="portfolio-gallery" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
                >
                  {portfolio.map((item, idx) => (
                    <Draggable key={item.id} draggableId={String(item.id)} index={idx}>
                      {(provided, snapshot) => (
                        <motion.div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`
                            group relative rounded-lg aspect-square overflow-hidden border bg-gradient-to-br from-purple-50 via-white to-pink-50 shadow-sm transition
                            ${snapshot.isDragging ? "ring-2 ring-purple-300 shadow-lg" : ""}
                          `}
                          style={{ userSelect: "none" }}
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                          />
                          {/* Overlays for hover actions */}
                          <div
                            className={`
                              absolute inset-0 flex flex-col justify-end 
                              bg-gradient-to-t from-black/50 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300
                              p-4
                            `}
                          >
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-white font-medium text-sm truncate">{item.title}</span>
                              <div className="flex gap-1">
                                {/* Edit Button: clear, appears on hover */}
                                <Button
                                  size="icon"
                                  variant="secondary"
                                  className="h-8 w-8 rounded-full p-2 flex items-center justify-center shadow bg-white/80 hover:bg-white"
                                  onClick={(e) => { e.stopPropagation(); handleEdit(item); }}
                                  aria-label="Edit"
                                >
                                  <Pencil className="h-4 w-4 text-purple-500" />
                                </Button>
                                {/* Delete Button: opens modal */}
                                <Button
                                  size="icon"
                                  variant="destructive"
                                  className="h-8 w-8 rounded-full p-2 flex items-center justify-center shadow bg-white/80 hover:bg-red-100"
                                  onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                                  aria-label="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          {/* Drag handle */}
                          <div
                            {...provided.dragHandleProps}
                            className="absolute top-2 left-2 bg-white/50 text-purple-500 rounded-full px-2 py-1 text-xs font-semibold z-10 shadow"
                          >
                            Drag
                          </div>
                        </motion.div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </CardContent>
      </Card>

      {/* Edit modal for renaming (simple) */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-md w-full flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Edit Title</h2>
            <input
              type="text"
              className="border px-3 py-2 w-full rounded mt-1"
              value={editingItem?.title || ''}
              onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
              autoFocus
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button variant="default" onClick={() => handleEditSave(editingItem?.title)}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={!!deletePending} onOpenChange={open => !open && setDeletePending(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this portfolio item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletePending(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add new work modal */}
      <Dialog open={showUploader} onOpenChange={setShowUploader}>
        <DialogContent className="max-w-md flex flex-col gap-5">
          <h2 className="font-semibold text-lg">Add New Portfolio Item</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleNewFileChange}
            className="block w-full"
          />
          {newPreview && (
            <img src={newPreview} alt="Preview" className="w-full rounded mb-2 border" />
          )}
          <input
            type="text"
            className="border px-3 py-2 rounded"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            placeholder="Title"
          />
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowUploader(false)}>Cancel</Button>
            <Button
              disabled={!newTitle || !newPreview}
              onClick={handleAddNewWork}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white"
            >
              Add
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ArtistPortfolioManager;
