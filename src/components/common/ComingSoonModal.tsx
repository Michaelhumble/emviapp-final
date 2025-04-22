
import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/**
 * Props:
 * - open: boolean
 * - onOpenChange: (open: boolean) => void
 * - featureName?: string
 */
const ComingSoonModal: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  featureName?: string;
}> = ({ open, onOpenChange, featureName }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="p-0 bg-white max-w-md mx-auto flex flex-col rounded-2xl shadow-lg justify-center items-center">
      <DialogHeader>
        <DialogTitle
          className="w-full text-center font-playfair text-2xl text-[#1A1A1A] font-bold tracking-wide antialiased mb-2"
        >
          {featureName ? featureName : "Coming Soon"}
        </DialogTitle>
      </DialogHeader>
      <div className="flex flex-col items-center justify-center px-8 py-9 w-full">
        <div className="mb-3 w-14 h-14 rounded-full bg-[#E5DEFF] flex items-center justify-center">
          <span className="text-2xl font-playfair text-[#9b87f5]">♥</span>
        </div>
        <div className="text-center font-playfair text-lg text-[#7E69AB] mb-0.5">
          This feature is coming soon — we're building it with love!
        </div>
      </div>
      <DialogFooter className="w-full flex justify-center pb-4">
        <DialogClose asChild>
          <Button className="font-playfair px-8 py-2 rounded-full bg-[#9b87f5] text-white hover:bg-[#7E69AB] transition">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default ComingSoonModal;
