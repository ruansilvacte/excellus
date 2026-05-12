import { Home, Sparkles, HardHat, Truck, LucideIcon } from "lucide-react";

export interface ServiceData {
  slug: string;
  icon: LucideIcon;
  title: string;
  duration: string;
  description: string;
  image: string;
  includes: string[];
  fullContent: {
    intro: string;
    sections: { heading: string; body: string }[];
    notIncluded?: string[];
    extras?: string[];
  };
}

export const services: ServiceData[] = [
  {
    slug: "regular-cleaning",
    icon: Home,
    title: "Regular Cleaning",
    duration: "~2 hours",
    description:
      "Consistent maintenance cleaning to keep your home fresh and tidy week after week. Perfect for busy families and working professionals.",
    image: "/images/clean-floor.png",
    includes: [
      "Dusting all surfaces & furniture",
      "Vacuuming & mopping floors",
      "Kitchen counters & sink sanitization",
      "Bathroom cleaning & disinfection",
      "Trash removal & bed making",
    ],
    fullContent: {
      intro:
        "Regular Cleaning is designed for homes that need consistent upkeep. Whether you book weekly, bi-weekly, or monthly, our team arrives punctually, ready to deliver the same high standard every visit. It's the perfect solution for busy families, working professionals, and anyone who values a clean, welcoming home without lifting a finger.",
      sections: [
        {
          heading: "What we clean",
          body:
            "Our team focuses on the most-used areas of your home: living rooms, bedrooms, kitchens, and bathrooms. We dust all reachable surfaces and furniture, vacuum every carpeted area and mop hard floors to a spotless finish. Countertops and sinks in the kitchen are sanitized, and bathrooms receive a full cleaning and disinfection treatment. We also empty trash bins and make beds — everything you need to feel at home.",
        },
        {
          heading: "Who is it for?",
          body:
            "Regular Cleaning is ideal for families with young children, professionals with demanding schedules, couples managing busy lives, and anyone who wants to maintain a clean space without the hassle. It's also a great follow-up service after a deep clean to keep your home in peak condition.",
        },
        {
          heading: "Duration & scheduling",
          body:
            "A standard regular cleaning session takes approximately 2 hours, depending on the size of your home. We offer flexible scheduling — weekly, bi-weekly, or monthly — so you can choose the frequency that works best for your lifestyle. No contracts, no lock-ins.",
        },
      ],
      notIncluded: [
        "Inside oven & fridge (available as an extra)",
        "Window cleaning",
        "Laundry",
        "Sink full of accumulated dishes",
        "Curtains",
        "Carpet cleaning",
      ],
      extras: [
        "Inside oven cleaning",
        "Inside fridge cleaning",
        "Interior cabinet cleaning",
      ],
    },
  },
  {
    slug: "deep-cleaning",
    icon: Sparkles,
    title: "Deep Cleaning",
    duration: "6–7 hours",
    description:
      "A thorough, top-to-bottom clean that reaches every corner. Ideal for seasonal refreshes or when your home needs extra attention.",
    image: "/images/clean-table.png",
    includes: [
      "Baseboards, vents & light fixtures",
      "Detailed scrubbing of tile & grout",
      "Appliance exterior deep clean",
      "Behind & under furniture",
      "Door frames & switches sanitization",
    ],
    fullContent: {
      intro:
        "Deep Cleaning is our most comprehensive residential service. It's a full top-to-bottom treatment that goes far beyond routine maintenance — reaching every corner, crevice, and surface that everyday cleaning overlooks. If your home hasn't had a thorough clean in a while, or if you're preparing for a special occasion, Deep Cleaning is the right choice.",
      sections: [
        {
          heading: "A clean that goes further",
          body:
            "Our team meticulously scrubs tile and grout, cleans baseboards and vents, wipes down light fixtures, and sanitizes door frames and switch plates. We move furniture to clean underneath and behind it, and we pay close attention to the kitchen — cleaning appliance exteriors, stovetops, and surfaces that accumulate grease and grime over time.",
        },
        {
          heading: "When should you book a deep clean?",
          body:
            "Deep Cleaning is recommended at least twice a year, especially at the start of spring and fall. It's also the ideal first service for new clients before transitioning to a regular cleaning schedule, or whenever your home needs a serious reset after a period of heavy use.",
        },
        {
          heading: "Duration & preparation",
          body:
            "A Deep Cleaning session typically takes 6 to 7 hours, depending on the size and condition of your home. We recommend clearing countertops and decluttering surfaces beforehand so our team can work efficiently and focus entirely on the cleaning itself.",
        },
      ],
      notIncluded: [
        "Inside oven & fridge (available as an extra)",
        "Interior of cabinets",
        "Laundry",
        "Sink full of accumulated dishes",
        "Curtains",
        "Carpet cleaning",
        "Window cleaning",
      ],
      extras: [
        "Inside oven cleaning",
        "Inside fridge cleaning",
        "Interior cabinet cleaning",
      ],
    },
  },
  {
    slug: "post-construction",
    icon: HardHat,
    title: "Post-Construction Cleaning",
    duration: "Varies",
    description:
      "Complete dust and debris removal after renovation or construction. We make your newly built or remodeled space move-in ready.",
    image: "/images/clean-bedroom.png",
    includes: [
      "Dust & debris removal from all surfaces",
      "Window & glass cleaning",
      "Floor scrubbing & polishing",
      "Paint splatter & adhesive removal",
      "Final detail inspection",
    ],
    fullContent: {
      intro:
        "After construction or renovation, the real work begins. Dust settles on every surface, debris accumulates in corners, and residues from paint, adhesives, and materials are left behind. Our Post-Construction Cleaning service is specifically designed to tackle all of this — transforming a work site into a clean, comfortable, move-in ready space.",
      sections: [
        {
          heading: "Specialized cleaning for construction sites",
          body:
            "Our trained team handles the unique challenges of post-construction environments: fine dust that infiltrates every surface, adhesive residue on floors and glass, paint splatters, and leftover debris. We scrub and polish all floor types, clean windows and glass surfaces, wipe down walls and fixtures, and conduct a thorough final inspection to ensure nothing is missed.",
        },
        {
          heading: "Ideal for renovations of all sizes",
          body:
            "Whether you've completed a single-room renovation, a full home remodel, or a new construction project, our service adapts to the scope of work. We work with homeowners, property managers, contractors, and real estate professionals to ensure the space is pristine and ready for occupancy.",
        },
        {
          heading: "Timeline & scheduling",
          body:
            "The duration of Post-Construction Cleaning varies depending on the size of the space and the extent of the construction work. We recommend scheduling a site assessment so we can provide an accurate time estimate and quote. Contact us to arrange a visit.",
        },
      ],
      notIncluded: ["Carpet cleaning", "Curtain cleaning"],
      extras: [
        "Carpet cleaning",
        "Deep interior cabinet cleaning",
        "Exterior pressure washing",
      ],
    },
  },
  {
    slug: "move-in-move-out",
    icon: Truck,
    title: "Move In / Move Out Cleaning",
    duration: "Varies",
    description:
      "Whether you're arriving or leaving, we ensure the space is spotless. Help secure your deposit or start fresh in your new home.",
    image: "/images/clean-bathroom.png",
    includes: [
      "Complete interior deep clean",
      "Inside all cabinets & closets",
      "Appliance exterior cleaning (inside oven & fridge available at extra charge)",
      "Bathroom sanitization & descaling",
      "Final walkthrough & touch-ups",
    ],
    fullContent: {
      intro:
        "Moving is stressful enough — let us handle the cleaning. Our Move In / Move Out service ensures that every space is spotless, whether you're preparing a home for a new tenant, securing your rental deposit, or starting fresh in your new home. We cover every room, every cabinet, and every surface so nothing is left behind.",
      sections: [
        {
          heading: "The complete move-out solution",
          body:
            "When you leave a property, first impressions matter to landlords and the next occupants. Our team performs a thorough deep clean of the entire home — scrubbing bathrooms to remove scale and stains, cleaning all appliance exteriors, wiping inside every cabinet and closet, and mopping and vacuuming all floors. We finish with a detailed walkthrough to catch any missed spots.",
        },
        {
          heading: "Starting fresh in your new home",
          body:
            "Moving into a new home? Don't assume it's been cleaned to your standards. Our Move-In service ensures you arrive to a truly fresh, sanitized space — from kitchen surfaces to bathroom tiles. We sanitize all high-touch areas and make sure every corner meets our quality standard before you unpack.",
        },
        {
          heading: "Duration & availability",
          body:
            "Duration varies based on the size of the property and its current condition. We work around your moving timeline and offer flexible scheduling, including on short notice when availability allows. Contact us to get a quote and confirm your preferred date.",
        },
      ],
      notIncluded: ["Carpet cleaning", "Curtain cleaning"],
      extras: [
        "Inside oven cleaning",
        "Inside fridge cleaning",
        "Carpet cleaning",
      ],
    },
  },
];
