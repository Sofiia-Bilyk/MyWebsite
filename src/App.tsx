import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CoverLetterTalkspace from "./pages/CoverLetterTalkspace";
import CoverLetterDedalusLabs from "./pages/CoverLetterDedalusLabs";
import CoverLetterSharedContextLab from "./pages/CoverLetterSharedContextLab";

const queryClient = new QueryClient();

function AppRoutes() {
  const location = useLocation();
  const standalonePages: Record<string, JSX.Element> = {
    "/cover_letter_talkspace_0423": <CoverLetterTalkspace />,
    "/cover_letter_DedalusLabs_0513": <CoverLetterDedalusLabs />,
    "/for_shared_context_lab_0515": <CoverLetterSharedContextLab />,
  };
  const isStandalone = location.pathname in standalonePages;

  if (isStandalone) {
    return (
      <Routes location={location} key={location.pathname}>
        {Object.entries(standalonePages).map(([path, el]) => (
          <Route key={path} path={path} element={el} />
        ))}
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
