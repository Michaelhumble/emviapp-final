
// Helper function to get nationwide pricing text based on post type
export const getNationwidePrice = (postType: 'job' | 'salon' | 'booth' | 'supply'): string => {
  switch (postType) {
    case 'job': return '+$5';
    case 'salon': return '+$10';
    case 'booth': return '+$10';
    case 'supply': return '+$5';
    default: return '';
  }
};
