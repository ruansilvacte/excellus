import { motion } from "framer-motion";
import { useHomeContent } from "@/hooks/useHomeContent";

const defaultVideos = [
  "/videos/video-1.mp4",
  "/videos/video-2.mp4",
  "/videos/video-3.mp4",
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.9, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1, scale: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function VideoShowcase() {
  const { data: content } = useHomeContent();
  const videos = [
    content?.home_video_1 || defaultVideos[0],
    content?.home_video_2 || defaultVideos[1],
    content?.home_video_3 || defaultVideos[2],
  ];

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {videos.map((src, i) => (
          <motion.div key={i} className="rounded-2xl overflow-hidden shadow-lg" variants={item}>
            <video
              src={src}
              className="w-full h-[280px] md:h-[480px] object-cover"
              autoPlay loop muted playsInline controls
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
