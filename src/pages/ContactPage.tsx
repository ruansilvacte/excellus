import ExcellusHeader from "@/components/excellus/ExcellusHeader";
import ExcellusFooter from "@/components/excellus/ExcellusFooter";
import ContactHero from "@/components/excellus/contact/ContactHero";
import ContactMain from "@/components/excellus/contact/ContactMain";
import ContactInfo from "@/components/excellus/contact/ContactInfo";
import ContactSocialProof from "@/components/excellus/contact/ContactSocialProof";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ExcellusHeader />
      <main>
        <ContactHero />
        <ContactMain />
        <ContactInfo />
        <ContactSocialProof />
      </main>
      <ExcellusFooter />
    </div>
  );
}
