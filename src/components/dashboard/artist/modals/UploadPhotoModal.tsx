
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, X } from 'lucide-react';

interface UploadPhotoModalProps {
  open: boolean;
  onClose: () => void;
}

const UploadPhotoModal = ({ open, onClose }: UploadPhotoModalProps) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Thêm Ảnh Mới
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Kéo thả ảnh vào đây hoặc click để chọn</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Hủy
            </Button>
            <Button onClick={handleUpload} disabled={uploading} className="flex-1">
              {uploading ? "Đang tải..." : "Tải lên"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPhotoModal;
