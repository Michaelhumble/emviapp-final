
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PostingContextType {
  isPosting: boolean;
  setIsPosting: (posting: boolean) => void;
}

const PostingContext = createContext<PostingContextType | undefined>(undefined);

export const PostingProvider = ({ children }: { children: ReactNode }) => {
  const [isPosting, setIsPosting] = useState(false);

  return (
    <PostingContext.Provider value={{ isPosting, setIsPosting }}>
      {children}
    </PostingContext.Provider>
  );
};

export const usePosting = () => {
  const context = useContext(PostingContext);
  if (context === undefined) {
    throw new Error('usePosting must be used within a PostingProvider');
  }
  return context;
};
