import React from "react";
import { generateImageAlt } from '@/utils/seoHelpers';

interface JobPhotoGalleryProps {
  urls: string[];
  jobTitle?: string;
  category?: string;
}

export default function JobPhotoGallery({ urls, jobTitle, category }: JobPhotoGalleryProps) {
  if (!urls?.length) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
      {urls.map((u,i)=>(
        <div key={u+i} className="aspect-[16/10] overflow-hidden rounded-xl border">
          <img
            src={u}
            loading="lazy"
            decoding="async"
            alt={jobTitle 
              ? `${jobTitle} ${category ? `${category} ` : ''}job photo ${i+1} - ${generateImageAlt(jobTitle, category)}` 
              : `Professional ${category || 'beauty'} workspace photo showing job environment and setup`
            }
            className="h-full w-full object-cover"
            onError={(e)=>{ (e.currentTarget as HTMLImageElement).src="/images/placeholder-job.jpg"; }}
          />
        </div>
      ))}
    </div>
  );
}
