
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Image as ImageIcon, X, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PortfolioUploaderProps {
  onComplete: () => void;
  onUpload: (file: File, title: string, description?: string) => Promise<any>;
}

const PortfolioUploader = ({ onComplete, onUpload }: PortfolioUploaderProps) => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Validate file type
      if (!file.type.match('image/jpeg') && !file.type.match('image/png') && !file.type.match('image/webp')) {
        toast({
          title: "Invalid file type",
          description: "Please upload a JPG, PNG, or WebP image.",
          variant: "destructive"
        });
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB.",
          variant: "destructive"
        });
        return;
      }
      
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Set default title from filename
      if (!title) {
        setTitle(file.name.split('.')[0]);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      
      // Create a synthetic event to pass to handleFileChange
      const event = {
        target: {
          files: e.dataTransfer.files
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      
      handleFileChange(event);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select an image to upload.",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      await onUpload(selectedFile, title, description);
      
      toast({
        title: "Upload successful",
        description: "Your image has been added to your portfolio."
      });
      
      // Reset form
      setSelectedFile(null);
      setPreview(null);
      setTitle('');
      setDescription('');
      
      // Close uploader
      onComplete();
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Add to Portfolio</h3>
        <Button variant="ghost" size="sm" onClick={onComplete}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div 
        className={`
          border-2 border-dashed rounded-lg p-6 text-center
          ${isDragging ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:border-purple-200 hover:bg-gray-50'}
          transition-colors cursor-pointer
        `}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/jpeg,image/png,image/webp"
        />
        
        {preview ? (
          <div className="relative max-h-[300px] overflow-hidden rounded-md mb-4">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-w-full h-auto mx-auto"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(null);
                setPreview(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="py-8">
            <div className="mx-auto w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-sm font-medium mb-1">
              Drag & drop your photo or click to browse
            </p>
            <p className="text-xs text-gray-500 mb-2">
              JPG, PNG or WebP • Max 5MB
            </p>
            <Button variant="outline" size="sm">
              <ImageIcon className="mr-2 h-4 w-4" />
              Select Image
            </Button>
          </div>
        )}
      </div>

      {preview && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Summer Collection Nail Design"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your work..."
              className="mt-1"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onComplete} disabled={isUploading}>
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={isUploading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload Image'
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioUploader;
