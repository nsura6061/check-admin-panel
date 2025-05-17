
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AdminLayout from "./components/layout/AdminLayout";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import PerformancePage from "./pages/analytics/PerformancePage";
import RevenuePage from "./pages/analytics/RevenuePage";
import MarketingPage from "./pages/analytics/MarketingPage";
import CourseDashboardPage from "./pages/CourseDashboardPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/" 
              element={
                <AdminLayout>
                  <DashboardPage />
                </AdminLayout>
              } 
            />
            <Route 
              path="/users" 
              element={
                <AdminLayout>
                  <UsersPage />
                </AdminLayout>
              } 
            />
            <Route 
              path="/analytics/performance" 
              element={
                <AdminLayout>
                  <PerformancePage />
                </AdminLayout>
              } 
            />
            <Route 
              path="/analytics/revenue" 
              element={
                <AdminLayout>
                  <RevenuePage />
                </AdminLayout>
              } 
            />
            <Route 
              path="/analytics/marketing" 
              element={
                <AdminLayout>
                  <MarketingPage />
                </AdminLayout>
              } 
            />
            <Route 
              path="/courses/dashboard" 
              element={
                <AdminLayout>
                  <CourseDashboardPage />
                </AdminLayout>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
