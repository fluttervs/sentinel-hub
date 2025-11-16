import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { getCurrentUser } from "./lib/auth";
import Landing from "./pages/Landing";
import ChooseRole from "./pages/ChooseRole";
import Login from "./pages/Login";
import ReporterDashboard from "./pages/reporter/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen w-full flex flex-col">
          {getCurrentUser() && <Header />}
          <main className="flex-1">
            <div className="container mx-auto px-4 py-6">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/choose-role" element={<ChooseRole />} />
                <Route path="/login" element={<Login />} />
                
                {/* Reporter Routes */}
                <Route
                  path="/reporter/dashboard"
                  element={
                    <ProtectedRoute>
                      <ReporterDashboard />
                    </ProtectedRoute>
                  }
                />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
