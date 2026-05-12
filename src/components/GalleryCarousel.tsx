import { motion } from "framer-motion";
import { useHomeContent } from "@/hooks/useHomeContent";

const defaultImages = [
  "/images/gallery-1.png",
  "/images/gallery-2.png",
  "/images/gallery-3.png",
  "/images/gallery-4.png",
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const imageItem = {
  hidden: { opacity: 0, scale: 0.88, y: 40, filter: "blur(8px)" },
  visible: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function GalleryCarousel() {
  const { data: content } = useHomeContent();
  const images = [
    content?.home_gallery_image_1 || defaultImages[0],
    content?.home_gallery_image_2 || defaultImages[1],
    content?.home_gallery_image_3 || defaultImages[2],
    content?.home_gallery_image_4 || defaultImages[3],
  ];

  return (
    <section className="w-full py-12 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 px-3 md:px-4"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {images.map((src, i) => (
          <motion.div key={i} className="rounded-2xl overflow-hidden" variants={imageItem}>
            <img
              src={src}
              alt={`Galeria ${i + 1}`}
              className="w-full h-[180px] md:h-[340px] object-cover"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
