
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

export interface ImageItemProps {
  url: string;
  index: number;
  onRemove: (url: string) => void;
  isUploading: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  is_visible: boolean;
  image_url?: string | null;
  user_id?: string;
  updated_at?: string;
}

export interface ServiceFormData {
  title: string;
  description: string;
  price: string;
  duration_minutes: string;
  is_visible: boolean;
  image_url?: string;
}
