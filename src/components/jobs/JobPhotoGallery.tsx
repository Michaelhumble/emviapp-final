import React from "react";

export default function JobPhotoGallery({ urls }:{ urls:string[] }) {
  if (!urls?.length) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
      {urls.map((u,i)=>(
        <div key={u+i} className="aspect-[16/10] overflow-hidden rounded-xl border">
          <img
            src={u}
            loading="lazy"
            decoding="async"
            alt={"Job photo "+(i+1)}
            className="h-full w-full object-cover"
            onError={(e)=>{ (e.currentTarget as HTMLImageElement).src="/images/placeholder-job.jpg"; }}
          />
        </div>
      ))}
    </div>
  );
}
