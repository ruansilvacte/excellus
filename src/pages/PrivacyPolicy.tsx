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
    title: "Consent",
    content: "By using our website, you hereby consent to our Privacy Policy and agree to its terms.",
  },
  {
    title: "Information We Collect",
    content: `The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.

If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.

When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.`,
  },
  {
    title: "How We Use Your Information",
    list: [
      "Provide, operate, and maintain our website",
      "Improve, personalize, and expand our website",
      "Understand and analyze how you use our website",
      "Develop new products, services, features, and functionality",
      "Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes",
      "Send you emails",
      "Find and prevent fraud",
    ],
  },
  {
    title: "Log Files",
    content:
      "Navy Cleaning Solutions follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.",
  },
  {
    title: "Cookies and Web Beacons",
    content:
      "Like any other website, Navy Cleaning Solutions uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.",
  },
  {
    title: "Google DoubleClick DART Cookie",
    content:
      "Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – https://policies.google.com/technologies/ads",
  },
  {
    title: "Our Advertising Partners",
    content:
      "Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below.\n\nGoogle: https://policies.google.com/technologies/ads",
  },
  {
    title: "Advertising Partners Privacy Policies",
    content:
      "You may consult this list to find the Privacy Policy for each of the advertising partners of Navy Cleaning Solutions.\n\nThird-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Navy Cleaning Solutions, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.\n\nNote that Navy Cleaning Solutions has no access to or control over these cookies that are used by third-party advertisers.",
  },
  {
    title: "Third Party Privacy Policies",
    content:
      "Navy Cleaning Solutions's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.\n\nYou can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.",
  },
  {
    title: "CCPA Privacy Rights (Do Not Sell My Personal Information)",
    content:
      "Under the CCPA, among other rights, California consumers have the right to:",
    list: [
      "Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.",
      "Request that a business delete any personal data about the consumer that a business has collected.",
      "Request that a business that sells a consumer's personal data, not sell the consumer's personal data.",
    ],
    afterList:
      "If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.",
  },
  {
    title: "GDPR Data Protection Rights",
    content:
      "We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:",
    list: [
      "The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.",
      "The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.",
      "The right to erasure – You have the right to request that we erase your personal data, under certain conditions.",
      "The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.",
      "The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.",
      "The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.",
    ],
    afterList:
      "If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.",
  },
  {
    title: "Children's Information",
    content:
      "Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.\n\nNavy Cleaning Solutions does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.",
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <SeoHead
        slug="privacy-policy"
        fallbackTitle="Privacy Policy | Navy Cleaning Solutions"
        fallbackDescription="Privacy Policy for Navy Cleaning Solutions."
      />
      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              className="text-primary-foreground/70 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Your privacy is important to us.
            </motion.p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-6 py-16 space-y-6">
          <motion.div
            className="bg-card border border-border rounded-2xl p-8 md:p-10 space-y-4 text-muted-foreground leading-relaxed"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p>
              At Navy Cleaning Solutions, one of our main priorities is the privacy of our visitors. This
              Privacy Policy document contains types of information that is
              collected and recorded by Navy Cleaning Solutions and how we
              use it.
            </p>
            <p>
              If you have additional questions or require more information about
              our Privacy Policy, do not hesitate to contact us.
            </p>
            <p>
              This Privacy Policy applies only to our online activities and is
              valid for visitors to our website with regards to the information
              that they shared and/or collect in Navy Cleaning Solutions.
              This policy is not applicable to any information collected offline
              or via channels other than this website.
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
