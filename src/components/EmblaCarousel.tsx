"use client";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

type PropType = {
  slides: React.ReactNode[];
  options?: EmblaOptionsType;
};

const useDotButton = (emblaApi: EmblaCarouselType | undefined) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return { selectedIndex, scrollSnaps, onDotButtonClick };
};

const useAutoplay = (emblaApi: EmblaCarouselType | undefined) => {
  const [autoplayIsPlaying, setAutoplayIsPlaying] = useState(false);

  const onAutoplayButtonClick = useCallback(
    (callback: () => void) => {
      const autoplay = emblaApi?.plugins()?.autoplay;
      if (!autoplay) return;
      const resetOrStop =
        autoplay.options.stopOnInteraction === false
          ? autoplay.reset
          : autoplay.stop;
      resetOrStop();
      callback();
    },
    [emblaApi]
  );

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play;
    playOrStop();
  }, [emblaApi]);

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    setAutoplayIsPlaying(autoplay.isPlaying());
    emblaApi
      .on("autoplay:play", () => setAutoplayIsPlaying(true))
      .on("autoplay:stop", () => setAutoplayIsPlaying(false))
      .on("reInit", () => setAutoplayIsPlaying(autoplay.isPlaying()));
  }, [emblaApi]);

  return { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick };
};

const useAutoplayProgress = (
  emblaApi: EmblaCarouselType | undefined,
  progressNode: React.RefObject<HTMLDivElement | null>
) => {
  const [showAutoplayProgress, setShowAutoplayProgress] = useState(false);
  const animationName = useRef("");
  const timeoutId = useRef(0);
  const rafId = useRef(0);

  const startProgress = useCallback(
    (timeUntilNext: number | null) => {
      const node = progressNode.current;
      if (!node || timeUntilNext === null) return;

      if (!animationName.current) {
        const style = window.getComputedStyle(node);
        animationName.current = style.animationName;
      }

      node.style.animationName = "none";
      node.style.transform = "translate3d(0,0,0)";

      rafId.current = window.requestAnimationFrame(() => {
        timeoutId.current = window.setTimeout(() => {
          node.style.animationName = animationName.current;
          node.style.animationDuration = `${timeUntilNext}ms`;
        }, 0);
      });

      setShowAutoplayProgress(true);
    },
    [progressNode]
  );

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    emblaApi
      .on("autoplay:timerset", () => startProgress(autoplay.timeUntilNext()))
      .on("autoplay:timerstopped", () => setShowAutoplayProgress(false));
  }, [emblaApi, startProgress]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafId.current);
      clearTimeout(timeoutId.current);
    };
  }, []);

  return { showAutoplayProgress };
};

const Carousel: React.FC<PropType> = ({ slides, options }) => {
  const progressNode = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000 }),
  ]);

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);

  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className="relative w-full mx-auto">
      {/* Viewport */}
      <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
        <div className="flex">
          {slides.map((slideContent, index) => (
            <div
              key={index}
              className="relative flex-[0_0_100%] min-w-0"
            >
              {slideContent}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() =>
                onAutoplayButtonClick(() => onDotButtonClick(index))
              }
              className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${
                index === selectedIndex
                  ? "bg-primary border-primary scale-125"
                  : "bg-transparent border-muted-foreground/40 hover:border-primary/60"
              }`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="relative w-24 h-1 rounded-full bg-muted overflow-hidden">
          <div
            ref={progressNode}
            className={`absolute inset-y-0 left-0 bg-primary rounded-full ${
              showAutoplayProgress ? "animate-[progress_3s_linear]" : ""
            }`}
            style={{
              animationName: showAutoplayProgress ? "progress" : "none",
              animationFillMode: "forwards",
            }}
          />
        </div>

        {/* Play/Pause */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleAutoplay}
          className="h-8 w-8 rounded-full"
        >
          {autoplayIsPlaying ? (
            <Pause className="h-3.5 w-3.5" />
          ) : (
            <Play className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
    </div>
  );
};

export { Carousel };
