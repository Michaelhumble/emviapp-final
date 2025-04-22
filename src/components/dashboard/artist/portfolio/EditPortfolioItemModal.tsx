
import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2 } from "lucide-react";

interface EditPortfolioItemModalProps {
  open: boolean;
  onClose: () => void;
  item: {
    id: number;
    image: string;
    title: string;
    featured: boolean;
  } | null;
  onSave: (id: number, newTitle: string, newImage?: File | null) => void;
  onDelete: (id: number) => void;
}

const EditPortfolioItemModal: React.FC<EditPortfolioItemModalProps> = ({
  open,
  onClose,
  item,
  onSave,
  onDelete,
}) => {
  const [title, setTitle] = useState(item?.title || "");
  const [imagePreview, setImagePreview] = useState<string>(item?.image || "");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset fields when opening a new item
  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setImagePreview(item.image);
      setNewImage(null);
      setShowDeleteConfirm(false);
    }
  }, [item, open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!item) return;
    onSave(item.id, title.trim() || "Untitled", newImage);
    onClose();
  };

  const handleDelete = () => {
    if (!item) return;
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (!item) return;
    onDelete(item.id);
    setShowDeleteConfirm(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md focus:outline-none p-0 overflow-hidden border-0 rounded-xl bg-white shadow-xl">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 px-6 pt-6 pb-2">
          <h2 className="text-lg font-semibold font-serif text-gray-900 mb-3">Edit Portfolio Item</h2>
        </div>
        <div className="px-6 py-6">
          {/* Image preview and file input */}
          <div className="flex flex-col items-center mb-4">
            <div className="aspect-square w-36 h-36 rounded-lg shadow-inner bg-gray-100 overflow-hidden border">
              <img
                src={imagePreview}
                alt="Portfolio"
                className="object-cover w-full h-full"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() => fileInputRef.current?.click()}
            >
              Replace Image
            </Button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          {/* Title/category input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title / Category</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={50}
            />
          </div>
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              className="flex items-center"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white"
              disabled={!title.trim()}
            >
              Save Changes
            </Button>
          </div>
        </div>
        {/* Confirm Delete Dialog */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-xs w-full text-center">
              <h3 className="text-lg mb-2">Delete this item?</h3>
              <p className="text-gray-500 text-sm mb-4">
                This action cannot be undone.
              </p>
              <div className="flex justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={confirmDelete}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditPortfolioItemModal;
