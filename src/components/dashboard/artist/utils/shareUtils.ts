
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
};

export const shareToSocial = (platform: 'instagram' | 'facebook' | 'tiktok', profileUrl: string) => {
  const message = "Check out my nail art portfolio on EmviApp! 💅✨";
  
  switch (platform) {
    case 'instagram':
      // Instagram doesn't support direct sharing, so we copy the content
      copyToClipboard(`${message} ${profileUrl}`);
      break;
    case 'facebook':
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`, '_blank');
      break;
    case 'tiktok':
      // TikTok doesn't have direct web sharing, so we copy the content
      copyToClipboard(`${message} ${profileUrl}`);
      break;
  }
};

export const getProfileUrl = (): string => {
  return `${window.location.origin}/artist/your-profile`;
};
