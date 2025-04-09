
export interface PortfolioInfoProps {
  imageCount: number;
}

export interface PortfolioEmptyStateProps {
  isUploading: boolean;
}

export interface UploadAreaProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
  uploadProgress: number;
  fileInputRef: React.RefObject<HTMLInputElement>;
  dragOver: (e: React.DragEvent) => void;
  dropHandler: (e: React.DragEvent) => void;
}

export interface ImageGridProps {
  images: string[];
  onRemoveImage: (url: string) => Promise<void>;
  isUploading: boolean;
}
