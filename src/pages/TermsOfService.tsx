import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    number: "1",
    title: "Services",
    content:
      "Navy Cleaning Solutions provides professional cleaning services as described on our Site. Specific terms for individual services may be provided at the time of booking.",
  },
  {
    number: "2",
    title: "User Responsibilities",
    content: null,
    list: [
      "Provide accurate and up-to-date information when booking services or filling out forms.",
      "Ensure safe access to your property for our cleaning professionals.",
      "Notify us of any specific cleaning requirements, hazards, or restrictions in advance.",
    ],
    preList: "By using our Site or services, you agree to:",
  },
  {
    number: "3",
    title: "Bookings and Payments",
    content:
      "All service bookings must be made through the Site or by contacting us directly. Payment terms, including deposits or cancellations, will be specified during the booking process. Failure to pay for services may result in cancellation or additional fees.",
  },
  {
    number: "4",
    title: "Cancellations and Rescheduling",
    content:
      "You may cancel or reschedule services by contacting us at least 24 hours in advance. Late cancellations may incur a fee as outlined in our cancellation policy.",
  },
  {
    number: "5",
    title: "Limitation of Liability",
    content: null,
    list: [
      "Any damage resulting from the improper use of cleaning supplies or equipment.",
      "Loss or damage to personal belongings not disclosed to our team.",
    ],
    preList:
      "While we strive to provide high-quality cleaning services, we are not liable for:",
  },
  {
    number: "6",
    title: "Privacy",
    content:
      "Your use of the Site and our services is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information.",
  },
  {
    number: "7",
    title: "Prohibited Activities",
    content: null,
    list: [
      "Use the Site for unlawful purposes.",
      "Attempt to interfere with the operation of the Site or our services.",
      "Impersonate another person or provide false information.",
    ],
    preList: "You may not:",
  },
  {
    number: "8",
    title: "Intellectual Property",
    content:
      "All content on our Site, including text, images, logos, and designs, is the property of Navy Cleaning Solutions or licensed to us. Unauthorized use is strictly prohibited.",
  },
  {
    number: "9",
    title: "Changes to Terms",
    content:
      "We reserve the right to update these Terms at any time. Changes will be effective immediately upon posting on our Site. Your continued use of the Site or services constitutes acceptance of the revised Terms.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07 },
  }),
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <div className="bg-primary text-primary-foreground py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Terms of Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-primary-foreground/70 text-sm"
          >
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-14">
        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-muted-foreground leading-relaxed mb-12 text-base"
        >
          Welcome to <span className="font-semibold text-foreground">Navy Cleaning Solutions!</span> These Terms of Service ("Terms") govern your access to and use of our website and any services provided by Navy Cleaning Solutions ("we," "our," or "us"). By accessing or using our Site and services, you agree to these Terms. If you do not agree, please do not use our Site or services.
        </motion.p>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section, i) => (
            <motion.div
              key={section.number}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="border-l-4 border-primary pl-6"
            >
              <h2
                className="text-xl font-bold mb-3 text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {section.number}. {section.title}
              </h2>
              {section.preList && (
                <p className="text-muted-foreground mb-2 leading-relaxed">
                  {section.preList}
                </p>
              )}
              {section.list ? (
                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-base">
                  {section.list.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 pt-8 border-t border-border text-center text-sm text-muted-foreground"
        >
          Questions? Contact us at{" "}
          <a
            href="tel:+14696792875"
            className="text-primary hover:underline"
          >
            (469) 679-2875
          </a>{" "}
          or{" "}
          <a
            href="mailto:allshineup@gmail.com"
            className="text-primary hover:underline"
          >
            allshineup@gmail.com
          </a>
        </motion.div>
      </div>
    </div>
  );
}
