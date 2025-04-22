
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
import { Image, Upload, X } from "lucide-react";
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [inputKey, setInputKey] = useState(0);
  const [saving, setSaving] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Reset all states when closed
    if (!open) {
      setSelectedImage(null);
      setPreviewUrl(null);
      setTitle("");
      setInputKey((prev) => prev + 1);
      setSaving(false);
    }
  }, [open]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setSelectedImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  }

  function handleRemoveFile() {
    setSelectedImage(null);
    setPreviewUrl(null);
    setInputKey((prev) => prev + 1);
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleCancel() {
    onOpenChange(false);
  }

  async function handleSave() {
    if (!selectedImage || title.trim().length === 0) return;

    setSaving(true);

    // Create preview URL for mock workflow
    const imageUrl = previewUrl
      ? previewUrl
      : URL.createObjectURL(selectedImage);

    const mockItem: UploadedWork = {
      imageUrl,
      title: title.trim(),
      previewMode: true,
    };

    // Pass to parent to update the grid (local state only)
    onUploadMock(mockItem);

    // UI feedback
    setTimeout(() => {
      toast({
        title: "✅ Added to your portfolio!",
        description: "",
        variant: "success",
      });
    }, 200);

    setSaving(false);
    onOpenChange(false);
  }

  const isSaveDisabled = !selectedImage || title.trim().length === 0 || saving;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100%-32px)] max-w-md md:max-w-lg p-0 rounded-2xl border-0 bg-white/70 shadow-xl backdrop-blur-[10px] mx-auto"
        )}
        style={{ minWidth: "0" }}
      >
        <div className="flex flex-col items-center px-4 py-5 xs:px-6 xs:py-7 sm:px-8">
          <DialogHeader className="w-full mb-2">
            <DialogTitle className="font-serif text-xl xs:text-2xl flex items-center justify-center gap-2 text-[#1A1F2C]">
              <Image className="h-5 w-5 text-primary-purple" />
              Upload Your Latest Work
            </DialogTitle>
            <DialogDescription className="text-gray-500 font-normal text-center text-xs xs:text-sm mt-2">
              Keep your portfolio fresh—showcase your latest work to attract even more clients.
            </DialogDescription>
          </DialogHeader>
          {/* Image Upload */}
          <div className="w-full mt-4 xs:mt-5">
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
                  "flex flex-col items-center justify-center rounded-xl bg-[#F1F0FB] hover:bg-purple-50 transition border-2 border-dashed border-[#D6BCFA] cursor-pointer p-4 xs:p-5 w-full min-h-[100px] xs:min-h-[120px]",
                  selectedImage ? "border-solid bg-white/60" : ""
                )}
              >
                {previewUrl ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={previewUrl}
                      alt="preview"
                      className="h-24 xs:h-28 w-24 xs:w-28 object-cover rounded-lg border mb-2"
                    />
                    <span className="text-xs xs:text-sm text-gray-700 max-w-[200px] truncate">{selectedImage?.name}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 text-xs py-1 px-3"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveFile();
                      }}
                      type="button"
                      disabled={saving}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-7 w-7 xs:h-8 xs:w-8 text-[#9b87f5] opacity-80 mb-2" />
                    <span className="text-xs xs:text-sm font-medium text-gray-700 text-center">
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
                  disabled={saving}
                />
              </label>
            </div>
          </div>
          {/* Title input */}
          <div className="w-full mt-5 xs:mt-6">
            <Label htmlFor="portfolio-title" className="text-emvi-accent text-sm font-medium">
              Title
            </Label>
            <Input
              id="portfolio-title"
              placeholder="Describe your artwork (e.g., 'Elegant French Tips')"
              className="mt-1 bg-white/90 border border-[#E5DEFF] text-sm xs:text-base"
              maxLength={50}
              value={title}
              disabled={saving}
              onChange={e => setTitle(e.target.value)}
              autoComplete="off"
            />
            <div className="w-full text-right text-[10px] xs:text-xs text-gray-400 mt-1">{title.length}/50</div>
          </div>
          {/* Button Row */}
          <div className="flex w-full flex-col xs:flex-row gap-3 mt-6 xs:mt-8">
            <Button
              className="min-h-[40px] xs:min-h-[44px] text-sm xs:text-base font-semibold rounded-lg transition bg-[#ece9fa] shadow-md text-purple-700 hover:bg-[#e5deff]/90 font-serif flex-1"
              variant="outline"
              type="button"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              className="min-h-[40px] xs:min-h-[44px] text-sm xs:text-base font-semibold rounded-lg transition bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] shadow-md text-white flex-1 disabled:bg-gray-200 disabled:text-gray-400"
              disabled={isSaveDisabled}
              type="button"
              style={{ opacity: isSaveDisabled ? 0.7 : 1 }}
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioUploadModal;
