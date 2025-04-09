
import { Button } from "@/components/ui/button";
import { CloudUpload, Loader2 } from "lucide-react";
import { UploadAreaProps } from "./types";

const PortfolioUploadArea = ({ 
  onFileChange,
  isUploading,
  uploadProgress,
  fileInputRef,
  dragOver,
  dropHandler
}: UploadAreaProps) => {
  return (
    <div 
      className="border-2 border-dashed border-border rounded-lg p-6 text-center bg-muted/30 cursor-pointer"
      onDragOver={dragOver}
      onDrop={dropHandler}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        id="portfolio-input"
        disabled={isUploading}
        multiple
      />
      
      {isUploading ? (
        <div className="flex flex-col items-center justify-center py-4">
          <Loader2 className="h-10 w-10 text-primary animate-spin mb-2" />
          <p className="text-sm font-medium">Uploading... {uploadProgress}%</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-4">
          <CloudUpload className="h-10 w-10 text-muted-foreground mb-2" strokeWidth={1.5} />
          <p className="text-sm font-medium">Drag & drop images here</p>
          <p className="text-xs text-muted-foreground mt-1">or click to browse</p>
          <Button type="button" className="mt-4">
            <CloudUpload className="h-4 w-4 mr-2" />
            Upload Images
          </Button>
        </div>
      )}
    </div>
  );
};

export default PortfolioUploadArea;
