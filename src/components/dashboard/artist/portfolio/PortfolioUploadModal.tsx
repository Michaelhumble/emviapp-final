
import React, { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface PortfolioUploadModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File, title: string) => Promise<boolean>;
  loading: boolean;
}

const PortfolioUploadModal = ({ open, onClose, onUpload, loading }: PortfolioUploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setFile(file || null);
    setPreview(file ? URL.createObjectURL(file) : null);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !title.trim()) return;
    const success = await onUpload(file, title.trim());
    if (success) {
      setFile(null);
      setPreview(null);
      setTitle("");
      onClose();
    }
  }

  function handleRemoveFile() {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <Dialog open={open} onOpenChange={v => { if(!loading) onClose(); }}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="font-serif">Add New Work</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSave}>
          <div className="flex flex-col gap-3">
            <Label className="">Upload Image</Label>
            <div 
              className="flex flex-col items-center p-4 border-2 border-dashed border-purple-200 hover:border-purple-400 rounded-lg cursor-pointer transition"
              onClick={() => fileInputRef.current?.click()}
            >
              {!preview ? (
                <>
                  <Upload className="h-8 w-8 text-purple-300 mb-2" />
                  <p className="text-xs text-gray-500">Click to select or drag in an image (jpg, png, webp)</p>
                  <Input 
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                  />
                </>
              ) : (
                <div className="relative w-full">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="absolute top-1 right-1 h-7 w-7"
                    onClick={e => {e.stopPropagation();handleRemoveFile()}}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            <Label htmlFor="title" className="">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g., Modern Nail Art"
              maxLength={40}
              className=""
              autoFocus
              required
              disabled={loading}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white"
              disabled={!file || !title.trim() || loading}
            >
              {loading ? "Uploading..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioUploadModal;
