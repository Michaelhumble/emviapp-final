
import { ReactNode } from "react";

export interface PortfolioImage {
  url: string;
  id: string; // Used for identification in the UI
}

export interface ImageItemProps {
  url: string;
  index: number;
  onRemove: (url: string) => void;
  isUploading: boolean;
}

export interface ImageGridProps {
  images: string[];
  onRemoveImage: (url: string) => void;
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

export interface PortfolioInfoProps {
  imageCount: number;
  children?: ReactNode;
}

export interface PortfolioEmptyStateProps {
  isUploading: boolean;
}
