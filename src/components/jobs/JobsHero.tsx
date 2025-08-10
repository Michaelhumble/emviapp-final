import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

interface JobsHeroProps {
  // Optional dynamic counts from parent/hooks
  jobsCount?: number;
  avgRating?: string | number;
  citiesCount?: string | number;
  hiresCount?: string | number;
}

const JobsHero: React.FC<JobsHeroProps> = ({ jobsCount, avgRating, citiesCount, hiresCount }) => {
  const navigate = useNavigate();
  const { t, isVietnamese } = useTranslation();

  // Local search state
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  const [compact, setCompact] = useState(false);

  // i18n copy with keys requested
  const copy = useMemo(() => ({
    overline: {
      english: "Beauty Jobs",
      vietnamese: "Việc làm ngành làm đẹp",
    },
    title: {
      english: "Your Dream Job Awaits",
      vietnamese: "Công việc mơ ước đang chờ bạn",
    },
    subtitle: {
      // Avoid "real" phrasing per brand guidance
      english: "Browse verified salon & studio roles. Verified employers, transparent pay, proven growth.",
      vietnamese: "Tìm việc tại salon & studio đã xác minh. Nhà tuyển dụng uy tín, lương minh bạch, cơ hội phát triển.",
    },
    ctaBrowse: {
      english: "Browse Jobs",
      vietnamese: "Xem việc làm",
    },
    ctaPost: {
      english: "Post a Job",
      vietnamese: "Đăng tin tuyển dụng",
    },
    searchRole: {
      english: "Role or keyword",
      vietnamese: "Vị trí hoặc từ khóa",
    },
    searchLoc: {
      english: "City, State",
      vietnamese: "Thành phố, Tiểu bang",
    },
    searchBtn: {
      english: "Search",
      vietnamese: "Tìm kiếm",
    },
    trustJobs: {
      english: `${jobsCount ?? "12,000+"} jobs posted`,
      vietnamese: `${jobsCount ?? "12,000+"} tin tuyển dụng`,
    },
    trustRating: {
      english: `${avgRating ?? "4.9★"} average rating`,
      vietnamese: `Đánh giá trung bình ${avgRating ?? "4.9★"}`,
    },
    trustCities: {
      english: `${citiesCount ?? "50+"} cities`,
      vietnamese: `${citiesCount ?? "50+"} thành phố`,
    },
    trustHires: {
      english: `${hiresCount ?? "100K+"} hires`,
      vietnamese: `${hiresCount ?? "100K+"} lượt tuyển dụng thành công`,
    },
  }), [avgRating, citiesCount, hiresCount, jobsCount]);

  const onSubmit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (loc.trim()) params.set("loc", loc.trim());
    const qs = params.toString();
    navigate(qs ? `/jobs?${qs}` : "/jobs");
    // Smooth scroll to list anchor after a small delay to allow navigation/state
    setTimeout(() => {
      const el = document.getElementById("browse");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, [loc, navigate, q]);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "EmviApp",
          url: `${window.location.origin}`,
          potentialAction: {
            "@type": "SearchAction",
            target: `${window.location.origin}/jobs?q={search_term_string}&loc={location_string}`,
            "query-input": [
              "required name=search_term_string",
              "optional name=location_string"
            ]
          }
        })}</script>
      </Helmet>

      {/* Background gradient without heavy images */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-secondary/10" aria-hidden="true" />

      <Container className="relative z-10 py-10 sm:py-14 md:py-16">
        <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm shadow-xl shadow-black/5">
          <div className="p-6 md:p-10">
            {/* 2-column responsive layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left: Copy */}
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground tracking-wide uppercase">
                  {t(copy.overline)}
                </p>
                <h1 className="mt-2 font-playfair text-3xl sm:text-4xl md:text-5xl leading-tight">
                  {t(copy.title)}
                </h1>
                <p className="mt-3 text-muted-foreground text-base sm:text-lg max-w-prose">
                  {t(copy.subtitle)}
                </p>

                {/* CTAs */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button
                    className="h-11 px-6 rounded-xl"
                    onClick={() => {
                      const el = document.getElementById("browse");
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    aria-label={t(copy.ctaBrowse)}
                  >
                    {t(copy.ctaBrowse)}
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 px-6 rounded-xl"
                    onClick={() => navigate("/post-job")}
                    aria-label={t(copy.ctaPost)}
                  >
                    {t(copy.ctaPost)}
                  </Button>
                </div>
              </div>

              {/* Right: Search band */}
              <div>
                <form onSubmit={onSubmit} className="rounded-full border border-border bg-background/80 backdrop-blur-sm p-2 shadow-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-2">
                    <div className="flex items-center gap-2 px-3">
                      <label htmlFor="job-q" className="sr-only">
                        {t(copy.searchRole)}
                      </label>
                      <Input
                        id="job-q"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder={t(copy.searchRole)}
                        aria-label={t(copy.searchRole)}
                        className="border-0 h-11 rounded-full bg-transparent"
                      />
                    </div>
                    <div className="flex items-center gap-2 px-3">
                      <label htmlFor="job-loc" className="sr-only">
                        {t(copy.searchLoc)}
                      </label>
                      <Input
                        id="job-loc"
                        value={loc}
                        onChange={(e) => setLoc(e.target.value)}
                        placeholder={t(copy.searchLoc)}
                        aria-label={t(copy.searchLoc)}
                        className="border-0 h-11 rounded-full bg-transparent"
                      />
                    </div>
                    <div className="flex items-center justify-end">
                      <Button type="submit" className="h-11 rounded-full px-6" aria-label={t(copy.searchBtn)}>
                        {t(copy.searchBtn)}
                      </Button>
                    </div>
                  </div>
                </form>

                {/* Trust chips */}
                <div className="mt-4 flex flex-wrap gap-2 text-xs sm:text-sm text-muted-foreground">
                  <span className="rounded-full border border-border bg-card px-3 py-1">{t(copy.trustJobs)}</span>
                  <span className="rounded-full border border-border bg-card px-3 py-1">{t(copy.trustRating)}</span>
                  <span className="rounded-full border border-border bg-card px-3 py-1">{t(copy.trustCities)}</span>
                  <span className="rounded-full border border-border bg-card px-3 py-1">{t(copy.trustHires)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle outer glow */}
          <div className="pointer-events-none select-none h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
      </Container>

      {/* Sticky mini search on scroll */}
      <div className={cn(
        "sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur supports-backdrop:backdrop-blur-md transition-all",
        compact ? "py-2" : "py-3"
      )}>
        <Container>
          <form onSubmit={onSubmit} aria-label="mini-search" className="grid grid-cols-[1fr_1fr_auto] gap-2">
            <Input
              id="job-q-mini"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t(copy.searchRole)}
              aria-label={t(copy.searchRole)}
              className="h-10 rounded-full"
            />
            <Input
              id="job-loc-mini"
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
              placeholder={t(copy.searchLoc)}
              aria-label={t(copy.searchLoc)}
              className="h-10 rounded-full"
            />
            <Button type="submit" className="h-10 rounded-full px-5">
              {t(copy.searchBtn)}
            </Button>
          </form>
        </Container>
      </div>
    </section>
  );
};

export default JobsHero;
