import React, { useEffect, useState } from 'react'
import { PRESS_OUTLETS, validateHref } from '@/data/press/outlets'

export default function PressLogos() {
  const [links, setLinks] = useState<Record<string, string>>({})

  useEffect(() => {
    (async () => {
      const map: Record<string,string> = {}
      await Promise.all(PRESS_OUTLETS.map(async o => {
        const ok = await validateHref(o.href)
        map[o.id] = ok ? o.href : (o.fallbackHref ?? '#')
      }))
      setLinks(map)
    })()
  }, [])

  return (
    <section aria-labelledby="as-seen-on" className="press-wrap py-12 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <h2 id="as-seen-on" className="text-center text-sm font-semibold tracking-[0.16em] text-muted-foreground mb-8 uppercase">
          As seen on
        </h2>
        <ul role="list" className="press-list" aria-label="As seen on">
          {PRESS_OUTLETS.map(o => {
            const content = (
              <span className="press-badge" aria-label={`As seen on ${o.name}`}>
                <span className="press-logo">
                  <img
                    src={o.logo}
                    alt={o.alt}
                    width={o.width ?? 128}
                    height={o.height ?? 128}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
              </span>
            )
            const href = links[o.id]
            return (
              <li key={o.id} role="listitem" className="press-item">
                {href && href !== '#' ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="press-link">
                    {content}
                  </a>
                ) : content}
              </li>
            )
          })}
        </ul>
        <p className="press-caption">All trademarks are property of their respective owners.</p>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .press-list {
            display: grid;
            grid-auto-flow: column;
            grid-auto-columns: max-content;
            gap: 1rem;
            overflow-x: auto;
            padding: .25rem;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            justify-content: center;
          }
          .press-item { scroll-snap-align: start; }
          .press-link { display: inline-block; }
          .press-badge {
            --size: 92px;
            display: grid;
            place-items: center;
            width: var(--size);
            height: var(--size);
            border-radius: 9999px;
            background: #fff;
            border: 1px solid rgba(0,0,0,.06);
            box-shadow: 0 2px 6px rgba(0,0,0,.06);
            transition: transform .15s ease, box-shadow .15s ease;
          }
          .press-link:hover .press-badge { 
            transform: translateY(-2px); 
            box-shadow: 0 6px 14px rgba(0,0,0,.10); 
          }
          .press-logo {
            display: grid;
            place-items: center;
            width: 68%;
            height: 68%;
          }
          .press-logo img { 
            width: 100%; 
            height: auto; 
            object-fit: contain; 
          }
          @media (min-width: 768px) {
            .press-badge { --size: 112px; }
          }
          .press-caption {
            margin-top: .75rem;
            font-size: .85rem;
            color: rgba(0,0,0,.55);
            text-align: center;
          }
        `
      }} />
    </section>
  )
}