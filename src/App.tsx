import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Header } from "./components/Header";
import { getCurrentUser } from "./lib/auth";
import Landing from "./pages/Landing";
import ChooseRole from "./pages/ChooseRole";
import Login from "./pages/Login";
import ReporterDashboard from "./pages/reporter/Dashboard";
import ReporterIncidents from "./pages/reporter/Incidents";
import NewIncident from "./pages/reporter/NewIncident";
import IncidentDetails from "./pages/reporter/IncidentDetails";
import ReviewerDashboard from "./pages/reviewer/Dashboard";
import ReviewerIncidents from "./pages/reviewer/Incidents";
import LicenseeAdminLayout from "./components/licenseeAdmin/LicenseeAdminLayout";
import LicenseeAdminDashboard from "./pages/licenseeAdmin/Dashboard";
import LicenseeAdminIncidents from "./pages/licenseeAdmin/Incidents";
import LicenseeAdminUsers from "./pages/licenseeAdmin/Users";
import LicenseeAdminProfile from "./pages/licenseeAdmin/Profile";
import LicenseeAdminAnalytics from "./pages/licenseeAdmin/Analytics";
import LicenseeAdminNotifications from "./pages/licenseeAdmin/Notifications";
import LicenseeAdminSecuritySettings from "./pages/licenseeAdmin/SecuritySettings";
import ValidatorDashboard from "./pages/validator/Dashboard";
import InvestigatorDashboard from "./pages/investigator/Dashboard";
import SystemAdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminOrganisations from "./pages/admin/Organisations";
import MasterData from "./pages/admin/MasterData";
import AuditLogs from "./pages/admin/AuditLogs";
import SuperAdminDashboard from "./pages/superAdmin/Dashboard";
import LEADashboard from "./pages/lea/Dashboard";
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
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <div className="min-h-screen w-full flex flex-col">
          <Header />
          <main className="flex-1">
            <div className="container mx-auto px-4 py-6">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/choose-role" element={<ChooseRole />} />
                <Route path="/login" element={<Login />} />
                
                {/* Reporter Routes */}
                <Route path="/reporter/dashboard" element={<ProtectedRoute><ReporterDashboard /></ProtectedRoute>} />
                <Route path="/reporter/incidents" element={<ProtectedRoute><ReporterIncidents /></ProtectedRoute>} />
                <Route path="/reporter/incidents/new" element={<ProtectedRoute><NewIncident /></ProtectedRoute>} />
                <Route path="/reporter/incidents/:id" element={<ProtectedRoute><IncidentDetails /></ProtectedRoute>} />
                
                {/* Licensee Admin Routes - with sidebar layout */}
                <Route path="/licensee-admin" element={<ProtectedRoute><LicenseeAdminLayout /></ProtectedRoute>}>
                  <Route path="dashboard" element={<LicenseeAdminDashboard />} />
                  <Route path="incidents" element={<LicenseeAdminIncidents />} />
                  <Route path="users" element={<LicenseeAdminUsers />} />
                  <Route path="profile" element={<LicenseeAdminProfile />} />
                  <Route path="analytics" element={<LicenseeAdminAnalytics />} />
                  <Route path="notifications" element={<LicenseeAdminNotifications />} />
                  <Route path="security" element={<LicenseeAdminSecuritySettings />} />
                </Route>
                
                {/* Reviewer Routes */}
                <Route path="/reviewer/dashboard" element={<ProtectedRoute><ReviewerDashboard /></ProtectedRoute>} />
                <Route path="/reviewer/incidents" element={<ProtectedRoute><ReviewerIncidents /></ProtectedRoute>} />
                
                {/* Validator Routes */}
                <Route path="/validator/dashboard" element={<ProtectedRoute><ValidatorDashboard /></ProtectedRoute>} />
                
                {/* Investigator Routes */}
                <Route path="/investigator/dashboard" element={<ProtectedRoute><InvestigatorDashboard /></ProtectedRoute>} />
                
                {/* System Admin Routes */}
                <Route path="/admin/dashboard" element={<ProtectedRoute><SystemAdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
                <Route path="/admin/organisations" element={<ProtectedRoute><AdminOrganisations /></ProtectedRoute>} />
                <Route path="/admin/master-data" element={<ProtectedRoute><MasterData /></ProtectedRoute>} />
                <Route path="/admin/audit-logs" element={<ProtectedRoute><AuditLogs /></ProtectedRoute>} />
                
                {/* Super Admin Routes */}
                <Route path="/super-admin/dashboard" element={<ProtectedRoute><SuperAdminDashboard /></ProtectedRoute>} />
                
                {/* LEA Routes */}
                <Route path="/lea/dashboard" element={<ProtectedRoute><LEADashboard /></ProtectedRoute>} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
