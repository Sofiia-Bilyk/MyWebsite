import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const CoverLetterTalkspace = lazy(() => import("./pages/CoverLetterTalkspace"));
const CoverLetterDedalusLabs = lazy(() => import("./pages/CoverLetterDedalusLabs"));
const CoverLetterSharedContextLab = lazy(() => import("./pages/CoverLetterSharedContextLab"));
const CoverLetterSettle = lazy(() => import("./pages/CoverLetterSettle"));
const CoverLetterCareyaya = lazy(() => import("./pages/CoverLetterCareyaya"));
const CoverLetterArena = lazy(() => import("./pages/CoverLetterArena"));
const CoverLetterLaces = lazy(() => import("./pages/CoverLetterLaces"));
const CoverLetterComet = lazy(() => import("./pages/CoverLetterComet"));
const CoverLetterKtlystLabs = lazy(() => import("./pages/CoverLetterKtlystLabs"));
const CoverLetterBleep64 = lazy(() => import("./pages/CoverLetterBleep64"));

const queryClient = new QueryClient();

function AppRoutes() {
  const location = useLocation();
  const standalonePages: Record<string, JSX.Element> = {
    "/cover_letter_talkspace_0423": <CoverLetterTalkspace />,
    "/cover_letter_DedalusLabs_0513": <CoverLetterDedalusLabs />,
    "/for_shared_context_lab_0515": <CoverLetterSharedContextLab />,
    "/for_settle_0517": <CoverLetterSettle />,
    "/for_careyaya_0517": <CoverLetterCareyaya />,
    "/for_arena_0518": <CoverLetterArena />,
    "/for_laces_0518": <CoverLetterLaces />,
    "/for_comet_0518": <CoverLetterComet />,
    "/for_ktlystlabs_0519": <CoverLetterKtlystLabs />,
    "/for_bleep64_0519": <CoverLetterBleep64 />,
  };
  const isStandalone = location.pathname in standalonePages;

  if (isStandalone) {
    return (
      <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>
          {Object.entries(standalonePages).map(([path, el]) => (
            <Route key={path} path={path} element={el} />
          ))}
        </Routes>
      </Suspense>
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
