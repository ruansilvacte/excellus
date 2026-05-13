import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Example from "./pages/Index";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import ContactPage from "./pages/ContactPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import Posts from "./pages/admin/Posts";
import PostEditor from "./pages/admin/PostEditor";
import Categories from "./pages/admin/Categories";
import Media from "./pages/admin/Media";
import AdminSettings from "./pages/admin/AdminSettings";
import MarketingSettings from "./pages/admin/MarketingSettings";
import EmailSettings from "./pages/admin/EmailSettings";
import LeadsAdmin from "./pages/admin/LeadsAdmin";
import HomeEditor from "./pages/admin/HomeEditor";
import ServiceAreasAdmin from "./pages/admin/ServiceAreasAdmin";
import SeoSettings from "./pages/admin/SeoSettings";
import ServiceDetail from "./pages/ServiceDetail";
import ServicesAdmin from "./pages/admin/ServicesAdmin";
import CrmKanban from "./pages/admin/CrmKanban";
import FacebookPixel from "./components/FacebookPixel";
import GoogleAnalytics from "./components/GoogleAnalytics";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PrivacySecurityPolicy from "./pages/PrivacySecurityPolicy";
import Quote from "./pages/Quote";
import FAQ from "./pages/FAQ";
import Partnerships from "./pages/Partnerships";
import Careers from "./pages/Careers";
import Promotions from "./pages/Promotions";
import ServiceAreasPage from "./pages/ServiceAreas";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <FacebookPixel />
        <GoogleAnalytics />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Example />} />
            {/* English routes (primary) */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:id" element={<ServiceDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            {/* Legacy PT aliases */}
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/servicos" element={<ServicesPage />} />
            <Route path="/servicos/:id" element={<ServiceDetailPage />} />
            <Route path="/contato" element={<ContactPage />} />
            <Route path="/depoimentos" element={<TestimonialsPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/partnerships" element={<Partnerships />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/service-areas" element={<ServiceAreasPage />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/privacy-security" element={<PrivacySecurityPolicy />} />
            <Route path="/quote" element={<Quote />} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="home-editor" element={<HomeEditor />} />
              <Route path="services" element={<ServicesAdmin />} />
              <Route path="service-areas" element={<ServiceAreasAdmin />} />
              <Route path="seo" element={<SeoSettings />} />
              <Route path="posts" element={<Posts />} />
              <Route path="posts/:id" element={<PostEditor />} />
              <Route path="categories" element={<Categories />} />
              <Route path="media" element={<Media />} />
              <Route path="marketing" element={<MarketingSettings />} />
              <Route path="email" element={<EmailSettings />} />
              <Route path="leads" element={<LeadsAdmin />} />
              <Route path="crm" element={<CrmKanban />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
