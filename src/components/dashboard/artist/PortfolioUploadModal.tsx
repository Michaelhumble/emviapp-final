
import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Type for new work (for local modal/grid use)
export type UploadedWork = {
  imageUrl: string;
  title: string;
  previewMode?: boolean;
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadMock: (item: UploadedWork) => void;
}

const PortfolioUploadModal = ({
  open,
  onOpenChange,
  onUploadMock,
}: Props) => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [inputKey, setInputKey] = useState(0);
  const [saving, setSaving] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Reset all states when closed
    if (!open) {
      setSelectedImage(null);
      setTitle("");
      setInputKey((prev) => prev + 1);
      setSaving(false);
    }
  }, [open]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setSelectedImage(file);
  }

  function handleRemoveFile() {
    setSelectedImage(null);
    setInputKey((prev) => prev + 1);
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleCancel() {
    onOpenChange(false);
  }

  async function handleSave() {
    if (!selectedImage) return;

    setSaving(true);

    // In real, would upload to backend. Here, we create a blob url for session preview use.
    const imageUrl = URL.createObjectURL(selectedImage);

    const mockItem: UploadedWork = {
      imageUrl,
      title: title.trim() || "Untitled Work",
      previewMode: true,
    };

    onUploadMock(mockItem);

    onOpenChange(false);

    setTimeout(() => { // Small delay to allow UI update before toasting
      toast({
        title: "✅ Your new work has been added to your portfolio preview!",
        description: "",
        variant: "success",
      });
    }, 250);

    setSaving(false);
  }

  const isSaveDisabled = !selectedImage || title.trim().length === 0 || saving;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-full max-w-md md:max-w-lg p-0 rounded-2xl border-0 bg-white/70 shadow-xl backdrop-blur-[10px] mx-auto",
        )}
        style={{ minWidth: "0" }}
      >
        <div className="flex flex-col items-center px-6 py-7 xs:px-8">
          <DialogHeader className="w-full mb-2">
            <DialogTitle className="font-serif text-2xl flex items-center justify-center gap-2 text-[#1A1F2C]">
              <Image className="h-5 w-5 text-primary-purple" />
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
                    <span className="text-sm text-gray-700 max-w-[200px] truncate">{selectedImage.name}</span>
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
                  ref={inputRef}
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
              placeholder="Describe your artwork (e.g., ‘Elegant French Tips’)"
              className="mt-1 bg-white/90 border border-[#E5DEFF] text-base"
              maxLength={50}
              value={title}
              disabled={false}
              onChange={e => setTitle(e.target.value)}
              autoComplete="off"
            />
            <div className="w-full text-right text-xs text-gray-400 mt-1">{title.length}/50</div>
          </div>
          {/* Button Row */}
          <div className="flex w-full flex-col xs:flex-row gap-3 mt-8">
            <Button
              className="min-h-[44px] text-base font-semibold rounded-lg transition bg-[#ece9fa] shadow-md text-purple-700 hover:bg-[#e5deff]/90 font-serif flex-1"
              variant="outline"
              type="button"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              className="min-h-[44px] text-base font-semibold rounded-lg transition bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] shadow-md text-white flex-1 disabled:bg-gray-200 disabled:text-gray-400"
              disabled={isSaveDisabled}
              type="button"
              style={{ opacity: isSaveDisabled ? 0.7 : 1 }}
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
          <div className="text-xs text-gray-400 italic mt-1 text-center" aria-live="polite">
            No real uploading yet – preview only.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioUploadModal;
