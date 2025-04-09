
import { ReactNode } from "react";

export interface PortfolioImage {
  url: string;
  id: string; // Used for identification in the UI
  name?: string;
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

// Updated service interface with image_url field
export interface Service {
  id: string;
  title: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  is_visible: boolean;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

// Updated ServiceFormData interface with image_url field
export interface ServiceFormData {
  title: string;
  description: string;
  price: string;
  duration_minutes: string;
  is_visible: boolean;
  image_url?: string;
}
