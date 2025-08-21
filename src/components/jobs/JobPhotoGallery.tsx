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
              ? `${jobTitle} ${category ? `${category} ` : ''}salon workspace - professional beauty environment with khách sang clientele and tip cao earning potential`
              : `Premium ${category || 'beauty'} salon for sale in Dallas area - established business with loyal client base and proven revenue stream`
            }
            className="h-full w-full object-cover"
            onError={(e)=>{ (e.currentTarget as HTMLImageElement).src="/images/placeholder-job.jpg"; }}
          />
        </div>
      ))}
    </div>
  );
}
