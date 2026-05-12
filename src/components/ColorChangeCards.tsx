import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const cards = [
  {
    heading: "Kitchen",
    description: "Deep cleaning for countertops, appliances, and every surface — leaving your kitchen spotless.",
    imgSrc: "/images/color-card-1.jpg",
  },
  {
    heading: "Windows",
    description: "Crystal-clear windows inside and out, bringing natural light back into your space.",
    imgSrc: "/images/color-card-2.jpg",
  },
  {
    heading: "Bathroom",
    description: "Sanitized, fresh, and sparkling — from tiles to fixtures, every detail matters.",
    imgSrc: "/images/color-card-3.jpg",
  },
  {
    heading: "Living Room",
    description: "Vacuuming, dusting, and organizing — creating a comfortable and inviting atmosphere.",
    imgSrc: "/images/color-card-4.jpg",
  },
];

const ColorChangeCards = () => {
  return (
    <div className="p-4 py-12 md:p-8">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
        {cards.map((card) => (
          <Card key={card.heading} {...card} />
        ))}
      </div>
    </div>
  );
};

interface CardProps {
  heading: string;
  description: string;
  imgSrc: string;
}

const Card = ({ heading, description, imgSrc }: CardProps) => {
  return (
    <motion.div
      transition={{ staggerChildren: 0.035 }}
      whileHover="hover"
      className="group relative h-64 w-full cursor-pointer overflow-hidden bg-muted"
    >
      <div
        className="absolute inset-0 saturate-100 transition-all duration-500 group-hover:scale-110"
        style={{
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-500 group-hover:bg-black/50" />
      <div className="relative z-20 flex h-full flex-col justify-between p-4 text-white transition-colors duration-500">
        <ArrowRight className="ml-auto text-3xl transition-transform duration-500 group-hover:-rotate-45" size={28} />
        <div>
          <h4>
            {heading.split("").map((letter, index) => (
              <AnimatedLetter letter={letter} key={index} />
            ))}
          </h4>
          <p>{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

interface AnimatedLetterProps {
  letter: string;
}

const letterVariants: Variants = {
  hover: {
    y: "-50%",
  },
};

const AnimatedLetter = ({ letter }: AnimatedLetterProps) => {
  return (
    <div className="inline-block h-[36px] overflow-hidden font-semibold text-3xl">
      <motion.span
        className="flex min-w-[4px] flex-col"
        style={{ y: "0%" }}
        variants={letterVariants}
        transition={{ duration: 0.5 }}
      >
        <span>{letter}</span>
        <span>{letter}</span>
      </motion.span>
    </div>
  );
};

export default ColorChangeCards;
