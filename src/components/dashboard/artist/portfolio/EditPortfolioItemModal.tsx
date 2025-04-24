
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditPortfolioItemModalProps {
  open: boolean;
  onClose: () => void;
  item: {
    id: number;
    image: string;
    title: string;
    category: string;
  } | null;
  onSave: (id: number, title: string, category: string) => void;
  onDelete: (id: number) => void;
}

const EditPortfolioItemModal = ({
  open,
  onClose,
  item,
  onSave,
  onDelete,
}: EditPortfolioItemModalProps) => {
  const [title, setTitle] = useState(item?.title || "");
  const [category, setCategory] = useState(item?.category || "");

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setCategory(item.category);
    }
  }, [item]);

  const handleSave = () => {
    if (item) {
      onSave(item.id, title.trim(), category.trim());
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white/95 backdrop-blur-sm border-0 rounded-xl p-0">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 px-6 pt-6 pb-4">
          <h2 className="text-xl font-playfair font-semibold text-gray-900">
            Edit Portfolio Item
          </h2>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <div className="aspect-square w-full max-w-[200px] mx-auto rounded-lg overflow-hidden shadow-sm">
              <img
                src={item?.image}
                alt={item?.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-gray-200 focus:ring-purple-500"
                placeholder="Enter title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">
                Category
              </Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border-gray-200 focus:ring-purple-500"
                placeholder="Enter category"
              />
            </div>
          </div>

          <div className="flex justify-end items-center gap-3 mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              disabled={!title.trim() || !category.trim()}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPortfolioItemModal;

