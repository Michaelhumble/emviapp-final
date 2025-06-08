
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

export const shareToSocial = (platform: 'instagram' | 'facebook' | 'tiktok', profileUrl: string) => {
  const message = "Check out my nail art portfolio on EmviApp! Book with me today!";
  
  switch (platform) {
    case 'instagram':
      // Instagram doesn't support direct sharing, so we copy the content and open Instagram
      copyToClipboard(`${message} ${profileUrl}`);
      window.open('https://www.instagram.com/', '_blank');
      break;
    case 'facebook':
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}&quote=${encodeURIComponent(message)}`;
      window.open(facebookUrl, '_blank', 'width=600,height=400');
      break;
    case 'tiktok':
      // TikTok doesn't have direct web sharing, so we copy the content and open TikTok
      copyToClipboard(`${message} ${profileUrl}`);
      window.open('https://www.tiktok.com/', '_blank');
      break;
  }
};

export const getProfileUrl = (): string => {
  const baseUrl = window.location.origin;
  const userId = 'your-profile'; // This would be dynamic based on actual user ID
  return `${baseUrl}/artist/${userId}`;
};

// Native Web Share API fallback
export const nativeShare = async (profileUrl: string): Promise<boolean> => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Check out my EmviApp profile!',
        text: 'Book your next nail appointment with me on EmviApp',
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
