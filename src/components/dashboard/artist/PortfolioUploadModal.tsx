
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const PortfolioUploadModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [inputKey, setInputKey] = useState(0); // to reset input

  // Modal content for file input
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setSelectedImage(file);
  }

  function handleRemoveFile() {
    setSelectedImage(null);
    setInputKey((prev) => prev + 1);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          // Soft-glass, premium modal design system
          "w-full max-w-md p-0 rounded-2xl border-0 bg-white/70 shadow-xl backdrop-blur-[10px] mx-auto",
          "md:max-w-lg"
        )}
        style={{ minWidth: "0" }}
      >
        <div className="flex flex-col items-center px-6 py-7 xs:px-8">
          <DialogHeader className="w-full mb-2">
            <DialogTitle className="font-serif text-2xl flex items-center justify-center gap-2 text-[#1A1F2C]">
              <Plus className="h-5 w-5 text-primary-purple" />
              Upload Your Latest Work
            </DialogTitle>
            <DialogDescription className="text-gray-500 font-normal text-center text-sm mt-2">
              Keep your portfolio fresh—showcase your latest work to attract even more clients.
            </DialogDescription>
          </DialogHeader>
          {/* Image Upload */}
          <div className="w-full mt-5">
            <Label
              htmlFor="portfolio-image"
              className="block text-emvi-accent text-sm font-medium mb-1"
            >
              Upload Image
            </Label>
            <div className="relative w-full flex items-center justify-center">
              <label
                htmlFor="portfolio-image"
                className={cn(
                  "flex flex-col items-center justify-center rounded-xl bg-[#F1F0FB] hover:bg-purple-50 transition border-2 border-dashed border-[#D6BCFA] cursor-pointer p-5 w-full min-h-[120px]",
                  selectedImage ? "border-solid bg-white/60" : ""
                )}
              >
                {selectedImage ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="preview"
                      className="h-28 w-28 object-cover rounded-lg border mb-2"
                    />
                    <span className="text-sm text-gray-700">{selectedImage.name}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 text-xs py-1 px-3"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveFile();
                      }}
                      type="button"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <>
                    <Image className="h-8 w-8 text-[#9b87f5] opacity-80 mb-2" />
                    <span className="text-sm font-medium text-gray-700">
                      Click to select or drag in a .jpg/.png image
                    </span>
                  </>
                )}
                <Input
                  id="portfolio-image"
                  key={inputKey}
                  type="file"
                  className="hidden"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  tabIndex={-1}
                  aria-label="Upload work image"
                />
              </label>
            </div>
          </div>
          {/* Title/Description input */}
          <div className="w-full mt-6">
            <Label htmlFor="portfolio-title" className="text-emvi-accent text-sm font-medium">
              Title <span className="text-gray-400 font-normal">(optional)</span>
            </Label>
            <Input
              id="portfolio-title"
              placeholder="Describe your work in a few words"
              className="mt-1 bg-white/90 border border-[#E5DEFF] text-base"
              maxLength={60}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoComplete="off"
              disabled // currently always disabled for real editing (until real logic built)
              tabIndex={-1}
            />
          </div>
          {/* Save button, always disabled */}
          <Button
            className="mt-8 w-full min-h-[44px] text-base font-semibold rounded-lg transition bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] shadow-md text-white cursor-not-allowed"
            disabled
            tabIndex={-1}
            type="button"
            data-tooltip-id="save-tooltip"
            aria-disabled="true"
            style={{ opacity: 0.8 }}
            title="Coming Soon – This feature will be live shortly!"
          >
            Save
          </Button>
          <div className="text-xs text-gray-400 italic mt-1 text-center" aria-live="polite">
            Coming Soon – This feature will be live shortly!
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioUploadModal;
