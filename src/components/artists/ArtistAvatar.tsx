
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArtistAvatarProps {
  imageUrl?: string | null;
  name?: string | null;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  fallbackType?: "initials" | "icon" | "placeholder";
}

const ArtistAvatar = ({ 
  imageUrl, 
  name, 
  className,
  size = "md",
  fallbackType = "initials" 
}: ArtistAvatarProps) => {
  // Size classes mapping
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24"
  };

  // High-quality professional artist placeholder images
  const ARTIST_PLACEHOLDERS = [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1595621864030-1d25895f69c5?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&auto=format&fit=crop&q=80"
  ];

  // Get a consistent placeholder based on name or random
  const getPlaceholderImage = (name?: string | null) => {
    if (!name) return ARTIST_PLACEHOLDERS[0];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % ARTIST_PLACEHOLDERS.length;
    return ARTIST_PLACEHOLDERS[index];
  };

  // Get initials from name
  const getInitials = (name?: string | null) => {
    if (!name) return "AR";
    return name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const renderFallback = () => {
    switch (fallbackType) {
      case "initials":
        return <span className="font-medium">{getInitials(name)}</span>;
      case "icon":
        return <User className={cn("text-muted-foreground", size === "sm" ? "h-4 w-4" : "h-6 w-6")} />;
      case "placeholder":
        return <img src={getPlaceholderImage(name)} alt={name || "Artist"} className="object-cover" />;
      default:
        return <span className="font-medium">{getInitials(name)}</span>;
    }
  };

  return (
    <Avatar className={cn(sizeClasses[size], "border border-border", className)}>
      {imageUrl && (
        <AvatarImage 
          src={imageUrl} 
          alt={`${name || 'Artist'}'s profile picture`}
          className="object-cover"
        />
      )}
      <AvatarFallback 
        className={cn(
          "bg-muted",
          fallbackType === "placeholder" ? "p-0" : "flex items-center justify-center"
        )}
      >
        {renderFallback()}
      </AvatarFallback>
    </Avatar>
  );
};

export default ArtistAvatar;
