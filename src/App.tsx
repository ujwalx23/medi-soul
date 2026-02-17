import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Pharmacies from "./pages/Pharmacies";
import HealthMonitoring from "./pages/HealthMonitoring";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import ContactUs from "./pages/ContactUs";
import BasicHealthGuide from "./pages/BasicHealthGuide";
import Settings from "./pages/Settings";
import TrackRecords from "./pages/TrackRecords";
import UpcomingFeatures from "./pages/UpcomingFeatures";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/health-guide" element={<BasicHealthGuide />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<History />} />
            <Route path="/pharmacies" element={<Pharmacies />} />
            <Route path="/health-monitoring" element={<HealthMonitoring />} />
            <Route path="/track-records" element={<TrackRecords />} />
            <Route path="/upcoming-features" element={<UpcomingFeatures />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
