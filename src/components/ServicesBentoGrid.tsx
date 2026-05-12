import { motion } from "framer-motion";
import { useHomeContent } from "@/hooks/useHomeContent";

const defaultImages = [
  "/images/clean-floor.png",
  "/images/clean-table.png",
  "/images/clean-bedroom.png",
  "/images/clean-bathroom.png",
  "/images/cleaning-window-new.png",
];

const defaultMobileExtra = "/images/clean-laundry.png";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function ServicesBentoGrid() {
  const { data: content } = useHomeContent();

  const images = defaultImages.map((def, i) =>
    content?.[`home_bento_image_${i + 1}`] || def
  );
  const mobileExtraImage = content?.home_bento_image_6 || defaultMobileExtra;

  return (
    <section className="w-full py-10 px-3 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-3 lg:gap-4"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {images.map((src, i) => (
          <motion.div key={i} variants={item} className="rounded-2xl overflow-hidden aspect-square">
            <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
          </motion.div>
        ))}
        <motion.div variants={item} className="rounded-2xl overflow-hidden aspect-square md:hidden">
          <img src={mobileExtraImage} alt="" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
        </motion.div>
      </motion.div>
    </section>
  );
}
