import ExcellusHeader from "@/components/excellus/ExcellusHeader";
import ExcellusFooter from "@/components/excellus/ExcellusFooter";
import TestimonialsHero from "@/components/excellus/testimonials/TestimonialsHero";
import TestimonialsCards from "@/components/excellus/testimonials/TestimonialsCards";
import TestimonialsCases from "@/components/excellus/testimonials/TestimonialsCases";
import TestimonialsStats from "@/components/excellus/testimonials/TestimonialsStats";
import TestimonialsWall from "@/components/excellus/testimonials/TestimonialsWall";

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ExcellusHeader />
      <main>
        <TestimonialsHero />
        <TestimonialsStats />
        <TestimonialsCards />
        <TestimonialsCases />
        <TestimonialsWall />
      </main>
      <ExcellusFooter />
    </div>
  );
}
