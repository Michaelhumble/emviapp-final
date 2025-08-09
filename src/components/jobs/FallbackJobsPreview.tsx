import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { previewPremiumJobs, previewGoldJobs, previewExpiredJobs, previewSalonsForSale, previewArtists } from '@/demo/jobsPreviewData';

function SafeImg(props: { src?: string; alt: string; className?: string }) {
  const [err, setErr] = useState(false);
  return (
    <img
      loading="lazy"
      decoding="async"
      src={err ? '/demo/fallback.svg' : (props.src || '/demo/fallback.svg')}
      alt={props.alt}
      className={props.className}
      onError={() => setErr(true)}
    />
  );
}

export default function FallbackJobsPreview(props: { 'data-preview'?: string }) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet>
        <title>Beauty Industry Jobs | EmviApp</title>
        <meta name="description" content="Browse beauty industry jobs on EmviApp. Discover roles and hire talent fast." />
        <link rel="canonical" href="/jobs/browse" />
      </Helmet>

      <section className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Browse Jobs</h1>
        <p className="mt-2 text-muted-foreground">Preview data shown (non‑production) so you can see the full design.</p>
      </section>

      {/* Premium Featured */}
      <section className="mt-10 sm:mt-12">
        <h2 className="text-xl font-semibold mb-4">Premium Featured</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {previewPremiumJobs.map((job) => (
            <div key={job.id} className="relative rounded-xl border bg-background overflow-hidden shadow-sm">
              <div className="aspect-[16/10] w-full">
                <SafeImg src={job.photo} alt={`${job.title} at ${job.shop}`} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-muted-foreground">{job.shop} • {job.city}{job.state ? `, ${job.state}` : ''}</p>
                {job.salary && <p className="text-sm">{job.salary}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gold Featured */}
      <section className="mt-10 sm:mt-12">
        <h2 className="text-xl font-semibold mb-4">Gold Featured</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewGoldJobs.map((job) => (
            <div key={job.id} className="relative rounded-xl border bg-background overflow-hidden shadow-sm">
              <div className="aspect-[16/10] w-full">
                <SafeImg src={job.photo} alt={`${job.title} at ${job.shop}`} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-semibold line-clamp-2">{job.title}</h3>
                <p className="text-sm text-muted-foreground">{job.shop} • {job.city}{job.state ? `, ${job.state}` : ''}</p>
                {job.salary && <p className="text-sm">{job.salary}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What You Missed */}
      <section className="mt-10 sm:mt-12">
        <h2 className="text-xl font-semibold mb-4">What You Missed</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewExpiredJobs.map((job) => (
            <div key={job.id} className="relative rounded-xl border bg-muted/40 overflow-hidden shadow-sm">
              <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
                {job.expired && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/10 border text-foreground/70">Expired</span>
                )}
                {job.filled && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted border text-foreground/70">Position Filled</span>
                )}
              </div>
              <div className="aspect-[16/10] w-full grayscale">
                <SafeImg src={job.photo} alt={`${job.title} at ${job.shop}`} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-semibold line-clamp-2">{job.title}</h3>
                <p className="text-sm text-muted-foreground">{job.shop} • {job.city}{job.state ? `, ${job.state}` : ''}</p>
                {job.salary && <p className="text-sm">{job.salary}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Salons for Sale */}
      <section className="mt-10 sm:mt-12">
        <h2 className="text-xl font-semibold mb-4">Salons for Sale</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {previewSalonsForSale.map((salon) => (
            <div key={salon.id} className="rounded-xl border bg-background overflow-hidden shadow-sm">
              <div className="aspect-[16/10] w-full">
                <SafeImg src={salon.photo} alt={salon.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="font-semibold">{salon.name}</div>
                <div className="text-sm text-muted-foreground">{salon.city}</div>
                {salon.askingPrice && <div className="text-sm mt-1">Asking: {salon.askingPrice}</div>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Artists for Hire */}
      <section className="mt-10 sm:mt-12">
        <h2 className="text-xl font-semibold mb-4">Artists for Hire</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewArtists.map((artist) => (
            <div key={artist.id} className="rounded-xl border bg-background overflow-hidden shadow-sm">
              <div className="aspect-[16/10] w-full">
                <SafeImg src={artist.photo} alt={artist.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="font-semibold">{artist.name}</div>
                <div className="text-sm text-muted-foreground">{artist.specialty}</div>
                <div className="text-sm text-muted-foreground">{artist.city}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
