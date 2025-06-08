
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trophy, Star, Users } from 'lucide-react';

interface LeaderboardModalProps {
  open: boolean;
  onClose: () => void;
}

const LeaderboardModal = ({ open, onClose }: LeaderboardModalProps) => {
  const topArtists = [
    { rank: 1, name: "Minh Thư", points: 2847, bookings: 156 },
    { rank: 2, name: "Lan Anh", points: 2634, bookings: 142 },
    { rank: 3, name: "You", points: 2240, bookings: 127 },
    { rank: 4, name: "Thu Hà", points: 2156, bookings: 118 },
    { rank: 5, name: "Ngọc Mai", points: 1998, bookings: 103 }
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Bảng Xếp Hạng Nghệ Sĩ
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {topArtists.map((artist) => (
            <div key={artist.rank} className={`flex items-center gap-4 p-4 rounded-xl ${
              artist.name === "You" ? "bg-purple-50 border-2 border-purple-200" : "bg-gray-50"
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                artist.rank === 1 ? "bg-yellow-100 text-yellow-600" :
                artist.rank === 2 ? "bg-gray-100 text-gray-600" :
                artist.rank === 3 ? "bg-orange-100 text-orange-600" :
                "bg-blue-100 text-blue-600"
              }`}>
                {artist.rank}
              </div>
              <div className="flex-1">
                <div className="font-medium">{artist.name}</div>
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <Star className="h-3 w-3" />
                  {artist.points} điểm
                  <Users className="h-3 w-3 ml-2" />
                  {artist.bookings} lượt book
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeaderboardModal;
