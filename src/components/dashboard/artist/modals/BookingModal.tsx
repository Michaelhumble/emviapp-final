
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from 'lucide-react';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

const BookingModal = ({ open, onClose }: BookingModalProps) => {
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    setCreating(true);
    // Simulate booking creation
    setTimeout(() => {
      setCreating(false);
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Thêm Lịch Hẹn Mới
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Ngày</label>
              <input type="date" className="w-full p-2 border rounded-lg mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Giờ</label>
              <input type="time" className="w-full p-2 border rounded-lg mt-1" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Dịch vụ</label>
            <select className="w-full p-2 border rounded-lg mt-1">
              <option>Nail Art</option>
              <option>Manicure</option>
              <option>Pedicure</option>
            </select>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Hủy
            </Button>
            <Button onClick={handleCreate} disabled={creating} className="flex-1">
              {creating ? "Đang tạo..." : "Tạo lịch hẹn"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
