import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Report {
  id: string;
  quarter: string;
  period: string;
  imageSrc: string;
  isNew?: boolean;
}

interface ShareholderReportsProps {
  reports: Report[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const ShareholderReports = React.forwardRef<
  HTMLDivElement,
  ShareholderReportsProps>(
  ({ reports, title = "Shareholders' Letter and Results", subtitle = "Powering India's changing lifestyles", className, ...props }, ref) => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(true);
    const animationRef = React.useRef<number>();
    const scrollSpeed = 0.5; // pixels per frame

    // Auto-scroll animation
    React.useEffect(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      let paused = false;
      let pauseTimeout: ReturnType<typeof setTimeout>;

      const step = () => {
        if (!paused && container) {
          container.scrollLeft += scrollSpeed;
          // Seamless loop: when past the first set, jump back
          const singleSetWidth = container.scrollWidth / 3;
          if (container.scrollLeft >= singleSetWidth * 2) {
            container.scrollLeft -= singleSetWidth;
          }
        }
        animationRef.current = requestAnimationFrame(step);
      };

      const handleEnter = () => {
        paused = true;
        clearTimeout(pauseTimeout);
      };
      const handleLeave = () => {
        pauseTimeout = setTimeout(() => { paused = false; }, 500);
      };

      container.addEventListener("mouseenter", handleEnter);
      container.addEventListener("mouseleave", handleLeave);
      animationRef.current = requestAnimationFrame(step);

      return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        clearTimeout(pauseTimeout);
        container.removeEventListener("mouseenter", handleEnter);
        container.removeEventListener("mouseleave", handleLeave);
      };
    }, [reports]);

    const checkScrollability = React.useCallback(() => {
      const container = scrollContainerRef.current;
      if (container) {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      }
    }, []);

    React.useEffect(() => {
      const container = scrollContainerRef.current;
      if (container) {
        checkScrollability();
        container.addEventListener("scroll", checkScrollability);
      }
      return () => {
        if (container) {
          container.removeEventListener("scroll", checkScrollability);
        }
      };
    }, [reports, checkScrollability]);

    const scroll = (direction: "left" | "right") => {
      const container = scrollContainerRef.current;
      if (container) {
        const scrollAmount = container.clientWidth * 0.8;
        container.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth"
        });
      }
    };

    return (
      <div ref={ref} className={cn("w-full py-6", className)} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        


























      </div>

      <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto scroll-smooth px-4 sm:px-6 lg:px-8 pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>

         {[...reports, ...reports, ...reports].map((report, i) =>
           <div
             key={`${report.id}-${i}`}
             className="flex-shrink-0 w-[220px] sm:w-[300px] md:w-[340px]">

             <div className="group cursor-pointer">
               <div className="relative overflow-hidden rounded-2xl">
                 <img
                   src={report.imageSrc}
                   alt={report.quarter}
                   className="w-full h-[280px] sm:h-[360px] md:h-[420px] object-cover transition-transform duration-500 group-hover:scale-105" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                












              </div>
              









            </div>
          </div>
          )}
      </div>
    </div>);

  });

ShareholderReports.displayName = "ShareholderReports";