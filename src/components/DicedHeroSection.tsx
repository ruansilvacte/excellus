import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SlideContent {
  title: string;
  image: string;
}

interface DicedHeroSectionProps {
  topText: string;
  mainText: string;
  subMainText: string;
  buttonText: string;
  slides: SlideContent[];
  onMainButtonClick?: () => void;
  onGridImageHover?: (index: number) => void;
  onGridImageClick?: (index: number) => void;
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const imageContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
};

const imageItem = {
  hidden: { opacity: 0, scale: 0.85, y: 40, filter: "blur(8px)" },
  visible: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export const DicedHeroSection: React.FC<DicedHeroSectionProps> = ({
  topText, mainText, subMainText, buttonText, slides,
  onMainButtonClick, onGridImageHover, onGridImageClick,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      if (containerRef.current) setIsMobile(containerRef.current.offsetWidth < 1000);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-[1536px] mx-auto">
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-start gap-8 lg:gap-12`}>
        {/* Text Content */}
        <motion.div
          className={`flex-1 flex flex-col justify-start ${isMobile ? 'items-center text-center' : 'items-start text-left'} pt-2`}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div className="flex items-center gap-2 mb-6" variants={fadeUp}>
            <span className="text-accent text-xl">✦</span>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">{topText}</span>
          </motion.div>

          <motion.h2
            className="text-2xl md:text-5xl lg:text-[3.5rem] font-bold leading-tight mb-5 md:mb-6"
            style={{ fontFamily: 'var(--font-heading)', color: 'hsl(30 15% 30%)' }}
            variants={fadeUp}
          >
            {mainText.split(' ').map((word, i, arr) => (
              i >= arr.length - 2 ? (
                <span key={i} className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, hsl(43 74% 50%), hsl(43 60% 60%), hsl(210 80% 55%))' }}>
                  {word}{i < arr.length - 1 ? ' ' : ''}
                </span>
              ) : <span key={i}>{word} </span>
            ))}
          </motion.h2>

          <motion.div
            className={`h-1 w-24 rounded-full mb-8 ${isMobile ? 'mx-auto' : ''}`}
            style={{ background: 'linear-gradient(90deg, hsl(43 74% 50%), hsl(43 60% 60%))' }}
            variants={fadeUp}
          />

          <motion.p className="text-sm md:text-lg max-w-lg mb-8 md:mb-10 leading-relaxed" style={{ color: 'hsl(215 20% 35%)' }} variants={fadeUp}>
            {subMainText}
          </motion.p>

          <motion.button
            onClick={onMainButtonClick}
            className="group relative px-10 py-4 rounded-2xl font-semibold text-base overflow-hidden transition-all duration-300 shadow-[0_8px_30px_-6px_hsla(210,85%,30%,0.45)] hover:shadow-[0_12px_40px_-4px_hsla(210,85%,30%,0.55)]"
            style={{ background: 'linear-gradient(135deg, hsl(30 15% 30%), hsl(210 85% 38%), hsl(43 60% 60%))', color: 'white', fontFamily: 'var(--font-body)' }}
            variants={fadeUp}
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10 flex items-center gap-3">
              {buttonText}
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, hsl(215 80% 22%), hsl(210 85% 32%), hsl(195 90% 40%))' }} />
          </motion.button>
        </motion.div>

        {/* Image Grid */}
        <motion.div
          className={`flex-1 ${isMobile ? 'w-full' : 'w-1/2'}`}
          variants={imageContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="grid grid-cols-2 gap-3 md:gap-5 w-full aspect-square">
            {[slides[3], slides[2], slides[1], slides[0]].map((slide, index) => (
              <motion.div
                key={index}
                className="relative w-full overflow-hidden rounded-3xl cursor-pointer group"
                style={{ paddingBottom: '100%' }}
                variants={imageItem}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => { setHoveredIndex(index); onGridImageHover?.(index); }}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onGridImageClick?.(index)}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`warped-image ${['bottom-right', 'bottom-left', 'top-right', 'top-left'][index]} absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110`}
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}
                  style={{ background: 'linear-gradient(to top, hsla(210, 85%, 20%, 0.7) 0%, transparent 60%)' }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 right-4"
                  initial={false}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0, y: hoveredIndex === index ? 0 : 10 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="text-white font-bold text-sm md:text-base drop-shadow-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                    {slide.title}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
