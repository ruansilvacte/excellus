import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedMarqueeHeroProps {
  images: string[];
  className?: string;
}

export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
  images,
  className,
}) => {
  const duplicatedImages = [...images, ...images];

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <motion.div
          className="flex gap-4 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            },
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className="relative h-[200px] md:h-[300px] w-[280px] md:w-[400px] flex-shrink-0 overflow-hidden rounded-2xl"
            >
              <img
                src={src}
                alt={`Showcase ${(index % images.length) + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
