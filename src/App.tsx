import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Contexts
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";

// Components
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Header } from "@/components/layout/Header";

// Pages
import { LoginPage } from "@/pages/LoginPage";
import { HomePage } from "@/pages/HomePage";
import { StandingsPage } from "@/pages/StandingsPage";
import { CategoriesPage } from "@/pages/CategoriesPage";
import { TeamDetailPage } from "@/pages/TeamDetailPage";
import { FavoritesPage } from "@/pages/FavoritesPage";
import { DocumentationPage } from "@/pages/DocumentationPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                
                {/* Protected Routes */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-background">
                      <Header />
                      <HomePage />
                    </div>
                  </ProtectedRoute>
                } />
                
                <Route path="/standings/:leagueId" element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-background">
                      <Header />
                      <StandingsPage />
                    </div>
                  </ProtectedRoute>
                } />
                
                <Route path="/categories" element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-background">
                      <Header />
                      <CategoriesPage />
                    </div>
                  </ProtectedRoute>
                } />
                
                <Route path="/team/:teamId" element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-background">
                      <Header />
                      <TeamDetailPage />
                    </div>
                  </ProtectedRoute>
                } />
                
                <Route path="/favorites" element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-background">
                      <Header />
                      <FavoritesPage />
                    </div>
                  </ProtectedRoute>
                } />
                
                <Route path="/docs" element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-background">
                      <Header />
                      <DocumentationPage />
                    </div>
                  </ProtectedRoute>
                } />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
