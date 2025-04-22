
import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: "1",
    text: "Maria is a true artist! I always leave feeling fabulous.",
    clientFirstName: "Leah",
    avatar: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&w=64&q=80"
  },
  {
    id: "2",
    text: "Best nail experience ever — highly recommend!",
    clientFirstName: "Kim",
    avatar: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&w=64&q=80"
  },
  {
    id: "3",
    text: "The attention to detail is unmatched. Always a joy.",
    clientFirstName: "Jade",
    avatar: "https://images.unsplash.com/photo-1501286353178-1ec881214838?auto=format&w=64&q=80"
  },
];

const AUTOPLAY_DELAY = 5000;

export default function ClientLoveWidget() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const autoplayRef = React.useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate logic
  React.useEffect(() => {
    if (!emblaApi) return;
    autoplayRef.current && clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, AUTOPLAY_DELAY);
    return () => {
      autoplayRef.current && clearInterval(autoplayRef.current);
    };
  }, [emblaApi]);

  // Update selected index to show pagination/active state
  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    // In embla v8, you need to remove listeners manually
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Manual navigation
  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section aria-label="What Your Clients Are Saying"
      className="w-full pt-3 px-1 xs:px-3 max-w-xl mx-auto"
    >
      <h2 className="font-serif text-base xs:text-lg font-semibold text-emvi-accent mb-2 text-center">
        What Your Clients Are Saying
      </h2>
      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex -ml-3">
            {testimonials.map((testimonial, idx) => (
              <div
                className={cn(
                  "min-w-0 shrink-0 grow-0 basis-full px-3",
                  "transition-all"
                )}
                key={testimonial.id}
                aria-hidden={selectedIndex !== idx}
              >
                <Card className={cn(
                  "rounded-2xl border-0 p-6 xs:p-8 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-white via-[#f6f3fd] to-[#ece9fc]",
                  "shadow-[0_4px_28px_-6px_rgba(155,135,245,0.09)]",
                )}>
                  <span
                    className="block rounded-full overflow-hidden border-4 border-white shadow-md"
                    style={{ width: 56, height: 56 }}
                  >
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.clientFirstName}
                      loading="lazy"
                      className="object-cover w-full h-full"
                      style={{ borderRadius: "50%" }}
                    />
                  </span>
                  <blockquote className="font-serif text-lg xs:text-xl text-gray-900 leading-tight text-center px-1">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="flex items-center gap-2 mt-2">
                    <User className="text-emvi-accent w-4 h-4 opacity-70" aria-hidden="true" />
                    <span className="font-medium text-emvi-accent/80 text-sm">{testimonial.clientFirstName}</span>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <Button
          size="icon"
          variant="outline"
          className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-emvi-accent/80 hover:text-white border border-gray-100 shadow transition"
          onClick={scrollPrev}
          aria-label="Previous Testimonial"
          tabIndex={0}
        >
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-emvi-accent/80 hover:text-white border border-gray-100 shadow transition"
          onClick={scrollNext}
          aria-label="Next Testimonial"
          tabIndex={0}
        >
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
        </Button>

        {/* Dots Pagination */}
        <div className="flex gap-1 justify-center mt-3">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to testimonial ${idx + 1}`}
              className={cn(
                "w-2.5 h-2.5 rounded-full mx-0.5 transition-all",
                idx === selectedIndex
                  ? "bg-emvi-accent shadow"
                  : "bg-gray-300 opacity-60"
              )}
              onClick={() => emblaApi?.scrollTo(idx)}
              tabIndex={0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
