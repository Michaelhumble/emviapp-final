
import { toast } from 'sonner';

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackError) {
      return false;
    }
  }
};

export const shareToSocial = (platform: 'instagram' | 'facebook' | 'whatsapp', profileUrl: string) => {
  const message = "Check out my artist profile on EmviApp! Book with me today!";
  
  switch (platform) {
    case 'instagram':
      // Instagram doesn't support direct sharing, so we copy the content and open Instagram
      copyToClipboard(`${message} ${profileUrl}`);
      window.open('https://www.instagram.com/', '_blank');
      toast.success('Content copied! Paste it in your Instagram story');
      break;
    case 'facebook':
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}&quote=${encodeURIComponent(message)}`;
      window.open(facebookUrl, '_blank', 'width=600,height=400');
      break;
    case 'whatsapp':
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${message} ${profileUrl}`)}`;
      window.open(whatsappUrl, '_blank');
      break;
  }
};

export const getProfileUrl = (userId?: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/artist/${userId || 'your-profile'}`;
};

// Native Web Share API fallback
export const nativeShare = async (profileUrl: string): Promise<boolean> => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Check out my EmviApp profile!',
        text: 'Book your next appointment with me on EmviApp',
        url: profileUrl
      });
      return true;
    } catch (error) {
      console.error('Error sharing:', error);
      return false;
    }
  }
  return false;
};
