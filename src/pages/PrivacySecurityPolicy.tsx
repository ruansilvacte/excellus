import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const sections = [
  {
    title: "1. Information We Collect",
    content: "We may collect the following types of information:",
    list: [
      "Personal Information: Name, email address, phone number, physical address, and any other details provided when filling out forms or booking services.",
      "Non-Personal Information: Browser type, IP address, operating system, and data collected through cookies or analytics tools.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: "We use your information to:",
    list: [
      "Provide and manage our cleaning services.",
      "Respond to inquiries and customer service requests.",
      "Send updates, promotional offers, and other communications (with your consent).",
      "Improve our website and services through analytics.",
      "Ensure compliance with legal and regulatory requirements.",
    ],
  },
  {
    title: "3. How We Protect Your Information",
    content:
      "We implement industry-standard security measures to safeguard your personal information, including secure servers, encryption, and access controls. However, no method of online transmission or storage is completely secure, and we cannot guarantee absolute security.",
  },
  {
    title: "4. Sharing Your Information",
    content: "We do not sell or rent your personal information to third parties. We may share your information with:",
    list: [
      "Service providers who assist in delivering our services (e.g., payment processors).",
      "Authorities when required by law or to protect our rights.",
    ],
  },
  {
    title: "5. Cookies and Tracking Technologies",
    content:
      "Our Site uses cookies to enhance your experience and analyze site usage. You can manage or disable cookies through your browser settings, but some features of the Site may not function properly without them.",
  },
  {
    title: "6. Your Rights",
    content: "You have the right to:",
    list: [
      "Access the personal information we hold about you.",
      "Request corrections to any inaccurate or incomplete information.",
      "Request the deletion of your personal information (subject to legal requirements).",
    ],
    afterList: "To exercise these rights, please contact us at allshineup@gmail.com.",
  },
  {
    title: "7. Third-Party Links",
    content:
      "Our Site may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any personal information.",
  },
  {
    title: "8. Changes to This Policy",
    content:
      "We may update this Privacy and Security Policy from time to time. Any changes will be posted on this page, and your continued use of the Site signifies your acceptance of the updated policy.",
  },
  {
    title: "9. Contact Us",
    content:
      "If you have any questions about this Privacy and Security Policy, please contact us at:\n\nPhone: (469) 679-2875",
  },
];

export default function PrivacySecurityPolicy() {
  return (
    <>
      <SeoHead
        slug="privacy-security"
        fallbackTitle="Privacy & Security Policy | Navy Cleaning Solutions"
        fallbackDescription="Privacy and Security Policy for Navy Cleaning Solutions."
      />
      <Header />

      <main className="min-h-screen bg-background">
        <section className="bg-primary text-primary-foreground py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Privacy and Security Policy
            </motion.h1>
            <motion.p
              className="text-primary-foreground/70 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Your privacy and security are our priority.
            </motion.p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-16 space-y-6">
          <motion.div
            className="bg-card border border-border rounded-2xl p-8 md:p-10 space-y-4 text-muted-foreground leading-relaxed"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p>
              At Navy Cleaning Solutions, we are committed to protecting your privacy
              and ensuring the security of your personal information. This Privacy
              and Security Policy explains how we collect, use, store, and protect
              your information when you visit our website or use our services.
            </p>
          </motion.div>

          {sections.map((s, i) => (
            <motion.div
              key={i}
              className="bg-card border border-border rounded-2xl p-8 md:p-10 space-y-3"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2
                className="text-xl font-semibold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {s.title}
              </h2>
              {s.content && (
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {s.content}
                </p>
              )}
              {s.list && (
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {s.list.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )}
              {(s as any).afterList && (
                <p className="text-muted-foreground leading-relaxed">
                  {(s as any).afterList}
                </p>
              )}
            </motion.div>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}
